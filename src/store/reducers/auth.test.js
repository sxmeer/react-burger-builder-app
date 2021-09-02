import reducer from './auth';
import * as actionTypes from '../actions/actionTypes';

describe("auth reducer", () => {
  it("should be in initial state initially", () => {
    expect(reducer(undefined, {})).toEqual({
      token: null,
      userId: null,
      loading: false,
      error: null,
      authRedirectPath: '/'
    });
  });
  it("should set loginId and userId after login", () => {
    expect(reducer({
      token: null,
      userId: null,
      loading: false,
      error: null,
      authRedirectPath: '/'
    }, {
      type: actionTypes.AUTH_SUCCESS,
      userId: 'some-user-id',
      idToken: 'some-id-token'
    })).toEqual({
      token: 'some-id-token',
      userId: 'some-user-id',
      loading: false,
      error: null,
      authRedirectPath: '/'
    });
  })
})