import http from "../http-common";
import IUser from "../types/user.type";
import authHeaders from "./auth-header";

const API_URL = "/auth/";

export const register = (data: IUser) => {
  return http.post(API_URL + "signup", data);
};

export const login = (username: string, password: string) => {
  return http
    .post(API_URL + "signin", {
      username,
      password,
    })
    .then((response) => {
      if (response.data.accessToken) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }
      return response.data;
    });
  // .catch((error) => {
  //   if (error.response.data) {
  //     console.log(error.response.data);
  //   }
  // });
};

export const changePassword = (
  id: any,
  password: string,
  newPassword: string
) => {
  return http.put(
    API_URL + `changePassword/${id}`,
    { password, newPassword },
    { headers: authHeaders() }
  );
};

export const addRole = (id: any, role: string) => {
  return http.put(
    API_URL + `addRole/${id}`,
    { role },
    { headers: authHeaders() }
  );
};

export const logout = () => {
  localStorage.removeItem("user");
};

export const getCurrentUser = () => {
  const userStr = localStorage.getItem("user");
  if (userStr) return JSON.parse(userStr);
  return null;
};

export const getAllUsers = () => {
  return http.get<Array<IUser>>(API_URL + "allUsers", {
    headers: authHeaders(),
  });
};

export const getRole = (id: any) => {
  return http.get(API_URL + `getRole/${id}`, {
    headers: authHeaders(),
  });
};

export const deleteUser = (id: any) => {
  return http.delete(API_URL + `removeUser/${id}`, {
    headers: authHeaders(),
  });
};

const UserService = {
  login,
  register,
  changePassword,
  addRole,
  logout,
  getCurrentUser,
  getAllUsers,
  getRole,
  deleteUser,
};
export default UserService;
