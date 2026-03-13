import axios from "axios";

export const API = axios.create({
  baseURL: "https://backend-hamburgueria.onrender.com",
});