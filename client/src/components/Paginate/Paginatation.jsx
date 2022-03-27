import React from 'react';

import useStyles from './styles';
import { Link } from 'react-router-dom';
import { Pagination, PaginationItem } from '@material-ui/lab';
import { ArrowBack, ArrowForward } from '@material-ui/icons';

const Paginate = () => {
  const classes = useStyles();
  return (
    <Pagination
      classes={{ ul: classes.ul }}
      count={10}
      page={1}
      color="primary"
      renderItem={(item) => (
        <PaginationItem component={Link} to={`/posts?page=${1}`} {...item} />
      )}
    />
  );
};

export default Paginate;
