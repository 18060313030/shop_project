import { reqAddorUpdateShopCart, reqDetail } from "@/api";
import getUUID from "@/utils/uuid_token";
export default {
  namespaced: true,
  state: {
    detailData: {}, // 商品详情页数据
    uuid_token: getUUID(), // 存放游客token
  },

  mutations: {
    // 添加数据
    GetDetailData(state, data) {
      state.detailData = data;
    },
  },

  actions: {
    // 请求商品详情页数据
    async getDetailData(context, id) {
      const { data: res } = await reqDetail(id);
      // console.log("vuex显示--商品详情页数据：", res);
      context.commit("GetDetailData", res);
    },

    // 商品数据添加或更新到购物车中
    async addOrUpdateShopCart(context, data) {
      const res = await reqAddorUpdateShopCart(data.skuId, data.skuNum);
      console.log("商品是否成功添加到购物车：", res);

      // 该请求，返回的是成功与失败的结果，并不需要将其保存到state中
      // 但是组件中需要服务器返回的结果，来执行不同的操作。那么如何获取呢？
      // 因为该函数已经被async修饰了，所以它返回一个promise，promise可以有失败和成功的结果
      // 组件上使用await接收对应的结果进行判断即可
      if (res.code === 200) {
        return "ok";
      } else {
        return Promise.reject("添加商品失败");
      }
    },
  },

  getters: {
    // 路径信息
    categoryView(state) {
      // 一定要加一个 || {} 判断,不然初始化时，detailData下的数据是空的,categoryView是不存在的，会报错
      return state.detailData.categoryView || {};
    },

    // 商品数据信息
    skuInfo(state) {
      return state.detailData.skuInfo || {};
    },

    // 商品属性
    spuSaleAttrList(state) {
      return state.detailData.spuSaleAttrList || [];
    },
  },
};
