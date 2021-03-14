import '../App.css';
import React from "react";
import "@fontsource/roboto";
import TagsTabBar from './TagsTabBar';
import user2 from '../user2.png';
import user from '../user.png';
import dow from '../dow.png';
import nasdaq from '../nasdaq.png';
import sp500 from '../sp500.png';
import Button from '@material-ui/core/Button';
import { Link } from "react-router-dom";
import FormDialog from "./FormDialog.js"

function App() {
  return (
    <div className="App" style={{  display: "flex", flexDirection:"row", width:"100%", height:"100%"}}>
      <div style={{ width:"70%"}}>
        <TagsTabBar id="feed" data={user2} />
      </div>
      <div  style={{display: "flex", flexDirection:"column", width:"30%", height: "100%"}}>
          <div style={{display: "flex", flexDirection:"row"}}>
            <div style={{width:"50%", marginTop:"2%"}}><img src={user} style={{width:"80%", float:"left", marginLeft:"35%"}}/></div>
            <div style={{width:"50%" , textAlign:"center"}}><h2 style={{marginTop:"40%"}}> pedro</h2></div>

          </div>
        <div style={{ marginTop:"10%"}}>
            <FormDialog variant="contained"textColor="white" color="primary"  >
              Publicar
            </FormDialog>
        </div>
        <div style={{ marginTop:"1%"}}>
          <Link to="/myprofile" style={{ textDecoration: 'none'}}>
            <Button variant="contained"textColor="white" color="primary" style={{color: "white", width:"80%"}}   id="buttonPublicar">
              Ir a mi perfil
            </Button>
          </Link>
        </div>
        <div style={{width:"100%", marginTop:"2%"}}><img src={nasdaq} style={{width:"80%", marginLeft:"5%"}}/></div>
        <div style={{width:"100%", marginTop:"2%"}}><img src={dow} style={{width:"80%",  marginLeft:"5%"}}/></div>
        <div style={{width:"100%", marginTop:"2%"}}><img src={sp500} style={{width:"80%", marginLeft:"5%"}}/></div>
      </div >
    </div >
  );
}

export default App;
