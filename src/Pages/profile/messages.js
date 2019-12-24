import React from 'react';
import logo from '../../logo.svg';
import Column from "../../column";
import api from '../../backend/backend';
class Message extends React.Component {	
    constructor(props) {
        super(props);
        this.state = {
            m :[],
            loaded:false // do not reload page
        };
        this.handleChange = this.handleChange.bind(this);
      }

    UNSAFE_componentWillMount() { // call before render

        if(window.localStorage.getItem("id") === null){
            this.props.history.push('/login');  
        
        }
        this.show_message()
    }

    show_message() {
        console.log("test show messages!!!");
        console.log(this.props.match.params);
        let receiver = this.props.match.params.id;
        let sender = window.localStorage.getItem("id");
        let users = {
            receiver: receiver,
            sender: sender,
        };
        console.log(users)
        fetch (api+'/messages/getMessages', {
            method:"POST",
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(users)
        }).then(results => {
            return results.json()
        }).then(data=>{
            if (data["error"]) {
                alert(data["message"]);
            }
            else{
                console.log(data);
                this.setState(
                    {m: data["message"],
                        loaded : true
                });
                this.scrollToBottom()

                // refresh the page

            }
        })
    }

    goTo(event) {
        const value = event.target.value;
        this.props.history.push(`/${value}`);
      }

    loadMessages(){
        let messages = [];

        for(let x in this.state.m){
            let bg = this.state.m[x].sender.toString() === window.localStorage.getItem("id")? "bg-white" : "bg-blue-new-light";
            bg+= " leading-snug py-2 px-2 border border-solid mt-1 rounded"
            messages.push(
                <div ref={(ref) => this.newMessage = ref}  id={this.state.m[x].messageID} class={bg}>
                    <div className="justify-between flex font-bold">
                        <p>{this.state.m[x].firstname} {this.state.m[x].surname}</p>
                        <p>{this.state.m[x].date.split("T")[0]}</p>
                    </div>
                    <p>{this.state.m[x].content}</p>
                </div>
            )
        }
        return messages;
    }
    handleChange(event) {
        this.setState({
            [event.target.id]: event.target.value
        });
    }

    onEnterPress = (e) => {
        if(e.keyCode == 13 && e.shiftKey == false) {
            e.preventDefault();
            let message = this.state.newMessage;
            let sender = window.localStorage.getItem("id");
            let receiver = this.props.match.params.id;
            if(this.state.newMessage == ''){
                window.alert("No Messages found");
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

            let newMessageContent = {
                "content": message,
                "sender":sender,
                "receiver":receiver,
                "date":today
            }
            fetch(api+"/messages/send", {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newMessageContent)
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
                    console.log(data);
                    this.setState({m:data["message"],newMessage:''});
                    var notes = this.refs.aMessage;
                    notes.value = ""; // Unset the value
                    this.newMessage.scrollIntoView({ behavior: "auto" });
                }
            }.bind(this));
        }
    }
    scrollToBottom = () => {
        if(this.newMessage !== undefined && this.newMessage !== null){
            this.newMessage.scrollIntoView({ behavior: "auto" });
        }
        window.scrollTo(0, 0)
    }
	render() {
    	return (
            <div className="flex w-full h-full">
                <Column/>
                {this.state.loaded ? (
                <div className="w-full relative font-sans-pro rounded shadow-lg bg-blue-new py-2 ">
                    {/*<p className="text-2xl font-bold text-center font-sans-pro mb-2 border-b border-solid border-gray-300">Comments</p>*/}
                    <div className="px-4  overflow-auto pb-10 scrolling-touch md:scrolling-auto">
                        {this.loadMessages()}
                    </div>
                    <form className="w-full md:block flex flex-row" ref={el => this.myFormRef = el} >
                           
                    </form>
                    <div class="flex flex-row bg-gray-200">
                    <textarea ref="aMessage" name="body" onChange={this.handleChange} id="newMessage" value={this.props.newMessage} onKeyDown={this.onEnterPress} placeholder="Add a comment" className="appearance-none md:w-full w-3/4 bg-gray-100 bottom-0 absolute rounded-full border h-10 px-2 pt-3 text-lg">
                            </textarea>  
                            <button 
                            className="md:hidden appearance-none w-1/4 bg-gray-100 bottom-0 right-0 absolute 
                            border h-10 items-center text-center font-bold text-lg hover:bg-gray-400"
                            onClick={() => this.show_message()}
                            >Refresh</button>
                    </div>
                </div>
                ):(
                    <div className="w-full relative font-sans-pro rounded shadow-lg bg-blue-new py-2 ">
                    </div>
                    )
                }
            </div>
		)	
	}
}

export default Message;
