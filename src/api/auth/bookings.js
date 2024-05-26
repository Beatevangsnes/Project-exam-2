import { apiRequest } from "../utils/ApiRequest";

export const getBookingsByProfile = async (username, apiKey) => {
  const endpoint = `/profiles/${username}/bookings?_venue=true`;
  const response = await apiRequest(endpoint, "GET", null, apiKey);
  return response;
};

export const createBooking = async (newData, apiKey) => {
  const endpoint = "/bookings";
  const response = await apiRequest(endpoint, "POST", newData, apiKey);
  return response;
};

export const getBookingsByVenueId = async (venueId, apiKey) => {
  const endpoint = `/venues/${venueId}?_bookings=true`;
  const response = await apiRequest(endpoint, "GET", null, apiKey);
  return response;
};

export const deleteBooking = async (bookingId, apiKey) => {
  const endpoint = `/bookings/${bookingId}`;
  const response = await apiRequest(endpoint, "DELETE", null, apiKey);
  return response;
};
