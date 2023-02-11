const express = require("express");

const managementDepartmentRouter = express.Router();

const {
  checkManagementPermission,
} = require("../_middlewares/check-management-permission.mw");
const {
  httpPostDepartment,
  httpGetDepartment,
} = require("./management-department.controller");

managementDepartmentRouter.get("/", httpGetDepartment);
managementDepartmentRouter.post(
  "/",
  checkManagementPermission,
  httpPostDepartment
);

module.exports = managementDepartmentRouter;
