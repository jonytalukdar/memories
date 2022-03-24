export const postReducer = (state = [], action) => {
  switch (action.type) {
    case 'FETCH_POSTS': {
      return action.payload;
    }

    case 'CREATE': {
      return [...state, action.payload];
    }

    case 'UPDATE': {
      return state.map((post) =>
        post._id === action.payload._id ? action.payload : post
      );
    }

    default:
      return state;
  }
};
