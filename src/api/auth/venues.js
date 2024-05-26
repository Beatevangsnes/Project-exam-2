import { apiRequest } from "../utils/ApiRequest";

export const getVenuesByProfile = async (username, apiKey) => {
  const endpoint = `/profiles/${username}/venues`;
  const response = await apiRequest(endpoint, "GET", null, apiKey);
  return response;
};

export const getVenues = async () => {
  const endpoint = "/venues";
  const response = await apiRequest(endpoint, "GET");
  return response;
};

export const getVenueById = async (id, params = {}) => {
  const queryParams = new URLSearchParams(params).toString();
  const endpoint = `/venues/${id}?${queryParams}`;
  const response = await apiRequest(endpoint, "GET");
  return response;
};

export const deleteVenue = async (venueId, apiKey) => {
  const endpoint = `/venues/${venueId}`;
  const response = await apiRequest(endpoint, "DELETE", null, apiKey);
  return response;
};

export const createVenue = async (newData, apiKey) => {
  const endpoint = `/venues`;
  const response = await apiRequest(endpoint, "POST", newData, apiKey);
  return response;
};

export const updateVenue = async (id, newData, apiKey) => {
  const endpoint = `/venues/${id}`;
  const response = await apiRequest(endpoint, "PUT", newData, apiKey);
  return response;
};

export const searchVenues = async (query) => {
  const endpoint = `/venues/search?q=${query}`;
  const response = await apiRequest(endpoint, "GET");
  return response;
};
