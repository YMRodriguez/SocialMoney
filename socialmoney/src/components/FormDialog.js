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
import Checkbox from '@material-ui/core/Checkbox';
import $ from 'jquery'

export default function FormDialog(props) {
  const [open, setOpen] = React.useState(false);
  const [state, setState] = React.useState({
    opinion: false,
    atec: false,
    afun: false,
    comm: false,
    title: "",
    content: "",
    author: "",

  });

  async function makePostRequest(params) {

    console.log(state.author)

    var url = "http://localhost:8080/SMON-SERVICE/createPost"

    if ((state.afun || state.atec || state.opinion) && ((state.content != "") && (state.title != "")) && (state.author)) {

      $.ajax({
        url: url,
        type: 'POST',
        data: JSON.stringify(params),
        async: false,
        success: function (msg) {
          if (msg.code == 200) {
            handleClose()
            alert("¡Publicado con éxito!")
            console.log('Success')
          }
          else {
            alert("Error 404")
            console.log("Error 404")
          }
        }
      });

    }
    else {
      if (!(state.afun && state.atec && state.opinion)) {
        alert("Por favor, seleccione al menos una opción ")
      }

      if (state.content == "") {
        alert("Por favor, rellene un contenido")
      }
      if (state.title == "") {
        alert("Por favor, rellene un titulo")
      }
    }
  }


  const handleSubmit = () => {
    setTimeout(() => {
      makePostRequest(state)
    }, 100);
  };



  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  const handleChangeText = (event) => {
    setState({ ...state, [event.target.name]: event.target.value });
  };




  /*const { opinion, atec, afun, comm } = state;*/
  const error = [state.opinion, state.atec, state.afun].filter((v) => v).length < 1;

  const handleClickOpen = () => {
    setState({ ...state, author: props.user.username })
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
            type="text"
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
            type="text"
            fullWidth
            multiline={true}
          />
        </DialogContent>
        <FormControl required error={error} component="fieldset" style={{ marginLeft: "5%", marginTop: "1%" }}>
          <FormLabel component="legend">Seleccione al menos una opción</FormLabel>
          <FormGroup>
            <FormControlLabel
              control={<Checkbox checked={state.opinion} onChange={handleChange} name="opinion" />}
              label="Opinión"
            />
            <FormControlLabel
              control={<Checkbox checked={state.atec} onChange={handleChange} name="atec" />}
              label="Análisis Técnico"
            />
            <FormControlLabel
              control={<Checkbox checked={state.afun} onChange={handleChange} name="afun" />}
              label="Análisis Fundamental"
            />
          </FormGroup>
        </FormControl>
        <FormControl component="fieldset" style={{ marginLeft: "5%", marginTop: "1%" }}>
          <FormLabel component="legend">Indique si este post es exclusivo de comunidad</FormLabel>
          <FormGroup>
            <FormControlLabel
              control={<Checkbox checked={state.comm} onChange={handleChange} name="comm" />}
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