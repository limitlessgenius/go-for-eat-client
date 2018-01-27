const authentication = (state = {}, action) => {
  switch (action.type) {
  case 'LOGIN_USER_SUCCESS':
    console.log('heres action', action);
    return {
      ...state,
      ...action.response
    };
  case 'LOGOUT_USER':
    return {};
  case 'SET_USER':
    return {
      ...state,
      ...action.data
    };
  default:
    return state;
  }

};

export default authentication;
