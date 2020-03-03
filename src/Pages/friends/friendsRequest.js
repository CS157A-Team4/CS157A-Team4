import React from 'react';
import logo from "../../logo.svg";
import Column from '../../column';
import api from '../../backend/backend';

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
        if(window.localStorage.getItem("id") === null){
            this.props.history.push('/login');  
        }
        this.getFriends()
    }

    getFriends() {
        let id = window.localStorage.getItem("id");
        fetch(api+'/friends/request/' + id).then(
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
                    <td className="py-4 px-6 text-center border-b border-grey-light">{firstname.charAt(0).toUpperCase() + firstname.slice(1)}</td>
                    <td className="py-4 px-6 text-center border-b border-grey-light">{surname.charAt(0).toUpperCase() + surname.slice(1)}</td>
                    <td className="py-4 px-6 text-center border-b border-grey-light">
                        <button id={user1}
                        className="bg-green-400 hover:bg-green-800 text-white font-bold py-2 px-4 rounded-l-full mr-1"
                        onClick={e => this.createRelation(e)}
                        >
                            {window.innerWidth > 768 ? "Accept" : "Y"}

                    </button>

                        <button id={relationshipId}
                            className="bg-red-300 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-r-full ml-1"
                        onClick={e => this.deleteRelationship(e)}
                        >
                            {window.innerWidth > 768 ? "Delete" : "N"}
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
        let user1 = window.localStorage.getItem("id");
        let users = {
            user1: user1,
            user2: user2,
        };
        console.log(users);
        fetch (api+'/friends/request/create', {
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
        fetch (api+'/friends/delete/', {
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
            this.state.loaded &&
            <div className="flex w-full h-full overflow-auto-y">
                <Column/>
                
                <div className="font-sans-pro text-2xl w-full">
                    <div className="flex justify-center">
                        <h1 className="py-4 px-6 text-4xl text-white bg-grey-lightest font-bold font-sans-pro
                    border-b border-grey-light">
                            Friend Requests Table
                        </h1>
                    </div>
                    <div className="flex justify-center">
                        <table className="table-auto bg-white w-auto rounded" id='friends' >
                            <thead>
                            <tr>
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
    }
}


export default Table;