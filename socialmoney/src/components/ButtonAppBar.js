import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { Link } from "react-router-dom";
import UserAvatar from './UserAvatar';

export default function ButtonAppBar(props) {
    return (
        <AppBar position="static" id="appbar">
            <Toolbar id="appbar">
                <img src={props.logo} alt="Logo" id="appbarlogo" />
                <Link to="/myprofile"><UserAvatar user={props.user} id="avatar" /></Link>
            </Toolbar>
        </AppBar>
    );
}