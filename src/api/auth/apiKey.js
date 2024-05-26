import { CREATE_API_KEY_URL } from "../constants/api";

export async function createApiKey(name = "") {
  const accessToken = localStorage.getItem("accessToken");

  try {
    const response = await fetch(CREATE_API_KEY_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name }),
    });

    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      throw new Error("Failed to create API key");
    }
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}
