<template>
  <div class="cart">
    <h4>全部商品</h4>
    <div class="cart-main">
      <div class="cart-th">
        <div class="cart-th1">全部</div>
        <div class="cart-th2">商品</div>
        <div class="cart-th3">单价（元）</div>
        <div class="cart-th4">数量</div>
        <div class="cart-th5">小计（元）</div>
        <div class="cart-th6">操作</div>
      </div>
      <div class="cart-body">
        <ul class="cart-list" v-for="item,i in cartInfoList" :key="item.id">
          <li class="cart-list-con1">
            <input type="checkbox" name="chk_list" :checked="item.isChecked" @change="changeState(item,$event)">
          </li>
          <li class="cart-list-con2">
            <img :src="item.imgUrl">
            <div class="item-msg">{{item.skuName}}</div>
          </li>
          <li class="cart-list-con3">
            <div class="item-txt">语音升级款</div>
          </li>
          <li class="cart-list-con4">
            <span class="price">{{item.skuPrice?item.skuPrice.toFixed(2):item.skuPrice}}</span>
          </li>
          <li class="cart-list-con5">
            <a class="mins" @click="changeNum('reduce',-1,item)">-</a>
            <input autocomplete="off" type="text" @blur="changeNum('change',$event.target.value*1,item)" :value="item.skuNum" minnum="1" class="itxt">
            <a class="plus" @click="changeNum('add',1,item)">+</a>
          </li>
          <li class="cart-list-con6">
            <span class="sum">{{(item.skuPrice*item.skuNum)?(item.skuPrice*item.skuNum).toFixed(2):(item.skuPrice*item.skuNum)}}</span>
          </li>
          <li class="cart-list-con7">
            <a class="sindelet" @click="delCartGoods(item.skuId)">删除</a>
            <br>
            <a>移到收藏</a>
          </li>
        </ul>

      </div>
    </div>
    <div class="cart-tool">
      <div class="select-all">
        <input class="chooseAll" type="checkbox" :checked="allState&&cartInfoList.length!==0" @change="allChecked">
        <span>全选</span>
      </div>
      <div class="option">
        <a @click="delSelectGoods">删除选中的商品</a>
        <a>移到我的关注</a>
        <a>清除下柜商品</a>
      </div>
      <div class="money-box">
        <div class="chosed">已选择
          <span>{{totalNum}}</span>件商品
        </div>
        <div class="sumprice">
          <em>总价（不含运费） ：</em>
          <i class="summoney">￥{{totalPrice?totalPrice.toFixed(2):0}}</i>
        </div>
        <div class="sumbtn">
          <a class="sum-btn" target="_blank">结算</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
  name: 'ShopCart',
  methods: {
    // 发送获取购物车数据的请求
    getData() {
      this.$store.dispatch('shopcart/getShopCartData')
    },

    // 【下面方法有缺陷，用户快速连续点击按钮会导致商品数量变成负数，待处理】
    // type:加1 | 减1 | 直接赋值    state：1 | -1 | 输入的数值(记得转换成数值型)     shopItem:商品数据
    // state里面的数值表示的是增量与减量，而不是具体的商品数量。包括用户输入的数值，最终增量是:用户输入的值 - 数据库里面的商品数量值
    async changeNum(type, state, shopItem) {
      if (type === 'add') {
        state = 1 // 增量为1.表示数量加1
      } else if (type === 'reduce') {
        state = shopItem.skuNum < 2 ? 0 : -1 // 商品数量为1? 增量为0，保持不变 ：增量为-1，商品数量-1
      } else if (type === 'change') {
        if (isNaN(state) || state < 2) {
          state = 0 // 增量为0，而不是商品数量为0
        } else {
          state = parseInt(state) - shopItem.skuNum // 增量 = 用户输入的数量 - 数据库中的商品数量
        }
      }

      // 下面方法调用了商品添加到购物车的方法，因为该方法返回了promise所以可以使用try catch来判断结果是成功还是失败
      try {
        await this.$store.dispatch('detail/addOrUpdateShopCart', {skuId: shopItem.skuId, skuNum: state})
        this.getData()
      } catch (err) {
        console.log('修改购物车商品数量失败提示：', err)
      }
    },

    // 删除购物车商品
    delCartGoods(id) {
      try {
        this.$store.dispatch('shopcart/delShopCartGoods', id)
        this.getData()
      } catch (err) {
        console.log('删除单个购物车商品失败提示信息：', err)
      }
    },

    // 修改购物车商品状态
    changeState(goodsItem, e) {
      // console.log(e.target.checked) // 结果为false or true
      let isChecked = e.target.checked ? '1' : '0' // 需要一个 0 或 1 的字符串作为参数
      this.$store.dispatch('shopcart/changeGoodsState', {skuId: goodsItem.skuId, isChecked: isChecked})
      this.getData()
      this._watcher.run()
    },

    // 删除所有已选中的商品
    delSelectGoods() {
      try {
        this.$store.dispatch('shopcart/delSelectGoods')
        this.getData()
      } catch (err) {
        console.log('删除所有选中的购物车商品失败提示：', err)
      }
    },

    // 全选框勾选
    allChecked(e) {
      try {
        let isChecked = e.target.checked ? '1' : '0' // 全选框的状态，转换成后台需要的参数
        this.$store.dispatch('shopcart/allChecked', isChecked)
        this.getData()
      } catch (err) {
        console.log('购物车全选失败提示：', err)
      }
    },
  },

  mounted() {
    this.getData()
  },

  computed: {
    ...mapGetters('shopcart', ['shopData']),
    // 购物车商品数据
    cartInfoList() {
      return this.shopData.cartInfoList || [] // 加上一个[]，防止因为么有该数据而报错
    },
    // 全选框的状态
    allState() {
      return this.cartInfoList.every((item) => item.isChecked === 1)
    },
    // 商品总价
    totalPrice() {
      return this.cartInfoList.reduce((prev, item) => {
        return (prev += item.skuPrice * item.skuNum)
      }, 0)
    },
    // 商品总数量
    totalNum() {
      return this.cartInfoList.reduce((prev, item) => {
        return (prev += item.skuNum)
      }, 0)
    },
  },
}
</script>

<style lang="less" scoped>
a {
  cursor: pointer !important;
}
.cart {
  width: 1200px;
  margin: 0 auto;

  h4 {
    margin: 9px 0;
    font-size: 14px;
    line-height: 21px;
  }

  .cart-main {
    .cart-th {
      background: #f5f5f5;
      border: 1px solid #ddd;
      padding: 10px;
      overflow: hidden;

      & > div {
        float: left;
      }

      .cart-th1 {
        width: 25%;

        input {
          vertical-align: middle;
        }

        span {
          vertical-align: middle;
        }
      }

      .cart-th2 {
        width: 25%;
      }

      .cart-th3,
      .cart-th4,
      .cart-th5,
      .cart-th6 {
        width: 12.5%;
      }
    }

    .cart-body {
      margin: 15px 0;
      border: 1px solid #ddd;

      .cart-list {
        padding: 10px;
        border-bottom: 1px solid #ddd;
        overflow: hidden;

        & > li {
          float: left;
        }

        .cart-list-con1 {
          width: 4.1667%;
        }

        .cart-list-con2 {
          width: 25%;

          img {
            width: 82px;
            height: 82px;
            float: left;
          }

          .item-msg {
            float: left;
            width: 150px;
            margin: 0 10px;
            line-height: 18px;
          }
        }

        .cart-list-con3 {
          width: 20.8333%;

          .item-txt {
            text-align: center;
          }
        }

        .cart-list-con4 {
          width: 12.5%;
        }

        .cart-list-con5 {
          width: 12.5%;

          .mins {
            border: 1px solid #ddd;
            border-right: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }

          input {
            border: 1px solid #ddd;
            width: 40px;
            height: 33px;
            float: left;
            text-align: center;
            font-size: 14px;
          }

          .plus {
            border: 1px solid #ddd;
            border-left: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }
        }

        .cart-list-con6 {
          width: 12.5%;

          .sum {
            font-size: 16px;
          }
        }

        .cart-list-con7 {
          width: 12.5%;

          a {
            color: #666;
          }
        }
      }
    }
  }

  .cart-tool {
    overflow: hidden;
    border: 1px solid #ddd;

    .select-all {
      padding: 10px;
      overflow: hidden;
      float: left;

      span {
        vertical-align: middle;
      }

      input {
        vertical-align: middle;
      }
    }

    .option {
      padding: 10px;
      overflow: hidden;
      float: left;

      a {
        float: left;
        padding: 0 10px;
        color: #666;
      }
    }

    .money-box {
      float: right;

      .chosed {
        line-height: 26px;
        float: left;
        padding: 0 10px;
      }

      .sumprice {
        width: 200px;
        line-height: 22px;
        float: left;
        padding: 0 10px;

        .summoney {
          color: #c81623;
          font-size: 16px;
        }
      }

      .sumbtn {
        float: right;

        a {
          display: block;
          position: relative;
          width: 96px;
          height: 52px;
          line-height: 52px;
          color: #fff;
          text-align: center;
          font-size: 18px;
          font-family: 'Microsoft YaHei';
          background: #e1251b;
          overflow: hidden;
        }
      }
    }
  }
}
</style>