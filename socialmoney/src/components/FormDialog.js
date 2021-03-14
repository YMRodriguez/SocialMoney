import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function FormDialog() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button onClick={handleClickOpen} id="buttonPublicar" style={{color: "white", width:"80%"}}>
        Publicar
      </Button>
      <Dialog paperWidthLg	open={open} onClose={handleClose} fullWidth={true} aria-labelledby="form-dialog-title" style={{color: "white", width:"80%"}}>
        <DialogTitle id="form-dialog-title">Nueva Publicación</DialogTitle>
        <DialogContent>
          <DialogContentText>
          <h2>Título</h2>
          </DialogContentText>
          <TextField
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
            autoFocus
            margin="dense"
            id="name"
            label="Contenido"
            type="email"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleClose} color="primary">
            Publicar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

