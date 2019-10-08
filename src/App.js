import React from 'react';
import logo from './logo.svg';
import './App.css';
import { withRouter } from 'react-router-dom';
import { thisExpression } from '@babel/types';
import api from './backend/backend';
import { slide as Menu } from "react-burger-menu";

class App extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
          firstname: '',
          lastname: '',
          email: '',
          password: '',
          secondpassword: '',
      };

  
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
  }
  UNSAFE_componentWillMount() {
    console.log("hi");
    fetch(api+"/testapi/tables", {
      method: "GET",
      headers: {
        'accept': 'application/json',
      }
    })
    .then(function (response) {
      console.log("hi");
        return response.json();
    })
    .then(function (data) {
        if (data["error"]) {
            this.setState({
                error: data["message"]
            });
            console.log(data);
        }
        else {
          console.log(data);
            this.setState({message:data});
        }

    }.bind(this));
    }
    createTable = () => {
      if(this.state.message){
      let table = []
      const len = this.state.message.length;
      const message = this.state.message;
      for(let i = 0; i< len; i++){
        let current = message[i];
        table.push(<p> {current['iduser']} {current['email']} {current['firstname']} {current['surname']} {current['schoolid']} </p> );
      }
      return table;
    }
  return '';
  }
  
  handleChange(event) {
      this.setState({
          [event.target.id]: event.target.value
      });
  }
  handleSubmit(event){
    fetch("localhost:8090/tables")
      .then(function (response) {
          return response.json();
      })
      .then(function (data) {
          if (data["error"]) {
              this.setState({
                  error: data["message"]
              });
          }
          else {
              console.log(data);
          }

      }.bind(this));
}

  render() {return (
    <div className="bg-blue-new h-full"></div>
  );
}
}
export default withRouter(App);
