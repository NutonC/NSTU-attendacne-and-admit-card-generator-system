const express = require("express");

const adminRouter = express.Router();

const adminPacakgeRouter = require("./admin-package.router");

adminRouter.use("/package", adminPacakgeRouter);

module.exports = adminRouter;
