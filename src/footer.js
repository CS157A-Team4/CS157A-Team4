import React from "react";
import { withRouter } from "react-router-dom";
import { slide as Menu } from "react-burger-menu";

var style = {
  backgroundColor: "#F8F8F8",
  borderTop: "1px solid #E7E7E7",
  textAlign: "center",
  padding: "20px",
  position: "fixed",
  left: "0",
  bottom: "0",
  height: "60px",
  width: "100%",
}
var burgerStuff = {
  bmBurgerButton: {
    position: 'fixed',
    width: '36px',
    height: '30px',
    right: '36px',
    top: '17px'
  },
  bmCrossButton: {
    height: '24px',
    width: '24px'
  },
  bmCross: {
    background: '#bdc3c7'
  },
  bmBurgerBars: {
    borderRadius: '25px',
    background: '#88C5CC'
  },
}
var phantom = {
display: 'block',
height: '64px',
width: '100%',
}
class Footer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bookname:'',
      course:'',
      id:'',
      user:'',
      menuOpen:false,
    };
    this.storageUpdated = this.storageUpdated.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  storageUpdated() {
    console.log(window.localStorage);
    if (window.localStorage.getItem("id") !== this.state.id) {
      this.setState({
        id: window.localStorage.getItem("id"),
        user: window.localStorage.getItem("user")
      });
    }
  }

  redirect(page) {
    this.closeMenu();
    if (page === "logout") {
      this.setState({ token: undefined, user:undefined });
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
    const options = this.state.id?
    [
      "Profile",
      "Create Post",
      "Search",
      "Logout",
      
    ]
    :
    [
      "Login",
      "Sign Up"
    ];
    options.map(item =>
      oList.push(
        <p
          key={item}
          className="h-10 text-2xl p-1 hover:bg-gray-200 w-full cursor-pointer"
          onClick={() => this.redirect(item.replace(/\s/g, "").toLowerCase())}
        >
          {item}
        </p>
      )
      
    );
    return oList;
  };
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
  }
  render() {
    this.storageUpdated();
    return (
      
      <div className="h-full w-1/3 md:hidden static">
      <Menu styles={burgerStuff} isOpen={this.state.menuOpen} onStateChange={(state) => this.handleStateChange(state)} width={ '40%' } right slide disableAutoFocus className="z-40 bg-white border-l-2 items-center h-full text-center font-bold justify-center text-bold txt-xl w-full right-0 font-sans-pro">
        <div className="mt-8">
        <div className="text-2xl p-1 w-full">
        {this.state.id ? window.localStorage.getItem("user"):"Hello"}
        </div>
        <div className="justify-center flex ">
          <hr className="w-1/3 border border-blue-new mb-2"/>
          </div>
        {this.createOptions()}
        </div>
      </Menu>
    </div>
    
  );
  }
}

export default withRouter(Footer);