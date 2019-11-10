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
    // a function for friends table data
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
                <tr key={relationshipId}>
                    <td>{relationshipId}</td>
                    <td>{user1}</td>
                    <td>{user2}</td>
                    <td>{firstname}</td>
                    <td>{surname}</td>
                </tr>
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
                <h1 id='title'>Friends list Table</h1>
                <h1>Friends list table is coming soon</h1>
                    <table id='friends'>
                        <tbody>
                            <tr>{this.renderFriendsTableHeader()}</tr>
                           {this.renderFriendsTable()}

                        </tbody>

                    </table>

                <header className="App-header">
                    <h2>Buttons</h2>
                    <button variant="request"  size="lg">
                        Accept

                    </button>{' '}
                    <button variant="request"  size="lg">
                        Delete

                    </button>
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