import Mock from "mockjs";
import bannersData from "./json/banners.json";
import floorsData from "./json/floors.json";

// 搜索框提示文字
const { data } = Mock.mock({
  "data|4": ["@cword(2,4)"],
});
Mock.mock("/mock/searchtip", { code: 200, data });

// 轮播图api
Mock.mock("/mock/banners", { code: 200, data: bannersData });

// 楼层图api
Mock.mock("/mock/floors", { code: 200, data: floorsData });
