import axios from "axios";


// Create axios instance
const api = axios.create({
  baseURL: "https://me-api-playground-backend-cmlw.onrender.com/",
});

// Attach token to every request
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Handle unauthorized responses
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Token invalid or expired → redirect to login
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

// API functions
export const getAllProfiles = () => api.get("/profiles");
export const getProfile = (id) => api.get(`/profiles/${id}`);
export const getProjects = (skill) =>
  api.get(`/projects${skill ? `?skill=${skill}` : ""}`);
export const getTopSkills = () => api.get("/skills/top");
export const search = (query) => api.get(`/search?q=${query}`);
export const getHealth = () => api.get("/health");

export const createProfile = (data) => api.post("/profiles", data);
export const updateProfile = (id, data) => api.put(`/profiles/${id}`, data);

export default api;
