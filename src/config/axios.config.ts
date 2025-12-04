import axios from "axios";

export const busesAxiosClient = axios.create({
    baseURL: "http://localhost:3001",
});


export const boardAxiosClient = axios.create({
    baseURL: "http://localhost:3002",
});
