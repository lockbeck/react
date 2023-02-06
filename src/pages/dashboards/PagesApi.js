import request from "../../helpers/axios.intercepter";

class PagesApi {
    static Create = (route, params, options = {}) => {
        console.log(params);
        return request.post(`/${route}/`, params, options);
    }

    static Update = (route, id, params, options = {}) => {
        return request.put(`/${route}/${id}`, params, options);
    }

    static Delete = (route, id) => {
        return request.delete(`/${route}/${id}`);
    }

    static Put = (id, route, params = {}) => {
        return request.put(`/api/application/${id}/${route}`, params);
    }
}

export default PagesApi;
