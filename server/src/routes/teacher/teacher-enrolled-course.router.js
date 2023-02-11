const express = require("express");

const teacherEnrolledCourseRouter = express.Router();

const {
  httpGetEnrollCourse,
  httpPostEnrollCourse,
} = require("./teacher-enrolled-course.controller");

teacherEnrolledCourseRouter.post("/", httpPostEnrollCourse);
teacherEnrolledCourseRouter.get("/", httpGetEnrollCourse);

module.exports = teacherEnrolledCourseRouter;
