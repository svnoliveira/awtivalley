import axios from "axios";

//export const API_BASE_URL = "https://awtivalley-api.onrender.com/api/";
export const API_BASE_URL = "http://apicapital.centromedicoawti.com.br/api/";
//export const API_BASE_URL = "http://127.0.0.1:8000/api/";

export const api = axios.create({
    baseURL: API_BASE_URL,
    timeout: 170000,
})
