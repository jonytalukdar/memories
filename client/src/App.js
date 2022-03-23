import React from 'react';
import memories from './assets/images/memories.png';
import { AppBar, Container, Grid, Typography, Grow } from '@material-ui/core';
import Form from './components/Form/Form';
import Posts from './components/Posts/Posts';

const App = () => {
  return (
    <Container maxWidth="lg">
      <AppBar position="static" color="inherit">
        <Typography align="center" variant="h2">
          Memories
        </Typography>
        <img src={memories} alt="memories" height="60" />
      </AppBar>
      <Grow in>
        <Container>
          <Grid
            container
            justifyContent="space-between"
            alignItems="stretch"
            spacing={3}
          >
            <Grid item xs={12} sm={7}>
              <Posts />
            </Grid>
            <Grid item xs={12} sm={4}>
              <Form />
            </Grid>
          </Grid>
        </Container>
      </Grow>
    </Container>
  );
};

export default App;
