import _ from 'lodash';

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
      Home: [
        ...state.Home,
        { title, data }
      ]
    };
  default:
    return state;
  }
};

export default pages;
