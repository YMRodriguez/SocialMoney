import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import MenuItem from '@material-ui/core/MenuItem';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Input from '@material-ui/core/Input';
import FormHelperText from '@material-ui/core/FormHelperText';
import $ from 'jquery';


export default function ConnectPlatformForm(props) {
    const [open, setOpen] = React.useState(false);
    const [state, setState] = React.useState({
        platform: '',
        timeframe: '',
        file: ''
    });

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
        if (state.platform === "" || state.timeframe === "" || state.file === "") {
            alert("Tiene que rellenar todos los campos.")
        } else {
            const formData = new FormData();
            formData.append("pdf", state.file)
            formData.append("settings",
                new Blob([JSON.stringify(
                    { "platform": state.platform, "timeframe": state.timeframe })], { type: 'application/json' }))
            var res = async () => await fetch("http://127.0.0.1:5000/checkInteractiveBrokers", {
                method: "POST",
                body: formData
            }).then(r =>
                r.json()
            ).then(d => {
                $.ajax({
                    url: "http://localhost:8080/SMON-SERVICE/validateProfits",
                    type: 'POST',
                    data: JSON.stringify(d),
                    xhrFields: {
                        withCredentials: true
                    },
                    crossDomain: true,
                    async: false,
                    success: function (msg) {
                        if (msg.code == 200) {
                            console.log('Success')
                        }
                        else if (msg.code == 300) {
                            alert("Not a valid PDF")
                            console.log('Not a valid PDF! Please check what you uploaded')
                        }
                        else {
                            console.log("Error 404")
                        }
                    }.bind(this)
                });
            }
            )
            res()
            setOpen(false);
        }
        props.onClose();
    };

    return (
        <div>
            <Button onClick={handleClickOpen} id="buttonSuperFollow" style={{ color: "white", width: "80%" }}>
                Conectar Rentabilidad
            </Button>
            <Dialog paperWidthLg open={open} fullWidth={true} aria-labelledby="form-dialog-title" style={{ color: "white", width: "80%" }}>
                <DialogContent>
                    <DialogContentText>
                        <h2>Plataforma de negociación</h2>
                    </DialogContentText>
                    <Select
                        value={state.platform}
                        fullWidth
                        margin="dense"
                        name="platform"
                        onChange={handleChange}
                    >
                        <MenuItem value=""><em>None</em></MenuItem>
                        <MenuItem value="InteractiveBrokers" >InteractiveBrokers</MenuItem>
                    </Select>
                    <DialogContentText>
                        <h2>Franja de tiempo</h2>
                    </DialogContentText>
                    <Select
                        value={state.timeframe}
                        fullWidth
                        margin="dense"
                        name="timeframe"
                        onChange={handleChange}
                    >
                        <MenuItem value=""><em>None</em></MenuItem>
                        <MenuItem value="Daily" >Diario</MenuItem>
                        <MenuItem value="Monthly" >Mensual</MenuItem>
                        <MenuItem value="YearToDate">Anual</MenuItem>
                    </Select>
                    <FormHelperText>Required</FormHelperText>
                </DialogContent>
                <FormControl component="fieldset" style={{ marginLeft: "5%", marginTop: "1%" }}>
                    <FormLabel component="legend">Por favor, suba el informe correspondiente a la negociación en la franja de tiempo seleccionada</FormLabel>
                    <Input type="file" onChange={handleChangePDF} name="file" placeholder="hola"> Suba aquí su informe</Input>
                </FormControl>
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

