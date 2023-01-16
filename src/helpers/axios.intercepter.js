import axios from "axios"
import {config} from "../utils/config";
import { Cookies } from 'react-cookie';
import { get } from 'lodash';


const request = axios.create({
    baseURL: config.API_URL,
});

request.interceptors.request.use((conf) => {
    const cookies = new Cookies();
    const data = cookies.get('token');

    if (get(data, "access_token")) {
        conf.headers = {
            "Authorization": `${get(data, "token_type")} ${get(data, "access_token")}`
        }
    }
    
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
