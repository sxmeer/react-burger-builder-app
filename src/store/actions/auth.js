import * as actionTypes from './actionTypes';
import axios from 'axios';

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START
  };
};

export const authSuccess = (idToken, userId) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    idToken: idToken,
    userId: userId
  };
};

export const authFail = (error) => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: error
  };
};

export const logOut = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('userId');
  localStorage.removeItem('expirationDate');
  return {
    type: actionTypes.LOG_OUT
  };
};

export const checkAuthTimeout = (expirationTime) => {
  return dispatch => {
    setTimeout(() => {
      dispatch(logOut());
    }, expirationTime * 1000);
  };
};

export const auth = (email, password, isSignup) => {
  return dispatch => {
    dispatch(authStart());
    let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBIW8EQcfwkDpXkALSB-60U-mVOZrxRfk4';
    if (!isSignup) {
      url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBIW8EQcfwkDpXkALSB-60U-mVOZrxRfk4';
    }
    axios.post(url, {
      email: email,
      password: password,
      returnSecureToken: true
    }).then(response => {
      const expirationDate = new Date(new Date().getTime() + response.data.expiresIn * 1000);
      localStorage.setItem('token', response.data.idToken);
      localStorage.setItem('userId', response.data.localId);
      localStorage.setItem('expirationDate', expirationDate);
      dispatch(authSuccess(response.data.idToken, response.data.localId));
      dispatch(checkAuthTimeout(response.data.expiresIn));
    }).catch(error => {
      dispatch(authFail(error.response.data.error));
    })
  };
};

export const setAuthDirectPath = (path) => {
  return {
    type: actionTypes.SET_AUTH_REDIRECT_PATH,
    path: path
  };
};

export const checkAuthState = () => {
  return dispatch => {
    const token = localStorage.getItem('token');
    if (!token) {
      dispatch(logOut());
    } else {
      const userId = localStorage.getItem('userId');
      const expirationDate = new Date(localStorage.getItem('expirationDate'));
      const currentDate = new Date();
      if (currentDate > expirationDate) {
        dispatch(logOut());
      } else {
        dispatch(authSuccess(token, userId));
        dispatch(checkAuthTimeout((expirationDate.getTime() - currentDate.getTime()) / 1000));
      }
    }
  }
}