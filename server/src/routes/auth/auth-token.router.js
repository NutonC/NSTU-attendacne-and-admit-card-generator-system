const express = require("express");

const authTokenRouter = express.Router();

const {
  httpPostCreateToken,
  httpGetToken,
  httpGetManagementTokens,
} = require("./auth-token.controller");
const { checkAuthToken } = require("../_middlewares/check-auth-token.mw");
const {
  checkManagementPermission,
} = require("../_middlewares/check-management-permission.mw");

authTokenRouter.get(
  "/management",
  checkAuthToken,
  checkManagementPermission,
  httpGetManagementTokens
);
authTokenRouter.post("/create", checkAuthToken, httpPostCreateToken);
authTokenRouter.get("/:tokencode", httpGetToken);

module.exports = authTokenRouter;
