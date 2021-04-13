import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import $ from 'jquery'

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Button color="inherit" href="https://material-ui.com/">
                Your Website
            </Button>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

export default function LogIn() {
    const history = useHistory();
    const classes = useStyles();
    
    const [open, setOpen] = React.useState(false);
    const [state, setState] = React.useState({
        username: "",
        password: ""
    });

    const handleSubmit = () =>{
        setTimeout(() => {
        makePostRequest(state) 
        }, 100);
    };
    async function makePostRequest(params){

        var url = "http://localhost:8080/SMON-SERVICE/login"
        $.ajax({
        url: url,
        type: 'POST',
        data: JSON.stringify(params),
        async: false, //va a esperar la respuesta del servidor, si lo pongo true => asyncrono no hacer
        success: function (msg) {
            if (msg.code == 200){
                history.push("/feed")
                console.log(msg.account)
            }else{
                alert("Usuario incorrecto")
            }
            }
        }); 
    }

    const handleChange = (event) => {
        setState({ ...state, [event.target.name]: event.target.value });
    };

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Log in
                </Typography>
                <form className={classes.form} noValidate>
                    <TextField
                        
                        onChange={handleChange}
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="username"
                        label="username"
                        name="username"
                        autoComplete="username"
                        autoFocus
                    />
                    <TextField
                        onChange={handleChange}
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                    />
                        <Button
                            onClick={handleSubmit}
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                        >
                            Log In
                        </Button>
                    <Grid container>
                        <Grid item>
                            <Link to='/signup'>
                                <Button href="#" variant="body2">
                                    Don't have an account? Sign Up
                            </Button>
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
            <Box mt={8}>
                <Copyright />
            </Box>
        </Container>
    );
}