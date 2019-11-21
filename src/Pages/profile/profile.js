import React from 'react';
import logo from '../../logo.svg';

class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            posts: [],
            password: [],
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

	render() {
    	return (
        <div>
            <div className="w-0 md:w-1/4 lg:w-1/5 h-0 md:h-screen overflow-y-hidden bg-white shadow-lg">
                <div className="p-5 bg-white sticky bg-gray-200">
                    <p className="pt-2 border-t mt-5 w-full text-center text-xl text-gray-800 round-full bg-blue-new
                    font-sans-pro font-bold">
                       Your Profile</p>
                </div>
                <div>
                    <button className="hover:bg-gray-400 bg-gray-200 border-t-2 p-4 w-full text-xl text-left
                    text-gray-700 font-sans-pro font-bold text-justify">Posts</button>
                    <button className="hover:bg-gray-400 bg-gray-200 border-t-2 p-4 w-full text-xl text-left
                    text-gray-700 font-sans-pro font-bold text-justify"
                    >Friends</button>
                    <button className="hover:bg-gray-400 bg-gray-200 border-t-2 p-4 w-full text-xl text-left
                    text-gray-700 font-sans-pro font-bold text-justify">Settings</button>
                </div>
            </div>
        </div>

		)	
	}
}

export default Profile;
