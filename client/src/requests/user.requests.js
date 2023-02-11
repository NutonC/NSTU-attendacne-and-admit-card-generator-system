import API_URL from "./api-url";
import { getAccessToken } from "./accessToken";

export const httpPostUniversityRegistration = async (versityFormData) => {
  const {
    name,
    email,
    phone,
    gender,
    password,
    versityName,
    versityWebsite,
    packageName,
    customerId,
    subscriptionId,
  } = versityFormData;
  const response = await fetch(`${API_URL}/auth/register/versity`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name,
      email,
      phone,
      gender,
      password,
      versityName,
      versityWebsite,
      packageName,
      customerId,
      subscriptionId,
    }),
  });
  return await response.json();
};

export const httpPostRegisterWithToken = async (tokenType, formData) => {
  const response = await fetch(`${API_URL}/auth/register/${tokenType}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      ...formData,
    }),
  });
  return await response.json();
};

export const httpGetRegistrationToken = async (tokenCode) => {
  const response = await fetch(`${API_URL}/auth/token/${tokenCode}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
  return await response.json();
};

export const httpPostLogin = async (email, password) => {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: email,
      password: password,
    }),
  });
  return await response.json();
};

export const httpGetLogout = async () => {
  const response = await fetch(`${API_URL}/auth/logout`, {
    method: "GET",
    credentials: "include",
  });
  return await response.json();
};

export const httpGetProfile = async (token = getAccessToken()) => {
  const response = await fetch(`${API_URL}/auth/profile`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return await response.json();
};
