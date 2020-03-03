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
  

  function checkInvalidForms(){
    if(firstname == ""){
      setError("Please enter a first name.")
      return true
    }else if(surname == ""){
      setError("Please enter a last name.")
      return true
    } else if(schoolid == ""){
      setError("Please enter a school id")
      return true
    } else if(email == ""){
      setError("Please enter an email.")
      return true
    }else if(password != confirmpassword || password == ""){
      setError("Passwords do not match or are missing.")
      return true
    }
    return false
  }

  function handleSubmit(event) {
    setError("");
    event.preventDefault();
    
    // Checks forms for valid input
    if(checkInvalidForms())
      return

    const user = {
      email : email,
      firstname: firstname,
      surname: surname,
      schoolid: schoolid,
      password: password,
      
    }

    console.log("User being created:")
    console.log(JSON.stringify(user))

    
    
    // CHECKS KEYS
    fetch(api + "/signup/checkkeys", {
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
          console.log("Stringified: == " + JSON.stringify(info))
          // INSERTS USER IF KEYS ARE UNIQUE
          fetch(api + "/signup/insert", {
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
              }else{
               
                console.log(info);
                console.log("Stringified: == " + JSON.stringify(info))
                
                // GETS IDUSER
                fetch(api + "/signup/getiduser", {
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
                    }else{
                      window.localStorage.setItem('id', info.iduser);
                      window.localStorage.setItem('user', info.firstname);
                      window.localStorage.setItem('loggedIn', true);
                      props.history.push('/');
                    }
                  })
              })
            }})
          })
        }
      });
    })
  }
	
  return (
      <div className="flex items-center justify-center w-full h-full overflow-y-auto py-10">
        <div className="w-full h-full max-w-md">
        
          <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"> 
            <label className="md:block hidden font-bold font-sans-pro text-grey-700 text-2xl rounded font-bold md:text-center mb-1 md:mb-8 pr-4" for="inline-full-name">Sign up</label>
            {/* FIRST NAME */}
            <div className="md:flex md:items-center mb-6">
              <div className="md:w-1/3">
                <label className="md:block hidden font-bold font-sans-pro text-grey-darker text-xl rounded font-bold md:text-left mb-1 md:mb-0 pr-4" for="inline-full-name">First Name</label>
              </div>
              <div className="md:w-2/3">
                < input className="shadow border border-blue-new appearance-none rounded w-full py-3 px-4 text-xl font-sans-pro font-bold text-gray-700 leading-tight" 
                        id="firstname" 
                        type="text" 
                        onChange={e => setFirstName(e.target.value)}
                        value={firstname}
                        required
                        placeholder="First Name"/>
              </div>
            </div>

            {/* SUR NAME */}
            <div className="md:flex md:items-center mb-6">
              <div className="md:w-1/3">
                <label className="md:block hidden font-bold font-sans-pro text-grey-darker text-xl rounded font-bold md:text-left mb-1 md:mb-0 pr-4" for="inline-full-name">Last Name</label>
              </div>
              <div className="md:w-2/3">
                < input className="shadow border border-blue-new appearance-none rounded w-full py-3 px-4 text-xl font-sans-pro font-bold text-gray-700 leading-tight" 
                        id="username" 
                        type="text"
                        onChange={e => setSurName(e.target.value)}
                        value={surname}
                        required
                        placeholder="Last Name"/>
              </div>
            </div>

            {/* EMAIl */}
            <div className="md:flex md:items-center mb-6">
              <div className="md:w-1/3">
                <label className="md:block hidden font-bold font-sans-pro text-grey-darker text-xl rounded font-bold md:text-left mb-1 md:mb-0 pr-4" for="inline-full-name">Email</label>
              </div>
              <div className="md:w-2/3">
                < input className="shadow border border-blue-new appearance-none rounded w-full py-3 px-4 text-xl font-sans-pro font-bold text-gray-700 leading-tight" 
                        id="username" 
                        type="text"
                        onChange={e => setEmail(e.target.value)}
                        value={email} 
                        required
                        placeholder="Email"/>
              </div>
            </div>
            {/* SCHOOL ID */}

            <div className="md:flex md:items-center mb-6">
              <div className="md:w-1/3">
                <label className="md:block hidden font-bold font-sans-pro text-grey-darker text-xl rounded font-bold md:text-left mb-1 md:mb-0 pr-4" for="inline-full-name">School ID</label>
              </div>
              <div className="md:w-2/3">
                < input className="shadow border border-blue-new appearance-none rounded w-full py-3 px-4 text-xl font-sans-pro font-bold text-gray-700 leading-tight" 
                        id="schoolid" 
                        type="text"
                        onChange={e => setSchoolId(e.target.value)}
                        value={schoolid} 
                        required
                        placeholder="Enter School ID"/>
              </div>
            </div>

            {/* PASSWORD */}
            <div className="md:flex md:items-center mb-6">
              <div className="md:w-1/3">
                <label className="md:block hidden font-bold font-sans-pro text-grey-darker text-xl rounded font-bold md:text-left mb-1 md:mb-0 pr-4" for="inline-full-name">Password</label>
              </div>
              <div className="md:w-2/3">
                < input className="shadow border border-blue-new appearance-none rounded w-full py-3 px-4 text-xl text-gray-700 font-sans-pro font-bold leading-tight " 
                        id="password" 
                        type="password"
                        onChange={e => setPassword(e.target.value)}
                        value={password}
                        required
                        placeholder="Enter Password"/>
              </div>
            </div>

            {/* CONFIRM PASSWORD */}
            <div className="md:flex md:items-center mb-6">
              <div className="md:w-1/3">
                <label className="md:block hidden font-bold font-sans-pro text-grey-darker text-xl rounded font-bold md:text-left mb-1 md:mb-0 pr-4" for="inline-full-name">Confirm Password</label>
              </div>
              <div className="md:w-2/3">
                < input className="shadow border border-blue-new appearance-none rounded w-full py-3 px-4 text-gray-700 text-xl font-sans-pro font-bold leading-tight " 
                        id="confirmpassword" 
                        type="password" 
                        onChange={e => setConfirmPassword(e.target.value)}
                        value={confirmpassword}
                        required
                        placeholder="Re-Enter Password"/>
              </div>
            </div>
            <div className="h-4 w-full text-center">
            {error.length !== 0 &&
              <p className="text-red-400 font-bold">{error}</p>
            }
                        </div>

            {/* BUTTONS */}
            <div className="flex items-center justify-between mt-6">
              <button className="bg-bookie-grey hover:bg-bookie-grey-light w-full h-10 hover:bg-red text-white text-xl font-bold py-2 px-4 rounded" 
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