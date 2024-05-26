// src/api/login.js

import { LOGIN_URL } from "../constants/api";

export async function login(email, password, remember) {
  const options = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  };

  const response = await fetch(LOGIN_URL, options);
  const json = await response.json();

  if (!response.ok) {
    throw new Error(json.errors?.[0]?.message ?? "Login failed");
  }

  json.remember = remember;
  return json;
}
