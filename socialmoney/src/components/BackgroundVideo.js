import React from 'react';
import InteractiveDescription from './InteractiveDescription';
import Button from '@material-ui/core/Button';
import { Link } from "react-router-dom";

function BackgroundVideo(props) {
    return (
        <div id="Container" >
            <video autoPlay="autoplay" loop="loop" muted id="Video" >
                <source src={props.video} type="video/mp4" />
            </video>
            <img src={props.logo} alt="Logo" id="logo" />
            <InteractiveDescription logo={props.logo} />
            <Link to="/login"><Button id="log">Log in</Button></Link>
            <Link to="/signup"><Button id="signup">Sign up</Button></Link>
        </div>
    )
}

export default BackgroundVideo