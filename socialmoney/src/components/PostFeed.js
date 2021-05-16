import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Link } from "react-router-dom";
import UserAvatar from './UserAvatar';


const useStyles = makeStyles({
    root: {
        maxWidth: 400,
    },
    media: {
        height: 50,
    },
});

export default function PostFeed(props) {
    const classes = useStyles();
    if (props.allowbutton) {
        return (
            <Card id="card" variant="outlined">
                <CardActionArea>
                    <CardMedia
                        id="media"
                        image={props.user2}
                        title="User"
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                            {props.publication.title}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                            {props.publication.content}
                        </Typography>
                    </CardContent>
                </CardActionArea>
                <CardActions id="cardactions">
                    {props.publication.isexclusive ?
                        <Button id="buttonInPost"><p>Community content from  <b>{props.publication.author.name}</b></p></Button> :
                        <Button id="buttonInPost2"><p>Content from  <b>{props.publication.author.name}</b></p></Button>}

                    {/*                 <Link to="/author">
                    <UserAvatar user={props.author} id="avatar" />
                </Link>  Con el feed hay que tener cuidado con esto. Ahora nos lo podemos cargar.*/}



                </CardActions>
            </Card >
        );

    }
    else {
        return (
            <Card id="card" variant="outlined">
                <CardActionArea>
                    <CardMedia
                        id="media"
                        image={props.user2}
                        title="User"
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                            {props.publication.title}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                            {props.publication.content}
                        </Typography>
                    </CardContent>
                </CardActionArea>
                <CardActions id="cardactions">
                    {/*                 <Link to="/author">
                    <UserAvatar user={props.author} id="avatar" />
                </Link>  Con el feed hay que tener cuidado con esto. Ahora nos lo podemos cargar.*/}
                </CardActions>
            </Card>
        );

    }
}