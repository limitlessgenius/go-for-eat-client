const defaultState = {};

const error = (state = defaultState, action) => {
  if (action.type[-7]==='FAILURE') console.log('hi', action);
  return state;
};

export default error;
