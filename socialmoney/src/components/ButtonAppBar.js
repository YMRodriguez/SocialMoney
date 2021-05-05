import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import { fade, makeStyles } from '@material-ui/core/styles';
import { useLocation } from "react-router-dom";
import $ from 'jquery';
import { useHistory } from "react-router-dom";
import { userVisited, visitFollows, visitFollowers } from "../redux/actions";
import { connect } from 'react-redux';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(1),
            width: 'auto',
        },
    },
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: '12ch',
            '&:focus': {
                width: '20ch',
            },
        },
    },
}));

function ButtonAppBar(props) {
    const classes = useStyles();
    const location = useLocation().pathname;
    const history = useHistory();
    return (
        <div>
            { location === "/signup" || location === "/login" ?
                (<AppBar position="static" id="appbarNoSearch">
                    <Toolbar id="appbarNoSearch">
                        <img src={props.logo} alt="Logo" />
                    </Toolbar>
                </AppBar>)
                :
                (<AppBar position="static" id="appbar">
                    <Toolbar id="appbar">
                        <div className={classes.search}>
                            <div className={classes.searchIcon}>
                                <SearchIcon />
                            </div>
                            <InputBase
                                placeholder="Search…"

                                classes={{
                                    root: classes.inputRoot,
                                    input: classes.inputInput,
                                }}
                                inputProps={{ 'aria-label': 'search' }}
                                onChange={async (e) => {
                                    $.ajax({
                                        url: "http://localhost:8080/SMON-SERVICE/search",
                                        xhrFields: {
                                            withCredentials: true
                                          },
                                        crossDomain: true,
                                        type: 'POST',
                                        data: JSON.stringify({ username: e.target.value }),
                                        async: false,
                                        success: function (msg) {
                                            if (msg.code == 200) {
                                                history.push("/searchprofile")
                                                let account = JSON.parse(msg.account)
                                                props.dispatch(userVisited(account))

                                                let visitfollows = JSON.parse(msg.visitFollows).userFollows.substring(1,JSON.parse(msg.visitFollows).userFollowers.length-1)
                                                let visitfollowers = JSON.parse(msg.visitFollows).userFollowers.substring(1,JSON.parse(msg.visitFollows).userFollowers.length-1)

                                                if (visitfollowers.length != 0){
                                                    props.dispatch(visitFollowers(visitfollowers.split(",")))
                                                }
                                                else {
                                                    props.dispatch(visitFollowers([]))
                                                }
                            
                                                if (visitfollows.length != 0){
                                                    props.dispatch(visitFollows(visitfollows.split(",")))
                                                }
                                                else {
                                                    props.dispatch(visitFollows([]))
                                                }

                                                alert("¡Encontrado con éxito!")
                                                console.log('Success')
                                                console.log(visitfollowers)
                                            }
                                            else {
                                                console.log("Error 404")
                                            }
                                        }
                                    });
                                }
                                }
                            />
                        </div>
                        <img src={props.logo} alt="Logo" id="appbarlogo" />
                    </Toolbar>
                </AppBar>)}
        </div>

    );
}

function mapStateToProps(state) {
    return {
        ...state
    };
}

export default connect(mapStateToProps)(ButtonAppBar);