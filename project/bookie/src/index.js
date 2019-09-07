import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import{Router, Route,Switch } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import Error from './error';
import Login from './authentication/login';
import SignUp from './authentication/signup';
import Messages from './profile/messages';
import ProfilePosts from './profile/posts';
import Profile from './profile/profile';
import Cancellation from './search/cancellation';
import Confirmation from './search/confirmation';
import Search from './search/search';
const browserHistory = createBrowserHistory();
ReactDOM.render(
    <Router path="/App" history={browserHistory}>
    <div>
        <Switch>
            <Route exact path = '/' component ={App}  />
            <Route exact path = '/login' component ={Login}  />
            <Route exact path = '/signup' component ={SignUp}  />
            <Route exact path = '/messages' component ={Messages}  />
            <Route exact path = '/messages/:params' component ={Messages}  />
            <Route exact path = '/posts' component ={ProfilePosts}  />
            <Route exact path = '/profile' component ={Profile}  />
            <Route exact path = '/cancellation/:params' component ={Cancellation}  />
            <Route exact path = '/confirmation/:params' component ={Confirmation}  />
            <Route exact path = '/search' component ={Search}  />
            <Route exact path = '/search/:params' component ={Search}  />
            <Route component={Error}/>
        </Switch>
    </div>
    </Router>, document.getElementById('root'));
    

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
