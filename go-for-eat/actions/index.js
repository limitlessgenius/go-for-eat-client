import { CALL_API } from '../middleware/api';
import { schema } from 'normalizr';


const userSchema = new schema.Entity('users', {}, {idAttribute:'_id'});
const userSchemaArray = [userSchema];
const eventSchema = new schema.Entity('events', {attendees:userSchemaArray}, {idAttribute:'_id'});
const eventSchemaArray = [eventSchema];

export const LOGIN_USER_REQUEST = 'LOGIN_USER_REQUEST';
export const LOGIN_USER_SUCCESS = 'LOGIN_USER_SUCCESS';
export const LOGIN_USER_FAILURE = 'LOGIN_USER_FAILURE';

export const loginUser = (data) => ({
  [CALL_API]: {
    types: [ LOGIN_USER_REQUEST, LOGIN_USER_SUCCESS, LOGIN_USER_FAILURE ],
    endpoint: '/auth',
    method: 'POST',
    data,
  }
});

export const LOGOUT_USER = 'LOGOUT_USER';

export const logoutUser = () => ({
  type:LOGOUT_USER
});

export const SET_USER = 'SET_USER';

export const setUser = (data) => ({
  type: SET_USER,
  data,
});

export const CREATE_EVENT_REQUEST = 'CREATE_EVENT_REQUEST';
export const CREATE_EVENT_SUCCESS = 'CREATE_EVENT_SUCCESS';
export const CREATE_EVENT_FAILURE = 'CREATE_EVENT_FAILURE';

export const createEvent = (data) => ({
  type: 'CREATE_EVENT',
  [CALL_API]: {
    types: [CREATE_EVENT_REQUEST, CREATE_EVENT_SUCCESS, CREATE_EVENT_FAILURE],
    endpoint: '/events',
    method: 'POST',
    data
  }
});

export const GET_EVENTS_REQUEST = 'GET_EVENTS_REQUEST';
export const GET_EVENTS_SUCCESS = 'GET_EVENTS_SUCCESS';
export const GET_EVENTS_FAILURE = 'GET_EVENTS_FAILURE';

export const getNearbyEvents = (queryString) => ({
  [CALL_API]: {
    types: [GET_EVENTS_REQUEST, GET_EVENTS_SUCCESS, GET_EVENTS_FAILURE],
    endpoint: `/events?lat=${queryString.lat}&lng=${queryString.lng}&dist=${queryString.dist}&to=${queryString.to}&from=${queryString.from}`,
    schema: eventSchemaArray,
  }
});

export const JOIN_EVENTS_REQUEST = 'JOIN_EVENTS_REQUEST';
export const JOIN_EVENTS_SUCCESS = 'JOIN_EVENTS_SUCCESS';
export const JOIN_EVENTS_FAILURE = 'JOIN_EVENTS_FAILURE';

export const joinEvent = (eventId, userId) => ({
  [CALL_API]: {
    types: [JOIN_EVENTS_REQUEST, JOIN_EVENTS_SUCCESS, JOIN_EVENTS_FAILURE],
    endpoint: `/events/${eventId}/users`,
    method: 'PUT',
  },
  eventId,
  userId
});

export const LEAVE_EVENTS_REQUEST = 'LEAVE_EVENTS_REQUEST';
export const LEAVE_EVENTS_SUCCESS = 'LEAVE_EVENTS_SUCCESS';
export const LEAVE_EVENTS_FAILURE = 'LEAVE_EVENTS_FAILURE';

export const leaveEvent = (eventId, userId) => ({
  [CALL_API]: {
    types: [LEAVE_EVENTS_REQUEST, LEAVE_EVENTS_SUCCESS, LEAVE_EVENTS_FAILURE],
    endpoint: `/events/${eventId}/users`,
    method: 'DELETE',
  },
  eventId,
  userId
});

export const DELETE_EVENTS_REQUEST = 'DELETE_EVENTS_REQUEST';
export const DELETE_EVENTS_SUCCESS = 'DELETE_EVENTS_SUCCESS';
export const DELETE_EVENTS_FAILURE = 'DELETE_EVENTS_FAILURE';

export const deleteEvent = (eventId, userId) => ({
  [CALL_API]: {
    types: [DELETE_EVENTS_REQUEST, DELETE_EVENTS_SUCCESS, DELETE_EVENTS_FAILURE],
    endpoint: `/events/${eventId}`,
    method: 'DELETE',
  },
  eventId,
  userId
});

export const goToUser = (userId) => ({
  type: 'SELECT_USER',
  userId
});

export const navigate = (screen) => ({
  type: 'NAVIGATE',
  screen
});

export const navigateBack = () => ({
  type: 'NAVIGATE_BACK',
});

export const toggleDetails = () => ({
  type: 'TOGGLE_DETAILS',
});
