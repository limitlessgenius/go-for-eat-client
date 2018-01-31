const defaultState = {
  currentScreen:'Login',
  Home:{},
  Login:{},
  Profile:{},
  User:{},
  CreateScreen:{
    edit:false,
    event:'',
  }
};

const pages = (state = defaultState, action) => {
  switch (action.type) {
  case 'NAVIGATE':
    return {
      ...state,
      prevScreen:state.currentScreen,
      currentScreen:action.screen
    };
  case 'NAVIGATE_BACK':
    return {
      ...state,
      prevScreen:state.currentScreen,
      currentScreen:state.prevScreen
    };
  case 'LOGIN_USER_SUCCESS':
    return {
      ...state,
      prevScreen:'Login',
      currentScreen:'Home'
    };
  case 'GET_EVENTS_REQUEST':
    return {
      ...state,
      Home: {
        ...state.Home,
        loading:true
      }
    };
  default:
    return state;
  }
};

export default pages;
