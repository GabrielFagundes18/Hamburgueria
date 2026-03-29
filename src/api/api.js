import axios from "axios";


const urlBase = process.env.REACT_APP_API_URL 


export const API = axios.create({
  baseURL: urlBase,
});