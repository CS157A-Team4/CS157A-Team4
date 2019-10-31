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
        comments:[],
        newComment:'',
        saved: false,
        error: null
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
                  this.setState({message:data[0][0],comments:data[1]});
                  this.setState({loaded:true});
                  if(data[2].some(e => e.userID == 23)){
                      this.setState({saved:true});
                  }
                  console.log(this.state);
                  this.scrollToBottom();
                  
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
    loadComments(){
        let comments = [];
        for(let x in this.state.comments){
            let bg = x % 2 == 0? "bg-transparent" : "bg-blue-new-light";
            bg+= " leading-snug py-2 px-2 border border-solid mt-1 rounded"
            comments.push(
            <div ref={(ref) => this.newData = ref}  id={this.state.comments[x].idcomments} class={bg}>
            <div className="justify-between flex font-bold">
            <p>{this.state.comments[x].firstname} {this.state.comments[x].surname}</p>
            <p>{this.state.comments[x].when.split("T")[0]}</p>
            </div>
            <p>{this.state.comments[x].content}</p>
        </div>
        )
        }
        return comments;
    }
    handleChange(event) {
      this.setState({
        [event.target.id]: event.target.value
      });
    }
    onEnterPress = (e) => {
        if(e.keyCode == 13 && e.shiftKey == false) {
          e.preventDefault();
          let comment = this.state.newComment
          let commentor = 23;
          let postId = this.props.match.params.id;
          if(this.state.newComment == ''){
                window.alert("No Comment found");            
            return;
        }
            var today = new Date();
            var dd = today.getDate();

            var mm = today.getMonth()+1; 
            var yyyy = today.getFullYear();
            if(dd<10) 
            {
                dd='0'+dd;
            } 

            if(mm<10) 
            {
                mm='0'+mm;
            } 
            today = +yyyy+'-'+mm+'-'+dd;
            console.log(today, comment,commentor,postId);
            let newCommentContent = { 
                "content":comment,
                "commentor":commentor,
                "postid":postId,
                "when":today 
            }
            fetch(api + "/posts/createComment", {
                method: "POST",
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(newCommentContent)
              }).then(function (response) {
                return response.json();
              }).then(function (data) {
                if (data["error"]) {
                  this.setState({
                    error: data["message"]
                  });
                  console.log("ERROR");
                }
                else {
                    console.log("Did it");
                    this.setState({comments:data,newComment:''});
                    var notes = this.refs.aComment;
                    notes.value = ""; // Unset the value
                    this.newData.scrollIntoView({ behavior: "auto" });

                }

              }.bind(this));
        }
      }
      scrollToBottom = () => {
          if(this.newData !== undefined && this.newData !== null){
        this.newData.scrollIntoView({ behavior: "auto" });
    }
        window.scrollTo(0, 0)
    }
      componentDidUpdate() {
          if(this.newData !== undefined){
       // this.scrollToBottom();
    }
      }
    goTo(event) {
        const value = event.target.value;
        this.props.history.push(`/${value}`);
      } 
    goEdit(e){
      this.props.history.push(`/editPost/${this.props.match.params.id}`);
    }
    savePost(e){
        let user = 23;
        let postId = this.state.message.postID;
        let type = "favorite";
        let imageId = this.state.message.image;
        let newSave = { 
            "userId":user,
            "postType":type,
            "postId":postId,
            "imageId":imageId 
        }
        fetch(api + "/profile/save", {
            method: "POST",
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(newSave)
          }).then(function (response) {
            return response.json();
          }).then(function (data) {
            if (data["error"]) {
              this.setState({
                error: data["message"]
              });
              console.log("ERROR");
            }
            else {
                console.log("Did it");
                this.setState({saved:true});
            }

          }.bind(this));
    
    }
    unsavePost(e){
        let user = 23;
        let postId = this.state.message.postID;
        let newSave = { 
            "userId":user,
            "postId":postId,
        }
        fetch(api + "/profile/unsave", {
            method: "POST",
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(newSave)
          }).then(function (response) {
            return response.json();
          }).then(function (data) {
            console.log(data);
            if (data["error"]) {
              this.setState({
                error: data["message"]
              });
              console.log("ERROR");
            }
            else {
                console.log("Did it");
                this.setState({saved:false});
            }

          }.bind(this));
    
    }
	render() {
    	return (
            this.state.error !== null ? (
              <div className="md:flex md:items-center md:justify-center px-6 md:px-0">
              <div className='md:max-w-xl max-h-full text-center border-solid text-center pt-16'>
                <p className="text-2xl font-sans-pro text-white font-white font-bold">No Post Information was found, please insure that this post exists. It may or may not have been deleted.</p>
              </div>
              </div>
            )
            :
            this.state.loaded  == true && !this.state.error &&(
                <div className="md:flex md:items-center md:justify-start px-6 md:px-0">
                <div className='md:max-w-xl max-h-full text-center md:w-3/4 border-solid'>
                    <div className="border-solid w-3/4 md:w-3/5 h-auto bg-white inline-block border-4 mt-8 rounded"style={{border:"6px solid white"}}>
                        <div className="border-solid border-4" style={{border:"6px solid #C2E1E5"}}>
                <img className= "" style={{border:"6px solid white"}}  alt="postImage" src={this.state.message.image !== "null" && this.state.message.image !== null && this.state.message.image !== undefined ? this.state.message.image:logo} />
                </div>
                </div>
                </div>
                <div className= "md:w-1/4 w-full h-auto border-gray-300 mt-8 pr-6 pl-6 pb-6 pt-6 md:pt-0 md:pb-2 md:pr-2 md:pl-2 md:pt-2 bg-blue-new-light rounded mb-4 md:mb-0"> 
                    <div className="font-sans-pro  bg-white px-2 py-2 rounded mb-2 "> 
                        <p className="inline-block text-xl font-bold ">Title : </p> 
                        <p className="inline-block text-2xl ml-1 "> {this.state.message.title}  </p> 
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
                {this.state.message.seller !== 23 ?
                    <div className="font-sans-pro text-2xl mb-6 justify-center rounded text-center"> 

                        <button className="bg-white cursor-pointer hover:bg-gray-300 w-full px-2 py-2 rounded mb-2 shadow-lg">Send Request to Poster</button>
                        {this.state.saved !== true?
                        <button onClick={e => this.savePost(e)}className="bg-white cursor-pointer hover:bg-gray-300 w-full px-2 py-2 rounded  shadow-lg">Save Post for Later</button>
                        :
                        <button onClick={e => this.unsavePost(e)}className="bg-white cursor-pointer hover:bg-gray-300 w-full px-2 py-2 rounded  shadow-lg">Removed Post from Saved</button>
                        }
                        </div>
                        :
                    <div className="font-sans-pro text-2xl mb-6 justify-center rounded text-center"> 
                        <button className="bg-white cursor-pointer hover:bg-gray-300 w-full px-2 py-2 rounded mb-2 shadow-lg" onClick={(e) => this.goEdit(e)}>Edit Post</button>
                        <button className="bg-white cursor-pointer hover:bg-gray-300 w-full px-2 py-2 rounded  shadow-lg">Close Post</button>
                       
                        </div>
                    }
                    <div className="w-full relative font-sans-pro rounded shadow-lg bg-white py-2 ">
                        <p className="text-2xl font-bold text-center font-sans-pro mb-2 border-b border-solid border-gray-300">Comments</p>
                        <div className="px-4 h-128 overflow-auto pb-10 scrolling-touch md:scrolling-auto">
                            {this.loadComments()}
                        </div>
                        <form ref={el => this.myFormRef = el} >
                            <textarea ref="aComment" name="body" onChange={this.handleChange} id="newComment" value={this.props.newComment} onKeyDown={this.onEnterPress} placeholder="Add a comment" className="appearance-none w-full bg-gray-100 bottom-0 absolute rounded-full border h-10 px-2 pt-3 text-lg"></textarea>
                        </form>
                    </div>
                    
                </div>



            </div>)
		)	
	}
}

export default Search;
