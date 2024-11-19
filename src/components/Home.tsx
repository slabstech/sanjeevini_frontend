import { Component } from 'react';
import { Container, Grid, Typography, Divider } from '@mui/material';
import VisionIntegration from './Integration/VisionIntegration';
import VoiceIntegration from './Integration/VoiceIntegration';
interface AppState {
}

type HomeProps = {
  serverUrl: string;
};

class Home extends Component<HomeProps, AppState> {
  ollamaBaseUrl = import.meta.env.VITE_OLLAMA_BASE_URL;
  serverBaseUrl = import.meta.env.VITE_HF_SPACES_URL;
  isOnline = true;

  constructor(props:HomeProps) {
    super(props);
    this.serverBaseUrl = this.props.serverUrl;
  }

  render() {
    return (
      <div style={{ minHeight: "80vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
      <Container>
        <Typography variant="h4" gutterBottom>
          Sanjeevini - AI Health App
        </Typography>
        <Typography variant="body1" paragraph>
          <strong>What will Sanjeevini do ?</strong>
        </Typography>       
          <ul>
            <li>Connect with Ayushman Bharat Digital Mission and provide Medical history to Doctor's during Consultation.</li>
            <li>Provide data management facility to Doctor's with Open Source development.</li>
            <li>Notify Users about:
              <ul>
                <li>Daily medication</li>
                <li>Next appointments</li>
              </ul>
            </li>
          </ul>
        <Typography variant="body1" paragraph>
          <strong>What will Sanjeevini not do ?</strong>
        </Typography>
          <ul>
            <li>Fix health issues</li>
            <li>Provide medical advice</li>
          </ul>
        <Typography variant="body1" paragraph>
          <strong>Why Sanjeevini ?</strong>
        </Typography>
          <ul>
            <li>A family member underwent emergency angioplasty after a previous Heart attack (Myocardial Infraction) was undetected.</li>
            <li>The cardiologist requested prior health check reports, but these were unavailable instantly.</li>
            <li>Incomplete reporting can lead to misdiagnosis and underestimate the seriousness of health concerns.</li>
            <li>This can result in delayed or inappropriate treatment, which can further compromise health outcomes.</li>
          </ul>
      </Container>
      <div  style={{ display: 'none' }} >
      <Container>
        <Typography variant="h4" gutterBottom>
          Sanjeevini - AI Health App
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
      </div>
    );
  }
}

export default Home;
