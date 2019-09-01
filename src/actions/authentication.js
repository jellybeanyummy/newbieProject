import axios from 'axios';
import {
  AUTH_REGISTER, 
  AUTH_REGISTER_SUCCESS, 
  AUTH_REGISTER_FAILURE, 
  AUTH_LOGIN,
  AUTH_LOGIN_SUCCESS,
  AUTH_LOGIN_FAILURE
} from './ActionTypes';

export function registerRequest(username, password) {
  return (dispatch) => {
    dispatch(register());
    return axios.post('/api/account/signup', { username, password })
    .then((response) => {
      dispatch(registerSuccess());
    }).catch((error) => {
      dispatch(registerFailure(error.reponse.data.code));
    });
  };
}

export function register() {
  return {
    type: AUTH_REGISTER
  };
}

export function registerSuccess() {
  return {
    type: AUTH_REGISTER_SUCCESS
  };
}

export function registerFailure(error) {
  return {
    type: AUTH_REGISTER_FAILURE, 
    error
  };
}

export function loginRequest(username, password) {
  return (dispatch) => {
    dispatch(login());
    return axios.post('/api/account/login', { username, password })
    .then((response) => {
      dispatch(loginSuccess(username));
    }).catch((error) => {
      dispatch(loginFailure());
    });
  };
}

export function login() {
  return {
    type: AUTH_LOGIN
  };
}

export function loginSuccess(username) {
  return {
    type: AUTH_LOGIN_SUCCESS, 
    username
  };
}

export function loginFailure() {
  return {
    type: AUTH_LOGIN_FAILURE
  };
}
