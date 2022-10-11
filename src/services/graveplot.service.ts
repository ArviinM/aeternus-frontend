import http from "../http-common";
import IGravePlotData from "../types/graveplot.type";
import authHeaders from "./auth-header-content";

const getAll = () => {
  return http.get<Array<IGravePlotData>>("/grave-plots");
};
const get = (id: any) => {
  return http.get<IGravePlotData>(`/grave-plots/${id}`);
};
const create = (data: any) => {
  return http.post<IGravePlotData>("/grave-plots", data, {
    headers: authHeaders(),
  });
};
const update = (id: any, data: any) => {
  return http.put<any>(`/grave-plots/${id}`, data, {
    headers: authHeaders(),
  });
};

const remove = (id: any) => {
  return http.delete<any>(`/grave-plots/${id}`, { headers: authHeaders() });
};
const removeAll = () => {
  return http.delete<any>(`/grave-plots`, { headers: authHeaders() });
};
const findByName = (first_name: string) => {
  return http.get<Array<IGravePlotData>>(`/grave-plots?name=${first_name}`);
};

const GravePlotService = {
  getAll,
  get,
  create,
  update,
  remove,
  removeAll,
  findByName,
};
export default GravePlotService;
