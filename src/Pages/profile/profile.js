import React from 'react';
//import PasswordChange from './Pages/profile/profile';
import logo from '../../logo.svg';
import Friends from './components/friends';
import Posts from './components/posts';
import Settings from './components/settings';

class Profile extends React.Component {
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
        this.show_post()
    }

    goTo(event) {
        const value = event.target.value;
        this.props.history.push(`/${value}`);
    }
    updateState(e){
        this.setState({status:e.target.id})
    }
    show_post() {
        console.log("test show posts!!!");
        let user = 23;

        console.log(user)
        fetch (`https://sjsubookietest.herokuapp.com/profile/getAll/${user}`).then(results => {
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

	render() {
    	return (
            // this.state.loaded && (
                <div className="flex w-full h-full">
        <div className="w-1/5 flex flex-col bg-white h-full ">
            <div className="w-0 md:w-full lg:w-full h-0 md:h-full overflow-y-hidden bg-white shadow-lg">
                <div className="p-5 bg-white sticky flex justify-center items-center  bg-gray-200">
                    <p className="border-t p-3  w-full text-center text-xl text-gray-800 round-full bg-blue-new
                    font-sans-pro font-bold">
                       Your Profile</p>
                </div>

                <div>
                    <button id="posts" onClick={e=>this.updateState(e)} className="hover:bg-gray-400 bg-gray-200 border-t-2 p-4 w-full text-xl text-left
                    text-gray-700 font-sans-pro font-bold text-justify">Posts</button>
                    <button id="friends" onClick={e=>this.updateState(e)}className="hover:bg-gray-400 bg-gray-200 border-t-2 p-4 w-full text-xl text-left
                    text-gray-700 font-sans-pro font-bold text-justify"
                    >Friends</button>
                    <button id="settings" onClick={e=>this.updateState(e)}className="hover:bg-gray-400 bg-gray-200 border-t-2 p-4 w-full text-xl text-left
                    text-gray-700 font-sans-pro font-bold text-justify">Settings</button>
                </div>
            </div>
            
        </div>
        {this.state.status === 'friends' &&
        <Friends/>
        }
        {this.state.status === 'settings' &&
        <Settings/>
        }
        {this.state.status === 'posts' &&
        <Posts/>
        }
        </div>
		//)
        )
	}
}

export default Profile;
