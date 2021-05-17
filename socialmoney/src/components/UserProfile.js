import React from "react";
import Button from '@material-ui/core/Button';
import Post from './Post';
import { Link } from "react-router-dom";
import ConnectPlatformForm from "./ConnectPlatformForm.js";
import EditProfileForm from "./EditProfileForm.js";
import { connect } from 'react-redux';
import $ from 'jquery';
import user2 from '../user2.png';
import { userLogged, userFollows, userFollowers } from '../redux/actions';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';


class UserProfile extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            posts: [],
            account: {},
            follows: [],
            followers: [],
            pendings: [],
            superfollowers: [],
            open: false
        }
    }

    async componentDidMount() {
        this.fetchPosts();
        this.fetchAccount();
        this.fetchFollows();
    }

    fetchPosts() {
        $.ajax({
            url: "http://localhost:8080/SMON-SERVICE/publications",
            type: 'GET',
            xhrFields: {
                withCredentials: true
            },
            crossDomain: true,
            async: false,
            success: function (msg) {
                if (msg.code == 200) {
                    let receivedposts = JSON.parse(msg.postList)
                    console.log('Success')
                    this.setState({ posts: receivedposts })
                }
                else if (msg.code == 204) {
                    window.location = '/login';
                }
                else {
                    window.location = '/login';
                }
            }.bind(this)
        });
    }

    fetchAccount() {
        $.ajax({
            url: "http://localhost:8080/SMON-SERVICE/account",
            type: 'GET',
            xhrFields: {
                withCredentials: true
            },
            crossDomain: true,
            async: false,
            success: function (msg) {
                if (msg.code == 200) {
                    let account = JSON.parse(msg.account)
                    console.log('Success')
                    console.log(account)
                    let base64String = btoa(
                        new Uint8Array(account.picture)
                            .reduce((data, byte) => data + String.fromCharCode(byte), '')
                    );
                    account.picture = base64String
                    this.props.dispatch(userLogged(account))
                    this.setState({ account: account })
                }
                else if (msg.code == 204) {
                    console.log('Success')
                }
                else {
                    console.log("Error 404")
                }
            }.bind(this)
        });
    }

    fetchPublications(p) {
        $.ajax({
            url: "http://localhost:8080/SMON-SERVICE/deletePost",
            xhrFields: {
                withCredentials: true
            },
            crossDomain: true,
            type: 'POST',
            data: JSON.stringify({ id: p.id }),
            xhrFields: {
                withCredentials: true
            },
            crossDomain: true,
            async: false,
            success: function (msg) {
                if (msg.code == 200) {
                    alert("¡Borrados con éxito!")
                    console.log('Success')
                }
                else {
                    console.log("Error 404")
                }
            }
        })
        this.fetchPosts();
    }

    fetchFollows() {
        $.ajax({
            url: "http://localhost:8080/SMON-SERVICE/showfollows",
            xhrFields: {
                withCredentials: true
            },
            crossDomain: true,
            type: 'POST',
            data: JSON.stringify({ username: this.props.user.username, myusername: "usernamenoexists" }),
            async: false,
            success: function (msg) {
                if (msg.code == 200) {
                    console.log('Success')
                    console.log(msg)
                    let follows = JSON.parse(msg.userfollows).userFollows.substring(1, JSON.parse(msg.userfollows).userFollows.length - 1)
                    let followers = JSON.parse(msg.userfollows).userFollowers.substring(1, JSON.parse(msg.userfollows).userFollowers.length - 1)
                    console.log(followers)
                    if (followers.length != 0) {
                        this.setState({ followers: followers.split(",") })
                    }

                    if (follows.length != 0) {
                        this.setState({ follows: follows.split(",") })
                    }

                }
                else {
                    console.log("Error 404")
                }
            }.bind(this)
        })

    }

    onClickSFButton() {
        this.fetchManageSuperFollows();
        this.handleClickOpen();
    }

    fetchManageSuperFollows() {
        $.ajax({
            url: "http://localhost:8080/SMON-SERVICE/managesuperfollow",
            xhrFields: {
                withCredentials: true
            },
            crossDomain: true,
            type: 'POST',
            data: JSON.stringify({ myusername: this.props.user.username, username: "usernamenoexists", button: "botonnoexists" }),
            async: false,
            success: function (msg) {
                if (msg.code == 200) {
                    console.log('Success')
                    let pend = JSON.parse(msg.moderator).userSuperFollowsPending.substring(1, JSON.parse(msg.moderator).userSuperFollowsPending.length - 1)
                    let followers = JSON.parse(msg.moderator).userSuperFollowers.substring(1, JSON.parse(msg.moderator).userSuperFollowers.length - 1)

                    if (followers.length != 0) {
                        this.setState({ superfollowers: followers.split(",") })
                    }

                    if (pend.length != 0) {
                        this.setState({ pendings: pend.split(",") })
                    }

                }
                else {
                    console.log("Error 404")
                }
            }.bind(this)
        })
    }

    handleClickOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    handleSolicitation(button, username) {
        $.ajax({
            url: "http://localhost:8080/SMON-SERVICE/managesuperfollow",
            xhrFields: {
                withCredentials: true
            },
            crossDomain: true,
            type: 'POST',
            data: JSON.stringify({ myusername: this.props.user.username, username: username, button: button }),
            async: false,
            success: function (msg) {
                if (msg.code == 200) {
                    console.log('Success')
                    let pend = JSON.parse(msg.moderator).userSuperFollowsPending.substring(1, JSON.parse(msg.moderator).userSuperFollowsPending.length - 1)
                    let followers = JSON.parse(msg.moderator).userSuperFollowers.substring(1, JSON.parse(msg.moderator).userSuperFollowers.length - 1)

                    if (followers.length != 0) {
                        this.setState({ superfollowers: followers.split(",") })
                    }
                    else {
                        this.setState({ superfollowers: [] })
                    }

                    if (pend.length != 0) {
                        this.setState({ pendings: pend.split(",") })
                    }
                    else {
                        this.setState({ pendings: [] })
                    }

                }
                else {
                    console.log("Error 404")
                }
            }.bind(this)
        })
    }

    render() {
        return (
            <div style={{ display: "flex", flexDirection: "columns" }}>
                <div style={{ width: "80%" }}>
                    <div style={{ display: "flex", flexDirection: "row" }}>
                        <Link to="/feed" style={{ textDecoration: 'none' }}>
                            <Button variant="contained" textColor="white" color="primary" style={{ color: "white", backgroundColor: "green", marginLeft: "10%", marginTop: "10%" }}>
                                {"<-"}
                            </Button>
                        </Link>
                        <div id="profileimgname">
                            <img src={this.props.user.picture ? ("data:image/png;base64," + this.state.account.picture) : user2} alt="Profile picture" id="profilepic" />
                            <div style={{ textAlign: "center" }}><h2>{this.state.account.username}</h2></div>
                        </div>
                        <div id="userHeader">
                            <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-around" }} >
                                <EditProfileForm color="primary" id="buttonFollow" style={{ color: "white" }} user={this.state.account} onClose={() => this.fetchAccount()}>
                                </EditProfileForm>
                                <div id="followItem">
                                    <div>Seguidos<div style={{ textAlign: "center" }}>{this.state.follows.length}</div></div>
                                </div>
                                <div id="followItem">
                                    <div>Seguidores<div style={{ textAlign: "center" }}>{this.state.followers.length}</div></div>
                                </div>
                            </div>
                            <div style={{ textAlign: "center" }}><h2>{this.state.account.description}</h2></div>
                        </div>
                    </div>
                    <div id="posts">
                        {(this.state.posts.length != 0) ? this.state.posts.map((p, i) => {
                            return (
                                <Post publication={p}
                                    index={i}
                                    className="post"
                                    allowbutton={true}
                                    onPressButton={() => this.fetchPublications(p)}
                                />
                            )
                        }) : <p>No hay publicaciones aún de este usuario</p>}
                    </div>
                </div>
                <div style={{ width: "20%" }}>
                    <div style={{ textAlign: "center", width: "100%", fontSize: "20px", marginTop: "8%" }}>
                        <div>Publicaciones
                            <div>{this.state.posts.length}</div>
                        </div>
                    </div>
                    {this.state.account.showprofits ? (<div><div style={{ textAlign: "center", width: "100%", fontSize: "20px", marginTop: "8%" }}>
                        <div>Rentabilidad
                            <div style={{ textAlign: "center", width: "100%" }}>{this.state.account.profit}</div>
                        </div>
                    </div>
                        <div style={{ textAlign: "center", width: "100%", fontSize: "20px", marginTop: "8%" }}>
                            <div>Timeframe
                            <div style={{ textAlign: "center", width: "100%" }}>{this.state.account.timeframe}</div>
                            </div>
                        </div>
                        <div style={{ textAlign: "center", width: "100%", fontSize: "20px", marginTop: "8%" }}>
                            <div>Tipo de cuenta
                            <div style={{ textAlign: "center", width: "100%" }}>{this.state.account.accountType}</div>
                            </div>
                        </div></div>) : (<div></div>)}
                    <div style={{ textAlign: "center", width: "100%", fontSize: "20px", marginTop: "8%" }}>
                        <ConnectPlatformForm color="primary" id="buttonSuperFollow" style={{ color: "white" }} onClose={() => this.fetchAccount()}>
                        </ConnectPlatformForm>
                        <Button color="primary" id="buttonSuperFollow" onClick={() => { this.onClickSFButton() }} style={{ color: "white", marginTop: "8%" }}>
                            Gestionar SuperFollows
                    </Button>
                        <Dialog paperWidthLg open={this.state.open} fullWidth={true} aria-labelledby="form-dialog-title" style={{ color: "white", width: "80%" }}>
                            <DialogContent>
                                <DialogContentText>
                                    <h2> Usuarios con solicitud pendiente </h2>
                                    <ul>
                                        {this.state.pendings.map((p, i) => {
                                            return (
                                                <li>
                                                    <p>{p}</p>
                                                    <button onClick={() => this.handleSolicitation("Accept", p)}>Aceptar</button>
                                                    <button onClick={() => this.handleSolicitation("Reject", p)}>Rechazar</button>
                                                </li>
                                            )
                                        })}
                                    </ul>
                                    <h2> Superfollows </h2>
                                    <ul>
                                        {this.state.superfollowers.map((sf, i) => {
                                            return (
                                                <li>
                                                    <p>{sf}</p>
                                                    <button onClick={() => this.handleSolicitation("Delete", sf)}>Eliminar</button>
                                                </li>
                                            )
                                        })}
                                    </ul>

                                </DialogContentText>
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={this.handleClose} color="primary">
                                    Close
                                </Button>
                            </DialogActions>
                        </Dialog>
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        ...state
    };
}

export default connect(mapStateToProps)(UserProfile);