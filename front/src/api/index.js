/**
 * 统一管理所有api请求接口的文件
 */
import mockRequests from "./mockRequest";
import requests from "./request";

// 三级联动的接口 get请求
// http://gmall-h5-api.atguigu.cn/api/product/getBaseCategoryList
export const reqCategoryList = () => requests({ url: "/product/getBaseCategoryList", method: "get" });

// 搜索商品的接口 post请求
/**
 * 
  {
    "category3Id": "61",
    "categoryName": "手机",
    "keyword": "小米",
    "order": "1:desc",
    "pageNo": 1,
    "pageSize": 10,
    "props": ["1:1700-2799:价格", "2:6.65-6.74英寸:屏幕尺寸"],
    "trademark": "4:小米"
  }
 */
// 如果你设置了data属性，就必须传入params配置项,如果没有，就传一个空对象，不然就无法正确获取数据
export const reqSearch = (params) => requests({ url: "/list", method: "post", data: params });

// 获取商品详情页面数据的api
export const reqDetail = (id) => requests({ url: "/item/" + id, method: "get" });

// 添加到购物车(或对已有物品进行数量改动)
export const reqAddorUpdateShopCart = (skuId, skuNum) => requests({ url: `/cart/addToCart/${skuId}/${skuNum}`, method: "post" });

// 获取购物车数据
export const reqGetShopCartData = () => requests({ method: "get", url: "/cart/cartList" });

// 删除购物车数据
export const reqDelCartGoods = (skuId) => requests({ method: "delete", url: `/cart/deleteCart/${skuId}` });

// 修改购物车商品状态
export const reqChangeState = (skuID, isChecked) => requests({ method: "get", url: `/cart/checkCart/${skuID}/${isChecked}` });

// 注册短信验证码获取
export const reqVerifiCode = (phone) => requests({ method: "get", url: `/user/passport/sendCode/${phone}` });

// 注册账号
export const reqRegUser = (data) => requests({ method: "post", url: "/user/passport/register", data });

// 登录账号--获取token
export const reqLoginUser = (data) => requests({ method: "post", url: "/user/passport/login", data });

// 进入首页时，发送请求(没有参数，但是会通过判断请求头上是否有token,来返回对应的数据)获取用户数据，判断用户是否已登录
export const reqUserInfo = () => requests({ method: "get", url: "/user/passport/auth/getUserInfo" });

// 退出登录
export const reqLogout = () => requests({ method: "get", url: "/user/passport/logout" });

// mock假数据：轮播图api
export const reqBanners = () => mockRequests.get("/banners");

// mock假数据：电梯导航的轮播图api
export const reqFloors = () => mockRequests.get("/floors");

// mock假数据：搜索框的提示文字api
export const reqSearchTip = () => mockRequests.get("/searchtip");
