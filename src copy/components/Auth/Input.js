import React from 'react';

import { TextField, Grid, IconButton, InputAdornment } from '@material-ui/core';
import { Visibility, VisibilityOff } from '@material-ui/icons';

const Input = ({
  half,
  name,
  label,
  autoFocus,
  handleChange,
  value,
  handleShowPassword,
  type,
}) => {
  return (
    <Grid item xs={12} sm={half ? 6 : 12}>
      <TextField
        name={name}
        value={value}
        onChange={handleChange}
        label={label}
        type={type}
        variant="outlined"
        required
        autoFocus={autoFocus}
        fullWidth
        InputProps={
          name === 'password'
            ? {
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleShowPassword}>
                      {name === 'password' ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }
            : null
        }
      />
    </Grid>
  );
};

export default Input;
