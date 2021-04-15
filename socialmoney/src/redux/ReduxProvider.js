
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
import GenericUser from "../components/GenericUser.js"
import { BrowserRouter, Route } from "react-router-dom";
import BackgroundVideo from "../components/BackgroundVideo.js";
import logo from '../logo.png';
import video from '../FallingCoins.mp4';
import user from '../user.png';
import user2 from '../user2.png';
import ButtonAppBar from '../components/ButtonAppBar';

export default class ReduxProvider extends React.Component {
    constructor(props) {
        super(props);
        this.initialState = {
            user: {} // the user logged
        };
        this.store = this.configureStore();
    }
    render() {
        return (
            <Provider store={this.store}>
                <div style={{height:'100%'}} >
                <BrowserRouter>
                    <Route exact path="/"><BackgroundVideo logo={logo} video={video} /></Route>
                    <Route path="/feed"><ButtonAppBar logo={logo} user={user} /><App /></Route>
                    <Route path="/login"><ButtonAppBar logo={logo} user={user} /><LogIn /></Route>
                    <Route path="/signup"><ButtonAppBar logo={logo} user={user} /><SignUp /></Route>
                    <Route path="/postId"><ButtonAppBar logo={logo} user={user} /><FullPost user={user} /></Route>
                    <Route path="/myprofile"><ButtonAppBar logo={logo} user={user} /><UserProfile user={user} name={"pedro"} /></Route>
                    <Route path="/author"><ButtonAppBar logo={logo} user={user} /><GenericUser user2={user2} name={"Luis"} /></Route>
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