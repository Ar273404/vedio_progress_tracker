import axios from "axios";

const API = axios.create({ baseURL: import.meta.env.VITE_BACKEND_URL });

export const loginUser = (email, password) =>
  API.post("/users/login", { email, password }).then((res) => res.data);

export const registerUser = (username, email, password) =>
  API.post("/users/register", { username, email, password }).then(
    (res) => res.data
  );
