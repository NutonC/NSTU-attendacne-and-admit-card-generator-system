import { all, call, put, takeLatest } from "redux-saga/effects";

import { PackageActionTypes } from "./package.types";

import * as PackageActions from "./package.actions";

import { httpGetSubscriptionPackages } from "../../requests/requests";

export function* fetchPackagesStartAsync() {
  try {
    const resp = yield call(httpGetSubscriptionPackages);

    if (resp && resp.error) {
      throw new Error(resp.error);
    }

    yield put(PackageActions.setPackagesSucess(resp.data));
  } catch (error) {
    yield put(PackageActions.setPackagesFailure(error.message));
  }
}

export function* fetchPackagesStart() {
  yield takeLatest(
    PackageActionTypes.SET_PACKAGES_START,
    fetchPackagesStartAsync
  );
}

export function* subsPacakageSagas() {
  yield all([call(fetchPackagesStart)]);
}
