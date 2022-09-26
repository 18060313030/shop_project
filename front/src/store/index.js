import Vue from "vue";
import Vuex from "vuex";
import detail from "./Detail";
import header from "./Header";
import home from "./Home";
import search from "./Search";
import shopcart from "./ShopCart";
import user from "./User";
Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    home: home,
    search: search,
    header: header,
    detail: detail,
    shopcart: shopcart,
    user: user,
  },
});
