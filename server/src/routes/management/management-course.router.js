const express = require("express");

const managementCourseRouter = express.Router();

const {
  checkManagementPermission,
} = require("../_middlewares/check-management-permission.mw");
const {
  httpPostCourse,
  httpGetCourse,
} = require("./management-course.controller");

managementCourseRouter.get("/", httpGetCourse);
managementCourseRouter.post("/", checkManagementPermission, httpPostCourse);

module.exports = managementCourseRouter;
