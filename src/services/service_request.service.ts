import http from "../http-common";
import IUserServiceRequest from "../types/service_request.type";
import authHeaders from "./auth-header-content";

const getAllUserServiceRequest = (id: any) => {
  return http.get<IUserServiceRequest>(`/service-request/find/${id}`);
};

const getAllServiceRequest = () => {
  return http.get<IUserServiceRequest>(`/service-request`, {
    headers: authHeaders(),
  });
};

//create service request data
const createUserServiceRequest = (data: any) => {
  return http.post<IUserServiceRequest>("/service-request/", data, {
    headers: authHeaders(),
  });
};

const updateUserServiceRequest = (id: any, data: any) => {
  return http.put<any>(`/service-request/update-request/${id}`, data, {
    headers: authHeaders(),
  });
};

const updateUserServiceRemarks = (id: any, data: any) => {
  return http.put<any>(`/service-request/update-remarks/${id}`, data, {
    headers: authHeaders(),
  });
};

const deleteUserServiceRequest = (id: any) => {
  return http.delete<any>(`/service-request/${id}`, { headers: authHeaders() });
};

const UserServiceRequest = {
  getAllUserServiceRequest,
  getAllServiceRequest,
  createUserServiceRequest,
  updateUserServiceRequest,
  updateUserServiceRemarks,
  deleteUserServiceRequest,
};

export default UserServiceRequest;
