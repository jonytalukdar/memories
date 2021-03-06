import * as api from '../api';
import {
  CREATE_POST,
  DELETE_POST,
  FETCH_POSTS,
  LIKE_POST,
  UPDATE_POST,
  FETCH_POSTS_BY_SEARCH,
  START_LOADING,
  END_LOADING,
  FETCH_POST,
  COMMENT_POST,
} from '../constants/actionTypes';

export const getPosts = (page) => async (dispatch) => {
  dispatch({ type: START_LOADING });
  try {
    const { data } = await api.fetchPosts(page);
    dispatch({ type: FETCH_POSTS, payload: data });

    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(error);
  }
};

export const getPost = (id) => async (dispatch) => {
  dispatch({ type: START_LOADING });
  try {
    const { data } = await api.fetchPost(id);
    dispatch({ type: FETCH_POST, payload: data });

    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(error);
  }
};

export const getPostsBySearch = (searchQuery) => async (dispatch) => {
  dispatch({ type: START_LOADING });
  try {
    const { data } = await api.fetchPostsBySearch(searchQuery);
    dispatch({ type: FETCH_POSTS_BY_SEARCH, payload: data });

    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(error);
  }
};

export const cretePost = (post, history) => async (dispatch) => {
  dispatch({ type: START_LOADING });

  try {
    const { data } = await api.createPost(post);

    dispatch({ type: CREATE_POST, payload: data.data });

    dispatch({ type: END_LOADING });
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

export const postComment = (comment, id) => async (dispatch) => {
  try {
    const { data } = await api.postComment(comment, id);
    dispatch({ type: LIKE_POST, payload: data.data.comments });
  } catch (error) {
    console.log(error);
  }
};
