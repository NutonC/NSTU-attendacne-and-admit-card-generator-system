import {createSelector} from 'reselect';

const selectTeacher = state => state.teacher;

export const selectTeacherIsPending = createSelector(
    [selectTeacher],
    (teacher) => teacher.isPending
);

export const selectTeacherCourses = createSelector(
    [selectTeacher],
    (teacher) => teacher.courses
);

export const selectStudentsListOfCourse = createSelector(
    [selectTeacher],
    (teacher) => teacher.studentsListOfCourse
);
