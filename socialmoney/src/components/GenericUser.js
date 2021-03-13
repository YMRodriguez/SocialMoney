import React from "react";
import Button from '@material-ui/core/Button';
import Post from './Post';

function GenericUser(props) {
    return (
        <div>
            <img src={props.user2} alt="Pofile" id="profilepic" />
            <div id="userHeader">
                <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                    id="buttonFollow"
                >
                    Seguir
                </Button>
                <div id="followItem">
                    <text>N</text>
                    <text>Seguidores</text>
                </div>
                <div id="followItem">
                    <text>N</text>
                    <text>Seguidos</text>
                </div>
            </div>
            <div id="posts">
                <Post></Post>
            </div>
        </div>
    )
}

export default GenericUser;