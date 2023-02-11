const CONFIG = require("../config");
const stripe = require("stripe")(CONFIG.stripe.stripe_secret);

module.exports = stripe;
