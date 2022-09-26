module.exports = {
  devServer: {
    proxy: {
      // api这个前缀表示：
      // 如果我在客户端发送的接口最前面加了api，就表示我要通过这个代理服务器请求资源，客户端的请求接口前面，没有加/api就不会通过这个代理服务器
      // 例如：http://localhost:8080/api/students 实际的目标服务器可能没有api这个路径,通过pathRewrite取消
      "/api": {
        target: "http://gmall-h5-api.atguigu.cn", // 目标服务器地址
      },
    },
  },
};
