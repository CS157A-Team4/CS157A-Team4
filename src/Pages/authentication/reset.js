import React, { useState } from "react";
import api from '../../backend/backend';

export default function Reset(props) {
  const [email, setEmail] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    
    const user = {
      email : email,
    }

    // fetch(api + "/login/forgot", {

    //   method: "POST",
    //   headers: {
    //     'Accept': 'application/json',
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify(user)
    // }).then(response => {
    //   response.json().then((data) => {
    //     console.log("data!")
    //     console.log(data);

    //   });
    // })
    
  }
    
  return (
    <div className="flex items-center justify-center w-full  h-full md:mt-20 mt-6 ">
      <div className="w-full max-w-md">
        <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <label className="block font-bold font-sans-pro text-grey-700 text-2xl rounded font-bold md:text-center mb-1 md:mb-6 pr-4" for="inline-full-name">Enter code</label>
          <label className="block font-sans-pro text-grey-darker text-l rounded md:text-left mb-1 md:mb-6 pr-4" for="inline-full-name">Enter the code emailed to you to reset your password.</label>
          <div className="md:flex md:items-center mb-8">
            <div className="md:w-1/3">
              <label className="block font-bold font-sans-pro text-grey-darker text-xl rounded font-bold md:text-left mb-1 md:mb-0 pr-4" for="inline-full-name">Username</label>
            </div>
            {/*  EMAIL  */}
            <div className="md:w-2/3">
              < input className="shadow appearance-none rounded w-full py-3 px-4 text-xl font-sans-pro font-bold text-gray-700 leading-tight"
                id="email"
                type="email"
                onChange={e => setEmail(e.target.value)}
                value={email}
                placeholder="email" />
            </div>
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