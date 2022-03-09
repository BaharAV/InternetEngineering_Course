import React from 'react'
import './App.css';
import Login from './Pages/Login';
import SignUp from './Pages/SignUp';
import Home from './Pages/Home';
import MakeTweets from './Pages/MakeTweets';
import Hello from './Pages/Hello';
import TimeLine from './Pages/TimeLine';
import Search from './Pages/Search';
import Followers from './Pages/Followers';
import Followings from './Pages/Followings';
import Notifications from './Pages/Notifications';
import Likers from './Pages/Likers';
import Retweeters from './Pages/Retweeters';
import SearchOut from './Pages/SearchOut';
import Profile from './Pages/Profile';
import UserPageToVisit from './Pages/UserPageToVisit';
import Trends from './Pages/Trends';
import TrendsToSee from './Pages/TrendsToSee';

import {BrowserRouter as Router, Switch, Route} from "react-router-dom"

function App() {

    return (
        <Router>
            <div>
                <Switch>
                    <Route path="/" exact component={Hello}/>
                    <Route path="/login" exact component={Login}/>
                    <Route path="/signup" exact component={SignUp}/>
                    <Route path="/searchout" exact component={SearchOut}/>
                    <Route path="/home/:token" exact component={Home}/>
                    <Route path="/maketweets/:token" exact component={MakeTweets}/>
                    <Route path="/timeline/:token" exact component={TimeLine}/>
                    <Route path="/search/:token" exact component={Search}/>
                    <Route path="/followers/:token" exact component={Followers}/>
                    <Route path="/followings/:token" exact component={Followings}/>
                    <Route path="/notifications/:token" exact component={Notifications}/>
                    <Route path="/likers/:token/:id" exact component={Likers}/>
                    <Route path="/retweeters/:token/:id" exact component={Retweeters}/>
                    <Route path="/profile/:token" exact component={Profile}/>
                    <Route path="/userpage/:token/:username" exact component={UserPageToVisit}/>
                    <Route path="/trends/:token" exact component={Trends}/>
                    <Route path="/trendstosee/:token/:trend" exact component={TrendsToSee}/>
                </Switch>
            </div>
        </Router>
    );
}

export default App;
