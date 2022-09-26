<template>
  <div id="app">
    <!-- 顶部 -->
    <Header></Header>

    <!-- 中间 -->
    <router-view></router-view>

    <!-- 底部 -->
    <Footer v-show="$route.meta.footerShow"></Footer>
  </div>
</template>

<script>
import Footer from './components/Footer/Footer.vue'
import Header from './components/Header/Header.vue'

export default {
  name: 'App',
  components: {Header, Footer},
  mounted() {
    // 优化性能：在根组件上发起三级分类数据请求
    this.$store.dispatch('home/getCategoryListData')
  },
}
</script>

<style lang="less">
html {
  position: relative;
  min-height: 100%;
}
body {
  margin-bottom: 500px;
}
li {
  cursor: pointer !important;
}
</style>
