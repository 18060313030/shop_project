import AddCartSuccess from "@/pages/AddCartSuccess/AddCartSuccess.vue";
import Detail from "@/pages/Detail/Detail.vue";
import Home from "@/pages/Home/Home.vue";
import Login from "@/pages/Login/Login.vue";
import Register from "@/pages/Register/Register.vue";
import Search from "@/pages/Search/Search.vue";
import ShopCart from "@/pages/ShopCart/ShopCart.vue";
export default [
  {
    path: "/",
    redirect: "/home",
  },
  // 主页
  {
    name: "home",
    path: "/home",
    component: Home,
    meta: { footerShow: true, title: "首页", isToken: true },
  },
  // 登录
  {
    name: "login",
    path: "/login",
    component: Login,
    meta: { footerShow: false, title: "登录", isToken: true },
  },
  // 注册
  {
    name: "register",
    path: "/register",
    component: Register,
    meta: { footerShow: false, title: "注册", isToken: true },
  },
  // 搜索--商品列表
  {
    name: "search",
    path: "/search/:keyword?", // ？:正则的量词  出现0|1次
    component: Search,
    meta: { footerShow: true, title: "搜索", isToken: true },
  },
  // 商品详情
  {
    name: "detail",
    path: "/detail/:id",
    component: Detail,
    meta: { footerShow: true, title: "商品详情", isToken: true },
  },
  // 添加购物车成功的提示页面
  {
    name: "addcartsuccess",
    path: "/addcartsuccess",
    component: AddCartSuccess,
    meta: { footerShow: true, title: "购物成功" },
  },
  // 购物车页面
  {
    name: "shopcart",
    path: "/shopcart",
    component: ShopCart,
    meta: { footerShow: true, title: "购物车" },
  },
];
