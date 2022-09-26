import { reqSearchTip } from "@/api";
const state = {
  tipData: [],
};
const mutations = {
  // 添加提示数据
  GetTipData(state, data) {
    state.tipData = data;
  },
};
const actions = {
  // 获取提示数据
  async getTipData(context) {
    const { data: res } = await reqSearchTip();
    if (res.code !== 200) return;
    context.commit("GetTipData", res.data);
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
