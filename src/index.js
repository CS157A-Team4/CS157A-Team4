import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import{BrowserRouter, Route,Switch } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import Error from './error';
import Login from './Pages/authentication/login';
import SignUp from './Pages/authentication/signup';
import Forget from './Pages/authentication/forget';
import EnterResetCode from './Pages/authentication/EnterResetCode';
import ResetPassword from './Pages/authentication/ResetPassword';
import Messages from './Pages/profile/messages';
import ProfilePosts from './Pages/profile/posts';
import Profile from './Pages/profile/profile';
import Search from './Pages/search/search';
import Header from './header';
import Footer from './footer';
import FriendsList from './Pages/friends/friendsList';
import PasswordChange from './Pages/profile/profile';
import FriendsRequest from './Pages/friends/friendsRequest';
import Create from './Pages/search/create';
import Post from './Pages/search/post';
import Edit from './Pages/search/edit';
import Friends from "./Pages/profile/components/friends";
import Posts from "./Pages/profile/components/posts";
import Settings from "./Pages/profile/components/settings";
const browserHistory = createBrowserHistory();

//window.localStorage.setItem('loggedIn', false);

ReactDOM.render(
    <BrowserRouter path="/App" history={browserHistory}>
    <div className="bg-blue-new min-h-screen max-h-screen scrolling-touch bg-blue-new scrolling-auto">
    <Header/>
    <Footer/>

    <div className="md:pt-20 pt-16 h-screen">
        <Switch>
            <Route exact path = '/' component ={App}  />
            <Route exact path = '/login' component ={Login}  />
            <Route exact path = '/forget' component ={Forget}  />
            <Route exact path = '/enterresetcode' component ={EnterResetCode}  />
            <Route exact path = '/resetpassword' component ={ResetPassword}  />
            <Route exact path = '/signup' component ={SignUp}  />
            <Route exact path = '/messages' component ={Messages}  />
            <Route exact path = '/messages/:id' component ={Messages}  />
            <Route exact path = '/posts' component ={ProfilePosts}  />
            <Route exact path = '/post/:id' component ={Post}  />
            <Route exact path = '/profile' component ={Profile}  />
            <Route exact path = '/search' component ={Search}  />
            <Route exact path = '/search/:params' component ={Search}  />
            <Route exact path = '/profile/friends' component ={FriendsList}  />
            <Route exact path = '/createPost' component ={Create}  />
            <Route exact path = '/editPost/:id' component ={Edit}  />           
            <Route exact path = '/profile/friendsR' component ={FriendsRequest}  />
            <Route exact path = '/passwordChange' component ={PasswordChange}  />
            <Route exact path = '/profile/friends' component ={Friends}  />
            <Route exact path = '/profile/posts' component ={Posts}  />
            <Route exact path = '/profile/settings' component ={Settings}  />
            <Route component={Error}/>
        </Switch>
        </div>
    </div>
    </BrowserRouter>, document.getElementById('root'));
    

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
