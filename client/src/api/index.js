import axios from 'axios';

const defaultOptions = {
  baseURL: 'http://localhost:5000',
  headers: {
    'Content-Type': 'application/json',
  },
};

const API = axios.create(defaultOptions);

API.interceptors.request.use((req) => {
  const result = JSON.parse(localStorage.getItem('profile'));
  if (result) {
    req.headers.Authorization = `Bearer ${result.token}`;
  }

  return req;
});

export const fetchPosts = () => API.get(`/posts`);
export const createPost = (newPost) => API.post(`/posts`, newPost);
export const updatePost = (id, postData) =>
  API.patch(`${`/posts`}/${id}`, postData);

export const deletePost = (id) => API.delete(`${`/posts`}/${id}`);
export const likePost = (id) => API.patch(`${`/posts`}/${id}/likePost`);

//get post by search
export const fetchPostsBySearch = (searchQuery) =>
  API.get(
    `/posts/search?searchQuery=${searchQuery.search || ''}&tags=${
      searchQuery.tags
    }`
  );

export const signUp = (formData) => API.post('/users/signup', formData);
export const signIn = (formData) => API.post('/users/signin', formData);
