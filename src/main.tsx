import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import ErrorBoundary from './components/utils/ErrorBoundary.tsx';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { lightBlue, deepOrange } from '@mui/material/colors';
import { BrowserRouter } from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';
const theme = createTheme({
  palette: {
    primary: lightBlue,
    secondary: deepOrange,
  },
});
const rootElement = document.getElementById('root');
if (rootElement) {
  createRoot(rootElement).render(
    <StrictMode>
      <ErrorBoundary>
        <BrowserRouter>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <App />
          </ThemeProvider>
        </BrowserRouter>
      </ErrorBoundary>
    </StrictMode>,
  );
} else {
  console.error("Root element not found");
}
