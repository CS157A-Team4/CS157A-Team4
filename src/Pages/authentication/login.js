import React, { useState } from "react";
import api from '../../backend/backend';


export default function Login(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function validateForm() {
    return email.length > 0 && password.length > 0;
  }

  async function handleSubmit(event) {
    event.preventDefault();
    
    const user = {
      email : email,
      password: password,
    }

    await fetch(api + "/login/submit", {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user)
    }).then(response => {
      response.json()
      console.log(response)
    })
    .then(data => {
      //data.json()
      //console.log(data)
      //const resData = JSON.parse(data)
      //console.log("resData:")
      //console.log(resData)
      //console.log("data: " + JSON.stringify(data))
      //console.log(typeof data)

      // if(resData.data.length != 0){
      //   console.log("Account logged in!")
      // }
    })
  }
    
  return (
    <div className="flex items-center justify-center w-full  h-full md:mt-20 mt-6 ">
      <div className="w-full max-w-md">
        <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <div className="md:flex md:items-center mb-8">
            <div className="md:w-1/3">
              <label className="block font-bold font-sans-pro text-grey-darker text-xl rounded font-bold md:text-left mb-1 md:mb-0 pr-4" for="inline-full-name">Username</label>
            </div>
            <div className="md:w-2/3">
              < input className="shadow appearance-none rounded w-full py-3 px-4 text-xl font-sans-pro font-bold text-gray-700 leading-tight"
                id="email"
                type="email"
                onChange={e => setEmail(e.target.value)}
                value={email}
                placeholder="email" />
            </div>
          </div>

          <div className="md:flex md:items-center mb-6">
            <div className="md:w-1/3">
              <label className="block font-bold font-sans-pro text-grey-darker text-xl rounded font-bold md:text-left mb-1 md:mb-0 pr-4"
                for="inline-full-name">Password</label>
            </div>
            <div className="md:w-2/3">
              < input className="shadow appearance-none rounded w-full py-3 px-4 text-gray-700 font-sans-pro font-bold leading-tight "
                id="password"
                type="password"
                onChange={e => setPassword(e.target.value)}
                value={password}
                placeholder="******************" />
            </div>
          </div>

          <div className="flex items-center justify-between mt-8">
            <button className="bg-bookie-grey hover:bg-red text-white text-xl font-bold py-2 px-4 rounded"
              type="button"
              onClick={handleSubmit}>
              Sign In
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