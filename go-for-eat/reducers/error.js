const defaultState = {};

const error = (state = defaultState, action) => {
  console.log(action);
  if (action.type[-7]==='FAILURE') console.log('hi', action);
  return state;
};

export default error;
