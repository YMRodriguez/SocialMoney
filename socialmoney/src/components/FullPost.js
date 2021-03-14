// Mostrar contenido de un post entero, no la previsualización que se hace con las tarjetas
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
import FormDialog from "./FormDialog.js"
import dow from '../dow.png';
import nasdaq from '../nasdaq.png';
import sp500 from '../sp500.png';


const useStyles = makeStyles({
    root: {
        maxWidth: 400,
    },
    media: {
        height: 50,
    },
});
function FullPost(props) {
    const classes = useStyles();

    return (
        <div  style={{textAlign: "center", display: "flex", flexDirection:"row", width:"100%", height:"100%"}}>
            <div  style={{ width:"70%"}}>
                <Card id="card" variant="outlined" style={{display: "flex", flexDirection:"column", height: "100%"}}>
                    <CardActionArea>
                        <CardMedia
                            id="media"
                            image={props.user2}
                            title="User"
                        />
                        <CardContent>
                            <div style={{display: "flex", flexDirection:"row", width:"70%", height: "100%"}}>
                            <Link to="/feed" style={{ textDecoration: 'none'}}>
                                <Button variant="contained"textColor="white" color="primary" style={{color: "white", backgroundColor:"green"}}>
                                    {"<-"}
                                </Button>
                            </Link>
                            <Typography gutterBottom variant="h5" component="h2" style={{marginLeft:"10px"}}>
                                Invest in Tesla
                            </Typography>
                            </div>
                            <Typography variant="body2" color="textSecondary" component="p">
                                Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
                                across all continents except Antarctica<br></br>
                                Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
                                across all continents except Antarctica<br></br>
                                Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
                                across all continents except Antarctica<br></br>
                                Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
                                across all continents except Antarctica<br></br>
                                Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
                                across all continents except Antarctica<br></br>
                                Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
                                across all continents except Antarctica<br></br>
                                Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
                                across all continents except Antarctica<br></br>
                                Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
                                across all continents except Antarctica<br></br>
                                Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
                                across all continents except Antarctica<br></br>
                                Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
                                across all continents except Antarctica<br></br>
                                Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
                                across all continents except Antarctica<br></br>
                                Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
                                across all continents except Antarctica<br></br>
                                Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
                                across all continents except Antarctica<br></br>
                                Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
                                across all continents except Antarctica<br></br>
                                Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
                                across all continents except Antarctica<br></br>
                                Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
                                across all continents except Antarctica<br></br>
                                Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
                                across all continents except Antarctica<br></br>
                                Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
                                across all continents except Antarctica<br></br>
                                Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
                                across all continents except Antarctica<br></br>
                                Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
                                across all continents except Antarctica<br></br>
                                Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
                                across all continents except Antarctica<br></br>
                                Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
                                across all continents except Antarctica<br></br>
                                Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
                                across all continents except Antarctica<br></br>
                                Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
                                across all continents except Antarctica<br></br>
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                    <CardActions id="cardactions">
                        <Link to="/author">
                            <UserAvatar user={props.author} id="avatar" />
                        </Link>
                    </CardActions>
                </Card>
            </div>
            <div  style={{display: "flex", flexDirection:"column", width:"30%", height: "100%"}}>
                <div style={{display: "flex", flexDirection:"row"}}>
                    <div style={{width:"50%", marginTop:"2%"}}><img src={props.user} style={{width:"80%", float:"left", marginLeft:"35%"}}/></div>
                    <div style={{width:"50%" , textAlign:"center"}}><h2 style={{marginTop:"40%"}}> pedro</h2></div>
                </div>
                <div style={{ marginTop:"10%"}}>
                    <FormDialog variant="contained"textColor="white" color="primary"  >
                    Publicar
                    </FormDialog>
                </div>
                <div style={{ marginTop:"1%"}}>
                    <Link to="/myprofile" style={{ textDecoration: 'none'}}>
                        <Button variant="contained"textColor="white" color="primary" style={{color: "white", width:"80%"}}   id="buttonPublicar">
                            Ir a mi perfil
                        </Button>
                    </Link>
                </div>
                <div style={{width:"100%", marginTop:"2%"}}><img src={nasdaq} style={{width:"80%", marginLeft:"5%"}}/></div>
                <div style={{width:"100%", marginTop:"2%"}}><img src={dow} style={{width:"80%",  marginLeft:"5%"}}/></div>
                <div style={{width:"100%", marginTop:"2%"}}><img src={sp500} style={{width:"80%", marginLeft:"5%"}}/></div>
            </div >
    </div >
    );
}
export default FullPost;