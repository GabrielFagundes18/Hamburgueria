import axios from "axios";


const urlBase = process.env.REACT_APP_API_URL 
console.log("URL sendo usada:", urlBase);

export const API = axios.create({
  baseURL: urlBase,
});