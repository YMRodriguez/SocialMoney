import React from 'react';
import InteractiveDescription from './InteractiveDescription';
import Button from '@material-ui/core/Button';

function BackgroundVideo(props) {
    return (
        <div id="Container" >
            <video autoPlay="autoplay" loop="loop" muted id="Video" >
                <source src={props.video} type="video/mp4" />
            </video>
            <img src={props.logo} alt="Logo" id='logo' />
            <InteractiveDescription logo={props.logo} />
            <Button id="log">Log in</Button>
            <Button id="signup">Sign up</Button>
        </div>
    )
}

export default BackgroundVideo