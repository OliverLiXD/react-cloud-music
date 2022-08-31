import axios from "axios";

const baseURL = "http://localhost:3000";

const axiosInstance = axios.create({
  baseURL: baseURL
})

axiosInstance.interceptors.response.use (
  res => res.data,
  err => {
    console.log (err, "网络错误");
  }
);

export { axiosInstance };