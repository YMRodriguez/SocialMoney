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

export default function Post(props) {
    const classes = useStyles();
if(props.allowbutton){


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
                <Link to="/postId">
                    <Button size="small" color="primary" id="linktoarticle">
                        Go to full article
                    </Button>
        

                    
                </Link>


                <button  onClick= {() => props.onPressButton()} size="small" color="primary" id="linktoarticle">
                    REMOVE
                </button>
        
{/*                 <Link to="/author">
                    <UserAvatar user={props.author} id="avatar" />
                </Link>  Con el feed hay que tener cuidado con esto. Ahora nos lo podemos cargar.*/}  


                
            </CardActions>
        </Card>
    );

}
else{
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
                <Link to="/postId">
                    <Button size="small" color="primary" id="linktoarticle">
                        Go to full article
                    </Button>
                    </Link>
{/*                 <Link to="/author">
                    <UserAvatar user={props.author} id="avatar" />
                </Link>  Con el feed hay que tener cuidado con esto. Ahora nos lo podemos cargar.*/}  
            </CardActions>
        </Card>
    );
    
}
}