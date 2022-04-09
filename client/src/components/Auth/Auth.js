import React, { useState } from 'react';

import useStyles from './styles';
import {
  Container,
  Grid,
  Avatar,
  Button,
  Paper,
  Typography,
} from '@material-ui/core';
import { LockOutlined } from '@material-ui/icons';
import { GoogleLogin } from 'react-google-login';
import Input from './Input';
import Icon from '../ui/Icon';

import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { signup, signin } from '../../services/auth';

const initialState = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  confirmPassword: '',
};

const Auth = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();

  const [showPassword, setShowPassword] = useState(false);
  const [isSignup, setIsSignup] = useState(false);
  const [formData, setFormData] = useState(initialState);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isSignup) {
      dispatch(signup(formData));
      history.push('/');
    } else {
      dispatch(signin(formData));
      history.push('/');
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleShowPassword = () => {
    setShowPassword((prevState) => !prevState);
  };

  const switchMode = () => {
    setIsSignup((prevState) => !prevState);
    setShowPassword(false);
  };

  const googleSuccess = async (res) => {
    const result = res?.profileObj;
    const token = res?.tokenId;

    try {
      dispatch({ type: 'AUTH', data: { result, token } });
      history.push('/');
    } catch (error) {
      console.log(error);
    }
  };
  const googleFailure = () => {
    console.log('Gooogle sing in failed ! try again');
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper className={classes.paper} elevation={3}>
        <Avatar className={classes.avatar}>
          <LockOutlined />
        </Avatar>
        <Typography variant="h5">{isSignup ? 'Singup' : 'Sing In'}</Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {isSignup && (
              <>
                <Input
                  label="First Name"
                  name="firstName"
                  autoFocus
                  half
                  value={formData.firstName}
                  handleChange={handleChange}
                />
                <Input
                  name="lastName"
                  label="Last Name"
                  value={formData.lastName}
                  handleChange={handleChange}
                  half
                />
              </>
            )}
            <Input
              name="email"
              type="email"
              label="Email"
              value={formData.email}
              handleChange={handleChange}
            />
            <Input
              name="password"
              type={showPassword ? 'text' : 'password'}
              label="Password"
              value={formData.password}
              handleChange={handleChange}
              handleShowPassword={handleShowPassword}
            />
            {isSignup && (
              <Input
                name="confirmPassword"
                type={showPassword ? 'text' : 'password'}
                label="Confirm Password"
                vlaue={formData.confirmPassword}
                handleChange={handleChange}
                handleShowPassword={handleShowPassword}
              />
            )}
          </Grid>

          <Button
            type="submit"
            fullWidth
            color="primary"
            variant="contained"
            className={classes.submit}
          >
            {isSignup ? 'Signup' : 'Sign In'}
          </Button>

          <GoogleLogin
            clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
            render={(renderProps) => (
              <Button
                className={classes.googleButton}
                fullWidth
                onClick={renderProps.onClick}
                // disabled={renderProps.disabled}
                startIcon={<Icon />}
                variant="contained"
                color="primary"
              >
                {' '}
                Google Sign In
              </Button>
            )}
            onSuccess={googleSuccess}
            onFailure={googleFailure}
            cookiePolicy="single_host_origin"
          />

          <Grid container justifyContent="flex-end">
            <Grid item>
              <Button onClick={switchMode}>
                {isSignup
                  ? 'Already have an account?'
                  : `Dont't have an account?`}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default Auth;
