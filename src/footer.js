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
    top: '20px'
  },
  bmCrossButton: {
    height: '24px',
    width: '24px'
  },
  bmCross: {
    background: '#bdc3c7'
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
      token:false,
      menuOpen:false,
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
      "Messages",
      "Posts",
      "Logout"
    ];
    options.map(item =>
      oList.push(
        <p
          key={item}
          className="h-10 text-2xl p-1 hover:bg-gray-200 w-full"
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
      !this.state.token &&
      <div className="h-full w-1/3 md:hidden absolute pt-16">
      <Menu styles={burgerStuff} width={ '40%' } right slide disableAutoFocus className="z-40 bg-white border-l-2 items-center h-full text-center font-bold justify-center text-bold txt-xl w-full right-0 font-sans-pro">
        <div className="cursor-pointer mt-8">
        <div className="h-10 text-2xl p-1 w-full">
            Menu
        </div>
        <div className="justify-center flex ">
          <hr className="w-1/3 border-b border-blue-new"/>
          </div>
        <div className="h-10 text-2xl p-1 hover:bg-gray-200 w-full">
            Profile
        </div>
        <div className="h-10 text-2xl p-1 hover:bg-gray-200 w-full">
            Messages
        </div>
        <div className="h-10 text-2xl p-1 hover:bg-gray-200 w-full">
            Posts
        </div>
        <div className="h-10 text-2xl p-1 hover:bg-gray-200 w-full">
            Logout
        </div>
        </div>
      </Menu>
    </div>
    
  );
  }
}

export default withRouter(Footer);