import axios from "axios";

const API_URL = "http://localhost:5000/api";

export const register = async (userData) => {
  const { data } = await axios.post(`${API_URL}/auth/register`, userData);
  return data;
};

export const login = async (userData) => {
  const { data } = await axios.post(`${API_URL}/auth/login`, userData);
  return data;
};

export const saveProgress = async (intervals) => {
  const token = localStorage.getItem("token");
  const res = await axios.post(
    `${API_URL}/progress`,
    { intervals },
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return res.data;
};

export const getProgress = async () => {
  const token = localStorage.getItem("token");
  const res = await axios.get(`${API_URL}/progress`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};
