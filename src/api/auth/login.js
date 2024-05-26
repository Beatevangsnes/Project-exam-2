import { LOGIN_URL } from "../constants/api";

export const loginUser = async (loginData) => {
  const response = await fetch(LOGIN_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(loginData),
  });

  if (!response.ok) {
    throw new Error("Failed to login user");
  }

  return response.json();
};
