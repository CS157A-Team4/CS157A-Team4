import React from 'react';
import logo from '../../logo.svg';

class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            posts: [],
            password: [],
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
                    <p className="pt-2 border-t mt-5 w-full text-center text-xl text-gray-900 round-full bg-blue-new
                    font-sans-pro font-bold">
                        User Name</p>
                </div>
                <div>
                    <button className="hover:bg-gray-400 bg-gray-200 border-t-2 p-4 w-full text-xl text-left
                    text-gray-700 font-sans-pro font-bold text-justify">Posts</button>
                    <button className="hover:bg-gray-400 bg-gray-200 border-t-2 p-4 w-full text-xl text-left
                    text-gray-700 font-sans-pro font-bold text-justify">Friends</button>
                    <button className="hover:bg-gray-400 bg-gray-200 border-t-2 p-4 w-full text-xl text-left
                    text-gray-700 font-sans-pro font-bold text-justify">Settings</button>
                </div>
            </div>
            <div className="bg-gray-1000">
                <div className="text-gray-700 text-center bg-white-400 px-4 py-2 m-2"><button>1</button></div>
                <div className="text-gray-700 text-center bg-white-400 px-4 py-2 m-2">2</div>
                <div className="text-gray-700 text-center bg-white-400 px-4 py-2 m-2">3</div>
            </div>
        </div>

		)	
	}
}

export default Profile;
