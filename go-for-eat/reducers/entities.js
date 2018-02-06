const defaultState = {
  events:{},
  users:{},
};

const entities = (state = defaultState, action) => {
  if (action.response && action.response.entities) {
    return {
      events: {
        ...state.events,
        ...action.response.entities.events
      },
      users: {
        ...state.users,
        ...action.response.entities.users
      },
    };
  }

  switch (action.type) {
  case 'JOIN_EVENTS_SUCCESS':
    return{
      ...state,
      events: {
        ...state.events,
        [action.eventId]: {
          ...state.events[action.eventId],
          attendees:[
            ...state.events[action.eventId].attendees,
            action.userId
          ]
        }
      }
    };
    break;
  case 'GET_EVENTS_FAILURE':
    console.log(action);
    return state;
  case 'LEAVE_EVENTS_SUCCESS':
    if (state.events[action.eventId].creator === action.userId) {
      const newCreator =  state.events[action.eventId].attendees.find(el => el !== action.userId);
      if (newCreator) {
        state.events[action.eventId].creator = newCreator;
      } else {
        delete state.events[action.eventId];
        return {
          ...state,
          events: {
            ...state.events,
          }
        };
      }
    }
    const newAttendees = state.events[action.eventId].attendees.filter(el => el !== action.userId);
    return{
      ...state,
      events: {
        ...state.events,
        [action.eventId]: {
          ...state.events[action.eventId],
          attendees:[
            ...newAttendees,
          ]
        }
      }
    };
    break;
  case 'DELETE_EVENTS_SUCCESS':
    delete state.events[action.eventId];
    return {
      ...state,
      events: {
        ...state.events,
      }
    };
    break;
  case 'CREATE_EVENT_SUCCESS':
    return{
      ...state,
      events: {
        ...state.events,
        [action.eventId]: {
          ...state.events[action.eventId]
        }
      }
    };
    break;
  case 'SET_ENTITIES':
    return {
      ...state,
      events: {
        ...state.events,
        ...action.data.events
      },
      users: {
        ...state.users,
        ...action.data.users
      }
    };
    return state;
  default:
    return state;
  }

};

export default entities;
