# -*- coding: utf-8 -*- #
# Copyright 2018 Google LLC. All Rights Reserved.
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#    http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.
"""Class for representing various changes to a Configuration."""

from __future__ import absolute_import
from __future__ import division
from __future__ import print_function
from __future__ import unicode_literals

import abc
import copy
import shlex

from googlecloudsdk.api_lib.run import configuration
from googlecloudsdk.api_lib.run import k8s_object
from googlecloudsdk.api_lib.run import revision
from googlecloudsdk.api_lib.run import service
from googlecloudsdk.command_lib.run import exceptions
from googlecloudsdk.command_lib.util.args import labels_util
from googlecloudsdk.command_lib.util.args import repeated

import six


class ConfigChanger(six.with_metaclass(abc.ABCMeta, object)):
  """An abstract class representing configuration changes."""

  @abc.abstractmethod
  def Adjust(self, resource):
    """Adjust the given Service configuration.

    Args:
      resource: the k8s_object to adjust.

    Returns:
      A k8s_object that reflects applying the requested update.
      May be resource after a mutation or a different object.
    """
    return resource


class LabelChanges(ConfigChanger):
  """Represents the user intent to modify metadata labels."""

  def __init__(self, diff):
    self._diff = diff

  def Adjust(self, resource):
    # Currently assumes all "system"-owned labels are applied by the control
    # plane and it's ok for us to clear them on the client.
    update_result = self._diff.Apply(
        resource.MessagesModule().ObjectMeta.LabelsValue,
        resource.metadata.labels)
    maybe_new_labels = update_result.GetOrNone()
    if maybe_new_labels:
      resource.metadata.labels = maybe_new_labels
      # Service labels are the source of truth and *overwrite* revision labels.
      # See run-labels-prd for deets.
      # However, we need to preserve the nonce if there is one.
      nonce = resource.template.labels.get(revision.NONCE_LABEL)
      resource.template.metadata.labels = copy.deepcopy(maybe_new_labels)
      if nonce:
        resource.template.labels[revision.NONCE_LABEL] = nonce
    return resource


class ReplaceServiceChange(ConfigChanger):
  """Represents the user intent to replace the service."""

  def __init__(self, new_service):
    self._service = new_service

  def Adjust(self, resource):
    """Returns a replacement for resource.

    The returned service is the service provided to the constructor. If
    resource.metadata.resourceVersion is not empty to None returned service
    has metadata.resourceVersion set to this value.

    Args:
      resource: service.Service, The service to adjust.
    """
    if resource.metadata.resourceVersion:
      self._service.metadata.resourceVersion = resource.metadata.resourceVersion
    return self._service


class EndpointVisibilityChange(LabelChanges):
  """Represents the user intent to modify the endpoint visibility."""

  def __init__(self, endpoint_visibility):
    """Determine label changes for modifying endpoint visibility.

    Args:
      endpoint_visibility: bool, True if Cloud Run on GKE service should only be
        addressable from within the cluster. False if it should be publicly
        addressable.
    """
    if endpoint_visibility:
      diff = labels_util.Diff(
          additions={service.ENDPOINT_VISIBILITY: service.CLUSTER_LOCAL})
    else:
      diff = labels_util.Diff(subtractions=[service.ENDPOINT_VISIBILITY])
    super(EndpointVisibilityChange, self).__init__(diff)


class SetTemplateAnnotationChange(ConfigChanger):
  """Represents the user intent to set a template annotation."""

  def __init__(self, key, value):
    self._key = key
    self._value = value

  def Adjust(self, resource):
    annotations = k8s_object.AnnotationsFromMetadata(
        resource.MessagesModule(), resource.template.metadata)
    annotations[self._key] = self._value
    return resource


class DeleteTemplateAnnotationChange(ConfigChanger):
  """Represents the user intent to delete a template annotation."""

  def __init__(self, key):
    self._key = key

  def Adjust(self, resource):
    annotations = k8s_object.AnnotationsFromMetadata(
        resource.MessagesModule(), resource.template.metadata)
    if self._key in annotations:
      del annotations[self._key]
    return resource


class VpcConnectorChange(ConfigChanger):
  """Sets a VPC connector annotation on the service."""

  def __init__(self, connector_name):
    self._connector_name = connector_name

  def Adjust(self, resource):
    annotations = k8s_object.AnnotationsFromMetadata(resource.MessagesModule(),
                                                     resource.metadata)
    annotations['run.googleapis.com/vpc-access-connector'] = (
        self._connector_name)
    return resource


class ClearVpcConnectorChange(ConfigChanger):
  """Clears a VPC connector annotation on the service."""

  def Adjust(self, resource):
    annotations = k8s_object.AnnotationsFromMetadata(resource.MessagesModule(),
                                                     resource.metadata)
    if 'run.googleapis.com/vpc-access-connector' in annotations:
      del annotations['run.googleapis.com/vpc-access-connector']
    return resource


class ImageChange(ConfigChanger):
  """A Cloud Run container deployment."""

  deployment_type = 'container'

  def __init__(self, image):
    self.image = image

  def Adjust(self, resource):
    annotations = k8s_object.AnnotationsFromMetadata(
        resource.MessagesModule(), resource.metadata)
    annotations[configuration.USER_IMAGE_ANNOTATION] = (
        self.image)
    resource.template.image = self.image
    return resource


class EnvVarChanges(ConfigChanger):
  """Represents the user intent to modify environment variables."""

  def __init__(self, env_vars_to_update=None,
               env_vars_to_remove=None, clear_others=False):
    """Initialize a new EnvVarChanges object.

    Args:
      env_vars_to_update: {str, str}, Update env var names and values.
      env_vars_to_remove: [str], List of env vars to remove.
      clear_others: bool, If true, clear all non-updated env vars.
    """
    self._to_update = None
    self._to_remove = None
    self._clear_others = clear_others
    if env_vars_to_update:
      self._to_update = {k.strip(): v for k, v in env_vars_to_update.items()}
    if env_vars_to_remove:
      self._to_remove = [k.lstrip() for k in env_vars_to_remove]

  def Adjust(self, resource):
    """Mutates the given config's env vars to match the desired changes."""
    if self._clear_others:
      resource.template.env_vars.clear()
    elif self._to_remove:
      for env_var in self._to_remove:
        if env_var in resource.template.env_vars:
          del resource.template.env_vars[env_var]

    if self._to_update: resource.template.env_vars.update(self._to_update)
    return resource


class ResourceChanges(ConfigChanger):
  """Represents the user intent to update resource limits."""

  def __init__(self, memory=None, cpu=None):
    self._memory = memory
    self._cpu = cpu

  def Adjust(self, resource):
    """Mutates the given config's resource limits to match what's desired."""
    if self._memory is not None:
      resource.template.resource_limits['memory'] = self._memory
    if self._cpu is not None:
      resource.template.resource_limits['cpu'] = self._cpu
    return resource

_CLOUDSQL_ANNOTATION = 'run.googleapis.com/cloudsql-instances'


class CloudSQLChanges(ConfigChanger):
  """Represents the intent to update the Cloug SQL instances."""

  def __init__(self, project, region, args):
    """Initializes the intent to update the Cloud SQL instances.

    Args:
      project: Project to use as the default project for Cloud SQL instances.
      region: Region to use as the default region for Cloud SQL instances
      args: Args to the command.
    """
    self._project = project
    self._region = region
    self._args = args

  # Here we are a proxy through to the actual args to set some extra augmented
  # information on each one, so each cloudsql instance gets the region and
  # project.
  @property
  def add_cloudsql_instances(self):
    return self._AugmentArgs('add_cloudsql_instances')

  @property
  def remove_cloudsql_instances(self):
    return self._AugmentArgs('remove_cloudsql_instances')

  @property
  def set_cloudsql_instances(self):
    return self._AugmentArgs('set_cloudsql_instances')

  @property
  def clear_cloudsql_instances(self):
    return getattr(self._args, 'clear_cloudsql_instances', None)

  def _AugmentArgs(self, arg_name):
    val = getattr(self._args, arg_name, None)
    if val is None:
      return None
    return [self._Augment(i) for i in val]

  def Adjust(self, resource):
    def GetCurrentInstances():
      annotation_val = resource.template.annotations.get(_CLOUDSQL_ANNOTATION)
      if annotation_val:
        return annotation_val.split(',')
      return []

    instances = repeated.ParsePrimitiveArgs(
        self, 'cloudsql-instances', GetCurrentInstances)
    if instances is not None:
      resource.template.annotations[_CLOUDSQL_ANNOTATION] = ','.join(instances)
    return resource

  def _Augment(self, instance_str):
    instance = instance_str.split(':')
    if len(instance) == 3:
      ret = tuple(instance)
    elif len(instance) == 1:
      if not self._project:
        raise exceptions.CloudSQLError(
            'To specify a Cloud SQL instance by plain name, you must specify a '
            'project.')
      if not self._region:
        raise exceptions.CloudSQLError(
            'To specify a Cloud SQL instance by plain name, you must be '
            'deploying to a managed Cloud Run region.')
      ret = self._project, self._region, instance[0]
    else:
      raise exceptions.CloudSQLError(
          'Malformed CloudSQL instance string: {}'.format(
              instance_str))
    return ':'.join(ret)


class ConcurrencyChanges(ConfigChanger):
  """Represents the user intent to update concurrency preference."""

  def __init__(self, concurrency):
    self._concurrency = None if concurrency == 'default' else concurrency

  def Adjust(self, resource):
    """Mutates the given config's resource limits to match what's desired."""
    if self._concurrency is None:
      resource.template.deprecated_string_concurrency = None
      resource.template.concurrency = None
    elif isinstance(self._concurrency, int):
      resource.template.concurrency = self._concurrency
      resource.template.deprecated_string_concurrency = None
    else:
      resource.template.deprecated_string_concurrency = self._concurrency
      resource.template.concurrency = None
    return resource


class TimeoutChanges(ConfigChanger):
  """Represents the user intent to update request duration."""

  def __init__(self, timeout):
    self._timeout = timeout

  def Adjust(self, resource):
    """Mutates the given config's timeout to match what's desired."""
    resource.template.timeout = self._timeout
    return resource


class ServiceAccountChanges(ConfigChanger):
  """Represents the user intent to change service account for the revision."""

  def __init__(self, service_account):
    self._service_account = service_account

  def Adjust(self, resource):
    """Mutates the given config's service account to match what's desired."""
    resource.template.service_account = self._service_account
    return resource


class RevisionNameChanges(ConfigChanger):
  """Represents the user intent to change revision name."""

  def __init__(self, revision_suffix):
    self._revision_suffix = revision_suffix

  def Adjust(self, resource):
    """Mutates the given config's revision name to match what's desired."""
    resource.template.name = '{}-{}'.format(resource.name,
                                            self._revision_suffix)
    return resource


class VolumeChanges(ConfigChanger):
  """Represents the user intent to modify volumes and mounts."""

  def __init__(self,
               mounts_to_update=None,
               mounts_to_remove=None,
               clear_others=False):
    """Initialize a new VolumeChanges object.

    Args:
      mounts_to_update: {str, str}, Update mount path and volume fields.
      mounts_to_remove: [str], List of mount paths to remove.
      clear_others: bool, If true, clear all non-updated volumes and mounts of
        the given [volume_type].
    """
    self._to_update = None
    self._to_remove = None
    self._clear_others = clear_others
    if mounts_to_update:
      self._to_update = {
          # Split the given values into 2 parts:
          #    [volume source name, volume name]
          k.strip(): v.split(':', 1) for k, v in mounts_to_update.items()
      }
    if mounts_to_remove:
      self._to_remove = [k.lstrip() for k in mounts_to_remove]

  @abc.abstractmethod
  def _MakeVolumeSource(self, messages, name):
    """Returns an instance of a volume source."""
    pass

  @abc.abstractmethod
  def _GetVolumes(self, resource):
    """Returns a revision.VolumesAsDictionaryWrapper."""
    pass

  @abc.abstractmethod
  def _GetVolumeMounts(self, resource):
    """Returns a revision.VolumeMountsAsDictionaryWrapper."""
    pass

  def Adjust(self, resource):
    """Mutates the given config's volumes to match the desired changes.

    Args:
      resource: k8s_object to adjust

    Returns:
      The adjusted resource

    Raises:
      ConfigurationError if there's an attempt to replace a volume source
        whose existing source is not the same type as the replacement
        (e.g. volume with secret source can't be replaced with a config map
        source), or if there's an attempt to replace the volume a mount points
        to whose existing volume has a source of a different type than the
        new volume (e.g. mount that points to a volume with a secret source
        can't be replaced with a volume that has a config map source).
    """
    volume_mounts = self._GetVolumeMounts(resource)
    volumes = self._GetVolumes(resource)

    if self._clear_others:
      volume_mounts.clear()
    elif self._to_remove:
      for path in self._to_remove:
        if path in volume_mounts:
          del volume_mounts[path]

    if self._to_update:
      for path, split_name in self._to_update.items():
        source_name = split_name[0]
        volume_name = split_name[-1]  # Default to source_name if not given

        error_msg = None
        try:
          # Set the mount and volume
          error_msg = ('Cannot update mount [{}] because its mounted volume '
                       'is of a different source type.'.format(path))
          volume_mounts[path] = volume_name

          error_msg = ('Cannot update volume [{}] because its '
                       'source is of a different type.'.format(volume_name))
          volumes[volume_name] = self._MakeVolumeSource(
              resource.MessagesModule(), source_name)
        except KeyError:
          raise exceptions.ConfigurationError(error_msg)

    # Delete all volumes no longer being mounted
    for volume in list(volumes):
      if volume not in volume_mounts.values():
        del volumes[volume]

    return resource


class SecretVolumeChanges(VolumeChanges):
  """Represents the user intent to change volumes with secret source types."""

  def _MakeVolumeSource(self, messages, name):
    return messages.SecretVolumeSource(secretName=name)

  def _GetVolumes(self, resource):
    return resource.template.volumes.secrets

  def _GetVolumeMounts(self, resource):
    return resource.template.volume_mounts.secrets


class ConfigMapVolumeChanges(VolumeChanges):
  """Represents the user intent to change volumes with config map source types."""

  def _MakeVolumeSource(self, messages, name):
    return messages.ConfigMapVolumeSource(name=name)

  def _GetVolumes(self, resource):
    return resource.template.volumes.config_maps

  def _GetVolumeMounts(self, resource):
    return resource.template.volume_mounts.config_maps


class TrafficChanges(ConfigChanger):
  """Represents the user intent to change a services traffic assignments."""

  def __init__(self, new_percentages, new_latest_percentage):
    self._new_percentages = new_percentages
    self._new_latest_percentage = new_latest_percentage

  def Adjust(self, resource):
    """Mutates the given services traffic assignments."""
    resource.traffic.UpdateTraffic(
        self._new_percentages, self._new_latest_percentage)
    return resource


class ContainerCommandChange(ConfigChanger):
  """Represents the user intent to change the 'command' for the container."""

  def __init__(self, command_str):
    self._commands = shlex.split(command_str)

  def Adjust(self, resource):
    resource.template.container.command = self._commands
    return resource


class ContainerArgsChange(ConfigChanger):
  """Represents the user intent to change the 'args' for the container."""

  def __init__(self, args_str):
    self._args = shlex.split(args_str)

  def Adjust(self, resource):
    resource.template.container.args = self._args
    return resource
