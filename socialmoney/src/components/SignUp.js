import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
// button has a property type that if it is 'submit' makes a query.
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Link } from "react-router-dom";
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
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

export default function SignUp() {
    const classes = useStyles();
    const [state, setState] = React.useState({
        username: "",
        password: "",
        age: "",
        name: ""
    });

    const handleSubmit = () =>{
        setTimeout(() => {
        makePostRequest(state) 
        }, 100);
    };


    async function makePostRequest(params){
        var url = "http://localhost:8080/SMON-SERVICE/signup"
        var response = await fetch(url,{
            method: 'POST',
            credentials: "include",
            body: JSON.stringify(params), // data can be `string` or {object}!
            headers:{
                "Access-Control-Allow-Methods": "OPTIONS,POST,GET",
                'Access-Control-Allow-Origin': 'http://localhost:3000',
                "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept",
                'Content-Type': 'application/json'
            }
        })
        response = response.json()
        return response
    }
    // async function makePostRequest(params){

    //     var url = "http://localhost:8080/SMON-SERVICE/signup"
    //      $.ajax({
    //       url: url,
    //       type: 'POST',
    //       data: params,
    //       async: false, //va a esperar la respuesta del servidor, si lo pongo true => asyncrono no hacer
    //       success: function (msg) {
    //           if (msg == "OK") {
    //           alert("¡Publicado con éxito!")
    //           console.log('Success')
    //           }
    //       }
    //     }); 
    // }

    // async function makePostRequest(params){
    //     var url = "http://localhost:8080/SMON-SERVICE/signup"
    //     var response = await fetch(url,{
    //         method: 'POST',
    //         credentials: "include",
    //         body: JSON.stringify(params), // data can be `string` or {object}!
    //         headers:{
    //             'Content-Type': 'application/json'
    //         }
    //       })
    //     var buffer = await response.arrayBuffer()
    //     var dataView = new DataView(buffer)
    //     var decoder = new TextDecoder("ISO-8859-1")
    //     response = await JSON.parse(decoder.decode(dataView))
    //     return response
    // }

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
                    Sign up
                </Typography>
                <form className={classes.form} noValidate>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                onChange={handleChange}
                                autoComplete="name"
                                name="name"
                                variant="outlined"
                                required
                                fullWidth
                                id="name"
                                label="name"
                                autoFocus
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                onChange={handleChange}
                                variant="outlined"
                                required
                                fullWidth
                                id="agee"
                                name="age"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                onChange={handleChange}
                                variant="outlined"
                                required
                                fullWidth
                                id="username"
                                label="username"
                                name="username"
                                autoComplete="username"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                onChange={handleChange}
                                variant="outlined"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                            />
                        </Grid>
                    </Grid>
                    <Button
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        onClick={handleSubmit}
                    >
                        Sign Up
                    </Button>
                    <Grid container justify="flex-end">
                        <Grid item>
                            <Link to='/login'>
                                <Button href="#" variant="body2">
                                    Already have an account? Sign in
                            </Button>
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
            <Box mt={5}>
                <Copyright />
            </Box>
        </Container>
    );
}