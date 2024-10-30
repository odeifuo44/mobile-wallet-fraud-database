import axios from "axios";

const baseURL = import.meta.env.VITE_BASE_URL;

if (!baseURL) {
  console.error("API_URL is not defined in the environment variables");
}

const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const signup = async (userData) => {
  try {
    const response = await api.post("/auth/register", userData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const login = async (credentials) => {
  try {
    const response = await api.post("/auth/login", credentials);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const submitFraudReport = async (reportData) => {
  try {
    const response = await api.post("/fraud/report", reportData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const checkExistingReport = async (phoneNumber) => {
  try {
    const response = await api.get(`/fraud/check/${phoneNumber}`);
    return response.data;
  } catch (error) {
    if (error.response?.status === 404) {
      return null;
    }
    throw error.response?.data || error.message;
  }
};

export const getUserFraudReports = async (params = {}) => {
  try {
    const response = await api.get("/fraud/reports", { params });
    return response.data;
  } catch (error) {
    console.error("API Error:", error);
    throw error.response?.data || { message: error.message };
  }
};

export const getPublicFraudReports = async (params = {}) => {
  try {
    const response = await api.get("/public/fraud/reports", { params });
    return response.data; // Make sure we're returning the data property of the response
  } catch (error) {
    console.error("API Error:", error);
    throw error.response?.data || error.message;
  }
};

export const searchFraudReport = async (phoneNumber) => {
  try {
    const response = await api.get(`/fraud/search/${phoneNumber}`);
    return response.data;
  } catch (error) {
    if (error.response?.status === 404) {
      return null;
    }
    throw error.response?.data || error.message;
  }
};

export const submitNewReport = async (phoneNumber, reportText) => {
  try {
    const response = await api.post("/fraud/report", {
      phoneNumber,
      reportText,
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // If the error is due to an expired token (status 401) and we haven't tried to refresh yet
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Attempt to refresh the token
        const refreshToken = localStorage.getItem("refreshToken");
        const response = await api.post("/auth/refresh-token", {
          refreshToken,
        });
        const { token } = response.data;

        // Update the token in localStorage and axios headers
        localStorage.setItem("token", token);
        api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

        // Retry the original request with the new token
        originalRequest.headers["Authorization"] = `Bearer ${token}`;
        return api(originalRequest);
      } catch (refreshError) {
        // If refreshing fails, log out the user
        localStorage.removeItem("token");
        localStorage.removeItem("refreshToken");
        window.location.href = "/login";
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
