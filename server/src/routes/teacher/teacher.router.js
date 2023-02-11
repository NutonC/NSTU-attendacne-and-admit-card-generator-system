const express = require("express");

const teacherRouter = express.Router();

const teacherEnrolledCourseRouter = require("./teacher-enrolled-course.router");
const teacherTakeAttendanceRouter = require("./teacher-take-attendance.router");
const teacherPreviousClassesRouter = require("./teacher-previous-class.router");

const {
  checkVersityPermission,
} = require("../_middlewares/check-versity-permission.mw");
const {
  checkTeacherPermission,
} = require("../_middlewares/check-teacher-permission.mw");
const { checkAuthToken } = require("../_middlewares/check-auth-token.mw");

teacherRouter.use(
  "/enroll-course",
  checkAuthToken,
  checkVersityPermission,
  checkTeacherPermission,
  teacherEnrolledCourseRouter
);

teacherRouter.use(
  "/attendance",
  checkAuthToken,
  checkVersityPermission,
  teacherTakeAttendanceRouter
);

teacherRouter.use(
  "/course-class",
  checkAuthToken,
  checkVersityPermission,
  checkTeacherPermission,
  teacherPreviousClassesRouter
);

module.exports = teacherRouter;
