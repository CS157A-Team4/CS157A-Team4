import React from 'react';
import Column from "../../../column";
import api from '../../../backend/backend';

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

    UNSAFE_componentWillMount() { // call before render
        
        this.show_friends()
    }

    show_friends() {
        console.log("test show friends!!!");
        let user = window.localStorage.getItem("id");

        console.log(user)
        fetch (api+`/friends/getAll/${user}`).then(results => {
            return results.json()
        }).then(data=>{
            if (data["error"]) {
                alert(data["message"]);
            }
            else{
                console.log(data["data"]);
                alert(data["message"]);
            }
        })
    }

    goTo(event) {
        const value = event.target.id;
        this.props.history.push(`/profile/${value}`);
    }

	render() {
    	return (
            // this.state.loaded && (
            <div className="flex w-full h-full">
              <Column/>
                <div>
                    Friends Info
                </div>
            </div>
		//)
        )
	}
}

export default Friends;
