import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:90/api/book/";

const getAll = () => {
    return axios.get(API_URL + "list", { headers: authHeader() });
};

const get = (id) => {
    return axios.get(API_URL + `view/${id}`, { headers: authHeader() });
};

const create = (data) => {
    return axios.post(API_URL + "create", { headers: authHeader() });
};

const update = (id, data) => {
    return axios.post(API_URL + `update/${id}`, { headers: authHeader() });
};

const remove = (id) => {
    return axios.delete(API_URL + `delete/${id}`, { headers: authHeader() });
};

const findByTitle = (name) => {
    return axios.get(API_URL + `list?name=${name}`, { headers: authHeader() });
};

const BookService = {
    getAll,
    get,
    create,
    update,
    remove,
    findByTitle,
};

export default BookService;
