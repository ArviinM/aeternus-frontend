import http from "../http-common";
import IGravePlotData from "../types/graveplot.type";
import authHeaders from "./auth-header-content";

const getAll = () => {
  return http.get<Array<IGravePlotData>>("/grave-plots");
};

const checkAllAvailable = () => {
  return http.get<Array<IGravePlotData>>("/grave-plots/check");
};

const checkLotOwnerReserved = () => {
  return http.get<Array<IGravePlotData>>("/grave-plots/lot-owned");
};

const get = (id: any) => {
  return http.get<IGravePlotData>(`/grave-plots/${id}`);
};

const getBlocks = (block: any) => {
  return http.get<IGravePlotData>(`/grave-plots/block/${block}`);
};

const create = (data: any) => {
  return http.post<IGravePlotData>("/grave-plots", data, {
    headers: authHeaders(),
  });
};
const updateName = (id: any, data: any) => {
  return http.put<any>(`/grave-plots/update-name/${id}`, data, {
    headers: authHeaders(),
  });
};

const updateLoc = (id: any, data: any) => {
  return http.put<any>(`/grave-plots/update-loc/${id}`, data, {
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
  getBlocks,
  create,
  updateName,
  updateLoc,
  remove,
  removeAll,
  findByName,
  checkAllAvailable,
  checkLotOwnerReserved,
};
export default GravePlotService;
