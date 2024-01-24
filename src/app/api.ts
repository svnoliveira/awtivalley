import axios from "axios";

export const API_BASE_URL = "https://awtivalley-api.onrender.com/api/docs/";

export const api = axios.create({
    baseURL: API_BASE_URL,
    timeout: 70000,
})