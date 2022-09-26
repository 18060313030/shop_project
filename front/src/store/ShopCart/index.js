import { reqChangeState, reqDelCartGoods, reqGetShopCartData } from "@/api";
const state = {
  shopCartData: [],
};
const mutations = {
  // 添加购物车数据
  GetShopCartData(state, data) {
    state.shopCartData = data;
  },
};
const actions = {
  // 获取购物车数据
  async getShopCartData(context) {
    const res = await reqGetShopCartData();
    // console.log("购物车数据：", res);
    if (res.code !== 200) return;
    context.commit("GetShopCartData", res.data);
  },

  // 删除购物车商品
  async delShopCartGoods(context, id) {
    const res = await reqDelCartGoods(id);
    console.log(res);
    if (res.code === 200) {
      return "ok";
    } else {
      return Promise.reject("failed");
    }
  },

  // 修改购物车商品状态
  async changeGoodsState(context, data) {
    const res = await reqChangeState(data.skuId, data.isChecked);
    console.log(res);
  },

  // 删除选中的商品
  delSelectGoods(context) {
    // console.log(context);
    const promiseArr = []; // 存放promise结果的数组
    context.getters.shopData.cartInfoList.forEach((item) => {
      // 判断是否是选中的，再执行对应的删除操作
      let promise = item.isChecked == 1 ? context.dispatch("delShopCartGoods", item.skuId) : "";
      promiseArr.push(promise);
    });
    return Promise.all(promiseArr); //返回一个promise对象成功或失败的状态
  },

  // 全选框被勾选
  allChecked({ dispatch, state }, isChecked) {
    let promiseArr = []; // 存放promise结果的数组
    state.shopCartData[0].cartInfoList.forEach((item) => {
      let promise = dispatch("changeGoodsState", { skuId: item.skuId, isChecked });
      promiseArr.push(promise);
    });
    return Promise.all(promiseArr); //返回一个promise对象成功或失败的状态
  },
};
const getters = {
  // 购物车商品数据--数组
  shopData(state) {
    return state.shopCartData[0] || {};
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
