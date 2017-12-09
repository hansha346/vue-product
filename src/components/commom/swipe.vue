<template>
  <mt-swipe :auto="4000">
      <mt-swipe-item v-for="(item, index) in images" :key="index">
        <a :href="item.url">
          <img :src="item.img" alt="">
        </a>
      </mt-swipe-item>
    </mt-swipe>
</template>

<script>
//已经全局引用，不需要以下代码
//  import Vue from 'vue';
// // 引入mint-ui中的组件   按需引用
// import { Swipe, SwipeItem } from 'mint-ui';
// // 引用mint-ui的样式
// import 'mint-ui/lib/style.css';
// Vue.component(Swipe.name, Swipe);
// Vue.component(SwipeItem.name, SwipeItem);

export default {
  data(){
      return{
        images: []
      }
  },
  created () {
    this.getlunbo();
  },
  props:['imgUrl'],
  methods: {
      // 获取轮播图数据
      getlunbo() {
        this.$http
          .get('getlunbo')
          .then((response) => {
            if (response.status === 200 && response.data.status === 0) {
              this.images = response.data.message;
                // console.log(this.images);
              
            } else {
              console.log('请求服务器出错');
            }
          })
          .catch((err) => {
            console.error(err);
          })
      }
  }
}
</script>

<style scoped>
/* 轮播图 */
.mint-swipe{
  height: 250px;
}
.mint-swipe img{
  width: 100%;
  height: 100%;
}
</style>
