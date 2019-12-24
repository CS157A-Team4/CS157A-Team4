import React from 'react';
import Column from "../../../column";
import logo from "../../../images/curious_cat.png";
import api from '../../../backend/backend';
import { Accordion, AccordionItem } from 'react-sanfona';
import {TinyButton as ScrollUpButton} from "react-scroll-up-button"; //Add this line Here

class Posts extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            posts: [],
            password: [],
            status:'',
            friends: [
                {relationshipId: 0, user1: '', user2: '', firstname: '',surname: ''}
            ],
            loaded:false // do not reload page
        };
    }

    UNSAFE_componentWillMount() { // call before render
            if(window.localStorage.getItem("id") === null){
              this.props.history.push('/login');  
          }

        this.show_post()
    }

    show_post() {
        console.log("test show posts!!!");
        let user = window.localStorage.getItem("id");

        console.log(user)
        fetch (api+`/profile/getAll/${user}`).then(results => {
            return results.json()
        }).then(data=>{
            if (data["error"]) {
                alert(data["message"]);
            }
            else{
                console.log(data);
                this.setState({
                    saved: data["saved"],
                    holds: data["holds"],
                    posts: data["posts"],
                    loaded:true
                })
            }
        })
    }

    goTo(event) {
        const value = event.target.id;
        this.props.history.push(`/profile/${value}`);
    }

    updateState(e){
        this.setState({status:e.target.id})
    }
    goToPosts(event) {
        const value = "post/"+ event;
        this.props.history.push(`/${value}`);
    }

    loadBoxes(data){
        console.log(this.state)
        let boxes = []
        for (let i =0; i< data.length; i++) {

            boxes.push(
                <div className="max-w-sm mx-auto md:mr-4 md:ml-4 rounded-lg font-bold" onClick={(e)=> this.goToPosts(data[i].postID? data[i].postID:data[i].postid)}>
                    <div className="w-full sm:w-full lg:w-full py-6 ">
                        <div className="bg-white w-64 shadow-2xl rounded-lg rounded cursor-pointer">
                            <div className="bg-cover bg-center justify-center flex h-56 p-4 w-auto overflow-hidden">
                                <img className="rounded h-full" src={data[i].image !== "null" && data[i].image !== null?  data[i].image:logo}></img>
                            </div>
                            <div className="p-4 pt-0">
                                <p className="overflow-auto uppercase tracking-wide text-sm font-bold text-gray-700 mb-2">{data[i].title}</p>
                                <p className="text-3xl text-gray-900 mb-2">${data[i].price}</p>
                                <p className="text-gray-700"> {data[i].author}</p>
                            </div>
                            <div className="flex justify-between p-4 border-t border-solid border-gray-300 text-gray-700">
                                <div className="flex pt-1 just">
                                    <svg className="h-6 w-6 text-gray-600 fill-current "/>
                                    <p className="text-black text-lg whitespace-no-wrap"> {data[i].condition}</p>
                                </div>
                                <div className="flex items-center">
                                    <svg className="h-6 w-6 text-gray-600 fill-current"/>
                                    {
                                        data[i].hold == 0?
                                            <p className="text-green-500 text-lg"> Available</p>
                                            :
                                            <p className="text-red-500 text-lg"> On Hold</p>
                                    }
                                </div>
                            </div>
                            <div className="border-b border-solid rounded-lg rounded-t-none px-4 pt-3 pb-4 border-t border-gray-300 bg-gray-100">
                                <div className="text-xs uppercase font-bold text-gray-600 tracking-wide">Seller</div>
                                <div className="flex justify-center items-center pt-2">
                                    <div>
                                        <p className="font-bold text-gray-900">{data[i].firstname + " " + data[i].surname}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>)};
        return boxes;
    }

	render() {
    	return (

            <div className="flex w-full h-full font-sans-pro">
                                <ScrollUpButton    
            style={{backgroundColor:"white", fill:"#88C5CC"}}
            />
                <Column/>
                <div className="w-full overflow-auto">

                { this.state.loaded &&
                <div className="w-full overflow-auto  px-4 py-4">
                        <Accordion>

                    {
                        this.state.saved.length > 0 &&
                            <AccordionItem duration={1000} titleClassName="hover:bg-gray-400 bg-gray-200 border-t-2 p-4 w-full text-xl text-left
                            text-gray-700 font-sans-pro font-bold text-justify" title={`Posts You Saved`} expanded={false}>
                        <div>
                            <div className="flex flex-wrap justify-start text-center">
                                {this.loadBoxes(this.state.saved)}
                            </div>
                        </div>
                        </AccordionItem>
                    }
                    {this.state.holds.length > 0 &&
                        <AccordionItem duration={1000} titleClassName="hover:bg-gray-400 bg-gray-200 border-t-2 p-4 w-full text-xl text-left
                        text-gray-700 font-sans-pro font-bold text-justify" title={`Posts On Hold`} expanded={false}>
                        <div>
                            <div className="flex flex-wrap justify-start text-center">
                                {this.loadBoxes(this.state.holds)}
                            </div>
                        </div>
                        </AccordionItem>
                    }
                    {
                        this.state.posts.length > 0 && 
                        <AccordionItem duration={1000} titleClassName="hover:bg-gray-400 bg-gray-200 border-t-2 p-4 w-full text-xl text-left
                        text-gray-700 font-sans-pro font-bold text-justify" title={`Posts You've Made`} expanded={false}>

                        <div>
                            <div className="flex flex-wrap justify-start text-center">
                                {this.loadBoxes(this.state.posts)}
                            </div>
                        </div>
                        </AccordionItem>
                    }
                    
                    </Accordion>
                    </div>
                    
                }
                </div>
            </div>
        )

	}
}

export default Posts;
