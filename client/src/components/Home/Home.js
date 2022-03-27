import React, { useState, useEffect } from 'react';

import {
  Container,
  Grow,
  Grid,
  Paper,
  TextField,
  Button,
  AppBar,
} from '@material-ui/core';
import { useLocation, useHistory } from 'react-router-dom';
import useStyles from './styles';
import Posts from '../Posts/Posts';
import Form from '../Form/Form';
import Paginate from '../Paginate/Paginatation';
import { useDispatch } from 'react-redux';
import { getPosts } from '../../actions/posts';

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const Home = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const query = useQuery();
  const page = query.get('page');
  const search = query.get('searchQuery');

  //states
  const [currentId, setCurrentId] = useState(null);

  useEffect(() => {
    dispatch(getPosts());
  }, [currentId, dispatch]);

  return (
    <Grow in>
      <Container maxWidth="xl">
        <Grid
          container
          justifyContent="space-between"
          alignItems="stretch"
          spacing={3}
          className={classes.gridContainer}
        >
          <Grid item xs={12} sm={6} md={9}>
            <Posts setCurrentId={setCurrentId} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <AppBar
              className={classes.appBarSearch}
              position="static"
              color="inherit"
            >
              <TextField
                name="search"
                variant="outlined"
                label="Search Memories"
                value={'text'}
                onChange={() => {}}
              />
            </AppBar>
            <Form currentId={currentId} setCurrentId={setCurrentId} />
            <Paper elevation={5} className={classes.paginate}>
              <Paginate />
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Grow>
  );
};

export default Home;
