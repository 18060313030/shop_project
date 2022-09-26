import { v4 as uuidv4 } from "uuid";
// 生成游客身份证明（特性：不会发生改变，使用单例模式）
export default () => {
  let uuid = localStorage.getItem("uuid_token");
  if (!uuid) {
    let uuid = uuidv4();
    localStorage.setItem("uuid_token", uuid);
  }
  return uuid;
};
