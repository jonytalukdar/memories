import React, { useEffect, useState } from 'react';
import decode from 'jwt-decode';

import {
  AppBar,
  Typography,
  Avatar,
  Button,
  Box,
  Tooltip,
  IconButton,
  Menu,
  MenuItem,
  Divider,
  ListItemIcon,
} from '@material-ui/core';

import { Settings, PersonAdd, ExitToApp } from '@material-ui/icons';

import useStyles from './styles';
import memories from '../../images/memories.png';
import { Link, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logOut } from '../../features/authSlice';

const Navbar = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const location = useLocation();

  const { user } = useSelector((state) => state.auth);

  const logout = () => {
    dispatch(logOut());
  };

  useEffect(() => {
    const token = user?.token;

    if (token) {
      const decodedToken = decode(token);

      if (decodedToken.exp * 1000 < new Date().getTime()) {
        logout();
      }
    }
  }, [location, user?.token]);

  const [anchorEl, setAnchorEl] = useState(undefined);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(undefined);
  };

  return (
    <AppBar className={classes.appBar} position="static" color="inherit">
      <div className={classes.brandContainer}>
        <Typography
          component={Link}
          to="/"
          className={classes.heading}
          variant="h2"
          align="center"
        >
          Memories
        </Typography>
        <img className={classes.image} src={memories} alt="icon" height="60" />
      </div>
      {/* <Toolbar className={classes.toolbar}>
        {user?.token ? (
          <div className={classes.profile}>
            <Avatar
              className={classes.purple}
              src={user?.result?.imageUrl}
              alt={user?.result?.name}
            >
              {user?.result?.name.charAt(0)}
            </Avatar>
            <Typography className={classes.userName} variant="h6">
              {user?.result?.name}
            </Typography>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => logout()}
            >
              Logout
            </Button>
          </div>
        ) : (
          <Button
            component={Link}
            to="/auth"
            variant="contained"
            color="primary"
          >
            Login
          </Button>
        )}
      </Toolbar> */}

      {user?.token ? (
        <>
          <Box
            sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}
          >
            <Tooltip title="account settings">
              <IconButton
                onClick={handleClick}
                size="small"
                sx={{ ml: 2 }}
                aria-controls={open ? 'account-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
              >
                <Avatar
                  className={classes.purple}
                  src={user?.result?.imageUrl}
                  alt={user?.result?.name}
                >
                  {user?.result?.name.charAt(0)}
                </Avatar>
              </IconButton>
            </Tooltip>
          </Box>
          <Menu
            anchorEl={anchorEl}
            id="account-menu"
            open={open}
            onClose={handleClose}
            onClick={handleClose}
            PaperProps={{
              elevation: 0,
              sx: {
                overflow: 'visible',
                filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                mt: 1.5,
                '& .MuiAvatar-root': {
                  width: 32,
                  height: 32,
                  ml: -0.5,
                  mr: 1,
                },
                '&:before': {
                  content: '""',
                  display: 'block',
                  position: 'absolute',
                  top: 0,
                  right: 14,
                  width: 10,
                  height: 10,
                  bgcolor: 'background.paper',
                  transform: 'translateY(-50%) rotate(45deg)',
                  zIndex: 0,
                },
              },
            }}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
          >
            <MenuItem>
              <Avatar style={{ marginRight: '10px' }} /> {user?.result?.name}
            </MenuItem>
            <MenuItem>
              <Avatar style={{ marginRight: '10px' }} /> {user?.result?.email}
            </MenuItem>
            <Divider />
            <MenuItem>
              <ListItemIcon>
                <PersonAdd fontSize="small" />
              </ListItemIcon>
              Add another account
            </MenuItem>
            <MenuItem>
              <ListItemIcon>
                <Settings fontSize="small" />
              </ListItemIcon>
              Settings
            </MenuItem>
            <MenuItem onClick={() => logout()}>
              <ListItemIcon>
                <ExitToApp fontSize="small" />
              </ListItemIcon>
              Logout
            </MenuItem>
          </Menu>
        </>
      ) : (
        <Button component={Link} to="/auth" variant="contained" color="primary">
          Login
        </Button>
      )}
    </AppBar>
  );
};

export default Navbar;
