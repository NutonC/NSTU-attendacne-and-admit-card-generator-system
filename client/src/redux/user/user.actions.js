import { UserActionTypes } from "./user.types";

export const signInStart = (email, password) => ({
  type: UserActionTypes.SIGN_IN_START,
  payload: { email, password },
});

export const signInSuccess = (user) => ({
  type: UserActionTypes.SIGN_IN_SUCCESS,
  payload: user,
});

export const signInFailure = (error) => ({
  type: UserActionTypes.SIGN_IN_FAILURE,
  payload: error,
});

export const signOutStart = () => ({
  type: UserActionTypes.SIGN_OUT_START,
});

export const signOutSuccess = () => ({
  type: UserActionTypes.SIGN_OUT_SUCCESS,
  payload: null,
});

export const signOutFailure = (error) => ({
  type: UserActionTypes.SIGN_OUT_FAILURE,
  payload: error,
});

export const checkUserSession = (accessToken) => ({
  type: UserActionTypes.CHECK_USER_SESSION,
  payload: accessToken,
});

export const fetchRegistrationTokenStart = (tokenCode) => ({
  type: UserActionTypes.FETCH_REG_TOKEN_START,
  payload: tokenCode,
});

export const fetchRegistrationTokenSuccess = (tokenData) => ({
  type: UserActionTypes.FETCH_REG_TOKEN_SUCCESS,
  payload: tokenData,
});

export const fetchRegistrationTokenFailure = (error) => ({
  type: UserActionTypes.FETCH_REG_TOKEN_FAILURE,
  payload: error,
});
