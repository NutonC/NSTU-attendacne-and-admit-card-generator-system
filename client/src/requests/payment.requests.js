import API_URL from "./api-url";
import { getAccessToken } from "./accessToken";

export const httpPostSetupPayment = async (ip) => {
  const response = await fetch(`${API_URL}/payment/setup`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ip,
    }),
  });
  return await response.json();
};

export const httpPostCreateStripeCustomer = async (customerPayload) => {
  const { name, country, region, street, postalCode, email } = customerPayload;
  const response = await fetch(`${API_URL}/payment/create-customer`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name,
      email,
      country,
      region,
      street,
      postalCode,
    }),
  });
  return await response.json();
};

export const httpPostCreateStripeSubscription = async (productId) => {
  const response = await fetch(`${API_URL}/payment/create-subscription`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      priceId: productId,
    }),
  });
  return await response.json();
};

export const httpGetStripeInvoices = async () => {
  const response = await fetch(`${API_URL}/payment/invoices`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getAccessToken()}`,
    },
  });
  return await response.json();
};
