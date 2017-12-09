<template>
    <div class="mui-content">
        <div class="title">
            <h3>{{content.title}}</h3>
            <span>{{content.add_time | fmtdate('YYYY-MM-DD')}}&emsp;&emsp;{{content.click}}次浏览</span>
        </div>
        <!-- 通过v-html插入到文档中的内容，不会应用style scoped中的样式 -->
        <div class="details" v-html="content.content">
           
        </div>
        <comment :id="id"></comment>
    </div>
</template>

<script>
import '../../../../statics/css/style.css'
import comment from '../../commom/comment.vue'
export default{
    data(){
        return{
            content:{}
        }
    },
    props:['id'],
    created(){
        this.getContent();
    },
    methods: {
        //获取详情内容
        getContent(){
            this.$http
                .get('getnew/'+this.id)
                .then((res)=>{
                    if(res.status == 200 && res.data.status == 0){
                        if (res.data.message.length > 0) {
                            this.content = res.data.message[0]
                        }
                    }else{
                        console.log('服务器请求失败');
                    }
                })
                .catch((err)=>{
                    console.log(err);
                })
        }
    },
    components: {
        comment
    }
}

</script>

<style scoped>
   .mui-content {
    background-color: #fff;
  }
  .title {
    padding: 10px 5px;
    border-bottom: 1px solid rgba(92, 92, 92, 0.1);
  }
  .title h3 {
    font-size: 16px;
    font-weight: bold;
    color: #0094ff;
  }
  .title span {
    color: rgba(92, 92, 92, 0.7);
    font-size: 12px;
  }
  .details {
    padding: 5px 5px;
    overflow: hidden;;
  }

  
</style>