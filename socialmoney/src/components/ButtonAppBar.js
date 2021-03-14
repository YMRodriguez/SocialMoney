import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';

export default function ButtonAppBar(props) {
    return (
        <AppBar position="static" id="appbar">
            <Toolbar id="appbar">
                <img src={props.logo} alt="Logo" id="appbarlogo" />
            </Toolbar>
        </AppBar>
    );
}