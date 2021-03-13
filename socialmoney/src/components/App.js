import '../App.css';
import React from "react";
import "@fontsource/roboto";
import ButtonAppBar from './ButtonAppBar';
import TagsTabBar from './TagsTabBar';
import logo from '../logo.png';
import user from '../user.png';
import user2 from '../user2.png';
import Button from '@material-ui/core/Button';
import { Link } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <div className="feedAndLateral">
        <TagsTabBar id="feed" data={user2} />
        <div id="lateral">
          <Link to="/posting">
            <Button
              fullWidth
              variant="contained"
              color="primary"
              id="buttonPublicar"
            >
              Publicar
            </Button>
          </Link>
          <div className="marketdata">
          </div>
        </div>

      </div>

    </div >
  );
}

export default App;
