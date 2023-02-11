import API_URL from "./api-url";
import { getAccessToken } from "./accessToken";

export const httpPostCreateRegistrationToken = async (tokenType, tokenData) => {
  const response = await fetch(`${API_URL}/auth/token/create`, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getAccessToken()}`,
    },
    body: JSON.stringify({
      tokenType,
      ...tokenData,
    }),
  });
  return await response.json();
};
