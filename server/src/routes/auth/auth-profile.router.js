const express = require("express");

const authProfileRouter = express.Router();

const { httpGetUserProfile } = require("./auth-profile.controller");
const { checkAuthToken } = require("../_middlewares/check-auth-token.mw");

authProfileRouter.get("/", checkAuthToken, httpGetUserProfile);

module.exports = authProfileRouter;
