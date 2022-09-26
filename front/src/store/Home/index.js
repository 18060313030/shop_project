import { reqBanners, reqCategoryList, reqFloors } from "@/api";

const state = {
  categoryListData: [], // 三级分类列表数据,后台返回什么类型的数据，初始值就定义为该数据类型
  bannersData: [], // 轮播图数据
  floorsData: [], // 电梯导航轮播图数据
};

const mutations = {
  // 添加三级分类列表数据
  GetCategoryListData(state, data) {
    state.categoryListData = data;
  },

  // 添加轮播图数据
  GetBannersData(state, data) {
    state.bannersData = data;
  },

  // 添加电梯导航轮播图数据
  GetFloorsData(state, data) {
    state.floorsData = data;
  },
};

const actions = {
  // 获取三级分类列表数据
  async getCategoryListData(context) {
    const { data } = await reqCategoryList();
    // console.log(data);
    context.commit("GetCategoryListData", data);
  },

  // 获取轮播图数据
  async getBannersData(context) {
    const { data: res } = await reqBanners();
    // console.log(res.data);
    if (res.code !== 200) return;
    context.commit("GetBannersData", res.data);
  },

  // 获取电梯导航轮播图数据
  async getFloorsData(context) {
    const { data: res } = await reqFloors();
    // console.log(res.data);
    if (res.code !== 200) return;
    context.commit("GetFloorsData", res.data);
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
