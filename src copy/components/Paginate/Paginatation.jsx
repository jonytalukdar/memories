import React, { useEffect } from 'react';

import useStyles from './styles';
import { Link } from 'react-router-dom';
import { Pagination, PaginationItem } from '@material-ui/lab';
import { ArrowBack, ArrowForward } from '@material-ui/icons';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts } from '../../../client/src/services/service';

const Paginate = ({ page }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { numberOfPages } = useSelector((state) => state.posts);

  useEffect(() => {
    if (page) {
      dispatch(fetchPosts(page));
    }
  }, [page, dispatch]);

  return (
    <Pagination
      classes={{ ul: classes.ul }}
      count={numberOfPages}
      page={Number(page || 1)}
      color="primary"
      renderItem={(item) => (
        <PaginationItem
          component={Link}
          to={`/posts?page=${item.page}`}
          {...item}
        />
      )}
    />
  );
};

export default Paginate;
