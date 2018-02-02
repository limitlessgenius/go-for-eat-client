import { CALL_API } from '../middleware/api';
import { schema } from 'normalizr';


const userSchema = new schema.Entity('users', {}, {idAttribute:'_id'});
const userSchemaArray = [userSchema];
const eventSchema = new schema.Entity('events', {attendees:userSchemaArray}, {idAttribute:'_id'});
const eventSchemaArray = [eventSchema];

const mySchema = new schema.Entity('user', {events:eventSchemaArray, created_events:eventSchemaArray}, {idAttribute:'_id'});
const outerSchema = new schema.Entity('me', {user:mySchema}, {idAttribute:'user'});
export const LOGIN_USER_REQUEST = 'LOGIN_USER_REQUEST';
export const LOGIN_USER_SUCCESS = 'LOGIN_USER_SUCCESS';
export const LOGIN_USER_FAILURE = 'LOGIN_USER_FAILURE';

export const loginUser = (data) => ({
  [CALL_API]: {
    types: [ LOGIN_USER_REQUEST, LOGIN_USER_SUCCESS, LOGIN_USER_FAILURE ],
    endpoint: '/auth',
    method: 'POST',
    schema:outerSchema,
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
    endpoint: `/events?lat=${queryString.lat}&lng=${queryString.lng}&dist=${queryString.dist}&to=${queryString.to}&from=${queryString.from}`,
    schema: eventSchemaArray,
  }
});

export const UPDATE_USER_REQUEST = 'UPDATE_USER_REQUEST';
export const UPDATE_USER_SUCCESS = 'UPDATE_USER_SUCCESS';
export const UPDATE_USER_FAILURE = 'UPDATE_USER_FAILURE';

export const updateUser = (data) => ({
  [CALL_API]: {
    types: [UPDATE_USER_REQUEST, UPDATE_USER_SUCCESS, UPDATE_USER_FAILURE],
    endpoint: '/me',
    method:'PUT',
    data:{edit:data}
  },
  data:{edit:data}
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
