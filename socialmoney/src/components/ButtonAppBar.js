import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { Link } from "react-router-dom";
import BadgeAvatar from './BadgeAvatar';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    appBar: {
        background: 'linear-gradient(45deg, #2ECC71 30%, #00FF99 90%)'
    },
    menuButton: {
        marginRight: theme.spacing(2),
        justifyContent: 'flex-start',
        flexGrow: 1
    },
    title: {
        flexGrow: 0,
        justifyContent: 'space-around',
    },
    login: {
        color: 'black',
        justifyContent: 'flex-end',
        flexGrow: 1,
        borderColor: 'black',
        border: '2px'
    },
    signup: {
        color: 'black',
        justifyContent: 'flex-end',
        marginRight: theme.spacing(2),
    }
}));

export default function ButtonAppBar(props) {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <AppBar position="static" className={classes.appBar}>
                <Toolbar>
                    <img src={props.logo} alt="Logo" className={classes.title} />
                    <Link to="/profile"><BadgeAvatar user={props.user} /></Link>
                </Toolbar>
            </AppBar>
        </div>
    );
}