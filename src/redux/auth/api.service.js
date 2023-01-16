import request from "../../helpers/axios.intercepter";
import {config} from "../../utils/config";


export class Api {
    static login({username, password}) {
        const data = {
            username,
            password,
            grant_type: config.GRANT_TYPE,
            client_id: config.CLIENT_ID,
            client_secret: config.CLIENT_SECRET,
        }
        return request.post('/oauth/token', data, {headers: {"Content-Type": "multipart/form-data"}});
    }

    static getMe() {
        return request.get('/api/profile');
    }
}
