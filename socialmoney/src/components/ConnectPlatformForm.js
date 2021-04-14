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


export default function ConnectPlatformForm() {
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
        console.log(state.file)
        setOpen(false);
    };

    const handleCloseConecting = () => {
        // TODO, hacer aquí la peticion
        setOpen(false);
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
                    <Input type="file" defaultValue={"nada seleccionado"} onChange={handleChangePDF} name="file"> Suba aquí su informe</Input>
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

