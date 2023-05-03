import axios from "axios";
import authHeader from "./auth-header";
import { useSelector } from "react-redux";
import { Navigate } from 'react-router-dom';

const API_URL = "http://localhost:90/api/book/";

const checkUser = () => {
    const { user: currentUser } = useSelector((state) => state.auth);
    return currentUser;
};
const getAll = () => {
    return axios.get(API_URL + "list", { headers: authHeader() });
};

const get = (id) => {
    return axios.get(API_URL + `view/${id}`, { headers: authHeader() });
};

const create = (data) => {
    console.log(data)
    return axios.post(API_URL + "create", data,  { headers: authHeader() });
};

const update = (id, data) => {
    return axios.put(API_URL + `update/${id}`, data, { headers: authHeader() });
};

const remove = (id) => {
    return axios.delete(API_URL + `delete/${id}`, { headers: authHeader() });
};

const findByTitle = (name) => {
    return axios.get(API_URL + `list?name=${name}`, { headers: authHeader() });
};

const BookService = {
    checkUser,
    getAll,
    get,
    create,
    update,
    remove,
    findByTitle,
};

export default BookService;
