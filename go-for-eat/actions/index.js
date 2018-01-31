import { CALL_API } from '../middleware/api';
import { schema } from 'normalizr';


const userSchema = new schema.Entity('users', {}, {idAttribute:'_id'});
const userSchemaArray = [userSchema];
const eventSchema = new schema.Entity('events', {attendees:userSchemaArray}, {idAttribute:'event_id'});
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

export const GET_EVENTS_REQUEST = 'GET_EVENTS_REQUEST';
export const GET_EVENTS_SUCCESS = 'GET_EVENTS_SUCCESS';
export const GET_EVENTS_FAILURE = 'GET_EVENTS_FAILURE';

export const getNearbyEvents = (queryString) => ({
  [CALL_API]: {
    types: [GET_EVENTS_REQUEST, GET_EVENTS_SUCCESS, GET_EVENTS_FAILURE],
<<<<<<< HEAD
    endpoint: `/api/v1/events?lat=${queryString.lat}&lng=${queryString.lng}&dist=${queryString.dist}&to=${queryString.to}&from=${queryString.from}`,
    schema: eventSchemaArray,
=======
    endpoint: '/events',
    schema: eventArraySchema,
    data
>>>>>>> 46d07a8d02325679c82c8a603875b1dfdab9a9af
  }
});

export const navigate = (screen) => ({
  type: 'NAVIGATE',
  screen
});

export const navigateBack = (screen) => ({
  type: 'NAVIGATE_BACK',
});
