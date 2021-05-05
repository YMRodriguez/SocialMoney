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
import { useHistory } from "react-router-dom";
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputAdornment from '@material-ui/core/InputAdornment';
import InputLabel from '@material-ui/core/InputLabel';
import IconButton from '@material-ui/core/IconButton';
import FormHelperText from '@material-ui/core/FormHelperText';
import $ from 'jquery'

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Button color="inherit" href="https://material-ui.com/">
                SOCIALMONEY S.L
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
    const history = useHistory();
    const classes = useStyles();
    const [state, setState] = React.useState({
        username: "",
        password: "",
        age: "",
        name: "",
        showPassword: false,
    });

    // Password handlers.
    const handleClickShowPassword = () => {
        setState({ ...state, showPassword: !state.showPassword });
    };
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    // Helper to submit.
    let checker = arr => arr.every(v => v === false);
    let errors = [false, false, false, false];

    const handleSubmit = () => {
        if (checker(errors)) {
            setTimeout(() => {
                makePostRequest(state)
            }, 100);
        } else {
            alert("Complete los campos necesarios antes de crear la cuenta.")
        }
    };

    const handleChange = (event) => {
        setState({ ...state, [event.target.name]: event.target.value });
    }

    const checkError = (part, state) => {
        switch (part) {
            case "name":
                state.length < 5 ? errors[0] = true : errors[0] = false;
                return errors[0];
            case "age":
                state.length <1 || parseInt(state) < 18 ? errors[1] = true : errors[1] = false;
                return errors[1];
            // We may want to make this more secure in the future.
            case "username":
                state.length < 5 ? errors[2] = true : errors[2] = false;
                return errors[2];
            case "password":
                state.length < 8 ? errors[3] = true : errors[3] = false;
                return errors[3];
        }
    }

    async function makePostRequest(params) {
        var url = "http://localhost:8080/SMON-SERVICE/signup"
        var pub_key = "MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAw2rr575OZJCQ8DFCcS4J+DZ/QJ4CUNAAxs8HtubRTKrLAqMRdS8yanNDyGBmYg8KGmNSDwV3/5jYDFVvJeStmHPW+45PShi0uOUhmBBFy2NOErkXzCV3l7Q5zTYhuYKQp55HU71OYahZRBVl8Ku13OpS47OX8zvZpQrjcg1Q4g/juZ6M4w+Ur0EovRtldKEzJwQnfAPeTU6NkYy/nAcayrkSPjAqkrCTC9EYAD3wl3x5LfxlJUL6gfI0Rcqr+NxDzXChZReucOPDrh4Jsnp5r45uLyGs4QH7Gvlx6cpUdILVFn634m2ZSxIc6Av77ZCao5/ii5GcyS0Zsl3RTC1dUQIDAQAB"
        var pidCrypt = require("pidcrypt")
        require("pidcrypt/rsa")
        
        var rsa = new pidCrypt.RSA();
        var pidCryptUtil = require("pidcrypt/pidcrypt_util")
        var pem = pidCryptUtil.decodeBase64(pub_key);
        require("pidcrypt/asn1")
        var asn = pidCrypt.ASN1.decode(pidCryptUtil.toByteArray(pem));
        var tree = asn.toHexTree();
        rsa.setPublicKeyFromASN(tree);
        var crypted = rsa.encrypt(params.password);
        params.password = crypted;
        $.ajax({
            url: url,
            type: 'POST',
            data: JSON.stringify(params),
            async: false, //va a esperar la respuesta del servidor, si lo pongo true => asyncrono no hacer
            success: function (msg) {
                if (msg.code == 200) {
                    history.push("/login")
                } else {
                    alert(msg.mensaje)
                }
            }
        });
    }

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
                        <Grid item xs={12}>
                            <TextField
                                onChange={handleChange}
                                error={checkError("name", state.name)}
                                autoComplete="name"
                                name="name"
                                variant="outlined"
                                required
                                fullWidth
                                id="name"
                                label="Nombre y apellidos"
                                autoFocus
                                helperText="Introduzca su nombre y apellidos"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                onChange={handleChange}
                                variant="outlined"
                                error={checkError("age", state.age)}
                                required
                                fullWidth
                                type="number"
                                id="age"
                                name="age"
                                label="Edad"
                                helperText="Intruzca su edad, debe ser mayor de 18 años"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                onChange={handleChange}
                                variant="outlined"
                                error={checkError("username", state.username)}
                                required
                                fullWidth
                                id="username"
                                label="Nombre de usuario"
                                name="username"
                                autoComplete="username"
                                helperText="Será su identificador dentro en la aplicación, debe tener al menos 5 caracteres"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <InputLabel htmlFor="outlined-adornment-password">Contraseña</InputLabel>
                            <OutlinedInput
                                id="password"
                                name="password"
                                fullWidth
                                type={state.showPassword ? 'text' : 'password'}
                                value={state.password}
                                error={checkError("password", state.password)}
                                label="Contraseña"
                                autoComplete="current-password"
                                onChange={handleChange}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                            edge="end"
                                        >
                                            {state.showPassword ? <Visibility /> : <VisibilityOff />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                                labelWidth={70}
                            />
                            <FormHelperText id="standard-weight-helper-text">Su contraseña debe tener al menos 8 caracteres</FormHelperText>
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