const defaultState = {};

const authentication = (state = defaultState, action) => {
  switch (action.type) {
  case 'LOGIN_USER_SUCCESS':
    const userId = Object.keys(action.response.entities.user)[0];
    return {
      ...state,
      user: action.response.entities.user[userId]
    };
  case 'LOGIN_USER_FAILURE':

    return state;
  case 'LOGOUT_USER':
    return {
      ...state,
      user: {
        position: state.user.position,
        created_events: [],
        events: [],
      }
    };
  case 'UPDATE_USER_SUCCESS':
    return {
      ...state,
      user: {
        ...state.user,
        ...action.data.edit
      }
    };
  case 'UPDATE_USER_FAILURE':
    return state;
  case 'RELOAD_USER_SUCCESS':
    const id = Object.keys(action.response.entities.user)[0];
    return {
      ...state,
      user: action.response.entities.user[id]
    };
  case 'RELOAD_USER_FAILURE':
    return state;
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
