<template>
  <div>
    <TypeNav></TypeNav>
    <ListContainer></ListContainer>
    <Recommend></Recommend>
    <Rank></Rank>
    <Like></Like>
    <Floor v-for="(item,index) in floorsData" :key="item.id" :floorData="item"></Floor>
    <Brand></Brand>
  </div>
</template>

<script>
import TypeNav from '@/components/TypeNav/TypeNav.vue'
import {mapState} from 'vuex'
import Brand from './Brand/Brand.vue'
import Floor from './Floor/Floor.vue'
import Like from './Like/Like.vue'
import ListContainer from './ListContainer/ListContainer.vue'
import Rank from './Rank/Rank.vue'
import Recommend from './Recommend/Recommend.vue'
export default {
  name: 'Home',
  components: {TypeNav, ListContainer, Recommend, Rank, Like, Floor, Brand},
  computed: {
    ...mapState('home', ['floorsData']), // 电梯导航轮播图数据
  },
  async mounted() {
    this.$store.dispatch('home/getFloorsData') // 发送请求获取电梯导航轮播图数据
    // 进入首页时，发送请求(没有参数，但是会通过判断请求头上是否有token,来返回对应的数据)获取用户数据，判断用户是否已登录
    // 但是其他页面也需要这个代码，那么不可能在每一个页面都设置这一行代码(太麻烦)
    this.$store.dispatch('user/getUserInfo')
  },
}
</script>

<style lang='less' scoped>
</style>