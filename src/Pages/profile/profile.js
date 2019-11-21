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
                <div className="flex w-full">
        <div className="w-1/4">
            <div className="w-0 md:w-full lg:w-1/5 h-0 md:h-screen overflow-y-hidden bg-white shadow-lg">
                <div className="p-5 bg-white sticky bg-gray-200">
                    <p className="pt-2 border-t mt-5 w-full text-center text-xl text-gray-800 round-full bg-blue-new
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
