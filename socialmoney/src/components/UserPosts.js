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

export default function UserPost(props) {
    const classes = useStyles();

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
                        Invest in Tesla
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
                        across all continents except Antarctica
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions id="cardactions">
                <Link to="/author/postId">
                    <Button size="small" color="primary" id="linktoarticle">
                        Go to full article
                    </Button>
                </Link>
                <Button size="small" color="primary" id="linktoarticle">
                    Remove
                </Button>
                <Button size="small" color="primary" id="linktoarticle">
                    Edit
                </Button>
            </CardActions>
        </Card>
    );
}