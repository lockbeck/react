import axios from "axios"
import {config} from "../utils/config";


const request = axios.create({
    baseURL: config.API_URL,
});

request.interceptors.request.use((conf) => {
    return conf;
}, (error) => {
    return Promise.reject(error);
});

request.interceptors.response.use((response) => {
    return response;
}, (error) => {
    return Promise.reject(error);
});

export default request;
