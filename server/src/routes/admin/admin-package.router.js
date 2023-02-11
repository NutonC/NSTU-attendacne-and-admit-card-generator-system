const express = require("express");

const adminPackageRouter = express.Router();

const {
  httpPutUpdateSubsPackage,
  httpsPostCreateSubsPackage,
} = require("./admin-package.controller");

adminPackageRouter.post("/create", httpsPostCreateSubsPackage);
adminPackageRouter.put("/:packagename", httpPutUpdateSubsPackage);

module.exports = adminPackageRouter;
