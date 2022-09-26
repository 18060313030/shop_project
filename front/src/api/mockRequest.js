import axios from "axios";
import nProgress from "nprogress";

const mockRequests = axios.create({
  baseURL: "/mock",
  timeout: 5000,
});

mockRequests.interceptors.request.use((config) => {
  nProgress.start();
  return config;
});

mockRequests.interceptors.response.use(
  (res) => {
    nProgress.done();
    return res;
  },
  (err) => {
    return Promise.reject(new Error("failed"));
  }
);

export default mockRequests;
