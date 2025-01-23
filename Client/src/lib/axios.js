import axios from "axios";

export const axioss= axios.create({
    baseURL: "http://localhost:5001/api",
    withCredentials: true, // This is required for authenticated requests
})