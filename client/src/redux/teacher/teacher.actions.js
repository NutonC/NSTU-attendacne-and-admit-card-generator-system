import { TeacherActionTypes } from "./teacher.types";

export const fetchCoursesStart = (teacherId) => (
    {
        type: TeacherActionTypes.FETCH_COURSES_START,
        payload: {teacherId}
    }
);

export const fetchCoursesSuccess = (coursesData) => (
    {
        type: TeacherActionTypes.FETCH_COURSES_SUCCESS,
        payload: coursesData
    }
);

export const fetchCoursesFailure = (error) => (
    {
        type: TeacherActionTypes.FETCH_COURSES_FAILURE,
        payload: error
    }
);

export const clearCoursesOnSignOut = () => (
    {
        type: TeacherActionTypes.CLEAR_COURSES_ON_SIGNOUT,
        payload: []
    }
);

export const fetchStudentsListOfCourseStart = (courseId) => (
    {
        type: TeacherActionTypes.FETCH_STUDENTS_LIST_OF_COURSE_START,
        payload: {courseId}
    }
);

export const fetchStudentsListOfCourseSuccess = (studentsList) => (
    {
        type: TeacherActionTypes.FETCH_STUDENTS_LIST_OF_COURSE_SUCCESS,
        payload: studentsList
    }
);

export const fetchStudentsListOfCourseFailure = (error) => (
    {
        type: TeacherActionTypes.FETCH_STUDENTS_LIST_OF_COURSE_FAILURE,
        payload: error
    }
);