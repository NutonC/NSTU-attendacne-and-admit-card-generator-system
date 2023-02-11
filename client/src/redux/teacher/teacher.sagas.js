import { all, call, put, takeLatest } from 'redux-saga/effects';

import { TeacherActionTypes } from './teacher.types';
import { 
    fetchCoursesSuccess, 
    fetchCoursesFailure,
    fetchStudentsListOfCourseSuccess,
    fetchStudentsListOfCourseFailure 
} from './teacher.actions';

import { 
    httpGetTeacherCourses, 
    httpsGetStudentsListOfCourse 
} from "../../requests/teacher-acc-requests";

export function* fetchCoursesStartAsync({payload : {teacherId}}) {
    try {
        const data = yield call(httpGetTeacherCourses, teacherId);
        if (data && data.error) {
            throw new Error(data.error);
        }
        yield put(fetchCoursesSuccess(data));
    }catch (err) {
        yield put(fetchCoursesFailure(err.message))
    }
};

export function* fetchCoursesStart() {
    yield takeLatest(
        TeacherActionTypes.FETCH_COURSES_START,
        fetchCoursesStartAsync
    );
};

export function* fetchStudentsListOfCourseStartAsync({payload: {courseId}}) {
    try {
        const data = yield call(httpsGetStudentsListOfCourse, courseId);
        if (data && data.error) {
            throw new Error(data.error);
        }
        yield put(fetchStudentsListOfCourseSuccess(data));
    }catch (err) {
        yield put(fetchStudentsListOfCourseFailure(err.message))
    }
};

export function* fetchStudentsListOfCourseStart() {
    yield takeLatest(
        TeacherActionTypes.FETCH_STUDENTS_LIST_OF_COURSE_START,
        fetchStudentsListOfCourseStartAsync
    );
};

export function* teacherSagas() {
    yield all([
        call(fetchCoursesStart),
        call(fetchStudentsListOfCourseStart)
    ])
};