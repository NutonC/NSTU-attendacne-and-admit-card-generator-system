const express = require("express");

const managementRouter = express.Router();

const managementDepartmentRouter = require("./management-department.router");
const managementSemesterRouter = require("./management-semester.router");
const managementSessionRouter = require("./management-session.router");
const managementHallRouter = require("./management-hall.router");
const managementCourseRouter = require("./management-course.router");

const {
  checkVersityPermission,
} = require("../_middlewares/check-versity-permission.mw");
const { checkAuthToken } = require("../_middlewares/check-auth-token.mw");

managementRouter.use(
  "/course",
  checkAuthToken,
  checkVersityPermission,
  managementCourseRouter
);
managementRouter.use(
  "/department",
  checkAuthToken,
  checkVersityPermission,
  managementDepartmentRouter
);
managementRouter.use(
  "/semester",
  checkAuthToken,
  checkVersityPermission,
  managementSemesterRouter
);
managementRouter.use(
  "/session",
  checkAuthToken,
  checkVersityPermission,
  managementSessionRouter
);
managementRouter.use(
  "/hall",
  checkAuthToken,
  checkVersityPermission,
  managementHallRouter
);

module.exports = managementRouter;
