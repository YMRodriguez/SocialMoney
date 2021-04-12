import React from "react";
import Button from '@material-ui/core/Button';
import Post from './Post';
import { Link } from "react-router-dom";
import ConnectPlatformForm from "./ConnectPlatformForm.js";

function UserProfile(props) {
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
                        <img src={props.user} alt="Pofile" id="profilepic" />
                        <div style={{ textAlign: "center" }}><h2>{props.name}</h2></div>
                    </div>
                    <div id="userHeader">
                        <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-around" }} >
                            <Button color="primary" id="buttonFollow" style={{ color: "white" }}>
                                Editar
                            </Button>
                            <div id="followItem">
                                <div>Seguidores<div style={{ textAlign: "center" }}>N</div></div>
                            </div>
                            <div id="followItem">
                                <div>Seguidos<div style={{ textAlign: "center" }}>N</div></div>
                            </div>
                        </div>
                        <div style={{ textAlign: "center" }}><h2>Aqui va la descripción de pedro</h2></div>
                    </div>
                </div>
                <div id="posts">
                    <Post></Post>
                </div>
            </div>
            <div style={{ width: "20%" }}>
                <div style={{ textAlign: "center", width: "100%", fontSize: "20px", marginTop: "8%" }}>
                    <div>Publicaciones<div>N</div></div>
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

export default UserProfile;