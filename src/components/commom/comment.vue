<template>
  <!--  评论 -->
        <div class="comment">
            <!--添加评论-->
            <h4>提交评论</h4>

            <div class="submitcomment">
                <textarea placeholder="请输入评论内容" v-model='subcontents'></textarea>
                <button class="mui-btn mui-btn-primary" @click='sendmessage'>发表</button>
            </div>
                
            <div class="title">
                <h4>评论列表</h4>
            </div>    
            
            <!--评论列表-->
            
            <div v-for="(item, index) in comments" :key="index" class="item">
                <div class="content">
                {{item.content}}
                </div>
                <div>
                <span class="user">
                    {{item.user_name}}
                </span>  
                <span>
                    {{item.add_time | fmtdate('YYYY-MM-DD HH:mm:ss')}}
                </span>
                </div>
            </div>

            <div class="more">
                <button @click="getmoremessage" class="mui-btn mui-btn-primary mui-btn-outlined">加载更多</button>
            </div>

            </div>
</template>

<script>
export default {
  data(){
      return{
        comments:[],
        subcontents:"",
        messagelist:[],
        pageindex:1
      }
  },
  created () {
    this.getcomments();
  },
  props:['id'],
  methods: {
      //获取留言列表
        getcomments(){
            this.$http
                .get('getcomments/'+this.id+'?pageindex='+this.pageindex)
                .then((res)=>{
                    if(res.status == 200 && res.data.status == 0){
                        //需要修改：增加到原来的数组
                        //concat 方法，将两个数组合并为一个新的
                        this.comments = this.comments.concat(res.data.message);
                    }else{
                        console.log('服务器请求失败');
                    }
                })
                .catch((err)=>{
                    console.log(err);
                })
        },
        //发送留言数据
        sendmessage(){
            let url = 'postcomment/'+this.id;
            this.$http
                .post(url,'content='+this.subcontents)
                .then((res)=>{
                    if(res.status == 200 && res.data.status == 0){
                        //需要修改：直接添加到页面上,避免刷新了
                        this.$toast(res.data.message)
                        
                        this.comments.unshift({
                            add_time: new Date(),
                            content: this.subcontents,
                            user_name: '匿名用户'
                        });
                        this.subcontents = '';
                    }else{
                        console.log('服务器请求失败');
                    }
                })
                .catch((err)=>{
                    console.log(err);
                })
        },
        //加载更多
        getmoremessage(){
            //思路：存一个数组，点击以后pageindex++，把以前的存在数组里
            this.pageindex++;
            this.getcomments();
        }
        
  }
}
</script>

<style scoped>
/*  评论的样式 */
    .submitcomment {
        text-align: center;
    }
    
    .submitcomment textarea {
        margin-top: 10px;
        padding: 0;
        width: 96%;
        height: 60px;
    }
    
    .submitcomment button {
        width: 96%;
    }
    
    .comment .title {
        border-top: 1px solid rgba(92, 92, 92, 0.4);
        border-bottom: 1px solid rgba(92, 92, 92, 0.4);
        margin: 20px 0 0 0;
        vertical-align: middle;
        padding: 10px 0;
    }
    
    .item {
        padding: 15px 10px;
        border-bottom: 1px solid rgba(92, 92, 92, 0.4);
    }
    
    .item div {
        padding: 5px 0;
        display: flex;
        justify-content: space-between;
    }
    
    .item span {
        font-size: 15px;
    }
    
    .item .user {
        color: skyblue;
    }
    
    .more {
        margin: 10px 0;
        text-align: center;
    }
    
    .more>button {
        width: 96%;
    }
</style>

