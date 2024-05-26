//src/api/utils/ApiRequest.js
import { BASE_URL } from "../constants/api";

export const apiRequest = async (
  endpoint,
  method = "GET",
  data = null,
  apiKey = null
) => {
  const accessToken = localStorage.getItem("accessToken");
  const url = `${BASE_URL}${endpoint}`;

  const headers = {
    "Content-Type": "application/json",
    ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
    ...(apiKey && { "X-Noroff-API-Key": apiKey }),
  };

  const options = {
    method,
    headers,
    ...(data && { body: JSON.stringify(data) }),
  };

  try {
    const response = await fetch(url, options);

    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }

    if (response.status === 204) {
      // Handle 204 No Content response
      return {};
    }

    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.error(`Error in ${method} request to ${endpoint}:`, error);
    throw error;
  }
};
