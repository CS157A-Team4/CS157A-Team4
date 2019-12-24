import React from "react";
import { withRouter } from "react-router-dom";

class Column extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            bookname:'',
            course:'',
            token:false,
            menuOpen:false
        };

    }


    goTo(event) {
        const value = event.target.id;
        this.props.history.push(`/profile/${value}`);
    }
    reload() {
        window.location.reload();
    }
    render() {

        console.log(this.props.match.url)
        return (
            <div className="w-1/5 flex flex-col bg-white h-full md:block hidden">
                <div className="w-0 md:w-full lg:w-full h-0 md:h-full overflow-y-hidden bg-white shadow-lg">
                    <div className="p-5 bg-white sticky flex justify-center items-center  bg-gray-200">
                        <p className="border-t p-3  w-full text-center text-xl text-white round-full bg-blue-new
                    font-sans-pro font-bold">
                            Your Profile</p>
                    </div>

                    <div>
                        <button id="posts" onClick={e=>this.goTo(e)} className="hover:bg-gray-400 bg-gray-200 border-t-2 p-4 w-full text-xl text-left
                    text-gray-700 font-sans-pro font-bold text-justify">Posts</button>
                        <button id="friends" onClick={e=>this.goTo(e)}className="hover:bg-gray-400 bg-gray-200 border-t-2 p-4 w-full text-xl text-left
                    text-gray-700 font-sans-pro font-bold text-justify"
                        >Friends</button>
                        <button id="friendsR" onClick={e=>this.goTo(e)}className="hover:bg-gray-400 bg-gray-200 border-t-2 p-4 w-full text-xl text-left
                    text-gray-700 font-sans-pro font-bold text-justify"
                        >Friends Request</button>
                        {
                            this.props.match.url.includes("message") &&
                            <button id="settings" onClick={this.reload} className="hover:bg-gray-400 bg-blue-new border-t-2 p-4 w-full text-xl text-left
                    font-sans-pro font-bold text-justify text-white">Refresh Messages</button>
                        }

                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(Column);