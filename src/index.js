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
import Reset from './Pages/authentication/reset';
import Messages from './Pages/profile/messages';
import ProfilePosts from './Pages/profile/posts';
import Profile from './Pages/profile/profile';
import Cancellation from './Pages/search/cancellation';
import Confirmation from './Pages/search/confirmation';
import Search from './Pages/search/search';
import Header from './header';
import Footer from './footer';
import FriendsList from './Pages/friends/friendsList';
import PasswordChange from './Pages/profile/profile';
import FriendsRequest from './Pages/friends/friendsList';
import Create from './Pages/search/create';

const browserHistory = createBrowserHistory();
ReactDOM.render(
    <BrowserRouter path="/App" history={browserHistory}>
    <div className="bg-blue-new min-h-screen">
    <div>
    <Header/>
    <Footer/>

    <div className="md:pt-20 pt-16 scrolling-touch md:scrolling-auto flex "/>
        <Switch>
            <Route exact path = '/' component ={App}  />
            <Route exact path = '/login' component ={Login}  />
            <Route exact path = '/forget' component ={Forget}  />
            <Route exact path = '/reset' component ={Reset}  />
            <Route exact path = '/signup' component ={SignUp}  />
            <Route exact path = '/messages' component ={Messages}  />
            <Route exact path = '/messages/:params' component ={Messages}  />
            <Route exact path = '/posts' component ={ProfilePosts}  />
            <Route exact path = '/profile' component ={Profile}  />
            <Route exact path = '/cancellation/:params' component ={Cancellation}  />
            <Route exact path = '/confirmation/:params' component ={Confirmation}  />
            <Route exact path = '/search' component ={Search}  />
            <Route exact path = '/search/:params' component ={Search}  />
            <Route exact path = '/friendsList' component ={FriendsList}  />
            <Route exact path = '/createPost' component ={Create}  />
            <Route exact path = '/friendsRequest' component ={FriendsRequest}  />
            <Route exact path = '/passwordChange' component ={PasswordChange}  />
            <Route component={Error}/>
        </Switch>
    </div>
    </div>
    </BrowserRouter>, document.getElementById('root'));
    

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
