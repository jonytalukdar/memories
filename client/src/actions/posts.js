import * as api from '../api';
import {
  CREATE_POST,
  DELETE_POST,
  FETCH_POSTS,
  LIKE_POST,
  UPDATE_POST,
  FETCH_POSTS_BY_SEARCH,
} from '../constants/actionTypes';

export const getPosts = (page) => async (dispatch) => {
  try {
    const { data } = await api.fetchPosts(page);
    dispatch({ type: FETCH_POSTS, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const getPostsBySearch = (searchQuery) => async (dispatch) => {
  try {
    const { data } = await api.fetchPostsBySearch(searchQuery);
    dispatch({ type: FETCH_POSTS_BY_SEARCH, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const cretePost = (post) => async (dispatch) => {
  try {
    const { data } = await api.createPost(post);
    dispatch({ type: CREATE_POST, payload: data.data });
  } catch (error) {
    console.log(error);
  }
};

export const updatePost = (id, post) => async (dispatch) => {
  try {
    const { data } = await api.updatePost(id, post);
    dispatch({ type: UPDATE_POST, payload: data.data });
  } catch (error) {
    console.log(error);
  }
};

export const deletePost = (id) => async (dispatch) => {
  try {
    const { data } = await api.deletePost(id);
    dispatch({ type: DELETE_POST, payload: data.data });
  } catch (error) {
    console.log(error);
  }
};

export const likePost = (id) => async (dispatch) => {
  try {
    const { data } = await api.likePost(id);
    dispatch({ type: LIKE_POST, payload: data.data });
  } catch (error) {
    console.log(error);
  }
};
