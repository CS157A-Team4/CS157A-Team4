import React from 'react';
import Column from "../../../column";

class Settings extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            posts: [],
            password: [],
            status:'',
            friends: [
                {relationshipId: 0, user1: '', user2: '', firstname: '',surname: ''}
            ],
            loaded:false // do not reload page
        };
    }

    goTo(event) {
        const value = event.target.id;
        this.props.history.push(`/profile/${value}`);
    }
    updateState(e){
        this.setState({status:e.target.id})
    }
	render() {
    	return (
            <div className="flex w-full h-full ">
                <Column/>
        <div className="w-full">Settings</div>
                </div>
		//)
        )
	}
}

export default Settings;
