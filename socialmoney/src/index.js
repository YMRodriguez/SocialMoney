import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import "@fontsource/roboto";
import reportWebVitals from './reportWebVitals';
import ReduxProvider from "./redux/ReduxProvider";
import LogIn from "./components/LogIn.js"
import FullPost from "./components/FullPost.js"
import SignUp from "./components/SignUp.js"
import UserProfile from "./components/UserProfile.js"
import GenericUser from "./components/GenericUser.js"
import { BrowserRouter, Route } from "react-router-dom";
import BackgroundVideo from "./components/BackgroundVideo.js";
import logo from './logo.png';
import video from './FallingCoins.mp4';
import user from './user.png';
import user2 from './user2.png';
import ButtonAppBar from './components/ButtonAppBar';

ReactDOM.render(
  <React.StrictMode>
    <div>
      <BrowserRouter>
        <Route exact path="/"><BackgroundVideo logo={logo} video={video} /></Route>
        <Route path="/feed"><ButtonAppBar logo={logo} user={user} /><ReduxProvider /></Route>
        <Route path="/login"><ButtonAppBar logo={logo} user={user} /><LogIn /></Route>
        <Route path="/signup"><ButtonAppBar logo={logo} user={user} /><SignUp /></Route>
        <Route path="/postId"><ButtonAppBar logo={logo} user={user} /><FullPost user={user} /></Route>
        <Route path="/myprofile"><ButtonAppBar logo={logo} user={user} /><UserProfile user={user} name={"pedro"} /></Route>
        <Route path="/author"><ButtonAppBar logo={logo} user={user} /><GenericUser user2={user2} name={"Luis"} /></Route>
      </BrowserRouter>
    </div>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
