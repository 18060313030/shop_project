<template>
  <!-- 头部 -->
  <header class="header">
    <!-- 头部的第一行 -->
    <div class="top">
      <div class="container">
        <div class="loginList">
          <p>尚品汇欢迎您！</p>
          <p v-if="!userName">
            <span>请</span>
            <router-link to="/login">登录</router-link>
            <router-link to="/register" class="register">免费注册</router-link>
          </p>
          <p v-if="userName">
            <a>{{userName}}</a>
            <a class="register" @click="logout">退出登录</a>
          </p>
        </div>
        <div class="typeList">
          <a href="###">我的订单</a>
          <router-link to="/shopcart">我的购物车</router-link>
          <a href="###">我的尚品汇</a>
          <a href="###">尚品汇会员</a>
          <a href="###">企业采购</a>
          <a href="###">关注尚品汇</a>
          <a href="###">合作招商</a>
          <a href="###">商家后台</a>
        </div>
      </div>
    </div>
    <!--头部第二行 搜索区域-->
    <div class="bottom">
      <h1 class="logoArea">
        <router-link class="logo" to="/home">
          <img src="./images/logo.png" alt="">
        </router-link>
      </h1>
      <div class="searchArea">
        <form action="###" class="searchForm">
          <input type="text" id="autocomplete" class="input-error input-xxlarge" v-model="keyword" :placeholder="msg" @keyup.enter="search" />
          <button class="sui-btn btn-xlarge btn-danger" type="button" @click="search">搜索</button>
        </form>
      </div>
    </div>
  </header>
</template>

<script>
import {mapState} from 'vuex'

export default {
  name: 'Header',

  data() {
    return {
      keyword: '',
      msg: '', // 提示信息
      timer: null,
    }
  },

  created() {
    this.$store.dispatch('header/getTipData')
    // this.loopTip()
  },

  computed: {
    ...mapState('header', ['tipData']),
    // 判断欢迎您后面显示的内容，如果已登录则是名字+退出登录  未登录则是 未登录+注册
    userName() {
      return this.$store.state.user.userinfo.name
    },
  },

  mounted() {
    this.$bus.$on('clearKeyBread', this.clearKeyBread)
  },

  methods: {
    // 搜索商品
    search() {
      const location = {name: 'search', params: {keyword: this.keyword || undefined}}
      // 合并之前传递的query参数
      if (this.$route.query) {
        location.query = this.$route.query
      }
      // 上面步骤就是合并之前的查询参数，不累加，路径中的参数就会缺失
      this.$router.push(location)
    },

    // Search组件上删除了keyword的面包屑之后，这里也需要同步清空keyword字段
    clearKeyBread() {
      this.keyword = undefined
    },

    // 退出登录
    async logout() {
      try {
        await this.$store.dispatch('user/logOut')
        this.$router.push('/login')
      } catch (err) {
        alert(err)
      }
    },
  },

  // 搜索框提示文字数据变化时，通过定时器循环提示文字信息
  watch: {
    tipData: {
      handler() {
        this.$nextTick(() => {
          let i = 0
          this.msg = this.tipData[i]
          this.timer = setInterval(() => {
            i++
            if (i > this.tipData.length - 1) {
              i = 0
            }
            this.msg = this.tipData[i]
          }, 3000)
        })
      },
    },
  },
}
</script>

<style lang="less" scoped>
a {
  cursor: pointer !important;
}
.header {
  & > .top {
    background-color: #eaeaea;
    height: 30px;
    line-height: 30px;

    .container {
      width: 1200px;
      margin: 0 auto;
      overflow: hidden;

      .loginList {
        float: left;

        p {
          float: left;
          margin-right: 10px;

          .register {
            border-left: 1px solid #b3aeae;
            padding: 0 5px;
            margin-left: 5px;
          }
        }
      }

      .typeList {
        float: right;

        a {
          padding: 0 10px;

          & + a {
            border-left: 1px solid #b3aeae;
          }
        }
      }
    }
  }

  & > .bottom {
    width: 1200px;
    margin: 0 auto;
    overflow: hidden;

    .logoArea {
      float: left;

      .logo {
        img {
          width: 175px;
          margin: 25px 45px;
        }
      }
    }

    .searchArea {
      float: right;
      margin-top: 35px;

      .searchForm {
        overflow: hidden;

        input {
          box-sizing: border-box;
          width: 490px;
          height: 32px;
          padding: 0px 4px;
          border: 2px solid #ea4a36;
          float: left;

          &:focus {
            outline: none;
          }
        }

        button {
          height: 32px;
          width: 68px;
          background-color: #ea4a36;
          border: none;
          color: #fff;
          float: left;
          cursor: pointer;

          &:focus {
            outline: none;
          }
        }
      }
    }
  }
}
</style>