import React, { useState } from "react";
import api from '../../backend/backend';

export default function ResetPassword(props) {
  const [newPassword, setNewPassword] = useState("");
  const [newPasswordConfirm, setNewPasswordConfirm] = useState("");
  let [error, setError] = useState("");
  
  // Gets email from local storage
  let email = window.localStorage.getItem('passResetEmail');

  function handleSubmit(event) {
    event.preventDefault();
    
    const password = {
      newPassword : newPassword,
      email: email
    }

    fetch(api + "/resetpassword/reset", {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(password)
    }).then(response => {
      response.json().then((data) => {
        if(data["error"]){
          setError(data["message"])
        }
        else{
        console.log("data!")
        console.log(data);
        props.history.push('/login');
      }
    });
    })
  }
    
  return (
    <div className="flex items-center justify-center w-full  h-full md:mt-0 mt-6 ">
      <div className="w-full max-w-md">
        <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <label className="block font-bold font-sans-pro text-grey-700 text-2xl rounded font-bold md:text-center mb-1 md:mb-6 pr-4" for="inline-full-name">Choose a new password</label>
          {/*  NEW PASSWORD  */}
          <div className="md:flex md:items-center mb-8">
            <div className="md:w-1/3">
              <label className="block font-bold font-sans-pro text-grey-darker text-xl rounded font-bold md:text-left mb-1 md:mb-0 pr-4" for="inline-full-name">New Password:</label>
            </div>
            <div className="md:w-2/3">
              < input className="shadow appearance-none rounded w-full py-3 px-4 text-xl font-sans-pro font-bold text-gray-700 leading-tight"
                id="newpassword"
                type="password"
                onChange={e => setNewPassword(e.target.value)}
                value={newPassword}
                placeholder="************"
                required/>
            </div>
          </div>
          
          {/*  CONFIRM NEW PASSWORD  */}
          <div className="md:flex md:items-center mb-8">
            <div className="md:w-1/3">
              <label className="block font-bold font-sans-pro text-grey-darker text-xl rounded font-bold md:text-left mb-1 md:mb-0 pr-4" for="inline-full-name">Confirm:</label>
            </div>
            <div className="md:w-2/3">
              < input className="shadow appearance-none rounded w-full py-3 px-4 text-xl font-sans-pro font-bold text-gray-700 leading-tight"
                id="newpasswordconfirm"
                type="password"
                onChange={e => setNewPasswordConfirm(e.target.value)}
                value={newPasswordConfirm}
                placeholder="************"
                required/>
            </div>
          </div>
          <div className="h-4">
            {error.length !== 0 &&

            <p className="text-red-400">{error}</p>
            }
          </div>
          {/*  BUTTONS  */}
          <div className="flex items-center justify-between mt-8">
            <button className="bg-bookie-grey hover:bg-red text-white text-xl font-bold py-2 px-4 rounded"
              type="button"
              onClick={handleSubmit}>
              Send
              </button>
            <a className="inline-block align-baseline font-bold text-md text-blue-500 hover:text-blue-800" href="/login">
              Remembered?
              </a>
          </div>
        </form>
      </div>
    </div>
  )
}