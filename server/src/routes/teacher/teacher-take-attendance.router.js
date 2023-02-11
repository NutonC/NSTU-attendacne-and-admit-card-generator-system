const express = require("express");

const teacherTakeAttendanceRouter = express.Router();

const {
  httpPostTakeStudentsAttendance,
  httpGetAttendanceByCourseAndSession,
} = require("./teacher-take-attendance.controller");
const {
  checkTeacherPermission,
} = require("../_middlewares/check-teacher-permission.mw");

teacherTakeAttendanceRouter.post(
  "/",
  checkTeacherPermission,
  httpPostTakeStudentsAttendance
);
teacherTakeAttendanceRouter.get("/", httpGetAttendanceByCourseAndSession);

module.exports = teacherTakeAttendanceRouter;
