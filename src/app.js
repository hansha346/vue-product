//引入VUE模块
import Vue from 'vue';


//加载组件模块
import app from './app.vue';

//加载过滤器
import './config/filter.js';

// 加载外部插件  （axios，mint-ui, mui（css））
import './config/plugins.js';

//加载路由模块
import router from './config/router.js';


//3.挂载路由到实例上
let vm = new Vue({
    el: '#app',
    router,
    //render渲染  调用时可以传一个createElement方法帮我们处理组建模块
    // render: function(createElement) {
    //     return createElement(app)
    // }
    render: c => c(app),
    created() {
        // 从文档中复制拦截器的应用过来
        this.axios.interceptors.request.use((config) => {
            this.$indicator.open('正在加载...')
            return config;
        }, (error) => {
            this.$indicator.close()
            return Promise.reject(error);
        });

        // Add a response interceptor
        this.axios.interceptors.response.use((response) => {
            this.$indicator.close()
            return response;
        }, (error) => {
            // Do something with response error
            this.$indicator.close()
            return Promise.reject(error);
        });
    }
})