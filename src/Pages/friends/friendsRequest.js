import React from 'react';
import logo from "../../logo.svg";

class FriendsRequest extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: '',
            lastName: '',
            message: '',
        };
    }
    UNSAFE_componentWillMount() { // call before render
        this.friendsRequest()
    }
    friendsRequest() {
        let id = 23;
        fetch('https://sjsubookietest.herokuapp.com/friends/request/' + id).then(
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

    render() {
        return(
            <div>
                <div className="App">

                    <header className="App-header">
                        <h1>Button</h1>

                        <button variant="request"  size="lg">
                            Accept

                        </button>{' '}
                        <button variant="request"  size="lg">
                            Delete

                        </button>
                        <img src={logo} className="App-logo" alt="logo" />
                        <p>
                            Bookie's Temporary friends request Page
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
            </div>
        )
    }
}

export default FriendsRequest;