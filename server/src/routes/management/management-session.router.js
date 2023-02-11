const express = require("express");

const managementSessionRouter = express.Router();

const {
  checkManagementPermission,
} = require("../_middlewares/check-management-permission.mw");
const {
  httpPostSession,
  httpGetSession,
} = require("./management-session.controller");

managementSessionRouter.get("/", httpGetSession);
managementSessionRouter.post("/", checkManagementPermission, httpPostSession);

module.exports = managementSessionRouter;
