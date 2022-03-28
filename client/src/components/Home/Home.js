import React, { useState } from 'react';

import {
  Container,
  Grow,
  Grid,
  Paper,
  TextField,
  Button,
  AppBar,
} from '@material-ui/core';
import ChipInput from 'material-ui-chip-input';
import { useLocation, useHistory } from 'react-router-dom';
import useStyles from './styles';
import Posts from '../Posts/Posts';
import Form from '../Form/Form';
import Paginate from '../Paginate/Paginatation';
import { useDispatch } from 'react-redux';
import { getPostsBySearch } from '../../actions/posts';

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const Home = () => {
  const history = useHistory();
  const classes = useStyles();
  const dispatch = useDispatch();
  const query = useQuery();
  const page = query.get('page') || 1;
  const searchQuery = query.get('searchQuery');

  //states
  const [currentId, setCurrentId] = useState(null);
  const [search, setSearch] = useState('');
  const [tags, setTags] = useState([]);

  const searchPost = () => {
    if (search.trim() || tags.length) {
      dispatch(getPostsBySearch({ search, tags: tags.join(',') }));
      history.push(
        `/posts/search?searchQuery=${search || 'none'}&tags=${tags.join(',')}`
      );
    } else {
      history.push('/');
    }
  };

  const handleKeyPress = (e) => {
    if (e.keyCode === 13) {
      //search   from backend
      searchPost();
    }
  };

  const onAdd = (tag) => {
    setTags([...tags, tag]);
  };
  const onDelete = (tagToDelte) => {
    setTags(tags.filter((tag) => tag !== tagToDelte));
  };

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
                onKeyPress={handleKeyPress}
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                }}
              />
              <ChipInput
                style={{ margin: '10px 0' }}
                value={tags}
                onChange={(chips) => setTags(chips)}
                onAdd={onAdd}
                onDelete={onDelete}
                label="Search Tags"
                variant="outlined"
              />
              <Button
                className={classes.searchButton}
                onClick={searchPost}
                color="primary"
                variant="contained"
              >
                Search
              </Button>
            </AppBar>
            <Form currentId={currentId} setCurrentId={setCurrentId} />
            <Paper elevation={5} className={classes.paginate}>
              <Paginate page={page} />
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Grow>
  );
};

export default Home;
