import React from 'react';
import logo from './logo.svg';
import './App.css';
import { withRouter } from 'react-router-dom';
import { thisExpression } from '@babel/types';
import api from './backend/backend';
import { slide as Menu } from "react-burger-menu";
import background from './images/background1.png';
class App extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
          firstname: '',
          lastname: '',
          email: '',
          password: '',
          secondpassword: '',
          bookname:'',
          course:'',
      };
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
  }
  goTo(event) {
    this.props.history.push(`/createPost`);
  }
  componentWillMount(){
    
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
  render() {return (
    <div className="App bg-white">
        <div className="w-full overflow-hidden text-center flex justify-center font-sans-pro  md:text-xl font-bold">
        <img src={background} className="h-160 w-full light-filter z-0 object-cover"></img>
       
          <div className="absolute mt-48 z-10 w-full flex flex-wrap justify-center">
          <div class=" flex w-1/2 flex-row flex-wrap justify-center">
            <input type="text" value={this.state.course} onChange={this.handleChange} id="course" class=" text-gray-600  h-14 w-2/3  p-2 px-4 font-bold  rounded-l-lg" placeholder="Search by Course Name (CS157A)"/>
            <button class=" p-2  w-1/3 h-14  bg-blue-new rounded-r-lg  font-bold text-white hover:bg-teal-600" onClick={(e) => this.search(e)} type="button">Search by Course</button>
          </div>

        </div>
        <div className="absolute mt-64 z-10 w-full flex flex-wrap justify-center items-center">
          <div class=" flex w-1/2 mt-4 flex-row flex-wrap justify-center items-center ">
          <div onClick={(e) => this.goTo(e)}className="md:w-3/4 w-full flex justify-center items-center bg-white hover:text-white text-gray-600 hover:bg-blue-new hover:shadow-lg mt-4 h-20 z-10 cursor-pointer rounded items-center pt-1 border-blue-new border-2">
              <p className="items-center text-xl md:text-3xl font-bold">Click here to sell your Book!!</p>
          </div>
</div>

        </div>

      </div>
      </div>
  );
}
}
export default withRouter(App);
