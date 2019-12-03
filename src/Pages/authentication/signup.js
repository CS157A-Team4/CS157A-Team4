import React, {useState} from 'react';
import api from '../../backend/backend';

export default function SignUp(props) {

  const [email, setEmail] = useState("");
  const [schoolid, setSchoolId] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const [firstname, setFirstName] = useState("");
  const [surname, setSurName] = useState("");
  let [error, setError] = useState("");
  function handleSubmit(event) {
    setError("");
    event.preventDefault();
    
    const user = {
      email : email,
      firstname: firstname,
      surname: surname,
      schoolid: schoolid,
      password: password,
      
    }

    console.log("User being created:")
    console.log(JSON.stringify(user))

    fetch(api + "/signup/submit", {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user)
    }).then(response => {
      response.json().then((info) => {
        if(info["error"]){
          setError(info["message"]);
          console.log(info);

        }
        else{
        console.log(info);
        window.localStorage.setItem('id', info.iduser);
        window.localStorage.setItem('user', info.firstname);
        window.localStorage.setItem('loggedIn', true);
        props.history.push('/');
        }
      });
    })
  }
	
  return (
      <div className="flex items-center justify-center w-full h-full">
        <div className="w-full max-w-md">
        
          <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"> 
            <label className="block font-bold font-sans-pro text-grey-700 text-2xl rounded font-bold md:text-center mb-1 md:mb-8 pr-4" for="inline-full-name">Sign up</label>
            {/* FIRST NAME */}
            <div className="md:flex md:items-center mb-8">
              <div className="md:w-1/3">
                <label className="block font-bold font-sans-pro text-grey-darker text-xl rounded font-bold md:text-left mb-1 md:mb-0 pr-4" for="inline-full-name">First Name</label>
              </div>
              <div className="md:w-2/3">
                < input className="shadow appearance-none rounded w-full py-3 px-4 text-xl font-sans-pro font-bold text-gray-700 leading-tight" 
                        id="firstname" 
                        type="text" 
                        onChange={e => setFirstName(e.target.value)}
                        value={firstname}
                        placeholder="First Name"/>
              </div>
            </div>

            {/* SUR NAME */}
            <div className="md:flex md:items-center mb-8">
              <div className="md:w-1/3">
                <label className="block font-bold font-sans-pro text-grey-darker text-xl rounded font-bold md:text-left mb-1 md:mb-0 pr-4" for="inline-full-name">Last Name</label>
              </div>
              <div className="md:w-2/3">
                < input className="shadow appearance-none rounded w-full py-3 px-4 text-xl font-sans-pro font-bold text-gray-700 leading-tight" 
                        id="username" 
                        type="text"
                        onChange={e => setSurName(e.target.value)}
                        value={surname}
                        placeholder="Last Name"/>
              </div>
            </div>

            {/* EMAIl */}
            <div className="md:flex md:items-center mb-8">
              <div className="md:w-1/3">
                <label className="block font-bold font-sans-pro text-grey-darker text-xl rounded font-bold md:text-left mb-1 md:mb-0 pr-4" for="inline-full-name">Email</label>
              </div>
              <div className="md:w-2/3">
                < input className="shadow appearance-none rounded w-full py-3 px-4 text-xl font-sans-pro font-bold text-gray-700 leading-tight" 
                        id="username" 
                        type="text"
                        onChange={e => setEmail(e.target.value)}
                        value={email} 
                        placeholder="Email"/>
              </div>
            </div>
            {/* SCHOOL ID */}

            <div className="md:flex md:items-center mb-8">
              <div className="md:w-1/3">
                <label className="block font-bold font-sans-pro text-grey-darker text-xl rounded font-bold md:text-left mb-1 md:mb-0 pr-4" for="inline-full-name">School ID</label>
              </div>
              <div className="md:w-2/3">
                < input className="shadow appearance-none rounded w-full py-3 px-4 text-xl font-sans-pro font-bold text-gray-700 leading-tight" 
                        id="schoolid" 
                        type="text"
                        onChange={e => setSchoolId(e.target.value)}
                        value={schoolid} 
                        placeholder="123456789"/>
              </div>
            </div>

            {/* PASSWORD */}
            <div className="md:flex md:items-center mb-6">
              <div className="md:w-1/3">
                <label className="block font-bold font-sans-pro text-grey-darker text-xl rounded font-bold md:text-left mb-1 md:mb-0 pr-4" for="inline-full-name">Password</label>
              </div>
              <div className="md:w-2/3">
                < input className="shadow appearance-none rounded w-full py-3 px-4 text-gray-700 font-sans-pro font-bold leading-tight " 
                        id="password" 
                        type="password"
                        onChange={e => setPassword(e.target.value)}
                        value={password}
                        placeholder="******************"/>
              </div>
            </div>

            {/* CONFIRM PASSWORD */}
            <div className="md:flex md:items-center mb-6">
              <div className="md:w-1/3">
                <label className="block font-bold font-sans-pro text-grey-darker text-xl rounded font-bold md:text-left mb-1 md:mb-0 pr-4" for="inline-full-name">Confirm Password</label>
              </div>
              <div className="md:w-2/3">
                < input className="shadow appearance-none rounded w-full py-3 px-4 text-gray-700 font-sans-pro font-bold leading-tight " 
                        id="confirmpassword" 
                        type="password" 
                        onChange={e => setConfirmPassword(e.target.value)}
                        value={confirmpassword}
                        placeholder="******************"/>
              </div>
            </div>
            {error.length !== 0 &&
            <div>
            <p className="text-red-400">{error}</p>
            </div>
            }
            {/* BUTTONS */}
            <div className="flex items-center justify-between mt-8">
              <button className="bg-bookie-grey hover:bg-red text-white text-xl font-bold py-2 px-4 rounded" 
                      type="button"
                      onClick={handleSubmit}>
                Sign Up
              </button>
            </div>
          </form>
        </div>
      </div>
  )	
}