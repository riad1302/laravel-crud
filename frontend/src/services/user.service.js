import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:90/api/book/";

const getUserBoard = () => {
  return axios.get(API_URL + "list", { headers: authHeader() });
};


export default {
  getPublicContent,
};
