import { reqSearch } from "@/api";

const state = {
  searchData: {}, // Search页面所需的数据
};

const mutations = {
  // 添加数据
  GetSearchData(state, data) {
    state.searchData = data;
  },
};
const actions = {
  // 发送请求，获取搜索的数据
  async getSearchData(context, params) {
    const { data: res } = await reqSearch(params);
    context.commit("GetSearchData", res);
  },
};

const getters = {
  // 商品列表数据
  goodsList(state) {
    return state.searchData.goodsList || [];
  },
  // 商品参数数据
  attrsList(state) {
    return state.searchData.attrsList || [];
  },
  // 商品品牌数据
  trademarkList(state) {
    return state.searchData.trademarkList || [];
  },
  // 商品总数
  total(state) {
    return state.searchData.total || 0;
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
