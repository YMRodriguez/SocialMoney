import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import Input from '@material-ui/core/Input';
import FormHelperText from '@material-ui/core/FormHelperText';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { userLogged } from '../redux/actions';
import $ from 'jquery';
import { connect } from 'react-redux';
import { useHistory } from "react-router-dom";



function EditProfileForm(props) {
    const history = useHistory();
    const [open, setOpen] = React.useState(false);
    const [open2, setOpen2] = React.useState(false);
    // Don't think we may include redux state inside the initial state. TODO, fix in Sprint 3.
    const [state, setState] = React.useState({
        picture: '',
        username: props.user.username,
        description: props.user.description,
        password: "",
        showprofits: props.user.showprofits,
        showPassword: '', // This is only relevant to this component.
        passwordDelete: '',
        options: 0
    });

    // Password handlers.
    const handleClickShowPassword = () => {
        setState({ ...state, showPassword: !state.showPassword });
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handleChange = (event) => {
        setState({ ...state, [event.target.name]: event.target.value });
    };

    const handleChangePDF = (event) => {
        setState({ ...state, [event.target.name]: event.target.files[0] });
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClickOpen2 = () => {
        setOpen2(true);
    };




    const handleClickDelete = () => {
        var mensaje = window.confirm("¿Está seguro de eliminar su cuenta y sus posts?");

        if (mensaje) {
            makeDeleteAccount(state)
        }
        else {
        }
    };

    const handleCloseCancelling = () => {
        setOpen(false);
    };

    const handleCloseCancelling2 = () => {
        setOpen2(false);
    };

    const handleCloseConecting = () => {
        if (error) {
            alert("Tiene que rellenar todos los campos.")
        } else {
            setTimeout(() => {
                makePostRequest(state)
            }, 100);
        }
        setOpen(false);
    };

    const handleChangeProfits = (event) => {
        setState({ ...state, [event.target.name]: event.target.checked });
    };


    let error = false;
    const checkError = (part, data) => {
        switch (part) {
            // We may want to make this more secure in the future.
            case "password":
                data.length > 1 && !data.lenght > 8 ? error = true : error = false;
                return error;
        }
    }

    async function makePostRequest(params) {
        console.log(params.password.length)
        if (params.description === undefined) {
            params.description = ""
        }
        console.log(params.description)
        if (params.password.length > 0) {
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
        }
        var url = "http://localhost:8080/SMON-SERVICE/editprofile"
        const formData = new FormData();
        formData.append("picture", params.picture)
        formData.append("data",
            JSON.stringify(
                { "description": params.description, "showprofits": params.showprofits, "password": params.password, "username": params.username }))
        $.ajax({
            url: url,
            xhrFields: {
                withCredentials: true
              },
            crossDomain: true,
            type: 'POST',
            data: formData,
            xhrFields: {
                withCredentials: true
            },
            crossDomain: true,
            contentType: false,
            processData: false,
            async: false, //va a esperar la respuesta del servidor, si lo pongo true => asyncrono no hacer
            success: function (msg) {
                if (msg.code == 200) {
                    let account = JSON.parse(msg.account)
                    let base64String = btoa(String.fromCharCode(...new Uint8Array(account.picture)));
                    // This is kind of a dirty fix and should be a generic method.
                    account.picture = base64String
                    console.log(account)
                    props.dispatch(userLogged(account))
                } else {
                    alert("No se ha podido editar el perfil")
                }
            }
        });
        props.onClose();
    }


    async function makeDeleteAccount(params) {
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
        var crypted = rsa.encrypt(params.passwordDelete);
        params.passwordDelete = crypted;
        console.log(JSON.stringify(params))
        var url = "http://localhost:8080/SMON-SERVICE/deleteAccount"
        $.ajax({
            url: url,
            xhrFields: {
                withCredentials: true
              },
            crossDomain: true,
            type: 'POST',
            data: JSON.stringify(params),
            contentType: false,
            processData: false,
            async: false,
            success: function (msg) {
                if (msg.code == 200) {
                    alert("Cuenta y posts borrados con exito\n¡Nos vemos pronto!")
                    history.push("/")
                } else {
                    alert("No se ha podido borrar la cuenta. Intentelo más tarde")
                }
            }
        });
    }

    return (
        <div>
            <Button onClick={handleClickOpen} id="buttonSuperFollow" style={{ color: "white", width: "35%" }}>
                Editar perfil
            </Button>
            <Button onClick={handleClickOpen2} id="buttonDelete" style={{ backgroundColor: 'red', color: "white", width: "35%" }}>
                Eliminar perfil
            </Button>
            <Dialog paperWidthLg open={open} fullWidth={true} aria-labelledby="form-dialog-title" style={{ color: "white", width: "80%" }}>
                <DialogContent>
                    <DialogContentText>
                        <h2>Foto de perfil</h2>
                    </DialogContentText>
                    <Input type="file" onChange={handleChangePDF} name="picture" > Suba aquí su nueva foto de perfil</Input>
                    <DialogContentText>
                        <h2>Descripcion de usuario</h2>
                    </DialogContentText>
                    <Input type="text" fullWidth onChange={handleChange} name="description" multiline={true} value={state.description ? state.description : ""}></Input>
                    <DialogContentText>
                        <h2>Nueva contraseña</h2>
                    </DialogContentText>
                    <OutlinedInput
                        id="password"
                        name="password"
                        fullWidth
                        type={state.showPassword ? 'text' : 'password'}
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
                    <DialogContentText>
                        <h2>Opciones de usuario</h2>
                    </DialogContentText>
                    <FormControlLabel
                        control={<Checkbox checked={state.showprofits} onChange={handleChangeProfits} name="showprofits" />}
                        label="Mostrar la rentabilidad al público"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseCancelling} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleCloseConecting} color="primary">
                        Conectar
                    </Button>
                </DialogActions>
            </Dialog>

            <Dialog paperWidthLg open={open2} fullWidth={true} aria-labelledby="form-dialog-title" style={{ color: "white", width: "80%" }}>
                <DialogContent>
                    <DialogContentText>
                        <h2>Para eliminar cuenta y posts introduzca la contraseña de su cuenta</h2>
                    </DialogContentText>
                    <OutlinedInput
                        id="passwordDelete"
                        name="passwordDelete"
                        fullWidth
                        type={state.showPassword ? 'text' : 'password'}
                        value={state.passwordDelete}
                        label="Contraseña2"
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
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseCancelling2} color="primary">
                        Cancel
                        </Button>
                    <Button onClick={handleClickDelete} color="primary">
                        Eliminar cuenta
                        </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

function mapStateToProps(state) {
    return {
        ...state
    };
}

//export default App;
export default connect(mapStateToProps)(EditProfileForm);
