import React, { useEffect } from 'react';

import useStyles from './styles';
import { Link } from 'react-router-dom';
import { Pagination, PaginationItem } from '@material-ui/lab';
import { ArrowBack, ArrowForward } from '@material-ui/icons';
import { getPosts } from '../../actions/posts';
import { useDispatch, useSelector } from 'react-redux';

const Paginate = ({ page }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { numberOfPages } = useSelector((state) => state.posts);

  useEffect(() => {
    if (page) {
      dispatch(getPosts(page));
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
