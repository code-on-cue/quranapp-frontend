import axios from "axios";

const apiService = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "https://api.example.com",
  timeout: 10000,
});

apiService.interceptors.request.use(
  (config) => {
    // You can add custom headers or modify the request here
    config.headers["Content-Type"] = "application/json";
    return config;
  },
  (error) => {
    // Handle request error
    return Promise.reject(error);
  }
);

apiService.interceptors.response.use(
  (response) => {
    // You can process the response data here
    return response.data;
  },
  (error) => {
    // Handle response error
    if (error.response) {
      // The request was made and the server responded with a status code
      console.error("API Error:", error.response.status, error.response.data);
    } else if (error.request) {
      // The request was made but no response was received
      console.error("API Error: No response received", error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error("API Error:", error.message);
    }
    return Promise.reject(error);
  }
);

/**
 * Function to fetch data from a specific endpoint
 * @param {string} endpoint - The API endpoint to fetch data from
 * @param {object} params - Optional query parameters
 * @returns {Promise} - Promise resolving to the fetched data
 */
export const fetchData = async (endpoint, params = {}) => {
  try {
    const response = await apiService.get(endpoint, { params });
    return response;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

export default apiService;
