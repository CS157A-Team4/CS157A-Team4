import React from 'react';
import logo from '../../logo.svg';

class Search extends React.Component {	
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
          <div className="text-center h-full">
          <header className="overflow-hidden min-h-full bg-blue-new flex flex-col items-center justify text-center content-center justify-center">
              <img src={logo} className="App-logo" alt="logo" />
              <p>
                Bookie's Temporary Search Page
              </p>
              <h2>{this.props.location.search}</h2>
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

export default Search;
