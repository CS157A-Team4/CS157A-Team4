import React from 'react';
import logo from '../logo.svg';

class Confirmation extends React.Component {	
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
          <div className="App">
            <header className="App-header">
              <img src={logo} className="App-logo" alt="logo" />
              <p>
                Bookie's Temporary Confirmation Page
              </p>
              <h2>{this.props.match.params.params}</h2>
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

export default Confirmation;
