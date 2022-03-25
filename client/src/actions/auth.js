import * as api from '../api';
import { AUTH } from '../constants/actionTypes';

export const signup = (formData, history) => async (dispatch) => {
  try {
    const { data } = await api.signup();
    dispatch({ type: AUTH, data: data.data });
  } catch (error) {
    console.log(error);
  }
};

export const signin = (formData, history) => async (dispatch) => {
  try {
    const { data } = await api.signin();
    dispatch({ type: AUTH, data: data.data });
  } catch (error) {
    console.log(error);
  }
};
