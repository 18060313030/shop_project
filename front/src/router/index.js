import Vue from "vue";
import VueRouter from "vue-router";
import store from "../store";
import routes from "./config";
Vue.use(VueRouter);

// 解决【编程式路由】跳转到目标路由（参数不变），多次执行会抛出NavigationDuplicated的警告错误
let originPush = VueRouter.prototype.push; // 保存原生的$router.push/replace方法
let originReplace = VueRouter.prototype.replace; // 保存原生的$router.push/replace方法
// 重写push
VueRouter.prototype.push = function (location, resolve, reject) {
  if (resolve && reject) {
    originPush.call(this, location, resolve, reject);
  } else {
    originPush.call(
      this,
      location,
      () => {},
      () => {}
    );
  }
};
// 重写replace
VueRouter.prototype.replace = function (location, resolve, reject) {
  if (resolve && reject) {
    originReplace.call(this, location, resolve, reject);
  } else {
    originReplace.call(
      this,
      location,
      () => {},
      () => {}
    );
  }
};

const router = new VueRouter({
  routes,
  // 切换路由页面时，页面会滚动到最顶部
  scrollBehavior(to, from, savedPosition) {
    return { y: 0 };
  },
});

// 前置路由守卫
router.beforeEach(async (to, from, next) => {
  const token = store.state.user.token; // 获取token
  const name = store.state.user.userinfo.name; // 获取用户名称，不可以是整个对象，因为对象进行判断都是true
  // 如果登录了一定有token信息
  if (token) {
    // 去往登录页，登录后是不让去的
    if (to.path == "/login") {
      next("/home");
    } else {
      // 去往非登录页，并且有对应的用户信息
      if (name) {
        next();
      } else {
        // 没有对应的登录信息，派发action，让仓库存储对应的用户信息在跳转
        try {
          await store.dispatch("user/getUserInfo");
          next();
        } catch (err) {
          // 派发事件失败？说明token失效了，所以无法获取到对应的用户信息了
          // 清空token，跳转登录页面
          store.dispatch("user/logOut");
          next("/login");
        }
      }
    }
  } else {
    // 这里的项目问题很大啊。未登录的时候有一个游客token，游客token购买的商品，会放到购物车，然后当你使用正式会员登录时，
    // 游客里面的购物车信息会附加到正式会员购物车上。这是他们后台搞得。和前端无关

    // 点击添加购物车时，会转到登录页面
    if (to.path == "/addcartsuccess") {
      next("/login");
    }
    if (to.meta.isToken) {
      // 未登录状态，暂时还未处理
      next();
    }
  }
});

export default router;
