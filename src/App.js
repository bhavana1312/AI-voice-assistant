import React from 'react';
import { Box, Typography, Button, Container, Grid, Stack, AppBar, Toolbar, IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function App() {
    const navigate = useNavigate();
  return (
    <>
      <AppBar position="fixed" color="primary">
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <IconButton edge="start" color="inherit" aria-label="logo">
            <img 
                src="https://www.pamhq.com/_next/image?url=%2Fimages%2Fauto-logo.png&w=96&q=75" 
                alt="Logo" 
                style={{ height: 40 }} 
            />
            </IconButton>
        </Toolbar>
        </AppBar>

      <Container maxWidth="lg" sx={{ mt: 4, backgroundColor: '#f5f5f5' }}>
        <Box
            id="home"
          sx={{
            height: '100vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            backgroundColor: '#f5f5f5',
            borderRadius: 2,
            p: 4,
          }}
        >
          <Typography variant="h2" component="h1" gutterBottom>
            Welcome to Pam Auto Assistant
          </Typography>
          <Typography variant="h6" color="textSecondary" paragraph>
            Revolutionize your car dealership experience with our advanced AI assistant designed to streamline customer interactions.
          </Typography>
          <Button variant="contained" color="primary" size="large" sx={{ mt: 3 }} onClick={() => navigate("/assistant")}>
            Get Started
          </Button>
        </Box>
      </Container>
    </>
  );
}

export default App;
