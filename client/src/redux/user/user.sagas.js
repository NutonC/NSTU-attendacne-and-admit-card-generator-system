import { all, call, put, takeLatest } from "redux-saga/effects";

import { UserActionTypes } from "./user.types";

import * as UserActions from "./user.actions";

import {
  httpPostLogin,
  httpGetProfile,
  httpGetLogout,
  httpGetRegistrationToken,
} from "../../requests/user.requests";
import { setAccessToken } from "../../requests/accessToken";

export function* signInStartAsync({ payload: { email, password } }) {
  try {
    const data = yield call(httpPostLogin, email, password);
    if (data && data.error) {
      throw new Error(data.error);
    }

    const profile = yield call(httpGetProfile, data.accessToken);
    if (profile && profile.error) {
      throw new Error(profile.error);
    }

    setAccessToken(profile.accessToken);
    yield put(UserActions.signInSuccess(profile.data));
  } catch (err) {
    yield put(UserActions.signInFailure(err.message));
  }
}

export function* signInStart() {
  yield takeLatest(UserActionTypes.SIGN_IN_START, signInStartAsync);
}

export function* signOutStartAsync() {
  try {
    const data = yield call(httpGetLogout);

    if (data && data.error) {
      throw new Error(data.error);
    }

    yield put(UserActions.signOutSuccess());
  } catch (error) {
    yield put(UserActions.signOutFailure(error.message));
  }
}

export function* signOutStart() {
  yield takeLatest(UserActionTypes.SIGN_OUT_START, signOutStartAsync);
}

export function* checkUserSessionAsync({ payload: { accessToken } }) {
  try {
    const profile = yield call(httpGetProfile, accessToken);
    if (profile && profile.error) {
      throw new Error(profile.error);
    }
    setAccessToken(profile.accessToken);
    yield put(UserActions.signInSuccess(profile.data));
  } catch (err) {
    yield put(UserActions.signInFailure(err.message));
  }
}

export function* checkUserSessionStart() {
  yield takeLatest(UserActionTypes.CHECK_USER_SESSION, checkUserSessionAsync);
}

export function* fetchRegistrationTokenStartAsync({ payload }) {
  try {
    const regToken = yield call(httpGetRegistrationToken, payload);

    if (regToken && regToken.error) {
      throw new Error(regToken.error);
    }

    yield put(UserActions.fetchRegistrationTokenSuccess(regToken.data));
  } catch (error) {
    yield put(UserActions.fetchRegistrationTokenFailure(error.message));
  }
}

export function* fetchRegistrationTokenStart() {
  yield takeLatest(
    UserActionTypes.FETCH_REG_TOKEN_START,
    fetchRegistrationTokenStartAsync
  );
}

export function* userSagas() {
  yield all([
    call(signInStart),
    call(signOutStart),
    call(checkUserSessionStart),
    call(fetchRegistrationTokenStart),
  ]);
}
