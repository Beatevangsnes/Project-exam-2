// src/api/register.js

import { REGISTER_URL } from "../constants/api";

export async function registerUser(userDetails) {
  const options = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userDetails),
  };

  const response = await fetch(REGISTER_URL, options);
  const json = await response.json();

  if (!response.ok) {
    throw new Error(json.errors?.[0]?.message ?? "Registration failed");
  }

  return json;
}
