<template>
  <div class="mui-content">
        <div class="title">
            <h4>{{imageInfo.title}}</h4>
            <span>{{imageInfo.add_time | fmtdate('YYYY-MM-DD')}}</span> &nbsp;&nbsp;&nbsp;&nbsp; <span>点击次数{{imageInfo.click}}</span>
        </div>

        <ul class="mui-table-view mui-grid-view mui-grid-9">
            <li v-for="(item,index) in thumimages" :key="index" class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
                   <img :src="item.src" alt="">
                   </a></li>
        </ul> 

        <p class="content" v-html="imageInfo.content">
          
        </p>

        <!-- 评论--> 
        <comment :id="id"></comment>
    </div>
</template>

<script>
import comment from '../../commom/comment.vue';
export default {
    data(){
        return{
            thumimages:[],
            imageInfo:{}
        }
    },
    props:['id'],
    created(){
        this.getthumimages();
        this.getimageInfo();
    },
    methods: {
        //请求缩略图
        getthumimages(){
            this.$http
                .get('getthumimages/'+this.id)
                .then((res)=>{
                    if(res.status == 200 && res.data.status == 0){
                        this.thumimages = res.data.message;
                    }else{
                        console.log('请求服务器失败');
                    }
                })
                .catch((err)=>{
                    console.log(err);
                })
        },
        //请求详情信息
        getimageInfo(){
            this.axios
                .get('getimageInfo/'+this.id)
                .then((res)=>{
                    if(res.status == 200 && res.data.status == 0){
                        this.imageInfo = res.data.message[0];
                    }else{
                        console.log('请求服务器失败');
                    }
                })
                .catch((err)=>{
                    console.log(err);
                })
        }
    },
    components:{
        comment
    }
}
</script>

<style scoped>
.mui-content {
    background-color: #fff;
  }
  .title {
        margin: 15px 5px;
    }
    
    .title h4 {
        color: dodgerblue;
    }
    
    .title span {
        font-size: 13px;
        color: rgba(92, 92, 92, 0.6);
    }
    /*9宫格样式*/
    
    .mui-grid-view.mui-grid-9 {
        background-color: #fff;
        border-left: 0px;
    }
    
    .mui-table-view-cell img {
        height: 100px;
    }
    
    .mui-grid-view.mui-grid-9 .mui-table-view-cell {
        border-right: 0px;
        border-bottom: 0px;
        padding: 0;
        margin: 0;
    }
    
    .mui-grid-view.mui-grid-9 .mui-table-view-cell>a:not(.mui-btn) {
        padding: 0;
    }
</style>
