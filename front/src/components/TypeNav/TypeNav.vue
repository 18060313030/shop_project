<template>
  <!-- 商品分类导航 -->
  <div class="type-nav">
    <div class="container">
      <h2 class="all" @mouseenter="showNav" @mouseleave="hideNav">全部商品分类</h2>
      <nav class="nav">
        <a href="###">服装城</a>
        <a href="###">美妆馆</a>
        <a href="###">尚品汇超市</a>
        <a href="###">全球购</a>
        <a href="###">闪购</a>
        <a href="###">团购</a>
        <a href="###">有趣</a>
        <a href="###">秒杀</a>
      </nav>
      <div class="sort" v-show="navShow" @mouseenter="showNav" @mouseleave="hideNav">
        <div class="all-sort-list2">
          <!-- 三级分类列表 -->
          <div class="item" :class="{'cateBgc':index===currentIndex}" @mouseleave="resetBgc" @mouseover="changeBgc(index)"
            v-for="(c1,index) in categoryListData" :key="c1.categoryId" @click="goSearch">
            <h3>
              <!-- 一级分类导航按钮 -->
              <a href="" :data-categoryName="c1.categoryName" :data-category1Id="c1.categoryId">{{c1.categoryName}}</a>
            </h3>
            <div class="item-list clearfix">
              <div class="subitem">
                <dl class="fore" v-for="(c2,index2) in c1.categoryChild" :key="c2.categoryId">
                  <dt>
                    <!-- 二级分类导航按钮 -->
                    <a href="" :data-categoryName="c2.categoryName" :data-category2Id="c2.categoryId">{{c2.categoryName}}</a>
                  </dt>
                  <dd>
                    <em v-for="(c3,index2) in c2.categoryChild" :key="c3.categoryId">
                      <!-- 三级分类导航按钮 -->
                      <a href="" :data-categoryName="c3.categoryName" :data-category3Id="c3.categoryId">{{c3.categoryName}}</a>
                    </em>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import throttle from 'lodash/throttle'
import {mapState} from 'vuex'
export default {
  name: 'TypeNav',
  data() {
    return {
      currentIndex: -1, // 样式
      navShow: true, // 是否显示三级分类
    }
  },

  methods: {
    // 修改【三级分类按钮】的背景颜色----使用了节流，感觉没啥区别
    changeBgc: throttle(function (id) {
      this.currentIndex = id
    }, 20),

    // 鼠标离开【三级分类按钮】，恢复背景色
    resetBgc() {
      this.currentIndex = -1
    },

    // 鼠标进入【导航按钮】，显示三级分类
    showNav() {
      this.navShow = true
    },

    // 鼠标离开【导航按钮】，隐藏三级分类
    hideNav() {
      if (this.$route.name !== 'home') {
        this.navShow = false
      }
    },

    // 跳转到对应的商品(Search.vue)页面，通过自定义属性存放需要传递的参数
    goSearch(e) {
      e.preventDefault()
      // e.target.dataset可以获取到全是小写的自定义属性名
      let {categoryname, category1id, category2id, category3id} = e.target.dataset
      const location = {name: 'search'}
      // 如果有categoryname，表示就是一个分类标签导航
      if (categoryname) {
        const query = {categoryName: categoryname}
        // 判断点击的是几级的分类导航按钮
        if (category1id) {
          query.category1Id = category1id
        } else if (category2id) {
          query.category2Id = category2id
        } else if (category3id) {
          query.category3Id = category3id
        }
        location.query = query
      }
      // 如果传递的参数中有params就进行合并
      if (this.$route.params) {
        location.params = this.$route.params
      }
      // 编程式导航
      this.$router.push(location)
    },
  },

  mounted() {
    // 除了主页的路由以外，其他使用到三级分类的组件都在页面加载时默认隐藏三级分类
    if (this.$route.name !== 'home') {
      this.navShow = false
    }
  },

  computed: {
    ...mapState('home', ['categoryListData']),
  },
}
</script>

<style lang='less' scoped>
.cateBgc {
  background-color: rgb(135, 206, 235) !important;
}
.type-nav {
  border-bottom: 2px solid #e1251b;

  .container {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    position: relative;

    .all {
      width: 210px;
      height: 45px;
      background-color: #e1251b;
      line-height: 45px;
      text-align: center;
      color: #fff;
      font-size: 14px;
      font-weight: bold;
    }

    .nav {
      a {
        height: 45px;
        margin: 0 22px;
        line-height: 45px;
        font-size: 16px;
        color: #333;
      }
    }

    .sort {
      position: absolute;
      left: 0;
      top: 45px;
      width: 210px;
      height: 461px;
      position: absolute;
      background: #fafafa;
      z-index: 999;

      .all-sort-list2 {
        .item {
          h3 {
            line-height: 30px;
            font-size: 14px;
            font-weight: 400;
            overflow: hidden;
            padding: 0 20px;
            margin: 0;

            a {
              color: #333;
            }
          }

          .item-list {
            display: none;
            position: absolute;
            width: 734px;
            min-height: 460px;
            background: #f7f7f7;
            left: 210px;
            border: 1px solid #ddd;
            top: 0;
            z-index: 9999 !important;

            .subitem {
              float: left;
              width: 650px;
              padding: 0 4px 0 8px;

              dl {
                border-top: 1px solid #eee;
                padding: 6px 0;
                overflow: hidden;
                zoom: 1;

                &.fore {
                  border-top: 0;
                }

                dt {
                  float: left;
                  width: 54px;
                  line-height: 22px;
                  text-align: right;
                  padding: 3px 6px 0 0;
                  font-weight: 700;
                }

                dd {
                  float: left;
                  width: 415px;
                  padding: 3px 0 0;
                  overflow: hidden;

                  em {
                    float: left;
                    height: 14px;
                    line-height: 14px;
                    padding: 0 8px;
                    margin-top: 5px;
                    border-left: 1px solid #ccc;
                  }
                }
              }
            }
          }

          &:hover {
            .item-list {
              display: block;
            }
          }
        }
      }
    }
    // 动画效果，效果不理想
    // .v-enter {
    //   height: 0;
    // }
    // .v-enter-to {
    //   height: 100%;
    // }
    // .v-enter-active {
    //   transition: 0.3s;
    // }
  }
}
</style>