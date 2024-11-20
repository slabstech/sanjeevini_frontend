import { Component } from 'react';
import { Container, Grid, Typography, Divider } from '@mui/material';
import UserAppointments from './UserApppointments';

interface AppState {}

type UserAppProps = {
  serverUrl: string;
};

class UserApp extends Component<UserAppProps, AppState> {
  ollamaBaseUrl = import.meta.env.VITE_OLLAMA_BASE_URL;
  serverBaseUrl = import.meta.env.VITE_HF_SPACES_URL;
  isOnline = true;

  constructor(props: UserAppProps) {
    super(props);
    this.serverBaseUrl = this.props.serverUrl;
  }

  render() {
    return (
      <div>
        <Container>
          <Typography variant="h4" gutterBottom>
            User Information
          </Typography>
        </Container>
        <Container>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <UserAppointments />
            </Grid>
            <Grid item xs={12}>
              <Divider />
            </Grid>
            <Grid item xs={12}>
              <UserAppointments />
            </Grid>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <UserAppointments />
              </Grid>
              <Grid item xs={12} md={6}>
                <UserAppointments />
              </Grid>
            </Grid>
          </Grid>
        </Container>
      </div>
    );
  }
}

export default UserApp;