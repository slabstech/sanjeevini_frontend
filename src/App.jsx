import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import './App.css';
import NavBar from './components/utils/NavBar';
import { Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import { useState } from 'react';
import Login from './components/Login/Login'
import NoMatch from './components/utils/NoMatch'

function App() {

  const offlineUrl =  'http://localhost:8000/api/v1' ;
  const onlineUrl  = import.meta.env.VITE_HF_SPACES_URL;
  const [serverUrl, setUrl] = useState(onlineUrl);

  return (
        <Box sx={{ flexGrow: 1 }}>
          {/* Menu Bar */}
          <AppBar position="static">
            <Toolbar>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                Sanjeevini
              </Typography>
              <Button color="inherit" to="/about">About</Button>
              <Button color="inherit" to="/login">Login</Button>
            </Toolbar>
          </AppBar>
          <NavBar />
        <Routes>
          <Route path="/" element={<Home serverUrl={serverUrl} />} />
          <Route path="/login" element={<Login/>} />
          <Route path="*" element={<NoMatch />} />
        </Routes>

          {/* Main Content */}
          <div style={{ minHeight: "80vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
            <Typography variant="h4">AI - Health Assistant App</Typography>
          </div>

          {/* Footer */}
          <AppBar position="static" color="secondary" sx={{ top: 'auto', bottom: 0 }}>
            <Toolbar>
              <Typography variant="body1" color="inherit" sx={{ flexGrow: 1 }}>
                Footer - All rights reserved
              </Typography>
            </Toolbar>
          </AppBar>
        </Box>
  );
}

export default App;
