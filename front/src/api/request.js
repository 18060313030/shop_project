import store from "@/store";
import axios from "axios";
import nProgress from "nprogress"; // 进度条
// 利用axios的create方法去创建一个axios实例
// requests就是axios,只不过稍微配置了一下
const requests = axios.create({
  // 基础路径，发请求时路径当中会自动出现/api.
  // 因为所有的接口都有api这个路径部分
  baseURL: "/api",
  // 超时时间
  timeout: 5000,
});

// 请求拦截器
requests.interceptors.request.use((config) => {
  // config：配置对象，里面有一个很重要的属性-->headers请求头

  nProgress.start();

  // 游客的token
  if (store.state.detail.uuid_token) {
    config.headers.userTempId = store.state.detail.uuid_token;
  }

  // 正式用户的token
  console.log(store.state.user.token);
  if (store.state.user.token) {
    config.headers.token = store.state.user.token;
  }

  return config;
});

// 响应拦截器
// 参数：失败的回调函数
requests.interceptors.response.use(
  // 成功的回调函数，可以检测到服务器数据返回回来,做一些操作
  (res) => {
    nProgress.done();
    return res.data;
  },
  (err) => {
    return Promise.reject(new Error("failed"));
  }
);

export default requests;
