import request from "../../helpers/axios.intercepter";

class PagesApi {
    static Create = (route, params, options = {}) => {
        return request.post(`/${route}/`, params, options);
    }

    static Update = (route, id, params, options = {}) => {
        return request.put(`/${route}/${id}`, params, options);
    }

    static Delete = (route, id) => {
        return request.delete(`/${route}/${id}`);
    }
}

export default PagesApi;
