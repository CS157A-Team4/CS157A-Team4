import React from "react";
import { withRouter } from "react-router-dom";

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
          className="font-sans-pro md:text-2xl text-xl font-bold mr-2 ml-2 cursor-pointer"
          onClick={() => this.redirect(item.replace(/\s/g, "").toLowerCase())}
        >
          {item}
        </p>
      )
      
    );
    return oList;
  };
  render() {
    this.storageUpdated();
    return (
      !this.state.token &&
      <div className="md:hidden">
          <div style={phantom}></div>
          <div className="flex justify justify-between items-center h-full" style={style}>{this.createOptions()}
          </div>
      </div>
    
  );
  }
}

export default withRouter(Footer);