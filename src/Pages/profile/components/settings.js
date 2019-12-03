import React from 'react';

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
            <div className="flex w-full h-full">
                <div className="w-1/5 flex flex-col bg-white h-full ">
                    <div className="w-0 md:w-full lg:w-full h-0 md:h-full overflow-y-hidden bg-white shadow-lg">
                        <div className="p-5 bg-white sticky flex justify-center items-center  bg-gray-200">
                            <p className="border-t p-3  w-full text-center text-xl text-gray-800 round-full bg-blue-new
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
                            <button id="settings" onClick={e=>this.goTo(e)}className="hover:bg-gray-400 bg-gray-200 border-t-2 p-4 w-full text-xl text-left
                    text-gray-700 font-sans-pro font-bold text-justify">Settings</button>

                    </div>
                    </div>
                </div>
        <div>Settings</div>
                </div>
		//)
        )
	}
}

export default Settings;
