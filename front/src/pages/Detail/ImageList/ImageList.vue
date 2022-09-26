<template>
  <div class="swiper-container" ref="swipeRef">
    <div class="swiper-wrapper">
      <div class="swiper-slide" v-for="item,index in skuImageList" :key="index">
        <img :src="item.imgUrl" :class="{active:imgIndex===index}" @click="changeImgIndex(index)">
      </div>
    </div>
    <div class="swiper-button-next"></div>
    <div class="swiper-button-prev"></div>
  </div>
</template>

<script>
import Swiper from 'swiper'
export default {
  name: 'ImageList',
  props: ['skuImageList'],
  data() {
    return {
      imgIndex: 0, // 选中的轮播图图片索引
    }
  },
  methods: {
    changeImgIndex(index) {
      this.imgIndex = index
      this.$bus.$emit('getIndex', index)
    },
  },
  // 轮播图 使用 watch + nextTick 书写 【watch可以保证数据是获取到的，nextTick可以保证所需的页面结构是完整的】
  watch: {
    skuImageList: {
      handler() {
        this.$nextTick(() => {
          var mySwiper = new Swiper(this.$refs.swipeRef, {
            slidesPerView: 3,
            slidesPreGroup: 1,
            // 如果需要前进后退按钮
            navigation: {
              nextEl: '.swiper-button-next',
              prevEl: '.swiper-button-prev',
            },
          })
        })
      },
    },
  },
}
</script>

<style lang="less" scoped>
.swiper-container {
  height: 56px;
  width: 402px;
  box-sizing: border-box;
  padding: 0 12px;

  .swiper-slide {
    display: flex;
    justify-content: center;
    width: 56px;
    height: 56px;

    img {
      width: 100%;
      height: 100%;
      border: 1px solid #ccc;
      padding: 2px;
      width: 50px;
      height: 50px;
      display: block;

      &.active {
        border: 2px solid #f60;
        padding: 1px;
      }

      &:hover {
        border: 2px solid #f60;
        padding: 1px;
      }
    }
  }

  .swiper-button-next {
    left: auto;
    right: 0;
  }

  .swiper-button-prev {
    left: 0;
    right: auto;
  }

  .swiper-button-next,
  .swiper-button-prev {
    box-sizing: border-box;
    width: 12px;
    height: 56px;
    background: rgb(235, 235, 235);
    border: 1px solid rgb(204, 204, 204);
    top: 0;
    margin-top: 0;
    &::after {
      font-size: 12px;
    }
  }
}
</style>