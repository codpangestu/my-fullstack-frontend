import axios from "axios";

const api = axios.create({
  baseURL: "http://127.0.0.1:8000/api",
});

/* =========================
   REQUEST INTERCEPTOR
   auto inject token
========================= */
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

/* =========================
   RESPONSE INTERCEPTOR
   global error handling
========================= */
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // kalau token invalid / expired
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("role");
      window.location.href = "/login";
    }

    return Promise.reject(error);
  }
);

export default api;
