import axios from "axios";
import authHeaders from "./auth-header";
const API_URL = "http://localhost:5000/api/test/";

export const getPublicContent = () => {
  return axios.get(API_URL + "all");
};
export const getUserBoard = () => {
  return axios.get(API_URL + "user", { headers: authHeaders() });
};
export const getModeratorBoard = () => {
  return axios.get(API_URL + "mod", { headers: authHeaders() });
};
export const getAdminBoard = () => {
  return axios.get(API_URL + "admin", { headers: authHeaders() });
};
