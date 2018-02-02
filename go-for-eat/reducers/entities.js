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
  // console.log(Expo.SecureStore.getItemAsync('state'));
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
  default:
    return state;
  }

};

export default entities;
