const defaultState = {
  Home:{},
  Login:{},
  Profile:{},
  User:{}
};

const pages = (state = defaultState, action) => {
  switch (action.type) {
  case 'LOGIN_LOADING':
    return {
      ...state,
      Login: {
        ...state.Login,
        loading:true
      }
    };
  case 'LOGIN_LOADED':
    return {
      ...state,
      Login: {
        ...state.Login,
        loading:false
      }
    };
  case 'GET_EVENTS_REQUEST':
    return {
      ...state,
      Home: {
        ...state.Home,
        loading:true
      }
    };
  case 'GET_EVENTS_SUCCESS':
    return {
      ...state,
      Home: {
        ...state.Home,
        loading:false
      }
    };
  default:
    return state;
  }
};

export default pages;
