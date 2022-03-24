import * as api from '../api';

export const getPosts = () => async (dispatch) => {
  try {
    const { data } = await api.fetchPosts();
    dispatch({ type: 'FETCH_POSTS', payload: data.data });
  } catch (error) {
    console.log(error);
  }
};

export const cretePost = (post) => async (dispatch) => {
  try {
    const { data } = await api.createPost(post);
    dispatch({ type: 'CREATE', payload: data.data });
  } catch (error) {
    console.log(error);
  }
};
