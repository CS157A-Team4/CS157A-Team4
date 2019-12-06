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
componentDidMount(){
    if(window.localStorage.getItem("id") === null){
        this.props.history.push('/login');  
    }
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

            // this.state.loaded && (
                <div className="flex w-full h-full">
        <div className="w-1/5 flex flex-col bg-white h-full ">
            <div className="w-0 md:w-full lg:w-full h-0 md:h-full overflow-y-hidden bg-white shadow-lg">
                <div className="p-5 bg-white sticky flex justify-center items-center  bg-gray-200">
                    <p className="border-t p-3  w-full text-center text-xl text-white round-full bg-blue-new
                    font-sans-pro font-bold">
                       Your Profile</p>
                </div>

                <div>
                    <button id="posts" onClick={e=>this.goTo(e)} className="hover:bg-gray-400 bg-gray-200 border-t-2 p-4 w-full text-xl text-left
                    text-gray-700 font-sans-pro font-bold text-justify">Posts</button>
                    <button id="friends" onClick={e=>this.goTo(e)}className="hover:bg-gray-400 bg-gray-200 border-t-2 p-4 w-full text-xl text-left
                    text-gray-700 font-sans-pro font-bold text-justify"
                    >Friends</button>
                    <button id="friendsR" onClick={e=>this.goTo(e)}className="hover:bg-gray-400 bg-gray-200 border-t-2 p-4 w-full text-xl text-left
                    text-gray-700 font-sans-pro font-bold text-justify"
                    >Friends Request</button>
                </div>
            </div>

        </div>
                    <div className="w-full"></div>
        </div>
		//)
        )
	}
}

export default Profile;
