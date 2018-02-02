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
  case 'LEAVE_EVENTS_SUCCESS':
    if (state.events[action.eventId].creator === action.userId) {
      state.events[action.eventId].creator = state.events[action.eventId].attendees.find(el => el !== action.userId);
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
  default:
    return state;
  }

};

export default entities;
