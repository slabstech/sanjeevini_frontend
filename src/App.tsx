import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import NavBar from './components/utils/NavBar';
import { Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login/Login'
import NoMatch from './components/utils/NoMatch'
import { Box, Typography, Link, IconButton } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import TwitterIcon from '@mui/icons-material/Twitter';
import DiscordIcon from './assets/discordIcon';
import './App.css'
import UserApp from './components/User/UserApp';

function App() {

  const onlineUrl  = import.meta.env.VITE_HF_SPACES_URL;
  return (
        <Box sx={{ flexGrow: 1 }}>
          {/* Menu Bar */}
          <NavBar />
        <Routes>
          <Route path="/" element={<Home serverUrl={onlineUrl} />} />
          <Route path="/user" element={<UserApp  />} />
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
          <footer>
      <Box
        sx={{
          position: 'fixed',
          bottom: '10px',
          right: '10px',
        }}
      >
      </Box>

      <Box
        sx={{
          position: 'fixed',
          bottom: '10px',
          left: '10px',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <Typography variant="body2" color="text.secondary" align="center">
          {'© '}
          <Link color="inherit" href="https://gaganyatri.in/">
            gaganyatri.in
          </Link>{' '}
          |
          <IconButton size="small" href="https://github.com/slabstech" target="_blank">
            <GitHubIcon />
          </IconButton>
          <IconButton size="small" href="https://x.com/gaganyatri" target="_blank">
            <TwitterIcon />
          </IconButton>
          <IconButton size="small" href="https://discord.gg/HAXjG7sC" target="_blank">
            <DiscordIcon />
          </IconButton>
        </Typography>
      </Box>
      </footer>
        </Box>
  );
}

export default App;
