const express = require("express");

const apiRoutes = express.Router();

const authRouter = require("./auth/auth.router");
const managementRouter = require("./management/management.router");
const teacherRouter = require("./teacher/teacher.router");
const studentRouter = require("./student/student.router");
const paymentRouter = require("./payment/payment.router");
const adminRouter = require("./admin/admin.router");

const {
  httpPostRefreshToken,
} = require("./refresh-token/refresh-token.controller");
const {
  httpGetAllSubscriptionPackage,
} = require("./package/package.controller");

apiRoutes.get("/packages", httpGetAllSubscriptionPackage);
apiRoutes.post("/refresh_token", httpPostRefreshToken);

apiRoutes.use("/auth", authRouter);
apiRoutes.use("/management", managementRouter);
apiRoutes.use("/teacher", teacherRouter);
apiRoutes.use("/student", studentRouter);
apiRoutes.use("/payment", paymentRouter);
apiRoutes.use("/admin", adminRouter);

module.exports = apiRoutes;
