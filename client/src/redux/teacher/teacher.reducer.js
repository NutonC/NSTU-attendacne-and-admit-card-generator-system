import { TeacherActionTypes } from "./teacher.types";

const INITIAL_STATE = {
    courses: [],
    studentsListOfCourse: [],
    isPending: false,
    error: null
};

export const teacherReducer = (state=INITIAL_STATE, action) => {
    switch(action.type) {
        case TeacherActionTypes.FETCH_COURSES_START:
        case TeacherActionTypes.FETCH_STUDENTS_LIST_OF_COURSE_START:
            return {
                ...state,
                isPending: true
            }
        case TeacherActionTypes.FETCH_COURSES_SUCCESS:
        case TeacherActionTypes.CLEAR_COURSES_ON_SIGNOUT:
            return {
                ...state,
                courses: action.payload,
                isPending: false,
                error: null
            }
        case TeacherActionTypes.FETCH_STUDENTS_LIST_OF_COURSE_SUCCESS:
            return {
                ...state,
                studentsListOfCourse: action.payload,
                isPending: false,
                error: null
            }
        case TeacherActionTypes.FETCH_COURSES_FAILURE:
        case TeacherActionTypes.FETCH_STUDENTS_LIST_OF_COURSE_FAILURE:
            return {
                ...state,
                error: action.payload,
                isPending: false
            }
        default:
            return state;
    }
};