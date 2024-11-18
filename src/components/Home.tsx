import { Component } from 'react';
import { Container, Grid, Typography, Divider } from '@mui/material';
import VisionIntegration from './Integration/VisionIntegration';
import VoiceIntegration from './Integration/VoiceIntegration';
interface AppState {
}

type HomeProps = {
  serverUrl: string;
  isOnline: boolean;
};

class Home extends Component<HomeProps, AppState> {
  ollamaBaseUrl = import.meta.env.VITE_OLLAMA_BASE_URL;
  serverBaseUrl = import.meta.env.VITE_HF_SPACES_URL;
  isOnline = true;

  constructor(props:HomeProps) {
    super(props);
    this.serverBaseUrl = this.props.serverUrl;
    this.isOnline = this.props.isOnline;
  }

  render() {
    return (
      <div style={{ display: 'none' }}>
      <Container>
        <Typography variant="h4" gutterBottom>
          LLM Use Cases
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <VisionIntegration serverUrl={this.serverBaseUrl} isOnline={this.isOnline} />
          </Grid>
          <Grid item xs={12}>
            <Divider />
          </Grid>
          <Grid item xs={12} md={6}>
            <VoiceIntegration serverUrl={this.serverBaseUrl} isOnline={this.isOnline} />
          </Grid>
          <Grid item xs={12}>
            <Divider />
          </Grid>
        </Grid>
      </Container>
      </div>
    );
  }
}

export default Home;
