import React from "react";
import Button from '@material-ui/core/Button';
import Post from './Post';
import { Link } from "react-router-dom";
import { connect } from 'react-redux';
import $ from 'jquery';
import user2 from '../user2.png';
import { RepeatRounded } from "@material-ui/icons";

class VisitProfile extends React.Component {

    constructor(props) {
        super(props);
        this.state = { posts: [], buttonstate: false, buttonSFstate: "", follows: [], followers: [], account:[] }
    }

    async componentDidMount() {
        this.fetchPosts();
        this.fetchFollows();
        this.fetchSuperfollows();
    }


    async componentDidUpdate(prevProps){
        if (prevProps.visituser.username !== this.props.visituser.username){
            this.fetchFollows();
            this.fetchSuperfollows();
        }
    }

    fetchFollows() {
        $.ajax({
            url: "http://localhost:8080/SMON-SERVICE/showfollows",
            xhrFields: {
                withCredentials: true
            },
            crossDomain: true,
            type: 'POST',
            data: JSON.stringify({ username: this.props.visituser.username, myusername: this.props.user.username }),
            async: false,
            success: function (msg) {
                if (msg.code == 200) {
                    console.log('Success')
                    let follows = JSON.parse(msg.userfollows).userFollows.substring(1,JSON.parse(msg.userfollows).userFollows.length-1)
                    let followers = JSON.parse(msg.userfollows).userFollowers.substring(1,JSON.parse(msg.userfollows).userFollowers.length-1)
                    let button = JSON.parse(msg.button)

                    this.setState({buttonstate: button})
                    console.log(msg.button)

                    if (followers.length != 0){
                        this.setState({followers: followers.split(",")})
                    }
                    else {
                        this.setState({followers: []})
                    }
                    if (follows.length != 0){
                        this.setState({follows: follows.split(",")})
                    }
                    else {
                        this.setState({follows: []})
                    } 

                }
                else {
                    console.log("Error 404")
                }
            }.bind(this)
        })

    }
 
    fetchfollow() {
        $.ajax({
            url: "http://localhost:8080/SMON-SERVICE/follow",
            xhrFields: {
                withCredentials: true
              },
            crossDomain: true,
            type: 'POST',
            data: JSON.stringify({username: this.props.user.username, followed: this.props.visituser.username }),
            async: false,
            success: function (msg) {
                if (msg.code == 200) {
                    this.fetchFollows();
                }
                else {
                    console.log("Error 404")
                }
            }.bind(this)
        });
    }

    fetchPosts() {
        $.ajax({
            url: "http://localhost:8080/SMON-SERVICE/publications",

            xhrFields: {
                withCredentials: true
            },
            crossDomain: true,
            type: 'POST',
            data: JSON.stringify({ username: this.props.visituser.username}),
            async: false,
            success: function (msg) {
                if (msg.code == 200) {
                    let receivedposts = JSON.parse(msg.postList)
                    console.log('ESTAN AQUI LOS POSTTT')
                    this.setState({ posts: receivedposts })
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
    fetchSuperfollows() {
        $.ajax({
            url: "http://localhost:8080/SMON-SERVICE/showsuperfollows",
            xhrFields: {
                withCredentials: true
              },
            crossDomain: true,
            type: 'POST',
            data: JSON.stringify({ username: this.props.visituser.username, myusername: this.props.user.username }),
            async: false,
            success: function (msg) {
                if (msg.code == 200) {
                    console.log('Success')
                    this.setState({buttonSFstate: msg.button})
                }
                else {
                    console.log("Error 404")
                }
            }.bind(this)
        });
    }

    fetchSuperfollow() {
        $.ajax({
            url: "http://localhost:8080/SMON-SERVICE/superfollow",
            xhrFields: {
                withCredentials: true
              },
              crossDomain: true,
            type: 'POST',
            data: JSON.stringify({myusername: this.props.user.username, username: this.props.visituser.username }),
            async: false,
            success: function (msg) {
                if (msg.code == 200) {
                    this.fetchSuperfollows();
                }
                else {
                    console.log("Error 404")
                }
            }.bind(this)
        });
    }



    render() {
        if (this.props.visituser.username) {
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
                                <img src={this.props.visituser.picture ? ("data:image/png;base64," + this.props.visituser.picture) : user2} alt="Profile picture" id="profilepic" />
                                <div style={{ textAlign: "center" }}><h2>{this.props.visituser.name}</h2></div>
                            </div>
                            <div id="userHeader">
                                <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-around" }} >
                                    <div id="followItem">
                                        <div>Seguidos<div style={{ textAlign: "center" }}>{this.state.follows.length}</div></div>
                                    </div>
                                    <div id="followItem">
                                        <div>Seguidores<div style={{ textAlign: "center" }}>{this.state.followers.length}</div></div>
                                    </div>
                                </div>
                                <div style={{ textAlign: "center" }}><h2>{this.props.visituser.description}</h2></div>
                            </div>
                        </div>
                        <div id="posts">
                            {(this.state.posts.length != 0) ? this.state.posts.map((p, i) => {
                                return (
                                    <Post publication={p}
                                        index={i}
                                        className="post"
                                    />
                                )
                            }) : <p>No hay publicaciones aún de este usuario</p>}
                        </div>
                    </div>
                    <div style={{ width: "20%" }}>
                        <div style={{ textAlign: "center", width: "100%", fontSize: "20px", marginTop: "8%" }}>
                            <div>Publicaciones<div>{this.state.posts.length}</div></div>
                        </div>
                        <div style={{ textAlign: "center", width: "100%", fontSize: "20px", marginTop: "8%" }}>
                            <div style={{ textAlign: "center", width: "100%", fontSize: "20px", marginTop: "8%" }}>
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
                            </div>
                            <Button color="primary" id="buttonSuperFollow" onClick={() => { this.fetchfollow() }} style={{ color: "white" }}>
                                {this.state.buttonstate ? "Dejar de seguir" : "Seguir"}
                            </Button>
                        </div>
                        <div style={{ textAlign: "center", width: "100%", fontSize: "20px", marginTop: "8%" }}>
                            <Button color="primary" id="buttonSuperFollow" onClick={() => {this.fetchSuperfollow()}} style={{ color: "white" }} >
                                {this.state.buttonSFstate}
                            </Button>
                        </div>
                    </div>
                </div>
            )
        } else {
            return (
                <div style={{ textAlign: "center", width: "100%", fontSize: "20px", marginTop: "8%" }}>
                    Usuario no encontrado
                </div>
            )
        }
    }
}

function mapStateToProps(state) {
    return {
        ...state
    };
}

export default connect(mapStateToProps)(VisitProfile);