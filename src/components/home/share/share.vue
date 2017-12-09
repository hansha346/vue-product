<template>
  <div class="mui-content">
    <div class="title">
      <ul :style="ulWidth">
          <li>
              <a @click.prevent="getimages(-1)" href="javascript:;">全部</a>
          </li>
          <li v-for="item in catesarr" :key="item.id">
              <a @click.prevent="getimages(item.id)" href="#">{{item.title}}</a>
          </li>          
      </ul>
    </div>

    <div class="images">
      <ul>
          <li v-for="item in imagearr" :key="item.id">
              <router-link :to="{name:'shareDetail',params:{id:item.id}}" href="javascript:;">
                  <img :src="item.img_url" alt="">
                  <p class="cover">
                      <span>{{item.title}}</span><br>
                      {{item.zhaiyao}}
                  </p>
              </router-link>
          </li>
          
      </ul>
    </div>
    </div>
</template>

<script>
export default {
  data() {
    return {
        imagearr:[],
        catesarr:[],
        ulWidth:'width:1000px'
    }
  },
  created () {
      this.getcates();
      this.getimages(-1);
  },
  methods: {
      //获取分类数据
      getcates(){
          this.$http
            .get('getimgcategory')
            .then((res)=>{
                if(res.status == 200 && res.data.status == 0){
                    this.catesarr = res.data.message;
                    this.ulWidth = 'width:'+(this.catesarr.length * 78 + 50)+'px';
                }else{
                    console.log('请求服务器失败');
                }
            })
            .catch((err)=>{
                console.log(err);
            })
      },
      //获取图片数据
      getimages(id){
        this.$http
            .get('getimages/'+id)
            .then((res)=>{
                if(res.status == 200 && res.data.status == 0){
                    this.imagearr = res.data.message;
                }else{
                    console.log('请求服务器失败');
                }
            })
            .catch((err)=>{
                console.log(err);
            })
      }
  }
}
</script>

<style scoped>
  ul {
      margin: 0;
      padding: 0;
      list-style-type: none;
  }
  
  .title {
      overflow-x: auto;
      overflow-y: hidden;
  }
  
  .title>ul {
      width: 1000px;
  }
  /* webkit核心的浏览器 隐藏滚动条 */
  ::-webkit-scrollbar{
    display:none;
  }
  
  .title>ul>li {
      display: inline-block;
      padding: 20px 5px;
  }
  
  .images {
      margin-top: 10px;
  }
  
  .images>ul {}
  
  .images img {
      height: 300px;
      width: 100%;
  }
  
  .images>ul>li {
      position: relative;
  }
  
  .images .cover>span {
      font-weight: bold;
  }
  
  .images .cover {
      color: #fff;
      position: absolute;
      left: 0px;
      bottom: 0px;
      background-color: rgba(92, 92, 92, 0.4);
      width: 100%;
      margin-bottom: 5px;
  }
</style>


