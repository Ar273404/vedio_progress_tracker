import axios from "axios";

const API = axios.create({ baseURL: import.meta.env.VITE_BACKEND_URL });

export const setAuthToken = (token) => {
  if (token) API.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  else delete API.defaults.headers.common["Authorization"];
};

export const getUserProgress = (userId) =>
  API.get(`/progress/${userId}`).then((res) => res.data);

export const getUserProgressPercentage = (userId, videoLength) =>
  API.get(`/progress/${userId}/percentage/${videoLength}`).then(
    (res) => res.data
  );

export const updateUserProgress = (payload) =>
  API.post("/progress", payload).then((res) => res.data);
