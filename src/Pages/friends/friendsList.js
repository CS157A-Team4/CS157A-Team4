import React from 'react';
import logo from "../../logo.svg";
import Column from "../../column";

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
        let id = window.localStorage.getItem("id");
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

                    <td className="py-4 px-6 text-center border-b border-grey-light">{firstname}</td>
                    <td className="py-4 px-6 text-center border-b border-grey-light">{surname}</td>
                    <button id={user2}
                            className="bg-blue-new hover:bg-teal-600 text-white font-bold py-2 px-4 rounded-full mr-1"
                            onClick={e => this.sendMessage(e)}
                    >
                        Message
                    </button>
                </tr>

            )
        })
    }

    sendMessage(event) {
        const value = event.target.id;
        this.props.history.push(`/messages/${value}`);
    }
    goTo(event) {
        const value = event.target.id;
        this.props.history.push(`/profile/${value}`);
    }

    render() {
        return(
            <div className="flex w-full h-full">
                <Column/>
                <div className="w-full font-sans-pro text-2xl">

                    <div className=" w-full flex justify-center table-fixed  rounded">
                            <h1 className="py-4 px-6 text-4xl text-white bg-grey-lightest font-bold font-sans-pro
                    border-b border-grey-light flex ">
                                Friends Forever Table
                            </h1>
                        </div>
                        <div className="flex justify-center">
                            <table className="table-fixed bg-white rounded" id='friends' >
                                <thead>
                                <tr>

                                    <th className="py-4 px-6 bg-grey-lightest text-center font-bold font-sans-pro
                        border-b border-grey-light">First Name</th>
                                    <th className="py-4 px-6 bg-grey-lightest text-center font-bold font-sans-pro
                        border-b border-grey-light">Last Name</th>
                                    <th className="py-4 px-6 bg-grey-lightest text-center font-bold font-sans-pro
                        border-b border-grey-light">Message</th>

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