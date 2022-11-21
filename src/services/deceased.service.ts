import http from "../http-common";
import IDeceasedData from "../types/deceased.type";
import authHeaders from "./auth-header-content";

//get requests

const getAllDeceased = () => {
  return http.get<Array<IDeceasedData>>("/deceased");
};

const getAllDeceasedChart = () => {
  return http.get<Array<IDeceasedData>>("/deceased-chart");
};

const getOneDeceased = (id: any) => {
  return http.get<IDeceasedData>(`/deceased/${id}`);
};

//create deceased data

const createDeceased = (data: any) => {
  return http.post<IDeceasedData>("/deceased/create", data, {
    headers: authHeaders(),
  });
};

//update deceased data

const updateDeceased = (id: any, data: any) => {
  return http.put<any>(`/deceased/${id}`, data, { headers: authHeaders() });
};

const updateDeceasedPhoto = (id: any, data: any) => {
  return http.put<any>(`/deceased/photo/${id}`, data, {
    headers: authHeaders(),
  });
};

//delete Deceased Data

const deleteOneDeceased = (id: any) => {
  return http.delete<any>(`/deceased/${id}`, { headers: authHeaders() });
};

const deleteAllDeceased = () => {
  return http.delete<any>(`/deceased`, { headers: authHeaders() });
};

const DeceasedService = {
  getAllDeceased,
  getAllDeceasedChart,
  getOneDeceased,
  createDeceased,
  updateDeceased,
  updateDeceasedPhoto,
  deleteOneDeceased,
  deleteAllDeceased,
};

export default DeceasedService;
