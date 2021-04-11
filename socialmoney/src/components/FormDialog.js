import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Checkbox from '@material-ui/core/Checkbox';
import $ from 'jquery'

export default function FormDialog() {
  const [open, setOpen] = React.useState(false);
  const [state, setState] = React.useState({
    opinion: false,
    atec: false,
    afun: false,
    comm: false,
    title: "",
    content: "",
    author: "manolo" //cambiar con lo que venga de login....

  });

   async function makePostRequest(params){

    var url = "http://localhost:8080/SMON-SERVICE/createPost"
     $.ajax({
      url: url,
      type: 'POST',
      data: params,
      async: false, //va a esperar la respuesta del servidor, si lo pongo true => asyncrono no hacer
      success: function (msg) {
          if (msg == "OK") {
          handleClose()
          alert("¡Publicado con éxito!")
          console.log('Success')
          }
      }
    }); 

    // ESTO NO LO HE CONSEGUIDO POR AQUI.... asique lo que me mande JS lo cambio en el back

   /*  var response = await fetch(url,{
      method: 'POST',
      credentials: "include",
      body: JSON.stringify(params), // data can be `string` or {object}!
      headers:{
          'Content-Type': 'application/json'
      }
    })
    return response */
  } 
 

    const handleSubmit = () =>{
    setTimeout(() => {
      makePostRequest(state) //envia la peticion al java, le paso el estado (el contenido del post)
    }, 100);
  };
 


  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  const handleChangeText = (event) => {
    setState({ ...state, [event.target.name]: event.target.value });
  };




  const { opinion, atec, afun, comm } = state;
  const error = [opinion, atec, afun].filter((v) => v).length < 1;

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  return (
    <div>
      <Button onClick={handleClickOpen} id="buttonPublicar" style={{ color: "white", width: "80%" }}>
        Publicar
      </Button>
      <Dialog paperWidthLg open={open} onClose={handleClose} fullWidth={true} aria-labelledby="form-dialog-title" style={{ color: "white", width: "80%" }}>
        <DialogTitle id="form-dialog-title">Nueva Publicación</DialogTitle>
        <DialogContent>
          <DialogContentText>
            <h2>Título</h2>
          </DialogContentText>
          <TextField
            onChange={handleChangeText}
            name="title"
            autoFocus
            margin="dense"
            id="name"
            label="Titulo"
            type="email"
            fullWidth
          />
          <DialogContentText>
            <h2>Contenido</h2>
          </DialogContentText>
          <TextField
            onChange={handleChangeText}
            name="content"
            autoFocus
            margin="dense"
            id="name"
            label="Contenido"
            type="email"
            fullWidth
          />
        </DialogContent>
        <FormControl required error={error} component="fieldset" style={{ marginLeft: "5%", marginTop: "1%" }}>
          <FormLabel component="legend">Seleccione al menos una opción</FormLabel>
          <FormGroup>
            <FormControlLabel
              control={<Checkbox checked={opinion} onChange={handleChange} name="opinion" />}
              label="Opinión"
            />
            <FormControlLabel
              control={<Checkbox checked={atec} onChange={handleChange} name="atec" />}
              label="Análisis Técnico"
            />
            <FormControlLabel
              control={<Checkbox checked={afun} onChange={handleChange} name="afun" />}
              label="Análisis Fundamental"
            />
          </FormGroup>
        </FormControl>
        <FormControl component="fieldset" style={{ marginLeft: "5%", marginTop: "1%" }}>
          <FormLabel component="legend">Indique si este post es exclusivo de comunidad</FormLabel>
          <FormGroup>
            <FormControlLabel
              control={<Checkbox checked={comm} onChange={handleChange} name="comm" />}
              label="Sólo comunidad"
            />
          </FormGroup>
        </FormControl>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Publicar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );



}


