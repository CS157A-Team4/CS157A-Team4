import React from 'react';

class Friends extends React.Component {
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
        const value = event.target.value;
        this.props.history.push(`/${value}`);
    }
    updateState(e){
        this.setState({status:e.target.id})
    }
	render() {
    	return (
            // this.state.loaded && (

        <div>Friends</div>
		//)
        )
	}
}

export default Friends;
