
// This file will serve as the bridge between React and Redux.
import { Provider } from 'react-redux';
import GlobalState from './reducers';
import { createStore } from 'redux';

import React from 'react';
import App from '../components/App';

import LogIn from '../components/LogIn';
import FullPost from "../components/FullPost.js"
import SignUp from "../components/SignUp.js"
import UserProfile from "../components/UserProfile.js"
import { BrowserRouter, Route } from "react-router-dom";
import BackgroundVideo from "../components/BackgroundVideo.js";
import logo from '../logo.png';
import video from '../FallingCoins.mp4';
import ButtonAppBar from '../components/ButtonAppBar';
import VisitProfile from '../components/VisitProfile';

export default class ReduxProvider extends React.Component {
    constructor(props) {
        super(props);
        this.initialState = {
            user: {}, // the user logged
            visituser: {}, //user visited
            userfollows: [],
            userfollowers: [],
            visitfollows: [],
            visitfollowers: []
        };
        this.store = this.configureStore();
    }
    render() {
        return (
            <Provider store={this.store}>
                <div style={{ height: '100%' }} >
                    <BrowserRouter>
                        <Route exact path="/"><BackgroundVideo logo={logo} video={video} /></Route>
                        <Route path="/feed"><ButtonAppBar logo={logo} /><App /></Route>
                        <Route path="/login"><ButtonAppBar logo={logo} /><LogIn /></Route>
                        <Route path="/signup"><ButtonAppBar logo={logo} /><SignUp /></Route>
                        <Route path="/myprofile"><ButtonAppBar logo={logo} /><UserProfile /></Route>
                        <Route path="/searchprofile"><ButtonAppBar logo={logo} /><VisitProfile /></Route>
                    </BrowserRouter>
                </div>
            </Provider>
        );
    }
    // May be convention but its unnecessary
    configureStore() {
        return createStore(GlobalState, this.initialState);
    }
}