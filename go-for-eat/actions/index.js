import { CALL_API } from '../middleware/api';

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

export const SET_USER = 'SET_USER';

export const setUser = (data) => ({
  type: SET_USER,
  data,
});
