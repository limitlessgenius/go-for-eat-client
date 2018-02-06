import _ from 'lodash';

const defaultState = {
  currentScreen:'Login',
  Home:{
    events:[],
    mainEvent: null,
    suggestedOpen: false,
  },
  Login:{},
  Profile:{},
  Maps:{
    query:{},
  },
  User:{
    userId:null,
  },
  CreateEvent:{
    confirmationAlertOpen: false,
    errorAlertOpen: false,
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
  case 'UPDATE_QUERY_STATE':
    const newQuery = Object.assign(state.Maps.query, action.newQuery);
    return {
      ...state,
      Maps:{
        ...state.Maps,
        query:{
          ...newQuery
        },
      },
    };
  case 'GET_EVENTS_SUCCESS':
    if (action.response.entities.events) {
      const eventIds = action.response.result;
      if(eventIds.length === 0) return state;
      const title = action.response.entities.events[eventIds[0]].when;
      const originalEvents = action.distFetch ? [] : state.Home.events;
      return {
        ...state,
        Home: {
          ...state.Home,
          events: [
            ...originalEvents,
            { title, data: eventIds }
          ],
          mainEvent: eventIds[0],
        }
      };
    }
  case 'SET_MAIN_EVENT':
    console.log('SET_MAIN_EVENT',action.id);
    return {
      ...state,
      Home: {
        ...state.Home,
        mainEvent: action.id,
      }
    };
    break;
  case 'DELETE_EVENTS_SUCCESS':
    delete state.Home.events[action.eventId];
    return {
      ...state,
      events: {
        ...state.events,
      }
    };
    break;
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
  case 'CREATE_EVENT_SUCCESS':
    return {
      ...state,
      Home: {
        ...state.Home,
        events: []
      },
      CreateEvent: {
        ...state.CreateEvent,
        confirmationAlertOpen: true,
      }
    };
  case 'CREATE_EVENT_FAILURE':
    return {
      ...state,
      CreateEvent: {
        ...state.CreateEvent,
        errorAlertOpen: true,
      }
    };
  case 'CLOSE_CREATE_EVENT_CONF_ALERT':
    return {
      ...state,
      CreateEvent: {
        ...state.CreateEvent,
        confirmationAlertOpen: false,
      }
    };
  case 'CLOSE_CREATE_EVENT_ERR_ALERT':
    return {
      ...state,
      CreateEvent: {
        ...state.CreateEvent,
        errorAlertOpen: false,
      }
    };
  default:
    return state;
  }
};

export default pages;
