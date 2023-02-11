const stripe = require("../../services/stripe");
const geoip = require("geoip-lite");

const { sendCookie } = require("../../utils/cookie.util");

const {
  findSubscription,
} = require("../../models/subscription/subscription.model");

const httpPostSetupSubscription = async (req, res) => {
  try {
    const { ip } = req.body;
    const geo = geoip.lookup(ip);

    const taxRates = await stripe.taxRates.list({
      limit: 10,
    });

    const taxRateForCountry = taxRates.data.filter(
      (taxRate) => taxRate.country === geo.country
    );

    let hasTax = false;

    if (
      taxRateForCountry &&
      taxRateForCountry.length > 0 &&
      taxRateForCountry[0].id
    ) {
      hasTax = true;
      sendCookie(
        res,
        "tax",
        taxRateForCountry[0].id,
        60 * 60 * 1000,
        "/payment"
      );
    }

    const taxObject = hasTax
      ? {
          taxPercentage: taxRateForCountry[0].percentage,
          taxDisplayName: taxRateForCountry[0].display_name,
        }
      : {};

    return res.status(200).json({
      data: {
        hasTax,
        ...geo,
        ...taxObject,
      },
      message: "Success",
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: "Something went wrong",
      error: "Payment setup was unsuccessful",
    });
  }
};

const httpPostCreateStripeCustomer = async (req, res) => {
  try {
    const { name, email, country, region, street, postalCode } = req.body;
    const customer = await stripe.customers.create({
      email,
      name,
      address: {
        city: region,
        country: country,
        line1: street,
        postal_code: postalCode,
      },
    });

    sendCookie(res, "customer", customer.id, 60 * 1000, "/payment");

    return res.status(200).json({
      message: "Success",
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: "Something went wrong",
      error: "Creating customer was unsuccessful",
    });
  }
};

const httpPostCreateStripeSubscription = async (req, res) => {
  const priceId = req.body.priceId;
  const taxId = req.cookies["tax"];
  const customerId = req.cookies["customer"];

  try {
    // Create the subscription. Note we're expanding the Subscription's
    // latest invoice and that invoice's payment_intent
    // so we can pass it to the front end to confirm the payment
    console.log({ taxId, priceId, customerId });
    const priceObject = taxId
      ? {
          price: priceId,
          tax_rates: [taxId],
        }
      : {
          price: priceId,
        };

    const subscription = await stripe.subscriptions.create({
      customer: customerId,
      items: [
        {
          ...priceObject,
        },
      ],
      automatic_tax: {
        enabled: taxId ? false : true,
      },
      payment_behavior: "default_incomplete",
      expand: ["latest_invoice.payment_intent"],
    });

    return res.status(200).json({
      data: {
        customerId,
        subscriptionId: subscription.id,
        clientSecret: subscription.latest_invoice.payment_intent.client_secret,
      },
      message: "Subscription was successful",
    });
  } catch (error) {
    console.error(error);
    return res
      .status(400)
      .json({ error: error.message, message: "Subscription was unsuccessful" });
  }
};

const httpPostStripeCustomerInvoices = async (req, res) => {
  try {
    const { userId } = req.user;

    const subscriptionData = await findSubscription({ userId });

    if (!subscriptionData) {
      throw new Error("Subscription doesn't exists");
    }

    const { customerId } = subscriptionData;

    const invoices = await stripe.invoices.search({
      query: `customer:"${customerId}"`,
    });

    const invoicesResult =
      invoices.data.length &&
      invoices.data.map((invoice) => ({
        name: invoice.customer_name,
        address: invoice.customer_address,
        invoice_url: invoice.hosted_invoice_url,
      }));

    return res.status(200).json({
      data: invoicesResult,
      message: "Succesfully retrived invoice data",
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: "Something went wrong",
      error: "Retriving invoices was unsuccessful",
    });
  }
};

const httpPostCreateStripeCheckoutSession = async (req, res) => {
  try {
    // The price ID passed from the client
    const { priceId } = req.body;

    const taxRates = await stripe.taxRates.list({
      limit: 3,
    });

    const tax_rates = taxRates.data.map((tax) => tax.id);
    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      line_items: [
        {
          price: priceId,
          // For metered billing, do not pass quantity
          quantity: 1,
        },
      ],
      automatic_tax: {
        enabled: true,
      },
      // {CHECKOUT_SESSION_ID} is a string literal; do not change it!
      // the actual Session ID is returned in the query parameter when your customer
      // is redirected to the success page.
      success_url: `${process.env.CLIENT_ORIGIN}/register-university/form?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.CLIENT_ORIGIN}/register-university/form`,
    });

    console.log({ session });
    // Redirect to the URL returned on the Checkout Session.
    // With express, you can redirect with:
    return res.status(200).json({
      data: session.url,
      message: "Proceeding to payments",
      tax_rates,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: "Something went wrong",
      error: "Payment was unsuccessful",
    });
  }
};

module.exports = {
  httpPostCreateStripeCustomer,
  httpPostCreateStripeSubscription,
  httpPostCreateStripeCheckoutSession,
  httpPostSetupSubscription,
  httpPostStripeCustomerInvoices,
};
