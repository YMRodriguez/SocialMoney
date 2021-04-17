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


function EditProfileForm(props) {
    const [open, setOpen] = React.useState(false);
    // Don't think we may include redux state inside the initial state. TODO, fix in Sprint 3.
    const [state, setState] = React.useState({
        picture: '',
        username: props.user.username,
        description: props.user.description,
        password: props.user.password,
        showprofits: props.user.showprofits,
        showPassword: '', // This is only relevant to this component.
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

    const handleCloseCancelling = () => {
        setOpen(false);
    };

    const handleCloseConecting = () => {
        if (error) {
            alert("Tiene que rellenar todos los campos.")
        } else {
            setTimeout(() => {
                console.log(state)
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
                data.length < 8 ? error = true : error = false;
                return error;
        }
    }

    async function makePostRequest(params) {
        var url = "http://localhost:8080/SMON-SERVICE/editprofile"
        const formData = new FormData();
        formData.append("picture", params.picture)
        formData.append("data",
            JSON.stringify(
                { "description": params.description, "showprofits": params.showprofits, "password": params.password, "username": params.username }))

        $.ajax({
            url: url,
            type: 'POST',
            data: formData,
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
    }

    return (
        <div>
            <Button onClick={handleClickOpen} id="buttonSuperFollow" style={{ color: "white", width: "80%" }}>
                Editar perfil
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
                    <Input type="text" fullWidth onChange={handleChange} name="description" multiline={true} value={state.description}> Suba aquí su nueva foto de perfil</Input>
                    <DialogContentText>
                        <h2>Nueva contraseña</h2>
                    </DialogContentText>
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
