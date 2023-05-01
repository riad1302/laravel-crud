import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:90/api/book/";

const getPublicContent = () => {
  return axios.get(API_URL + "list");
};

const getUserBoard = () => {
  return axios.get(API_URL + "list", { headers: authHeader() });
};

const getModeratorBoard = () => {
  return axios.get(API_URL + "mod", { headers: authHeader() });
};

const getAdminBoard = () => {
  return axios.get(API_URL + "admin", { headers: authHeader() });
};

export default {
  getPublicContent,
  getUserBoard,
  getModeratorBoard,
  getAdminBoard,
};
