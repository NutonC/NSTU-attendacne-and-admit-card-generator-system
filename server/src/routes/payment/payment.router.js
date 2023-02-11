const express = require("express");
const {
  httpPostCreateStripeCheckoutSession,
  httpPostCreateStripeCustomer,
  httpPostCreateStripeSubscription,
  httpPostSetupSubscription,
  httpPostStripeCustomerInvoices,
} = require("./payment.controller");

const { checkAuthToken } = require("../_middlewares/check-auth-token.mw");

const paymentRouter = express.Router();

paymentRouter.post("/create-customer", httpPostCreateStripeCustomer);
paymentRouter.post("/create-subscription", httpPostCreateStripeSubscription);
paymentRouter.post("/setup", httpPostSetupSubscription);
paymentRouter.get("/invoices", checkAuthToken, httpPostStripeCustomerInvoices);
paymentRouter.post(
  "/create-checkout-session",
  httpPostCreateStripeCheckoutSession
); //stripe low code example

module.exports = paymentRouter;
