const express = require("express");

const managementHallRouter = express.Router();

const {
  checkManagementPermission,
} = require("../_middlewares/check-management-permission.mw");
const { httpPostHall, httpGetHall } = require("./management-hall.controller");

managementHallRouter.get("/", httpGetHall);
managementHallRouter.post("/", checkManagementPermission, httpPostHall);

module.exports = managementHallRouter;
