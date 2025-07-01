import axios from "axios";

const token = localStorage.getItem("token");

const API = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/api/v1/jobs`,
  headers: {
    Authorization: token,
  },
});

export const getJobs = () => API.get("/");
export const getJob = (id) => API.get(`/${id}`);
export const createJob = (data) => {
  return API.post("", data);
};
export const updateJob = (id, data) => API.put(`/${id}`, data);
export const deleteJob = (id) => API.delete(`/${id}`);
