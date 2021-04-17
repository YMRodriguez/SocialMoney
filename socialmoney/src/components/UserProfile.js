import React from "react";
import Button from '@material-ui/core/Button';
import Post from './Post';
import { Link } from "react-router-dom";
import ConnectPlatformForm from "./ConnectPlatformForm.js";
import EditProfileForm from "./EditProfileForm.js";
import { connect } from 'react-redux';
import $ from 'jquery';
import user2 from '../user2.png';


class UserProfile extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            posts: [],
        }
    }

    async componentDidMount() {
        this.fetchPosts();
    }

    fetchPosts() {
        $.ajax({
            url: "http://localhost:8080/SMON-SERVICE/publications",
            type: 'POST',
            data: JSON.stringify({ username: this.props.user.username }),
            async: false,
            success: function (msg) {
                if (msg.code == 200) {
                    let receivedposts = JSON.parse(msg.postList)
                    console.log('Success')
                    console.log(receivedposts);
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

    fetchPublications(p) {
        $.ajax({
            url: "http://localhost:8080/SMON-SERVICE/deletePost",
            type: 'POST',
            data: JSON.stringify({ id: p.id }),
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
                            <img src={this.props.user.picture ? ("data:image/png;base64," + this.props.user.picture) : user2} alt="Profile picture" id="profilepic" />
                            <div style={{ textAlign: "center" }}><h2>@{this.props.user.username}</h2></div>
                        </div>
                        <div id="userHeader">
                            <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-around" }} >
                                <EditProfileForm color="primary" id="buttonFollow" style={{ color: "white" }} user={this.props.user}>
                                </EditProfileForm>
                                <div id="followItem">
                                    <div>Seguidores<div style={{ textAlign: "center" }}>N</div></div>
                                </div>
                                <div id="followItem">
                                    <div>Seguidos<div style={{ textAlign: "center" }}>N</div></div>
                                </div>
                            </div>
                            <div style={{ textAlign: "center" }}><h2>{this.props.user.description}</h2></div>
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
                        <div>Publicaciones<div>{this.state.posts.length}</div></div>
                    </div>
                    <div style={{ textAlign: "center", width: "100%", fontSize: "20px", marginTop: "8%" }}>
                        <div>Rentabilidad<div style={{ textAlign: "center", width: "100%" }}>N%</div>
                        </div>
                    </div>
                    <div style={{ textAlign: "center", width: "100%", fontSize: "20px", marginTop: "8%" }}>
                        <ConnectPlatformForm color="primary" id="buttonSuperFollow" style={{ color: "white" }}>
                        </ConnectPlatformForm>
                        <Button color="primary" id="buttonSuperFollow" style={{ color: "white", marginTop: "8%" }}>
                            Gestionar SuperFollows
                    </Button>
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