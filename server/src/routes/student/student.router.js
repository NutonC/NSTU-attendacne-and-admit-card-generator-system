const express = require("express");
const { checkAuthToken } = require("../_middlewares/check-auth-token.mw");
const {
  checkStudentPermission,
} = require("../_middlewares/check-student.permission.mw");
const {
  checkVersityPermission,
} = require("../_middlewares/check-versity-permission.mw");

const studentRouter = express.Router();

const {
  httpGetAllStudentAttendanceDataBySemester,
} = require("./student.controller");

studentRouter.get(
  "/attendance/:semesterNumber",
  checkAuthToken,
  checkVersityPermission,
  checkStudentPermission,
  httpGetAllStudentAttendanceDataBySemester
);

module.exports = studentRouter;
