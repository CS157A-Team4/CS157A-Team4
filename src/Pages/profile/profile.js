import React from 'react';
import logo from '../../logo.svg';

class Profile extends React.Component {	
    constructor(props) {
        super(props);
      }
    goTo(event) {
        const value = event.target.value;
        this.props.history.push(`/${value}`);
      }
	render() {
    	return (
        <div>
          <div className="">
            <header className="flex justify-center flex-col items-center text-center">
              <img src={logo} className="App-logo" alt="logo" />
              <p>
                Bookie's Temporary Profile Page
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

export default Profile;
