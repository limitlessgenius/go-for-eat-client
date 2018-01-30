const defaultState = {
  events:{},
  users:{},
};

const entities = (state = defaultState, action) => {
  if (action.entities) {
    return {
      events: {
        ...state.events,
        ...action.entities.events
      },
      users: {
        ...state.users,
        ...action.entities.users
      }
    };
  }
};
