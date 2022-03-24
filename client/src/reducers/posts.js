export const postReducer = (state = [], action) => {
  switch (action.type) {
    case 'FETCH_POSTS': {
      return action.payload;
    }

    case 'CREATE': {
      return [...state, action.payload];
    }

    default:
      return state;
  }
};
