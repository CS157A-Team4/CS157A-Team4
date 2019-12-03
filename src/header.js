import React from "react";
import { withRouter } from "react-router-dom";
import logo from './images/textbookicon.png';
import queryString from 'query-string';
import { slide as Menu } from "react-burger-menu";
import Footer from "./footer";
class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bookname:'',
      course:'',
      id:null,
      menuOpen:false,
      name: ''
    };


    this.storageUpdated = this.storageUpdated.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.toggleMenu = this.toggleMenu.bind(this);
    
  }
  storageUpdated() {
    console.log(window.localStorage);
      console.log("Got inside");
      if (window.localStorage.getItem("id") !== this.state.id) {
        console.log("writing the state");
        this.setState({
          id: window.localStorage.getItem("id"),
          name: window.localStorage.getItem("user")
        });
      }
    
  }

  

  redirect(page) {
    if (page === "logout") {
     // this.setState({ id: undefined, name:undefined});
      window.localStorage.removeItem("id");
      window.localStorage.removeItem("user");
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
     if(this.props.location.pathname === '/search'){
      window.location.reload();
        }
     
    } else {
      alert("Please fill at least the book name or course id.")
    }
  }
  // This keeps your state in sync with the opening/closing of the menu
  // via the default means, e.g. clicking the X, pressing the ESC key etc.
  handleStateChange (state) {
    this.setState({menuOpen: state.isOpen})  
  }
  
  // This can be used to close the menu, e.g. when a user clicks a menu item
  closeMenu () {
    this.setState({menuOpen: false})
  }

  // This can be used to toggle the menu, e.g. when using a custom icon
  // Tip: You probably want to hide either/both default icons if using a custom icon
  // See https://github.com/negomi/react-burger-menu#custom-icons
  toggleMenu () {
    this.setState(state => ({menuOpen: !state.menuOpen}))
    console.log(this.state.menuOpen);
  }
  render() {
    this.storageUpdated();
  
    return (
      <div className="z-50 md:h-20 h-16 fixed w-full bg-white border-b-2 flex items-center fixed">
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
     <div className=" bg-blue-new hover:bg-teal-600 h-14 text-2xl w-full  text-center text-white font-bold font-sans-pro py-4 px-4 rounded cursor-pointer" onClick={(e) => this.search(e)} value="Search">Search</div>
     </div>
     </div>
    }

        {this.state.id ? (
          <div 
            className="flex mr-8 ml-auto"
          >
            <div>
              <div>
            <div className="font-sans-pro hidden md:flex md:pointer-events-none text-2xl font-bold py-2 md:mr-4 md:cursor-default cursor-pointer">
              {this.state.name}
            </div>
            
            </div>
            </div>

            <div className="ml-4 divider hidden md:flex"/>
            <div  className="bg-blue-new w-px h-full  ml-4 "/>
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