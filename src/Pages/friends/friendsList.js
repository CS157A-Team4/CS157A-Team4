import React from 'react';
import logo from "../../logo.svg";

/* Create a Friends list and request page with table view
* reference: https://dev.to/abdulbasit313/an-easy-way-to-create-a-customize-dynamic-table-in-react-js-3igg
* */
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
                <table className="table-auto">
                    <thead>
                    <tr>
                        <th className="py-4 px-6 bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b
                        border-grey-light">ID</th>
                        <th className="py-4 px-6 bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b
                        border-grey-light">User1</th>
                        <th className="py-4 px-6 bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b
                        border-grey-light">User2</th>
                        <th className="py-4 px-6 bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b
                        border-grey-light">First name</th>
                        <th className="py-4 px-6 bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b
                        border-grey-light">Last name</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr key={relationshipId}>
                        <td className="py-4 px-6 border-b border-grey-light">{relationshipId}</td>
                        <td className="py-4 px-6 border-b border-grey-light">{user1}</td>
                        <td className="py-4 px-6 border-b border-grey-light">{user2}</td>
                        <td className="py-4 px-6 border-b border-grey-light">{firstname}</td>
                        <td className="py-4 px-6 border-b border-grey-light">{surname}</td>
                        <td> <button
                            className="bg-green-400 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-l-full">
                            Accept
                        </button>
                            {' '}
                            <button
                                className="bg-blue-400 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-r-full">
                                Delete
                            </button></td>
                    </tr>
                    </tbody>
                </table>
                // <tr key={relationshipId}>
                //     <td class="py-4 px-6 border-b border-grey-light">{relationshipId}</td>
                //     <td class="py-4 px-6 border-b border-grey-light">{user1}</td>
                //     <td class="py-4 px-6 border-b border-grey-light">{user2}</td>
                //     <td class="py-4 px-6 border-b border-grey-light">{firstname}</td>
                //     <td class="py-4 px-6 border-b border-grey-light">{surname}</td>
                // </tr>

            )
        })
    }

    // a function for uppercase the table header ID, USER1, USER2
    renderFriendsTableHeader() {
        // object.keys gives the keys of friends in array and stored in variable header
        let header = Object.keys(this.state.friends[0]);
        return header.map((key, index) => {
            return <th key={index}>{key.toUpperCase()}</th>
            }
        )
    }



    render() {
        return(
            <div>
                <thead>
                <th className="py-4 px-6 bg-grey-lightest font-bold uppercase text-sm text-grey-dark
                    border-b border-grey-light" id='title'>Friends list Table</th></thead>
                    <table className="table-auto" id='friends'>
                        {/*<thead>*/}
                        {/*<tr>*/}
                        {/*    <th className="py-4 px-6 bg-grey-lightest font-bold uppercase text-sm text-grey-dark
                        border-b border-grey-light">ID</th>*/}
                        {/*    <th className="py-4 px-6 bg-grey-lightest font-bold uppercase text-sm text-grey-dark
                        border-b border-grey-light">User1</th>*/}
                        {/*    <th className="py-4 px-6 bg-grey-lightest font-bold uppercase text-sm text-grey-dark
                        border-b border-grey-light">User2</th>*/}
                        {/*    <th className="py-4 px-6 bg-grey-lightest font-bold uppercase text-sm text-grey-dark
                        border-b border-grey-light">first name</th>*/}
                        {/*    <th className="py-4 px-6 bg-grey-lightest font-bold uppercase text-sm text-grey-dark
                        border-b border-grey-light">last name</th>*/}

                        {/*</tr>*/}
                        {/*</thead>*/}
                        <tbody>
                        <tr>
                            {this.renderFriendsTable()}
                        </tr>
                        </tbody>
                            {/*<tr>{this.renderFriendsTableHeader()}</tr>*/}
                    </table>

                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <p>
                        Bookie's Temporary friends list Page
                    </p>
                    <button
                        className="App-link"
                        value = ""
                        onClick={(e) => this.goTo(e)}
                    >
                        Click here to return home
                    </button>
                </header>
            </div>


        )
    }
}


export default Table;