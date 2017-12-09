import Vue from 'vue';

import VueRouter from 'vue-router';

// Vue使用插件
Vue.use(VueRouter);


// 1 引用组件
import home from '../components/home/home.vue';
import VIP from '../components/VIP/VIP.vue';
import shopcar from '../components/shopcar/shopcar.vue';
import search from '../components/search/search.vue';


import news from '../components/home/news/news.vue';
import share from '../components/home/share/share.vue';
import buy from '../components/home/buy/buy.vue';
import feedback from '../components/home/feedback/feedback.vue';
import video from '../components/home/video/video.vue';
import contact from '../components/home/contact/contact.vue';


//新闻详情页
import newsDetail from '../components/home/news/detail.vue';
import shareDetail from '../components/home/share/detail.vue';

//2.创建路由对象
let router = new VueRouter({
    linkActiveClass: 'mui-active',
    routes: [
        { path: '/', redirect: '/home' },
        { path: '/home', component: home },
        { path: '/VIP', component: VIP },
        { path: '/shopcar', component: shopcar },
        { path: '/search', component: search },


        { path: '/news', component: news },
        { path: '/share', component: share },
        { path: '/buy', component: buy },
        { path: '/feedback', component: feedback },
        { path: '/video', component: video },
        { path: '/contact', component: contact },


        { name: "newsDetail", path: '/news/:id', component: newsDetail, props: true },
        { name: "shareDetail", path: '/share/:id', component: shareDetail, props: true }
    ]
})

export default router;