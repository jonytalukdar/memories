import {
  CREATE_POST,
  DELETE_POST,
  FETCH_POSTS,
  FETCH_POSTS_BY_SEARCH,
  LIKE_POST,
  UPDATE_POST,
} from '../constants/actionTypes';

export const postReducer = (state = [], action) => {
  switch (action.type) {
    case FETCH_POSTS: {
      return action.payload;
    }

    case FETCH_POSTS_BY_SEARCH: {
      return action.payload;
    }

    case CREATE_POST: {
      return [...state, action.payload];
    }

    case UPDATE_POST: {
      return state.map((post) =>
        post._id === action.payload._id ? action.payload : post
      );
    }

    case DELETE_POST: {
      return state.filter((post) => post._id !== action.payload._id);
    }

    case LIKE_POST: {
      return state.map((post) =>
        post._id === action.payload._id ? action.payload : post
      );
    }

    default:
      return state;
  }
};
