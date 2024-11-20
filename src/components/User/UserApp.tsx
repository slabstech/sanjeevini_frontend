import { Component } from 'react';
import { Container, Grid, Typography, Divider } from '@mui/material';
import UserAppointments from './UserApppointments';
import DiabetesChart from './DiabetesChart';
import WeightChart from './WeightChart';
import MaternityChart from './MaternityChart';
import CardiacChart from './CardiacChart';

interface AppState {}

type UserAppProps = {
};

class UserApp extends Component<UserAppProps, AppState> {
  ollamaBaseUrl = import.meta.env.VITE_OLLAMA_BASE_URL;
  serverBaseUrl = import.meta.env.VITE_HF_SPACES_URL;
  isOnline = true;

  constructor(props: UserAppProps) {
    super(props);
    //this.serverBaseUrl = this.props.serverUrl;
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
              <CardiacChart />
            </Grid>
            <Grid item xs={12}>
              <Divider />
            </Grid>
            <Grid item xs={12}>
              <MaternityChart />
            </Grid>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <DiabetesChart />
              </Grid>
              <Grid item xs={12} md={6}>
                <WeightChart />
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Divider />
            </Grid>
            <Grid item xs={12}>
              <UserAppointments />
            </Grid>
          </Grid>
        </Container>
      </div>
    );
  }
}

export default UserApp;