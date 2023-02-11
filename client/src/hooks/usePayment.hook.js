import { useCallback, useState } from "react";
import {
  useStripe,
  useElements,
  CardNumberElement,
} from "@stripe/react-stripe-js";
import {
  httpPostSetupPayment,
  httpPostCreateStripeCustomer,
  httpPostCreateStripeSubscription,
} from "../requests/payment.requests";

function usePayment() {
  const [nameOnCard, setNameOnCard] = useState("");
  const [paymentData, setPaymnetData] = useState({
    clientSecret: null,
    subscriptionId: null,
  });
  const [countryData, setCountryData] = useState("");
  const [regionData, setRegionData] = useState("");
  const [streetData, setStreetData] = useState("");
  const [postalCodeData, setPostalCodeData] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const stripe = useStripe();
  const elements = useElements();

  const setupSubscription = useCallback(async () => {
    try {
      const res = await fetch("https://api64.ipify.org/?format=json");
      if (res.status !== 200) {
        throw new Error("Something went wrong!");
      }
      const ipAddress = await res.json();

      console.log({ ipAddress });

      const resp = await httpPostSetupPayment(ipAddress.ip);

      if (resp.error) {
        throw new Error("Something went wrong!");
      }
      return {
        country: resp.data.country,
        taxPercentage: resp.data.taxPercentage,
        taxDisplayName: resp.data.taxDisplayName,
      };
    } catch (err) {
      setErrMsg(err.message);
      throw new Error(err.message);
    }
  }, []);

  const createSubscription = useCallback(
    async (customerObject) => {
      const { name, email, country, region, street, postalCode, priceId } =
        customerObject;
      try {
        const requestCreateCustomer = await httpPostCreateStripeCustomer({
          name,
          country,
          region,
          street,
          postalCode,
          email,
        });

        if (requestCreateCustomer.error) {
          throw new Error(requestCreateCustomer.message);
        }

        if (!stripe || !elements) {
          // Stripe.js has not yet loaded.
          // Make sure to disable form submission until Stripe.js has loaded.
          throw new Error("Payment was unsuccessful!");
        }
        const requestSubscription = await httpPostCreateStripeSubscription(
          priceId
        );

        if (requestSubscription.error) {
          throw new Error(requestSubscription.message);
        }

        const { subscriptionId, clientSecret, customerId } =
          requestSubscription.data;

        const cardElement = elements.getElement(CardNumberElement);
        // Use card Element to tokenize payment details
        const { error, paymentIntent } = await stripe.confirmCardPayment(
          clientSecret,
          {
            payment_method: {
              card: cardElement,
              billing_details: {
                name: name,
              },
            },
          }
        );

        if (error || paymentIntent.status !== "succeeded") {
          // show error and collect new card details.
          throw new Error(error.message);
        }

        setSuccessMsg(paymentIntent.status);

        setPaymnetData({
          clientSecret,
          subscriptionId,
        });

        return {
          customerId,
          subscriptionId,
        };
      } catch (err) {
        setErrMsg(err.message);
        throw new Error(err.message);
      }
    },
    [elements, stripe]
  );

  return {
    successMsg,
    errMsg,
    paymentData,
    createSubscription,
    setupSubscription,
    setNameOnCard,
    setCountryData,
    setRegionData,
    setStreetData,
    setPostalCodeData,
    nameOnCard,
    countryData,
    regionData,
    streetData,
    postalCodeData,
  };
}

export default usePayment;
