const defaultState = {
  events:{},
  users:{},
};

const entities = (state = defaultState, action) => {
  if (action.response) {
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
  else return state;
};

export default entities;
