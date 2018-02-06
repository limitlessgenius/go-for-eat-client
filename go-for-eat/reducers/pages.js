import _ from 'lodash';

const defaultState = {
  currentScreen:'Login',
  Home:{
    events:[],
    suggestedOpen: false,
    reloadEvents: false,
  },
  Login:{},
  Profile:{},
  User:{
    userId:null,
  },
  CreateEvent:{
    confirmationAlertOpen: false,
    errorAlertOpen: false,
  },
  EditEvent:{
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
  case 'SELECT_EVENT':
    return {
      ...state,
      EditEvent: {
        ...state.EditEvent,
        eventId: action.eventId
      }
    };
  case 'CREATE_EVENT_SUCCESS':
    return {
      ...state,
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
      },
      Home: {
        ...state.Home,
        reloadEvents: true,
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
  case 'EDIT_EVENT_SUCCESS':
    return {
      ...state,
      EditEvent: {
        ...state.EditEvent,
        confirmationAlertOpen: true,
      }
    };
  case 'EDIT_EVENT_FAILURE':
    return {
      ...state,
      EditEvent: {
        ...state.EditEvent,
        errorAlertOpen: true,
      }
    };
  case 'CLOSE_EDIT_EVENT_CONF_ALERT':
    return {
      ...state,
      EditEvent: {
        ...state.EditEvent,
        confirmationAlertOpen: false,
      },
      Home: {
        ...state.Home,
        reloadEvents: true,
      }
    };
  case 'CLOSE_EDIT_EVENT_ERR_ALERT':
    return {
      ...state,
      EditEvent: {
        ...state.EditEvent,
        errorAlertOpen: false,
      }
    };
  case 'DISABLE_RELOAD_EVENTS':
    return {
      ...state,
      Home: {
        ...state.Home,
        reloadEvents: false,
      }
    };
  default:
    return state;
  }
};

export default pages;
