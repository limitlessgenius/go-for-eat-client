import _ from 'lodash';
import moment from 'moment';

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
  case 'LOGIN_USER_SUCCESS':
    return {
      ...state,
      prevScreen:'Login',
      currentScreen:'Home'
    };
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
  case 'FORM_PROFILE_PAGE':

    const { created_events, events } = action.user;

    created_events = created_events
      .map(elem => action.events[elem])
      .sort((a,b) => a.distance -b.distance)
      .map(elem => elem._id);

    events = events
      .map(elem => action.events[elem])
      .sort((a,b) => a.distance - b.distance);

    const myComingEvents = events
      .filter(elem => moment(elem.when*1000) > moment())
      .map(elem => elem._id);

    const myPastEvents = events
      .filter(elem => moment(elem.when*1000) < moment())
      .map(elem => elem._id);

    return {
      ...state,
      Profile: {
        ...state.Profile,
        events: [
          {
            title: 'Created Events',
            data: created_events
          },
          {
            title: 'My Upcoming Events',
            data: myComingEvents
          },
          {
            title: 'My Past Events',
            data: myPastEvents
          }
        ]

      }
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
  case 'GET_USER_SUCCESS':
    return {
      ...state,
      User: {
        ...state.User,
        userData:action.response
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
