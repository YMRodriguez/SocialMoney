import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

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
                    <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                        <MenuIcon />
                    </IconButton>
                    <img src={props.logo} alt="Logo" className={classes.title} />
                    <Button className={classes.login} >Login</Button>
                    <Button className={classes.signup} >Sign up</Button>
                </Toolbar>
            </AppBar>
        </div>
    );
}