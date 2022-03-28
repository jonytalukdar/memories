import {
  CREATE_POST,
  DELETE_POST,
  END_LOADING,
  FETCH_POST,
  FETCH_POSTS,
  FETCH_POSTS_BY_SEARCH,
  LIKE_POST,
  START_LOADING,
  UPDATE_POST,
} from '../constants/actionTypes';

const initialState = { isLoading: true, posts: [], post: {} };

export const postReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_POSTS: {
      return {
        ...state,
        posts: action.payload.data,
        page: action.payload.currentPage,
        numberOfPages: action.payload.numberOfPages,
      };
    }

    case FETCH_POST: {
      return {
        ...state,
        post: action.payload.data,
      };
    }

    case FETCH_POSTS_BY_SEARCH: {
      return {
        ...state,
        posts: action.payload.data,
        page: action.payload.currentPage,
        numberOfPages: action.payload.numberOfPages,
      };
    }

    case CREATE_POST: {
      return {
        ...state,
        posts: [...state.posts, action.payload],
      };
    }

    case UPDATE_POST: {
      return {
        ...state,
        posts: state.posts.map((post) =>
          post._id === action.payload._id ? action.payload : post
        ),
      };
    }

    case DELETE_POST: {
      return {
        ...state,
        posts: state.posts.filter((post) => post._id !== action.payload._id),
      };
    }

    case LIKE_POST: {
      return {
        ...state,
        posts: state.posts.map((post) =>
          post._id === action.payload._id ? action.payload : post
        ),
      };
    }

    case START_LOADING: {
      return { ...state, isLoading: true };
    }

    case END_LOADING: {
      return { ...state, isLoading: false };
    }

    default:
      return state;
  }
};
