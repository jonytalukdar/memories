import { AUTH, LOGOUT } from '../constants/actionTypes';

export const authReducer = (state = {}, action) => {
  switch (action.type) {
    case AUTH: {
      localStorage.setItem('profile', JSON.stringify({ ...action?.data }));

      return { ...state, authData: action.data };
    }

    case LOGOUT: {
      localStorage.removeItem('profile');
      return { ...state };
    }
    default:
      return state;
  }
};
