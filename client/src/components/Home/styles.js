import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  appBarSearch: {
    borderRadius: 4,
    marginBottom: '1rem',
    display: 'flex',
    padding: '16px',
  },
  paginate: {
    borderRadius: 4,
    marginTop: '1rem',
    padding: '12px',
  },

  [theme.breakpoints.down('xs')]: {
    gridContainer: {
      flexDirection: 'column-reverse',
    },
  },
}));
