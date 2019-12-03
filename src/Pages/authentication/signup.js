import React from 'react';
import logo from '../../logo.svg';

class SignUp extends React.Component {	
  constructor(props) {
      super(props);


      
  }
  goTo(event) {
      const value = event.target.value;
      this.props.history.push(`/${value}`);
  }

  
	render() {
    	return (
          <div className="flex items-center justify-center w-full h-full mt-20">
            <div className="w-full max-w-md">
              <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"> 
               
                {/* FIRST NAME */}
                <div className="md:flex md:items-center mb-8">
                  <div className="md:w-1/3">
                    <label className="block font-bold font-sans-pro text-grey-darker text-xl rounded font-bold md:text-left mb-1 md:mb-0 pr-4" for="inline-full-name">First Name</label>
                  </div>
                  <div className="md:w-2/3">
                    < input className="shadow appearance-none rounded w-full py-3 px-4 text-xl font-sans-pro font-bold text-gray-700 leading-tight" id="username" type="text" placeholder="First Name"/>
                  </div>
                </div>

               {/* LAST NAME */}
                <div className="md:flex md:items-center mb-8">
                  <div className="md:w-1/3">
                    <label className="block font-bold font-sans-pro text-grey-darker text-xl rounded font-bold md:text-left mb-1 md:mb-0 pr-4" for="inline-full-name">Last Name</label>
                  </div>
                  <div className="md:w-2/3">
                    < input className="shadow appearance-none rounded w-full py-3 px-4 text-xl font-sans-pro font-bold text-gray-700 leading-tight" id="username" type="text" placeholder="Last Name"/>
                  </div>
                </div>

                {/* EMAIl */}
                <div className="md:flex md:items-center mb-8">
                  <div className="md:w-1/3">
                    <label className="block font-bold font-sans-pro text-grey-darker text-xl rounded font-bold md:text-left mb-1 md:mb-0 pr-4" for="inline-full-name">Email</label>
                  </div>
                  <div className="md:w-2/3">
                    < input className="shadow appearance-none rounded w-full py-3 px-4 text-xl font-sans-pro font-bold text-gray-700 leading-tight" id="username" type="text" placeholder="Email"/>
                  </div>
                </div>

                {/* PASSWORD */}
                <div className="md:flex md:items-center mb-6">
                  <div className="md:w-1/3">
                    <label className="block font-bold font-sans-pro text-grey-darker text-xl rounded font-bold md:text-left mb-1 md:mb-0 pr-4" for="inline-full-name">Password</label>
                  </div>
                  <div className="md:w-2/3">
                    < input className="shadow appearance-none rounded w-full py-3 px-4 text-gray-700 font-sans-pro font-bold leading-tight " id="password" type="password" placeholder="******************"/>
                  </div>
                </div>

                {/* CONFIRM PASSWORD */}
                <div className="md:flex md:items-center mb-6">
                  <div className="md:w-1/3">
                    <label className="block font-bold font-sans-pro text-grey-darker text-xl rounded font-bold md:text-left mb-1 md:mb-0 pr-4" for="inline-full-name">Confirm Password</label>
                  </div>
                  <div className="md:w-2/3">
                    < input className="shadow appearance-none rounded w-full py-3 px-4 text-gray-700 font-sans-pro font-bold leading-tight " id="password" type="password" placeholder="******************"/>
                  </div>
                </div>
  
                {/* BUTTONS */}
                <div className="flex items-center justify-between mt-8">
                  <button className="bg-bookie-grey hover:bg-red text-white text-xl font-bold py-2 px-4 rounded" type="button">
                    Sign Up
                  </button>
                  <a className="inline-block align-baseline font-bold text-md text-blue-500 hover:text-blue-800" href="#">
                    Forgot Password?
                  </a>
                </div>
              </form>
              
            </div>
          </div>
      )	
	}
}

export default SignUp;
