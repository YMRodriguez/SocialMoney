import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import "@fontsource/roboto";
import reportWebVitals from './reportWebVitals';
import ReduxProvider from "./redux/ReduxProvider";
import LogIn from "./components/LogIn.js"
import SignUp from "./components/SignUp.js"
import UserProfile from "./components/UserProfile.js"
import { BrowserRouter, Route } from "react-router-dom";
import BackgroundVideo from "./components/BackgroundVideo.js";
import logo from './logo.png';
import video from './FallingCoins.mp4';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Route exact path="/"><BackgroundVideo logo={logo} video={video} /></Route>
      <Route path="/feed"><ReduxProvider /></Route>
      <Route path="/login"><LogIn /></Route>
      <Route path="/signup"><SignUp /></Route>
      <Route path="/profile"><UserProfile /></Route>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
