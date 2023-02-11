const express = require("express");

const teacherPreviousClassesRouter = express.Router();

const {
  httpGetPreviousCourseClasses,
} = require("./teacher-previous-class.controller");

teacherPreviousClassesRouter.get("/", httpGetPreviousCourseClasses);

module.exports = teacherPreviousClassesRouter;
