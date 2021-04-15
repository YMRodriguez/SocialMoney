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
import $ from 'jquery'

export default function EditProfileForm() {
    const [open, setOpen] = React.useState(false);
    const [state, setState] = React.useState({
        username: 'yimooo',
        picture: '',
        description: '',
        password: '',
        showprofits: '',
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
    const checkError = (part, state) => {
        switch (part) {
            // We may want to make this more secure in the future.
            case "password":
                state.length < 8 ? error = true : error = false;
                return error;
        }
    }

    async function makePostRequest(params) {
        var url = "http://localhost:8080/SMON-SERVICE/editprofile"
        //const formData = new FormData();
        //formData.append("picture", params.picture)
        //formData.append("dato",
        //    new Blob([JSON.stringify(
        //        { "description": params.description, "showprofits": params.showprofits, "password": params.password, "username": params.username })], { type: 'application/json' }))
        const formData = new FormData();
        formData.append("picture", params.picture)
        formData.append("data",
            JSON.stringify(
                { "description": params.description, "showprofits": params.showprofits, "password": params.password, "username": params.username }))
        console.log(formData)
        var res = async () => await fetch("http://localhost:8080/SMON-SERVICE/editprofile", {
            method: "POST",
            body: formData
        }).then(r =>
            console.log(r.json())
            // Need to send the response to the backend
        )
        res()
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
                    <Input type="file" onChange={handleChangePDF} name="picture"> Suba aquí su nueva foto de perfil</Input>
                    <DialogContentText>
                        <h2>Descripcion de usuario</h2>
                    </DialogContentText>
                    <Input type="text" fullWidth onChange={handleChange} name="description" multiline={true}> Suba aquí su nueva foto de perfil</Input>
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

