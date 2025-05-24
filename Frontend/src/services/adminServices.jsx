import axios from "axios";

const API = axios.create({ baseURL: import.meta.env.VITE_BACKEND_URL });

export const setAuthToken = (token) => {
  if (token) API.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  else delete API.defaults.headers.common["Authorization"];
};

export const fetchUsers = () => API.get("/admin/users").then((res) => res.data);

export const fetchStats = () => API.get("/admin/stats").then((res) => res.data);
