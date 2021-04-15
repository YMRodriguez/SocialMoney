import React from "react";
import Button from '@material-ui/core/Button';
import Post from './Post';
import { Link } from "react-router-dom";
import ConnectPlatformForm from "./ConnectPlatformForm.js";
import EditProfileForm from "./EditProfileForm.js";
import {connect} from 'react-redux';
import $ from 'jquery';

class UserProfile extends React.Component {

    constructor(props){
        super(props);
        this.state = {posts: []}
    }

    async componentDidMount() {

        $.ajax({
            url: "http://localhost:8080/SMON-SERVICE/publications",
            type: 'POST',
            data: JSON.stringify({username: this.props.user.username}),
            async: false, 
            success: function (msg) {
                if (msg.code == 200) {
                  let receivedposts = JSON.parse(msg.postList)
                  alert("¡Posts recogidos con éxito!")
                  console.log('Success')
                  console.log(receivedposts);
                  this.setState({posts: receivedposts})
                }
                else if(msg.code == 204) {
                    alert("¡Posts recogidos con éxito!")
                    console.log('Success')
                }
                else{
                  console.log("Error 404")
                }
            }
          });

    }


    render(){
        return (
            <div style={{  display: "flex", flexDirection:"columns"}}>
                <div style={{width: "80%"}}>
                    <div style={{  display: "flex", flexDirection:"row"}}>
                        <Link to="/feed" style={{ textDecoration: 'none'}}>
                            <Button variant="contained"textColor="white" color="primary" style={{color: "white", backgroundColor:"green", marginLeft:"10%", marginTop:"10%"}}>
                                {"<-"}
                            </Button>
                        </Link>
                        <div id="profileimgname">
                            <img src={this.props.user} alt="Pofile" id="profilepic" />
                            <div style={{textAlign:"center"}}><h2>@{this.props.user.username}</h2></div>
                        </div>
                        <div id="userHeader">
                            <div style={{  display: "flex", flexDirection:"row", justifyContent:"space-around"}} >
                                <EditProfileForm color="primary" id="buttonFollow" style={{ color: "white" }}>
                                </EditProfileForm>
                                <div id="followItem">
                                    <div>Seguidores<div style={{textAlign:"center"}}>N</div></div>
                                </div>
                                <div id="followItem">
                                    <div>Seguidos<div style={{textAlign:"center"}}>N</div></div>
                                </div>
                            </div>
                            <div style={{textAlign:"center"}}><h2>Aqui va la descripción de {this.props.user.name}</h2></div>
                        </div>
                    </div>
                    <div id="posts">
                    {(this.state.posts.length != 0) ? this.state.posts.map((post, i) => {
                    return (
                            <Post post={post[i]}
                                    index={i}
                                    className="post"
                                    />
                                )}) : <p>No hay publicaciones aún de este usuario</p>}
                    </div>
                </div>
                <div style={{width: "20%"}}>
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
}

function mapStateToProps(state) {
    return {
      ...state
    };
  }
  
  export default connect(mapStateToProps)(UserProfile);