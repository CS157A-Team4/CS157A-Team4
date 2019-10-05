import React from "react";
import { withRouter } from "react-router-dom";
import logo from './images/textbookicon.png';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bookname:'',
      course:'',
      token:false,
    };
    this.storageUpdated = this.storageUpdated.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  storageUpdated() {
    if (window.localStorage.getItem("token") !== this.state.token) {
      this.setState({
        token: window.localStorage.getItem("token"),
        user: JSON.parse(window.localStorage.getItem("currentUser"))
      });
    }
  }

  redirect(page) {
    if (page === "logout") {
      this.setState({ token: undefined });
      window.localStorage.removeItem("token");
      window.location.reload();
    } else {
      this.props.history.push(`/${page}`);
    }
  }

  handleChange(event) {
    this.setState({
      [event.target.id]: event.target.value
    });
  }
  handleSubmit(event) {
    event.preventDefault();
    console.log(this.state.course);
    console.log(this.state.bookname);
  }
  createOptions = () => {
    let oList = [];
    const options = [
      "Profile",
      "Friends",
      "Posts",
      "Logout"
    ];
    options.map(item =>
      oList.push(
        <p
          key={item}
          className="font-sans-pro text-2xl font-bold py-2 mr-2 ml-2 cursor-pointer hover:text-gray-600"
          onClick={() => this.redirect(item.replace(/\s/g, "").toLowerCase())}
        >
          {item}
        </p>
      )
    );
    return oList;
  };
  
  search() {
    const bname = this.state.bookname;
    const course = this.state.course;
    if(bname || course) {
     this.props.history.push(`/search?bname=${bname}&course=${course}`);
    } else {
      alert("Please fill at least the book name or course id.")
    }
  }

  render() {
    this.storageUpdated();
    return (
      <div className="z-50 md:h-20 h-16 w-full bg-white border-b-2 flex items-center fixed">
        <img
          src={logo}
          className="ml-8 md:w-14 md:h-14 h-4/5 cursor-pointer"
          alt="logo"
          onClick={() => this.redirect("")}
        />
        <p
          className="ml-3 md:mr-16 hover:text-gray-600 font-web text-xl font-bold leading-none cursor-pointer"
          onClick={() => this.redirect("")}
        >
          SJSU
          <br />
          Bookie
        </p>
        {window.innerWidth > 768 &&
        <div className="flex flex-auto">
        <input
        className="md:text-xl md:w-auto md:h-14 shadow font-sans-pro text-grey-darker font-bold rounded text-center focus:shadow-inner"
         placeholder="Search by Name"
         id="bookname"
         type="text"
         value={this.state.bookname}
         onChange={this.handleChange}
       />
     <div className ="md:ml-4 md:mr-4 md:pt-4 text-2xl leading-none font-sans-pro font-bold" >OR</div>

       <input
       className="overflow-auto p-4 md:text-xl md:w-auto md:h-14 shadow  font-sans-pro text-grey-darker rounded font-bold text-center focus:shadow-inner"
         placeholder="Search by Course"
         id ="course"
         value={this.state.course}
         type="text"
         onChange={this.handleChange}
       />
     <div className="ml-4">
     <div className=" bg-blue-new hover:bg-teal-600 h-14 text-2xl w-full  text-white font-bold font-sans-pro py-2 px-4 rounded cursor-pointer" onClick={(e) => this.search(e)} value="Search">Search</div>
     </div>
     </div>
    }

        {!this.state.token ? (
          <div 
            className="flex mr-8 ml-auto"
          >
            <div className="font-sans-pro text-2xl font-bold py-2 md:mr-4 md:cursor-default cursor-pointer">
              Yu
            </div>
            <div className="ml-4 divider hidden md:flex"/>
            <div class="bg-blue-new w-px h-full  ml-4 "/>
            {
              <div className="hidden md:flex">
                {this.createOptions()}
              </div>
            }
          </div>
        ) : (
          <div className="mr-8 ml-auto md:flex">
            <button
              className="mr-4 bg-blue-new  rounded p-2 text-white font-sans-pro text-2xl font-bold"
              onClick={() => this.redirect("signup")}
            >
              Sign up
            </button>
            <button
              className="font-sans-pro text-2xl font-bold"
              onClick={() => this.redirect("login")}
            >
              Log in
            </button>
          </div>
        )}
      </div>
    );
  }
}

export default withRouter(Header);