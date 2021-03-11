import '../App.css';
import React from "react";
import "@fontsource/roboto";
import ButtonAppBar from './ButtonAppBar';
import logo from '../logo.png';
import user from '../user.png';
import Post from './Post.js';

function App() {
  return (
    <div className="App">
      <ButtonAppBar logo={logo} user={user} />
      <div id="feedAndLateral">
        <div className="feed">
          <Post />
          <Post />
        </div>
        <div className="lateral">
          <div id="buttons">

          </div>
          <div id="filters">

          </div>
          <div id="marketdata">

          </div>
        </div>
      </div>

    </div>
  );
}

export default App;
