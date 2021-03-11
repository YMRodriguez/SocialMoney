import '../App.css';
import React from "react";
import "@fontsource/roboto";
import ButtonAppBar from './ButtonAppBar';
import BackgroundVideo from './BackgroundVideo';
import logo from '../logo.png';
import video from '../FallingCoins.mp4';


function App() {
  return (
    <div className="App">
      <BackgroundVideo logo={logo} video={video} />
    </div>

  );
}

export default App;
