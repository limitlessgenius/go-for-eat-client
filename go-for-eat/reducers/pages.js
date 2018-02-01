import _ from 'lodash';

const defaultState = {
  currentScreen:'Login',
  Home:{
    events:[],
    suggestedOpen: false,
  },
  Login:{},
  Profile:{},
  User:{
    userId:null,
  },
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
  case 'GET_EVENTS_SUCCESS':
    let newEventsArr = _.values(action.response.entities.events);
    newEventsArr.sort((a,b) =>{
      return a.distance - b.distance;
    });
    const title = newEventsArr[0].when;
    const data = newEventsArr.map((el, i) => {
      return el._id;
    });
    return {
      ...state,
      Home: {
        ...state.Home,
        events: [
          ...state.Home.events,
          { title, data }
        ]
      }
    };
  case 'TOGGLE_DETAILS':
    return {
      ...state,
      Home: {
        ...state.Home,
        suggestedOpen: !state.Home.suggestedOpen,
      }
    };
  case 'SELECT_USER':
    return {
      ...state,
      User: {
        ...state.User,
        userId: action.userId
      }
    };
  default:
    return state;
  }
};

export default pages;
