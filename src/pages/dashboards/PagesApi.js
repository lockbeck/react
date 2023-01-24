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

    static Put = (id, route) => {
        return request.put(`/api/application/${id}/${route}`);
    }
}

export default PagesApi;
