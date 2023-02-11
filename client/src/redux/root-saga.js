import { all, call } from "redux-saga/effects";

import { subsPacakageSagas } from "./package/package.sagas";
import { userSagas } from "./user/user.sagas";
import { teacherSagas } from "./teacher/teacher.sagas"; //DEPRECATED

//'all' runs all saga's concurrently so we dont have to wait for one saga to resolve to start another
//pretty much works like 'takeEvery'
export default function* rootSaga() {
  yield all([call(subsPacakageSagas), call(userSagas), call(teacherSagas)]);
}
