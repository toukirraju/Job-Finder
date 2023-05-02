import axios from "axios";

const axiosInstance = axios.create({
  // baseURL: "http://localhost:9000",
  baseURL: "https://job-finder-server-production-f365.up.railway.app",
});

export default axiosInstance;
