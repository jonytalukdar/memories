export const postReducer = (state = [], action) => {
  switch (action.type) {
    case 'FETCH_POSTS': {
      return action.payload;
    }

    case 'CREATE': {
      return [...state.data, action.payload];
    }

    default:
      return state;
  }
};
