import CarouselList from "@/components/CarouselList/CarouselList.vue";
import Pagination from "@/components/Pagination/Pagination.vue";
import TypeNav from "@/components/TypeNav/TypeNav.vue";
import "@/mock/mockServe"; // mock假数据模拟服务器
import router from "@/router";
import store from "@/store";
import "nprogress/nprogress.css"; // 进度条样式
import "swiper/css/swiper.css"; // 轮播图样式
import Vue from "vue";
import App from "./App.vue";

// 注册全局组件
Vue.component(TypeNav.name, TypeNav); // 三级分类菜单
Vue.component(CarouselList.name, CarouselList); // 轮播图
Vue.component(Pagination.name, Pagination); // 分页

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
  router,
  store,
  beforeCreate() {
    Vue.prototype.$bus = this;
  },
}).$mount("#app");
