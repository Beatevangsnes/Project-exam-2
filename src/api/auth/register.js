import { REGISTER_URL } from "../constants/api";

export const registerUser = async (userData) => {
  const response = await fetch(REGISTER_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });

  if (!response.ok) {
    const errorData = await response.json();
    console.error("Error data:", errorData);
    throw new Error(`Failed to register user: ${errorData.message}`);
  }

  return response.json();
};
