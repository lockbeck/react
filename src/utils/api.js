import request from "../helpers/axios.intercepter";

export class Api {
    get(url = '', params = {}, headers = {}) {
        return request.get(url, {params, headers});
    }
}
