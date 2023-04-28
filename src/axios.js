import axios from "axios";

const instance = axios.create({
  baseURL: "https://my-article.onrender.com",
});

// При кожному запросі вшивати токен
instance.interceptors.request.use((config) => {
  config.headers.Authorization = window.localStorage.getItem("token");

  return config;
});

export default instance;
