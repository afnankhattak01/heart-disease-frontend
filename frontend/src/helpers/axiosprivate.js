import axios from "axios";

const axiosPrivate = axios.create({
  baseURL: "https://heart-disease-risk-analysis.onrender.com/",
});

axiosPrivate.interceptors.request.use(function (config) {
  const stringified = localStorage.getItem("user");
  if (stringified) {
    const parsed = JSON.parse(stringified);
    config.headers.Authorization = parsed ? `Bearer ${parsed?.jwttoken}` : "";
  }
  return config;
});
export default axiosPrivate;
