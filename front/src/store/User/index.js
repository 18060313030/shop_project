import { reqLoginUser, reqLogout, reqRegUser, reqUserInfo, reqVerifiCode } from "@/api";

const state = {
  code: "", // 验证码
  token: localStorage.getItem("token"),
  userinfo: {}, // 用户信息
};
const mutations = {
  // 添加短信验证码数据
  GetVerifiCode(state, data) {
    state.code = data;
  },

  // 添加token数据
  addToken(state, data) {
    state.token = data;
    localStorage.setItem("token", data); // 持久化存储token
  },

  // 添加用户信息
  GetUserInfo(state, data) {
    state.userinfo = data;
  },

  // 退出登录，注销信息
  LogOut(state) {
    state.token = "";
    state.userinfo = {};
    state.code = "";
    localStorage.removeItem("token");
  },
};

const actions = {
  // 获取短信验证码
  async getVerifiCode(context, phone) {
    const res = await reqVerifiCode(phone);
    if (res.code === 200) {
      context.commit("GetVerifiCode", res.data);
    }
  },

  // 注册用户
  async regUser(context, data) {
    const res = await reqRegUser(data);
    console.log("注册用户提示信息：", res);
    if (res.code === 200) {
      return "ok";
    } else {
      return Promise.reject("failed");
    }
  },

  // 登录--获取token信息
  async loginUser(context, data) {
    const res = await reqLoginUser(data);
    console.log(res);
    if (res.code == 200) {
      context.commit("addToken", res.data.token);
      return "ok";
    } else {
      return Promise.reject(res.message);
    }
  },

  // 进入首页--获取用户信息
  async getUserInfo(context) {
    // 请求中不传递参数，传递的是请求头中的token,请求头的token需要先在请求拦截器中进行配置
    const res = await reqUserInfo();
    console.log("登录成功后的用户数据：", res);
    if (res.code === 200) {
      context.commit("GetUserInfo", res.data);
      return "ok";
    } else {
      return Promise.reject(new Error("failed"));
    }
  },

  // 退出登录
  async logOut(context) {
    const res = await reqLogout();
    console.log("退出登录的提示：", res);
    if (res.code === 200) {
      context.commit("LogOut");
      return "ok";
    } else {
      return Promise, reject("退出登录失败信息：" + res.message);
    }
  },
};

const getters = {};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
