import axios from "axios";

const productionApi = "https://eventbackend.takkemayur456.workers.dev/api";
const configuredApi = process.env.REACT_APP_API_BASE_URL?.trim();
const isProduction = process.env.NODE_ENV === "production";
const isLocalApi = configuredApi && /^https?:\/\/(localhost|127\.0\.0\.1|\[::1\])(?=[:/]|$)/i.test(configuredApi);
const API_BASE_URL = ((isProduction && isLocalApi ? productionApi : configuredApi) ||
  (isProduction ? productionApi : "http://localhost:5000/api")).replace(/\/$/, "");
export const api = axios.create({ baseURL: API_BASE_URL, timeout: 15000 });
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});
// Log metadata only: Axios errors contain request bodies and authorization headers.
export const authLog = (action, stage, details = {}) => {
  console.info(`[Auth:${action}] ${stage}`, details);
};
api.interceptors.response.use((response) => {
  if (/\/(login|register|me)$/.test(response.config.url)) {
    authLog("API", "response", { url: response.config.url, status: response.status });
  }
  return response;
}, (error) => {
  console.warn("[API] Request failed", {
    url: error.config?.url,
    method: error.config?.method?.toUpperCase(),
    status: error.response?.status || null,
    code: error.code,
  });
  return Promise.reject(error);
});
export const apiError = (error) => {
  const data = error.response?.data;
  if (typeof data?.message === "string") return data.message;
  if (typeof data?.error === "string") return data.error;
  if (error.code === "ECONNABORTED") return "Server took too long to respond. Please try again.";
  const status = error.response?.status;
  if (status === 400 || status === 422) return "Please check your details and try again.";
  if (status === 401) return "Invalid email or password, or your session has expired.";
  if (status === 403) return "You do not have permission to perform this action.";
  if (status === 404) return "API route not found. Check the backend URL and route.";
  if (status === 409) return "This email is already registered. Please log in.";
  if (status === 429) return "Too many attempts. Please wait and try again.";
  if (status >= 500) return "Backend server error. Please try again shortly.";
  return error.response ? "Unexpected server response. Please try again." :
    "Cannot reach backend. Check that your server is running and allows this frontend through CORS.";
};
export default API_BASE_URL;
