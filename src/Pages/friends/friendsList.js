import React from 'react';
import logo from "../../logo.svg";

class Table extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data : [],
            friends: [
                {relationshipId: 0, user1: '', user2: '', firstname: '',surname: ''}

            ]
        };
    }

    UNSAFE_componentWillMount() { // call before render
        this.getFriends()
    }

    getFriends() {
        let id = 23;
        fetch('https://sjsubookietest.herokuapp.com/friends/list/' + id).then(
            function(response) {
                return response.json();
            }
        ).then(
            function(data){
                console.log(data);
                this.setState({friends:data});
                console.log(this.state);
            }.bind(this)
        )
    }

    // a function for friends table data, users info
    renderFriendsTable() {
        return this.state.friends.map((friends, index) => {
            console.log(friends)
            const {relationshipId, user1, user2, firstname, surname} = friends;
            console.log(friends.relationshipId);
            console.log(friends.user1);
            console.log(friends.user2);
            console.log(friends.firstname);
            console.log(friends.surname);

            return (
                <tr className="border-b-2 border-aqua " key={relationshipId}>
                    <td className="py-4 px-6 text-center border-b border-grey-light">{user2}</td>
                    <td className="py-4 px-6 text-center border-b border-grey-light">{firstname}</td>
                    <td className="py-4 px-6 text-center border-b border-grey-light">{surname}</td>
                </tr>

            )
        })
    }
    goTo(event) {
        const value = event.target.id;
        this.props.history.push(`/profile/${value}`);
    }

    render() {
        return(
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
                <div className="w-full font-sans-pro text-2xl">

                    <div className=" w-full flex justify-center">

                            <h1 className="py-4 px-6 bg-grey-lightest font-bold font-sans-pro
                    border-b border-grey-light flex ">
                                Friends Forever Table
                            </h1>
                        </div>
                        <div className="flex justify-center">
                            <table className="table-fixed" id='friends' >
                                <thead>
                                <tr>
                                    <th className="py-4 px-6 bg-grey-lightest text-center font-bold font-sans-pro
                        border-b border-grey-light">Friend Id</th>
                                    <th className="py-4 px-6 bg-grey-lightest text-center font-bold font-sans-pro
                        border-b border-grey-light">First Name</th>
                                    <th className="py-4 px-6 bg-grey-lightest text-center font-bold font-sans-pro
                        border-b border-grey-light">Last Name</th>
                                </tr>
                                </thead>
                                <tbody>
                                {this.renderFriendsTable()}
                                </tbody>
                            </table>
                        </div>
                    </div>

            </div>



        )
    }
}


export default Table;