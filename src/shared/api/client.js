import axios from "axios";

const api = axios.create({ baseURL: import.meta.env.VITE_API_URL || "http://localhost:8080/api", timeout: 15000 });

api.interceptors.request.use((config) => {
  const auth = sessionStorage.getItem("risk.auth");
  if (auth) config.headers.Authorization = `Basic ${auth}`;
  return config;
});
api.interceptors.response.use((response) => response, (error) => {
  if (error.response?.status === 401) window.dispatchEvent(new Event("risk:unauthorized"));
  const problem = error.response?.data;
  error.userMessage = problem?.detail || problem?.title || "Não foi possível concluir a operação.";
  return Promise.reject(error);
});

export default api;
