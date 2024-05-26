// src/constants/inputConfig.js

export const RegisterInputConfig = [
  {
    type: "text",
    id: "name",
    label: "Name",
    autoFocus: true,
    message: "Name must be minimum 4 characters",
  },
  {
    type: "text",
    id: "email",
    label: "Email address",
    message: "Email must be a valid @stud.noroff.no",
  },
  {
    type: "password",
    id: "password",
    label: "Password",
    message: "Password must be minimum 8 characters",
  },
  {
    type: "checkbox",
    id: "venueManager",
    label: "I will be renting my property",
  },
];

export const LoginInputConfig = [
  {
    type: "text",
    id: "email",
    label: "Email address",
    autoFocus: true,
  },
  {
    type: "password",
    id: "password",
    label: "Password",
  },
  {
    type: "checkbox",
    id: "remember",
    label: "Remember Me",
  },
];
