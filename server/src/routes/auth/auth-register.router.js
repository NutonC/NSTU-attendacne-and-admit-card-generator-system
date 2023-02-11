const express = require("express");

const authRegisterRouter = express.Router();

const {
  httpPostRegisterVersity,
  httpPostRegisterTeacher,
  httpPostRegisterStudent,
  httpPostRegisterManagement,
} = require("./auth-register.controller");

authRegisterRouter.post("/versity", httpPostRegisterVersity);
authRegisterRouter.post("/teacher", httpPostRegisterTeacher);
authRegisterRouter.post("/student", httpPostRegisterStudent);
authRegisterRouter.post("/management", httpPostRegisterManagement);

module.exports = authRegisterRouter;
