const express = require("express");

const managementSemesterRouter = express.Router();

const {
  checkManagementPermission,
} = require("../_middlewares/check-management-permission.mw");
const {
  httpPostSemester,
  httpGetSemester,
} = require("./management-semester.controller");

managementSemesterRouter.get("/", httpGetSemester);
managementSemesterRouter.post("/", checkManagementPermission, httpPostSemester);

module.exports = managementSemesterRouter;
