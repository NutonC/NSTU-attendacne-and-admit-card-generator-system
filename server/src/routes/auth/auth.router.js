const express = require("express");

const authRouter = express.Router();

const authRegisterRouter = require("./auth-register.router");
const authTokenRouter = require("./auth-token.router");
const authProfileRouter = require("./auth-profile.router");

const { httpPostLogin, httpGetLogout } = require("./auth.controller");

authRouter.use("/token", authTokenRouter);
authRouter.use("/register", authRegisterRouter);
authRouter.use("/profile", authProfileRouter);

authRouter.post("/login", httpPostLogin);
authRouter.get("/logout", httpGetLogout);

module.exports = authRouter;
