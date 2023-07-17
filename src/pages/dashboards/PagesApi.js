import request from "../../helpers/axios.intercepter";

class PagesApi {
  static Create = (route, params, options = {}) => {
    return request.post(`/${route}/`, params, options);
  };

  static Update = (route, id, params, options = {}) => {
    return request.put(`/${route}/${id}`, params, options);
  };

  static Update_p = (route, params, options = {}) => {
    return request.put(`/${route}`, params, options);
  };


  static Delete = (route, id) => {
    return request.delete(`/${route}/${id}`);
  };

  static Put = (id, route, params = {}) => {
    return request.put(`/api/application/${id}/${route}`, params);
  };

  static Get = (id, route, params = {}) => {
    return request.get(`/api/application/${id}/${route}`, params);
  };
  static Comment = (id, body) => {
    return request.post(`/api/application/${id}/comment`, body);
  };
}

export default PagesApi;
