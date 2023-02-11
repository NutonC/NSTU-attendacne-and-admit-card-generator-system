import API_URL from "./api-url";
import { getAccessToken } from "./accessToken";

export async function httpPostRegisterManagementCredential(
  credentialType,
  credentials
) {
  const response = await fetch(`${API_URL}/management/${credentialType}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getAccessToken()}`,
    },
    body: JSON.stringify({
      ...credentials,
    }),
  });
  return await response.json();
}

export async function httpGetRegisterManagementCredential(credentialType) {
  const response = await fetch(`${API_URL}/management/${credentialType}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getAccessToken()}`,
    },
  });
  return await response.json();
}

export async function httpGetManagementTokens(tokenType) {
  const response = await fetch(
    `${API_URL}/auth/token/management?tokenType=${tokenType}`,
    {
      headers: {
        Authorization: `Bearer ${getAccessToken()}`,
        "Content-Type": "application/json",
      },
    }
  );
  return await response.json();
}
