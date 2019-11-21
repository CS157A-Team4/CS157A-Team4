import React from 'react';
import logo from '../../logo.svg';

class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            posts: [],
            password: [],
            loaded:false // do not reload page
        };
    }

    goTo(event) {
        const value = event.target.value;
        this.props.history.push(`/${value}`);
      }
	render() {
    	return (
        <div>
          {/*<div className="App">*/}
          {/*  <header className="App-header">*/}
          {/*    <img src={logo} className="App-logo" alt="logo" />*/}
          {/*    <p>*/}
          {/*      Bookie's Temporary Profile Page*/}
          {/*    </p>*/}
          {/*    <button*/}
          {/*      className="App-link"*/}
          {/*      value = ""*/}
          {/*      onClick={(e) => this.goTo(e)}*/}
          {/*    >*/}
          {/*      Click here to return home*/}
          {/*    </button>*/}
          {/*  </header>*/}
          {/*</div>*/}



            <div className="w-0 md:w-1/4 lg:w-1/5 h-0 md:h-screen overflow-y-hidden bg-white shadow-lg">
                <div className="p-5 bg-white sticky bg-gray-200">
                    <button className="pt-2 border-t mt-5 w-full text-center text-xl text-gray-600 round-full">
                        USER
                    </button>
                    <button className="hover:bg-gray-300 bg-gray-200 border-t-2 p-3 w-full text-xl text-left text-gray-600 font-semibold"
                    >Posts</button>
                    <button className="hover:bg-gray-300 bg-gray-200 border-t-2 p-3 w-full text-xl text-left text-gray-600 font-semibold"
                    >Settings</button>
                </div>
                <div className="w-full h-screen antialiased flex flex-col hover:cursor-pointer">


                </div>

            </div>
        </div>

		)	
	}
}

export default Profile;
