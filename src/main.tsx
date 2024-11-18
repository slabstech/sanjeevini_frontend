import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import ErrorBoundary from './components/utils/ErrorBoundary';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { lightBlue, deepOrange } from '@mui/material/colors';
import { BrowserRouter } from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';
import {Provider} from 'react-redux';
import {store} from './redux/store';
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
        <Provider store={store}>
          <BrowserRouter>
            <ThemeProvider theme={theme}>
              <CssBaseline />
                <App />
            </ThemeProvider>
          </BrowserRouter>
        </Provider>
      </ErrorBoundary>
    </StrictMode>,
  );
} else {
  console.error("Root element not found");
}
