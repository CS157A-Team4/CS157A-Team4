import React from 'react';
import logo from '../../images/curious_cat.png';
import aBook from '../../images/testbook.png';
import bBook from '../../images/anotherbook.png';
import api from '../../backend/backend';
import queryString from 'query-string';
import Infinite from 'react-infinite';
class Search extends React.Component {	
    constructor(props) {
        super(props);
      
      this.state = {
        bookname:'',
        course:'',
        token:false,
        loaded:false,
        message:[],
      };
      this.storageUpdated = this.storageUpdated.bind(this);
      this.handleChange = this.handleChange.bind(this);
    }
    UNSAFE_componentWillMount() {
      this.getParams();
      }
      getParams(){
        let values = this.props.match.params.id;      
        fetch(api+"/posts/" +values)
          .then(function (response) {
            console.log("hi");
              return response.json();
          })
          .then(function (data) {
              if (data["error"]) {
                  this.setState({
                      error: data["message"]
                  });
                  console.log(data);
              }
              else {
                console.log(data);
                  this.setState({message:data[0]});
                  this.setState({loaded:true});
                  console.log(this.state);
              }
      
          }.bind(this))
        }
          
      
    storageUpdated() {
      if (window.localStorage.getItem("token") !== this.state.token) {
        this.setState({
          token: window.localStorage.getItem("token"),
          user: JSON.parse(window.localStorage.getItem("currentUser"))
        });
      }
    }
  
    handleChange(event) {
      this.setState({
        [event.target.id]: event.target.value
      });
    }
    goTo(event) {
        const value = event.target.value;
        this.props.history.push(`/${value}`);
      } 
	render() {
    	return (
            this.state.loaded  == true &&(
                <div className="md:flex md:justify-start px-6 md:px-0">
                <div className='md:max-w-xl max-h-full text-center md:w-3/4 border-solid'>
                    <div className="border-solid w-3/4 md:w-3/5 h-auto bg-white inline-block border-4 mt-8 rounded"style={{border:"6px solid white"}}>
                        <div className="border-solid border-4" style={{border:"6px solid #C2E1E5"}}>
                <img className= "" style={{border:"6px solid white"}} alt="postImage" src={this.state.message.image !== null? this.state.message.image:logo} />
                </div>
                </div>
                </div>
                <div className= "md:w-1/4 w-full h-auto border-gray-300 mt-8 pr-6 pl-6 pb-6 pt-6 md:pt-0 md:pb-2 md:pr-2 md:pl-2 md:pt-2 bg-blue-new-light rounded mb-4 md:mb-0"> 
                    <div className="font-sans-pro  bg-white px-2 py-2 rounded mb-2 "> 
                        <p className="inline-block text-xl font-bold ">Title : </p> 
                        <p className="inline-block text-2xl ml-1 "> {this.state.message.book}  </p> 
                    </div>
                    <div className="font-sans-pro bg-white px-2 py-2 rounded mb-2 "> 
                        <p className="inline-block text-xl font-bold ">Author : </p> 
                        <p className="inline-block text-2xl ml-1 "> {this.state.message.author}  </p> 
                    </div>
                    <div className="font-sans-pro  bg-white px-2 py-2 rounded mb-2 "> 
                        <p className="inline-block text-xl font-bold ">Posted by : </p> 
                        <p className="inline-block text-2xl ml-1 "> {this.state.message.firstname + " " + this.state.message.surname}  </p> 
                    </div>
                    <div className="font-sans-pro  bg-white px-2 py-2 rounded mb-2 "> 
                        <p className="inline-block text-xl font-bold ">Posted on : </p> 
                        <p className="inline-block text-2xl ml-1 "> {this.state.message.date.split('T')[0]}  </p> 
                    </div>
                    <div className="font-sans-pro bg-white px-2 py-2 rounded mb-2 "> 
                        <p className="inline-block text-xl font-bold ">Course : </p> 
                        <p className="inline-block text-2xl ml-1 "> {this.state.message.course}  </p> 
                    </div>
                    <div className="font-sans-pro bg-white px-2 py-2 rounded mb-2 "> 
                        <p className="inline-block  text-xl font-bold "> Condition: </p> 
                        <p className="inline-block text-2xl ml-1 "> {this.state.message.condition}  </p> 
                    </div>
                    <div className="font-sans-pro h-auto overflow-hidden bg-white px-2 py-2 rounded mb-2 "> 
                        <div className="font-bold text-xl mb-2"> Description: </div> 
                        <div className="overflow-y-auto leading-snug overflow-hidden scrolling-touch md:scrolling-auto text-lg h-full">
                        <p className="inline-block h-64 ">{this.state.message.body}</p>

                        </div>
                    </div>
                    <div className="font-sans-pro text-2xl bg-white px-2 py-2 rounded md:mb-0 shadow-lg"> 
                        <p className="inline-block font-bold "> Asking Price: </p> 
                        <p className="inline-block ml-1 "> ${this.state.message.price}  </p> 
                    </div>
                </div> 
                <div className= "md:w-1/4 w-full md:mt-8 pb-2 md:ml-8 md:pb-0 md:pr-0 md:pl-0 rounded-b-full border border-black"> 
                    <div className="font-sans-pro text-2xl mb-6 justify-center rounded text-center"> 
                        <button className="bg-white cursor-pointer hover:bg-gray-300 w-full px-2 py-2 rounded mb-2 shadow-lg">Send Request to Poster</button>
                        <button className="bg-white cursor-pointer hover:bg-gray-300 w-full px-2 py-2 rounded  shadow-lg">Save Post for Later</button>
                    </div>
                    <div className="w-full relative font-sans-pro rounded shadow-lg bg-white py-2 ">
                        <p className="text-2xl font-bold text-center font-sans-pro mb-2 border-b border-solid border-gray-300">Comments</p>
                        <div className="px-4 h-128 overflow-auto pb-10 scrolling-touch md:scrolling-auto">
                            <div class="bg-transparent leading-snug py-2 px-2 border border-solid rounded  ">
                                <div className="justify-between flex font-bold">
                                <p>Jonathan Van</p>
                                <p>2019-10-07</p>
                                </div>
                                <p>Hi I really like this book. Is it still available? </p>
                            </div>
                            <div class="bg-blue-new-light mt-1 leading-snug py-2 px-2 border border-solid rounded">
                                <div className="justify-between flex font-bold">
                                <p>Yu Xiu</p>
                                <p>2019-10-08</p>
                                </div>
                                <p>Yes! If you want it. Please send a message request to me. We will arrange details after. </p>
                            </div>
                            <div class="bg-transparent leading-snug py-2 px-2 border border-solid mt-1 rounded">
                                <div className="justify-between flex font-bold">
                                <p>Jonathan Van</p>
                                <p>2019-10-09</p>
                                </div>
                                <p>I do not know how to send a request can I message you here instead? </p>
                            </div>
                            <div class="bg-blue-new-light mt-1 leading-snug py-2 px-2 border border-solid rounded">
                                <div className="justify-between flex font-bold">
                                <p>Yu Xiu</p>
                                <p>2019-10-10</p>
                                </div>
                                <p>That is not safe. Everyone can see our conversation and intercept it.</p>
                            </div>
                            <div class="bg-transparent leading-snug py-2 px-2 border border-solid mt-1 rounded">
                                <div className="justify-between flex font-bold">
                                <p>Cole McKinnon</p>
                                <p>2019-10-11</p>
                                </div>
                                <p>Hi guys! I read your conversation and will know where you guys are meeting :). </p>
                            </div>
                            <div class="bg-blue-new-light leading-snug py-2 px-2 border border-solid mt-1 rounded">
                                <div className="justify-between flex font-bold">
                                <p>Cole McKinnon</p>
                                <p>2019-10-11</p>
                                </div>
                                <p>PS can I have the book too? </p>
                            </div>
                            <div class="bg-transparent leading-snug py-2 px-2 border border-solid mt-1 rounded">
                                <div className="justify-between flex font-bold">
                                <p>Jonathan Van</p>
                                <p>2019-10-12</p>
                                </div>
                                <p>Wait please don't do that LOL.</p>
                            </div>
                        </div>
                        <textarea name="body" placeholder="Add a comment" className="appearance-none w-full bg-gray-100 bottom-0 absolute rounded-full border  h-10 px-2 pt-3 text-lg"></textarea>
                    </div>
                    
                </div>



            </div>)
		)	
	}
}

export default Search;
