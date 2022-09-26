<template>
  <div>
    <TypeNav></TypeNav>
    <!-- 项目的最外层 -->
    <div class="outer">
      <!-- 窗口侧边栏 -->
      <div class="toolbar toolbar-wrap">
        <div class="content"></div>
        <div class="but list"></div>
        <div class="toolist">
          <div class="pull">
            <i class="tab-ico vip"></i>
            <em class="tab-text">商品会员</em>
          </div>
          <div class="pull">
            <i class="tab-ico cart"></i>
            <em class="tab-text">购物车</em>
          </div>
          <div class="pull">
            <i class="tab-ico follow"></i>
            <em class="tab-text">我的关注</em>
          </div>
          <div class="pull">
            <i class="tab-ico history"></i>
            <em class="tab-text">我的足迹</em>
          </div>
          <div class="pull">
            <i class="tab-ico message"></i>
            <em class="tab-text">我的消息</em>
          </div>
          <div class="pull">
            <i class="tab-ico jimi"></i>
            <em class="tab-text">咨询</em>
          </div>
        </div>
        <div class="back pull">
          <i class="tab-ico top"></i>
          <em class="tab-text">顶部</em>
        </div>
      </div>

      <!--list-content-->
      <div class="main">
        <div class="py-container">
          <!-- 面包屑 -->
          <div class="bread">
            <ul class="fl sui-breadcrumb">
              <li>
                <a href="#">全部结果</a>
              </li>
            </ul>
            <ul class="fl sui-tag">
              <!--分类的面包屑-->
              <li class="with-x" v-if="searchParams.categoryName">{{searchParams.categoryName}}<i @click="closeCateBread">×</i></li>
              <!--关键字的面包屑-->
              <li class="with-x" v-if="searchParams.keyword">{{searchParams.keyword}}<i @click="closeKeyBread">×</i></li>
              <!--品牌的面包屑-->
              <li class="with-x" v-if="searchParams.trademark">{{searchParams.trademark.split(":")[1]}}<i @click="closeTradeMarkBread">×</i></li>
              <!-- 商品属性面包屑 -->
              <li class="with-x" v-for="(item,i) in searchParams.props" :key="item.split(':')[0]">{{item.split(":")[1]}}<i @click="closeAttrsBread(item)">×</i>
              </li>
            </ul>
          </div>

          <!-- 商品筛选 -->
          <SearchSelector @revTradeMark="revTradeMark" @revAttrInfo="revAttrInfo"></SearchSelector>

          <!--主体区域-->
          <div class="details clearfix">
            <div class="sui-navbar">
              <div class="navbar-inner filter">
                <!-- 商品排序 -->
                <ul class="sui-nav">
                  <li :class="{active:isAllActive}">
                    <a @click="sort('1')">综合<span v-show="isAllActive" class="iconfont"
                        :class="{'icon-xiangxiajiantoucuxiao':downArrow,'icon-xiangshangjiantoucuxiao':upArrow}"></span></a>
                  </li>
                  <li :class="{active:isSaleActive}">
                    <a @click="sort('2')">销量<span v-show="isSaleActive" class="iconfont"
                        :class="{'icon-xiangxiajiantoucuxiao':downArrow,'icon-xiangshangjiantoucuxiao':upArrow}"></span></a>
                  </li>
                </ul>
              </div>
            </div>
            <!-- 商品列表 -->
            <div class="goods-list">
              <ul class="yui3-g">
                <li class="yui3-u-1-5" v-for="(item,index) in goodsList" :key="item.id" @click="toDetailPage(item.id)">
                  <div class="list-wrap">
                    <div class="p-img">
                      <a target="_blank"><img :src="item.defaultImg" /></a>
                    </div>
                    <div class="price">
                      <strong>
                        <em>¥</em>
                        <i>{{item.price}}.00</i>
                      </strong>
                    </div>
                    <div class="attr">
                      <a target="_blank" :title="item.title">{{item.title}}</a>
                    </div>
                    <div class="commit">
                      <i class="command">已有<span>2000</span>人评价</i>
                    </div>
                    <div class="operate">
                      <a target="_blank" class="sui-btn btn-bordered btn-danger">加入购物车</a>
                      <a href="javascript:void(0);" class="sui-btn btn-bordered">收藏</a>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
            <!-- 分页器 -->
            <Pagination :pageSize="searchParams.pageSize" :pageNo="searchParams.pageNo" :total="total" :continues="5" @changePage="changePage"></Pagination>
          </div>
          <!--热卖商品-->
          <div class="clearfix hot-sale">
            <h4 class="title">热卖商品</h4>
            <div class="hot-list">
              <ul class="yui3-g">
                <li class="yui3-u-1-4">
                  <div class="list-wrap">
                    <div class="p-img">
                      <img src="./images/like_01.png" />
                    </div>
                    <div class="attr">
                      <em>Apple苹果iPhone 6s (A1699)</em>
                    </div>
                    <div class="price">
                      <strong>
                        <em>¥</em>
                        <i>4088.00</i>
                      </strong>
                    </div>
                    <div class="commit">
                      <i class="command">已有700人评价</i>
                    </div>
                  </div>
                </li>
                <li class="yui3-u-1-4">
                  <div class="list-wrap">
                    <div class="p-img">
                      <img src="./images/like_03.png" />
                    </div>
                    <div class="attr">
                      <em>金属A面，360°翻转，APP下单省300！</em>
                    </div>
                    <div class="price">
                      <strong>
                        <em>¥</em>
                        <i>4088.00</i>
                      </strong>
                    </div>
                    <div class="commit">
                      <i class="command">已有700人评价</i>
                    </div>
                  </div>
                </li>
                <li class="yui3-u-1-4">
                  <div class="list-wrap">
                    <div class="p-img">
                      <img src="./images/like_04.png" />
                    </div>
                    <div class="attr">
                      <em>256SSD商务大咖，完爆职场，APP下单立减200</em>
                    </div>
                    <div class="price">
                      <strong>
                        <em>¥</em>
                        <i>4068.00</i>
                      </strong>
                    </div>
                    <div class="commit">
                      <i class="command">已有20人评价</i>
                    </div>
                  </div>
                </li>
                <li class="yui3-u-1-4">
                  <div class="list-wrap">
                    <div class="p-img">
                      <img src="./images/like_02.png" />
                    </div>
                    <div class="attr">
                      <em>Apple苹果iPhone 6s (A1699)</em>
                    </div>
                    <div class="price">
                      <strong>
                        <em>¥</em>
                        <i>4088.00</i>
                      </strong>
                    </div>
                    <div class="commit">
                      <i class="command">已有700人评价</i>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import Pagination from '../../components/Pagination/Pagination.vue'
import SearchSelector from './SearchSelector/SearchSelector.vue'
export default {
  name: 'Search',
  data() {
    return {
      // search页面的参数
      searchParams: {
        category1Id: '',
        category2Id: '',
        category3Id: '',
        categoryName: '',
        keyword: '',
        order: '1:desc',
        pageNo: 1,
        pageSize: 5,
        props: [],
        trademark: '',
      },
    }
  },

  methods: {
    // 请求数据
    reqData() {
      this.$store.dispatch('search/getSearchData', {...this.searchParams})
    },

    // 删除分类面包屑
    closeCateBread() {
      // 如果this.searchParams.category1Id = '' 赋值为"",那么请求时依然会带有该参数给服务器
      // 但是设置为undefined则不会有该请求参数参与传递了，节省网络资源
      this.searchParams.category1Id = undefined
      this.searchParams.category2Id = undefined
      this.searchParams.category3Id = undefined
      this.searchParams.categoryName = ''
      this.reqData() // 发起请求，更新数据

      // 重新向自身当前页面发起请求，清空浏览器url中的参数
      // 但是注意 需要保存params,也就是用户在input里面输入的keyword
      // 需要清理的是点击三级分类传递的query  http://xxx.xxx/search?xxx=xxx&xxx=xxx
      if (this.$route.params) {
        this.$router.push({name: 'search', params: this.$route.params})
      }
    },
    // 删除关键字的面包屑
    closeKeyBread() {
      this.searchParams.keyword = undefined
      // 同步清空Header组件上的keyword字段
      this.$bus.$emit('clearKeyBread')
      this.reqData() // 发起请求，更新数据

      // 重新向自身当前页面发起请求，清空浏览器url中的params参数
      // 但是注意 需要保存query,也就是点击三级分类传递的query
      // 需要清理的是用户在input里面输入的keyword  http://xxx.xxx/search/keyword
      if (this.$route.query) {
        this.$router.push({name: 'search', query: this.$route.query})
      }
    },

    // 处理SearchSelector传递上来的品牌数据,拼接参数
    revTradeMark(data) {
      // console.log(data)
      this.searchParams.trademark = `${data.tmId}:${data.tmName}`
      this.reqData()
    },
    // 删除品牌的面包屑
    closeTradeMarkBread() {
      this.searchParams.trademark = undefined
      this.reqData()
    },

    // 处理SearchSelector传递上来的商品属性数据,拼接参数
    revAttrInfo(data) {
      if (this.searchParams.props.indexOf(data) === -1) this.searchParams.props.push(data)
      this.reqData()
    },
    // 删除商品属性的面包屑
    closeAttrsBread(data) {
      this.searchParams.props = this.searchParams.props.filter((item) => item !== data)
      this.reqData()
    },

    // 排序
    sort(flag) {
      // console.log(flag) // "1" 或 "2"
      const buttonType = this.searchParams.order.split(':')[0] // 按钮类型 1：综合  2：销量
      const sortType = this.searchParams.order.split(':')[1] // asc:升序  desc:降序
      let order = ''
      // 如果点击的按钮和当前的参数是一致的，【商品筛选方式不变,排序方式修改一下】
      if (flag == buttonType) {
        order = `${buttonType}:${sortType == 'desc' ? 'asc' : 'desc'}`
      } else {
        // 点击的按钮类型和参数是不一致的,【商品筛选方式改变，排序默认为降序】
        order = `${flag}:desc`
      }
      this.searchParams.order = order
      this.reqData()
    },

    // 分页功能  跳转页面
    changePage(pageNo) {
      this.searchParams.pageNo = pageNo
      this.reqData()
    },

    // 跳转商品详情页
    toDetailPage(id) {
      this.$router.push('/detail/' + id)
    },
  },

  watch: {
    // 监听路由参数的变化，重新拼接参数，发起请求
    $route() {
      // 需要设置为undefined，不然前面请求的category这个参数会保留。我们发请求时只需要其中一个即可，而不是多个
      this.searchParams.category1Id = undefined
      this.searchParams.category2Id = undefined
      this.searchParams.category3Id = undefined
      Object.assign(this.searchParams, this.$route.query, this.$route.params)
      this.reqData()
    },
  },

  computed: {
    ...mapGetters('search', ['goodsList', 'total']), // 商品列表数据 商品总数

    // 显示综合排序按钮的背景色
    isAllActive() {
      return this.searchParams.order.includes('1')
    },

    // 显示销量排序按钮的背景色
    isSaleActive() {
      return this.searchParams.order.includes('2')
    },

    // 显示上箭头
    upArrow() {
      return this.searchParams.order.includes('asc')
    },

    // 显示下箭头
    downArrow() {
      return this.searchParams.order.includes('desc')
    },
  },

  beforeMount() {
    // 发请求前，将需要传递的参数整合好。
    // 其他页面点击过来时会有对应的参数传递过来，这里接收合并参数，然后发送给服务器获取数据
    Object.assign(this.searchParams, this.$route.query, this.$route.params)
  },

  mounted() {
    this.reqData()
  },

  components: {SearchSelector, Pagination},
}
</script>

<style lang='less' scoped>
.outer .toolbar {
  position: fixed;
  z-index: 999;
  width: 300px;
  height: 100%;
  background-color: #7a6e6e;
  transition: right 0.3s ease-in-out 0s;
}
.outer .toolbar.toolbar-out {
  top: 0px;
  right: 0px;
}
.outer .toolbar.toolbar-wrap {
  top: 0px;
  right: -294px;
}
.outer .toolbar .content {
  position: relative;
  left: 6px;
  width: 294px;
  background-color: bisque;
  height: 100%;
  z-index: 99;
}
.outer .toolbar .but {
  position: relative;
  width: 35px;
  height: 35px;
  line-height: 35px;
  text-align: center;
  margin-bottom: 1px;
  cursor: pointer;
  background-color: #7a6e6e;
  border-radius: 3px 0 0 3px;
  position: absolute;
  top: 0;
  /*right: -6px;*/
  left: -29px;
}
.outer .toolbar .but.list {
  background-image: url(./images/list.png);
  background-repeat: no-repeat;
  background-size: cover;
}
.outer .toolbar .but.pull-wrap {
  background-image: url(./images/cross.png);
  background-repeat: no-repeat;
  background-size: cover;
}
.outer .toolbar .toolist {
  position: absolute;
  top: 50%;
  left: -29px;
  width: 35px;
  margin-top: -80px;
  /*background-color: cadetblue;*/
}
.outer .toolbar .toolist .pull {
  position: relative;
  width: 35px;
  height: 35px;
  line-height: 35px;
  text-align: center;
  margin-bottom: 1px;
  cursor: pointer;
  background-color: #7a6e6e;
  border-radius: 3px 0 0 3px;
  z-index: 66;
}
.outer .toolbar .toolist .pull .vip {
  background-image: url(./images/toolbars.png);
  background-position: -88px -175px;
}
.outer .toolbar .toolist .pull .cart {
  background-image: url(./images/toolbars.png);
  background-position: -50px 0;
}
.outer .toolbar .toolist .pull .follow {
  background-image: url(./images/toolbars.png);
  background-position: -50px -50px;
}
.outer .toolbar .toolist .pull .history {
  background-image: url(./images/toolbars.png);
  background-position: -50px -100px;
}
.outer .toolbar .toolist .pull .message {
  background-image: url(./images/toolbars.png);
  background-position: -190px -150px;
}
.outer .toolbar .toolist .pull .jimi {
  background-image: url(./images/toolbars.png);
  background-position: -50px -150px;
}
.outer .toolbar .toolist .pull .top {
  background-image: url(./images/toolbars.png);
  background-position: -50px -250px;
}
.outer .toolbar .toolist .pull .tab-text {
  width: 62px;
  height: 35px;
  line-height: 35px;
  color: #fff;
  text-align: center;
  font-family: 微软雅黑;
  position: absolute;
  /*position: relative;*/
  z-index: 1;
  left: 35px;
  top: 0;
  background-color: #7a6e6e;
  border-radius: 3px 0 0 3px;
  font-style: normal;
  -webkit-transition: left 0.3s ease-in-out 0.1s;
  transition: left 0.3s ease-in-out 0.1s;
}
.outer .toolbar .toolist .pull .tab-ico {
  display: inline-block;
  position: relative;
  /*background-image: url(img/toolbars.png);*/
  background-color: #7a6e6e;
  border-radius: 3px 0 0 3px;
  z-index: 2;
  width: 35px;
  height: 35px;
}
.outer .toolbar > .pull {
  position: relative;
  width: 35px;
  height: 35px;
  line-height: 35px;
  text-align: center;
  margin-bottom: 1px;
  cursor: pointer;
  background-color: #7a6e6e;
  border-radius: 3px 0 0 3px;
  z-index: 66;
}
.outer .toolbar > .pull .tab-ico {
  display: inline-block;
  position: relative;
  /*background-image: url(img/toolbars.png);*/
  background-color: #7a6e6e;
  border-radius: 3px 0 0 3px;
  z-index: 2;
  width: 35px;
  height: 35px;
}
.outer .toolbar > .pull .top {
  background-image: url(./images/toolbars.png);
  background-position: -50px -250px;
}
.outer .toolbar > .pull .tab-text {
  width: 62px;
  height: 35px;
  line-height: 35px;
  color: #fff;
  text-align: center;
  font-family: 微软雅黑;
  position: absolute;
  /*position: relative;*/
  z-index: 1;
  left: 35px;
  top: 0;
  background-color: #7a6e6e;
  border-radius: 3px 0 0 3px;
  font-style: normal;
  -webkit-transition: left 0.3s ease-in-out 0.1s;
  transition: left 0.3s ease-in-out 0.1s;
}
.outer .toolbar > .back {
  position: absolute;
  bottom: 0;
  /*right: -6px;*/
  left: -29px;
  display: inline-block;
  background-image: url(./images/toolbars.png);
}
.outer .header > .top {
  background-color: #eaeaea;
  height: 30px;
  line-height: 30px;
}
.outer .header > .top .container {
  width: 1200px;
  margin: 0 auto;
  overflow: hidden;
}
.outer .header > .top .container .loginList {
  float: left;
}
.outer .header > .top .container .loginList p {
  float: left;
  margin-right: 10px;
}
.outer .header > .top .container .loginList p .register {
  border-left: 1px solid #b3aeae;
  padding: 0 5px;
  margin-left: 5px;
}
.outer .header > .top .container .typeList {
  float: right;
}
.outer .header > .top .container .typeList a {
  padding: 0 10px;
}
.outer .header > .top .container .typeList a + a {
  border-left: 1px solid #b3aeae;
}
.outer .header > .bottom {
  width: 1200px;
  margin: 0 auto;
  overflow: hidden;
}
.outer .header > .bottom .logoArea {
  float: left;
}
.outer .header > .bottom .logoArea .logo img {
  width: 175px;
  margin: 25px 45px;
}
.outer .header > .bottom .searchArea {
  float: right;
  margin-top: 35px;
}
.outer .header > .bottom .searchArea .searchForm {
  overflow: hidden;
}
.outer .header > .bottom .searchArea .searchForm input {
  box-sizing: border-box;
  width: 490px;
  height: 32px;
  padding: 0px 4px;
  border: 2px solid #ea4a36;
  float: left;
}
.outer .header > .bottom .searchArea .searchForm input:focus {
  outline: none;
}
.outer .header > .bottom .searchArea .searchForm button {
  height: 32px;
  width: 68px;
  background-color: #ea4a36;
  border: none;
  color: #fff;
  float: left;
  cursor: pointer;
}
.outer .header > .bottom .searchArea .searchForm button:focus {
  outline: none;
}
.outer .typeNav {
  border-bottom: 2px solid #e1251b;
}
.outer .typeNav .container {
  width: 1200px;
  margin: 0 auto;
  display: flex;
  position: relative;
}
.outer .typeNav .container .all {
  width: 210px;
  height: 45px;
  background-color: #e1251b;
  line-height: 45px;
  text-align: center;
  color: #fff;
  font-size: 14px;
  font-weight: bold;
}
.outer .typeNav .container .nav a {
  height: 45px;
  margin: 0 22px;
  line-height: 45px;
  font-size: 16px;
  color: #333;
}
.outer .typeNav .container .sort {
  left: 0;
  top: 45px;
  width: 210px;
  height: 461px;
  position: absolute;
  background: #fafafa;
  z-index: 999;
}
.outer .typeNav .container .sort .all-sort-list2 .item h3 {
  line-height: 30px;
  font-size: 14px;
  font-weight: 400;
  overflow: hidden;
  padding: 0 20px;
  margin: 0;
}
.outer .typeNav .container .sort .all-sort-list2 .item h3 a {
  color: #333;
}
.outer .typeNav .container .sort .all-sort-list2 .item .item-list {
  display: none;
  position: absolute;
  width: 734px;
  min-height: 460px;
  _height: 200px;
  background: #f7f7f7;
  left: 210px;
  border: 1px solid #ddd;
  top: 0;
  z-index: 9999 !important;
}
.outer .typeNav .container .sort .all-sort-list2 .item .item-list .subitem {
  float: left;
  width: 650px;
  padding: 0 4px 0 8px;
}
.outer .typeNav .container .sort .all-sort-list2 .item .item-list .subitem dl {
  border-top: 1px solid #eee;
  padding: 6px 0;
  overflow: hidden;
  zoom: 1;
}
.outer .typeNav .container .sort .all-sort-list2 .item .item-list .subitem dl.fore {
  border-top: 0;
}
.outer .typeNav .container .sort .all-sort-list2 .item .item-list .subitem dl dt {
  float: left;
  width: 54px;
  line-height: 22px;
  text-align: right;
  padding: 3px 6px 0 0;
  font-weight: 700;
}
.outer .typeNav .container .sort .all-sort-list2 .item .item-list .subitem dl dd {
  float: left;
  width: 415px;
  padding: 3px 0 0;
  overflow: hidden;
}
.outer .typeNav .container .sort .all-sort-list2 .item .item-list .subitem dl dd em {
  float: left;
  height: 14px;
  line-height: 14px;
  padding: 0 8px;
  margin-top: 5px;
  border-left: 1px solid #ccc;
}
.outer .typeNav .container .sort .all-sort-list2 .item:hover .item-list {
  display: block;
}
.outer .main {
  margin: 10px 0;
}
.outer .main .py-container {
  width: 1200px;
  margin: 0 auto;
}
.outer .main .py-container .bread {
  margin-bottom: 5px;
  overflow: hidden;
}
.outer .main .py-container .bread .sui-breadcrumb {
  padding: 3px 15px;
  margin: 0;
  font-weight: 400;
  border-radius: 3px;
  float: left;
}
.outer .main .py-container .bread .sui-breadcrumb li {
  display: inline-block;
  line-height: 18px;
}
.outer .main .py-container .bread .sui-breadcrumb li a {
  color: #666;
  text-decoration: none;
}
.outer .main .py-container .bread .sui-breadcrumb li a:hover {
  color: #4cb9fc;
}
.outer .main .py-container .bread .sui-tag {
  margin-top: -5px;
  list-style: none;
  font-size: 0;
  line-height: 0;
  padding: 5px 0 0;
  margin-bottom: 18px;
  float: left;
}
.outer .main .py-container .bread .sui-tag .with-x {
  font-size: 12px;
  margin: 0 5px 5px 0;
  display: inline-block;
  overflow: hidden;
  color: #000;
  background: #f7f7f7;
  padding: 0 7px;
  height: 20px;
  line-height: 20px;
  border: 1px solid #dedede;
  white-space: nowrap;
  transition: color 400ms;
  cursor: pointer;
}
.outer .main .py-container .bread .sui-tag .with-x i {
  margin-left: 10px;
  cursor: pointer;
  font: 400 14px tahoma;
  display: inline-block;
  height: 100%;
  vertical-align: middle;
}
.outer .main .py-container .bread .sui-tag .with-x:hover {
  color: #28a3ef;
}

.outer .main .py-container .details {
  margin-bottom: 5px;
}
.outer .main .py-container .details .sui-navbar {
  overflow: visible;
  margin-bottom: 0;
}
.outer .main .py-container .details .sui-navbar .filter {
  min-height: 40px;
  padding-right: 20px;
  background: #fbfbfb;
  border: 1px solid #e2e2e2;
  padding-left: 0;
  border-radius: 0;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.065);
}
.outer .main .py-container .details .sui-navbar .filter .sui-nav {
  position: relative;
  left: 0;
  display: block;
  float: left;
  margin: 0 10px 0 0;
}
.outer .main .py-container .details .sui-navbar .filter .sui-nav li {
  float: left;
  line-height: 18px;
}
.outer .main .py-container .details .sui-navbar .filter .sui-nav li a {
  display: block;
  cursor: pointer;
  padding: 11px 15px;
  color: #777;
  text-decoration: none;
}
.outer .main .py-container .details .sui-navbar .filter .sui-nav li.active a {
  background: #e1251b;
  color: #fff;
}
.outer .main .py-container .details .goods-list {
  margin: 20px 0;
}
.outer .main .py-container .details .goods-list ul {
  display: flex;
  flex-wrap: wrap;
}
.outer .main .py-container .details .goods-list ul li {
  height: 100%;
  width: 20%;
  margin-top: 10px;
  line-height: 28px;
}
.outer .main .py-container .details .goods-list ul li .list-wrap .p-img {
  padding-left: 15px;
  width: 215px;
  height: 255px;
}
.outer .main .py-container .details .goods-list ul li .list-wrap .p-img a {
  color: #666;
}
.outer .main .py-container .details .goods-list ul li .list-wrap .p-img a img {
  max-width: 100%;
  height: auto;
  vertical-align: middle;
}
.outer .main .py-container .details .goods-list ul li .list-wrap .price {
  padding-left: 15px;
  font-size: 18px;
  color: #c81623;
}
.outer .main .py-container .details .goods-list ul li .list-wrap .price strong {
  font-weight: 700;
}
.outer .main .py-container .details .goods-list ul li .list-wrap .price strong i {
  margin-left: 3px;
}
.outer .main .py-container .details .goods-list ul li .list-wrap .attr {
  padding-left: 15px;
  width: 85%;
  overflow: hidden;
  margin-bottom: 8px;
  min-height: 38px;
  cursor: pointer;
  line-height: 1.8;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
}
.outer .main .py-container .details .goods-list ul li .list-wrap .attr a {
  color: #333;
  text-decoration: none;
}
.outer .main .py-container .details .goods-list ul li .list-wrap .commit {
  padding-left: 15px;
  height: 22px;
  font-size: 13px;
  color: #a7a7a7;
}
.outer .main .py-container .details .goods-list ul li .list-wrap .commit span {
  font-weight: 700;
  color: #646fb0;
}
.outer .main .py-container .details .goods-list ul li .list-wrap .operate {
  padding: 12px 15px;
}
.outer .main .py-container .details .goods-list ul li .list-wrap .operate .sui-btn {
  display: inline-block;
  padding: 2px 14px;
  box-sizing: border-box;
  margin-bottom: 0;
  font-size: 12px;
  line-height: 18px;
  text-align: center;
  vertical-align: middle;
  cursor: pointer;
  border-radius: 0;
  background-color: transparent;
  margin-right: 15px;
}
.outer .main .py-container .details .goods-list ul li .list-wrap .operate .btn-bordered {
  min-width: 85px;
  background-color: transparent;
  border: 1px solid #8c8c8c;
  color: #8c8c8c;
}
.outer .main .py-container .details .goods-list ul li .list-wrap .operate .btn-bordered:hover {
  border: 1px solid #666;
  color: #fff !important;
  background-color: #666;
  text-decoration: none;
}
.outer .main .py-container .details .goods-list ul li .list-wrap .operate .btn-danger {
  border: 1px solid #e1251b;
  color: #e1251b;
}
.outer .main .py-container .details .goods-list ul li .list-wrap .operate .btn-danger:hover {
  border: 1px solid #e1251b;
  background-color: #e1251b;
  color: white !important;
  text-decoration: none;
}

.outer .main .py-container .hot-sale {
  margin-bottom: 5px;
  border: 1px solid #ddd;
}
.outer .main .py-container .hot-sale .title {
  font-weight: 700;
  font-size: 14px;
  line-height: 21px;
  border-bottom: 1px solid #ddd;
  background: #f1f1f1;
  color: #333;
  margin: 0;
  padding: 5px 0 5px 15px;
}
.outer .main .py-container .hot-sale .hot-list {
  padding: 15px;
}
.outer .main .py-container .hot-sale .hot-list ul {
  display: flex;
}
.outer .main .py-container .hot-sale .hot-list ul li {
  width: 25%;
  height: 100%;
}
.outer .main .py-container .hot-sale .hot-list ul li .list-wrap .p-img,
.outer .main .py-container .hot-sale .hot-list ul li .list-wrap .price,
.outer .main .py-container .hot-sale .hot-list ul li .list-wrap .attr,
.outer .main .py-container .hot-sale .hot-list ul li .list-wrap .commit {
  padding-left: 15px;
}
.outer .main .py-container .hot-sale .hot-list ul li .list-wrap .p-img img {
  max-width: 100%;
  vertical-align: middle;
  border: 0;
}
.outer .main .py-container .hot-sale .hot-list ul li .list-wrap .attr {
  width: 85%;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
  margin-bottom: 8px;
  min-height: 38px;
  cursor: pointer;
  line-height: 1.8;
}
.outer .main .py-container .hot-sale .hot-list ul li .list-wrap .price {
  font-size: 18px;
  color: #c81623;
}
.outer .main .py-container .hot-sale .hot-list ul li .list-wrap .price strong {
  font-weight: 700;
}
// .outer .main .py-container .hot-sale .hot-list ul li .list-wrap .price strong i {

// }
.outer .main .py-container .hot-sale .hot-list ul li .list-wrap .commit {
  height: 22px;
  font-size: 13px;
  color: #a7a7a7;
}
.outer .footer {
  background-color: #eaeaea;
}
.outer .footer .footer-container {
  width: 1200px;
  margin: 0 auto;
  padding: 0 15px;
}
.outer .footer .footer-container .footerList {
  padding: 20px;
  border-bottom: 1px solid #e4e1e1;
  border-top: 1px solid #e4e1e1;
  overflow: hidden;
  padding-left: 40px;
}
.outer .footer .footer-container .footerList .footerItem {
  width: 16.6666667%;
  float: left;
}
.outer .footer .footer-container .footerList .footerItem h4 {
  font-size: 14px;
}
.outer .footer .footer-container .footerList .footerItem .footerItemCon li {
  line-height: 18px;
}
.outer .footer .footer-container .footerList .footerItem:last-child img {
  width: 121px;
}
.outer .footer .footer-container .copyright {
  padding: 20px;
}
.outer .footer .footer-container .copyright .helpLink {
  text-align: center;
}
.outer .footer .footer-container .copyright .helpLink li {
  display: inline;
}
.outer .footer .footer-container .copyright .helpLink li .space {
  border-left: 1px solid #666;
  width: 1px;
  height: 13px;
  background: #666;
  margin: 8px 10px;
}
.outer .footer .footer-container .copyright p {
  margin: 10px 0;
  text-align: center;
}
</style>