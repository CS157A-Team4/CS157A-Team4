import React from 'react';
import logo from "../../logo.svg";

class Table extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data : [],
            friends: [],
            loaded:false // do not reload page
        };
    }

    UNSAFE_componentWillMount() { // call before render
        this.getFriends()
    }

    getFriends() {
        let id = 23;
        fetch('https://sjsubookietest.herokuapp.com/friends/request/' + id).then(
            function(response) {
                return response.json();
            }
        ).then(
            function(data){
                console.log(data);
                this.setState({friends:data,loaded:true});
                console.log(this.state);
            }.bind(this)
        )
    }

    // a function for friends table data, users info
    renderFriendsTable() {
        return this.state.friends.map((friends, index) => {
            console.log(friends);
            const {relationshipId, user1, user2, firstname, surname} = friends;
            console.log(friends.relationshipId);
            console.log(friends.user1);
            console.log(friends.user2);
            console.log(friends.firstname);
            console.log(friends.surname);

            return (
                <tr className="border-b-2 border-aqua " key={relationshipId}>
                    <td className="py-4 px-6 text-center border-grey-light">{relationshipId}</td>
                    <td className="py-4 px-6 text-center border-b border-grey-light">{user1}</td>
                    <td className="py-4 px-6 text-center border-b border-grey-light">{user2}</td>
                    <td className="py-4 px-6 text-center border-b border-grey-light">{firstname}</td>
                    <td className="py-4 px-6 text-center border-b border-grey-light">{surname}</td>
                    <td className="py-4 px-6 text-center border-b border-grey-light">
                        <button id={user1}
                        className="bg-green-400 hover:bg-green-800 text-white font-bold py-2 px-4 rounded-l-full mr-1"
                        onClick={e => this.createRelation(e)}
                        >
                        Accept
                    </button>

                        <button id={relationshipId}
                            className="bg-red-300 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-r-full ml-1"
                        onClick={e => this.deleteRelationship(e)}
                        >
                            Delete
                        </button>
                    </td>
                </tr>
            )
        })
    }
    
    createRelation(e) {
        console.log("test request!!")
        e.preventDefault();
        let user2 = e.target.id;
        let user1 = 23;
        let users = {
            user1: user1,
            user2: user2,
        };
        console.log(users)
        fetch ('https://sjsubookietest.herokuapp.com/friends/request/create', {
            method:"POST",
            headers:{
            'Content-Type': 'application/json'
            },
            body: JSON.stringify(users)
        }).then(results => {
            return results.json()
        }).then(data=>{
            if (data["error"]) {
                alert(data["message"]);
            }
            else{
                console.log(data);
                alert(data["message"]);
                // refresh the page
                window.location.reload();
            }
        })
    }

    deleteRelationship(e){
        console.log("test delete");
        e.preventDefault();
        let id = e.target.id;
        let users = {
            id: id,
        };
        fetch ('https://sjsubookietest.herokuapp.com/friends/delete/', {
            method:"POST",
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(users)
        }).then(results => {
            return results.json()
        }).then(data=>{
            if (data["error"]) {
                alert(data["message"]);
            }
            else{
                console.log(data);
                alert(data["message"]);
                // refresh the page
                window.location.reload();
            }
        })
    }

    goTo(event) {
        const value = event.target.id;
        this.props.history.push(`/profile/${value}`);
    }

    render() {
        return(
            this.state.loaded && (
            <div className="flex w-full h-full">
                <div className="w-1/5 flex flex-col bg-white h-full">
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

                    <div className="font-sans-pro text-2xl w-full">
                    <div className="flex justify-center">
                        <h1 className="py-4 px-6 bg-grey-lightest font-bold font-sans-pro
                    border-b border-grey-light">
                            Friends Request List Table
                        </h1>
                    </div>
                    <div className="flex justify-center h-full w-full">
                        <table className="table-fixed  bg-white w-auto rounded" id='friends' >
                            <thead>
                            <tr>
                                <th className="py-4 px-6 bg-grey-lightest text-center font-bold font-sans-pro
                        border-b border-grey-light">ID</th>
                                <th className="py-4 px-6 bg-grey-lightest text-center font-bold font-sans-pro
                        border-b border-grey-light">User1</th>
                                <th className="py-4 px-6 bg-grey-lightest text-center font-bold font-sans-pro
                        border-b border-grey-light">User2</th>
                                <th className="py-4 px-6 bg-grey-lightest text-center font-bold font-sans-pro
                        border-b border-grey-light">First Name</th>
                                <th className="py-4 px-6 bg-grey-lightest text-center font-bold font-sans-pro
                        border-b border-grey-light">Last Name</th>
                                <th className="py-4 px-6 bg-grey-lightest text-center font-bold font-sans-pro
                        border-b border-grey-light">Option</th>
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
        )
    }
}


export default Table;