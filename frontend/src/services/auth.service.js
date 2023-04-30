import axios from "axios";

const API_URL = "http://localhost:90/api/";

const register = (name, email, password) => {
  return axios.post(API_URL + "register", {
    name,
    email,
    password,
  });
};

const login = (email, password) => {
  return axios
    .post(API_URL + "login", {
      email,
      password,
    })
    .then((response) => {
      if (response.data.data.accessToken) {
        localStorage.setItem("user", JSON.stringify(response.data.data));
      }
      console.log(response.data.data)
      return response.data.data;
    });
};

const logout = () => {
  localStorage.removeItem("user");
};

export default {
  register,
  login,
  logout,
};
