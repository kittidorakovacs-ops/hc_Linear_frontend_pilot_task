import axios from "axios";

export const busesAxiosClient = axios.create({
  baseURL: import.meta.env.VITE_BUSES_API_URL || "http://localhost:3001",
  headers: {
    "Content-Type": "application/json",
  },
});

export const boardAxiosClient = axios.create({
  baseURL: import.meta.env.VITE_BOARD_API_URL || "http://localhost:3002",
  headers: {
    "Content-Type": "application/json",
  },
});
