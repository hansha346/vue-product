<template>
  <div class="mui-content">
    <!-- 轮播图 -->
    <swipe></swipe>
    <!-- 九宫格 -->
    <ul class="mui-table-view mui-grid-view mui-grid-9">
      <li v-for="item in menus" :key="item.url" class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <router-link :to="item.url">
          <span class="mui-icon" :class="item.className"></span>
          <div class="mui-media-body">{{item.title}}</div>
        </router-link>
      </li>
    </ul> 
  </div>
</template>

<script>
    import swipe from '../commom/swipe.vue'

    export default{
        data() {
          return {
            menus: []
          };
        },
        created() {
          this.getmenus();
        },
        methods: {  
          // 获取9宫格数据
          getmenus() {
            this.$http
              .get('getmenus')
              .then((response) => {
                if (response.status === 200 && response.data.status === 0) {
                  this.menus = response.data.message;
                } else {
                  console.log('服务器内部错误');
                }
              })
              .catch((err) => {
                console.error(err);
              })
          }
        },
        components:{
          swipe
          }
    }
</script>

<style scoped>


/* 九宫格 */
  .mui-table-view{
    background-color: #fff;
  }
  
  .icon-news{
    background:url(../../../statics/images/menu1.png);
  }
  .icon-share{
    background:url(../../../statics/images/menu2.png);    
  }
  .icon-buy{
    background:url(../../../statics/images/menu3.png);    
  }
  .icon-feedback{
    background:url(../../../statics/images/menu4.png);    
  }
  .icon-video{
    background:url(../../../statics/images/menu5.png);    
  }
  .icon-contact{
    background:url(../../../statics/images/menu6.png);    
  }
  .mui-icon{
    background-size: 50px 50px;
    width: 50px;
    height: 50px;
  }
</style>


