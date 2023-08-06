import axios from "axios";

const axiosPublic = axios.create({
  baseURL: "https://heart-disease-risk-analysis.onrender.com/",
});

export default axiosPublic;
