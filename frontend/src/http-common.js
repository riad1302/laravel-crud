import axios from "axios";
const user = JSON.parse(localStorage.getItem("user"));
let accessToken = '';
if (user && user.accessToken) {
    // For Laravel back-end
    accessToken ="Bearer " + user.accessToken;

    // for Node.js Express back-end
    //return { "x-access-token": user.accessToken };
}
export default axios.create({
    baseURL: "http://localhost:90/api/book/",
    headers: {
        "Content-type": "application/json",
        "Authorization": accessToken,

    }
});
