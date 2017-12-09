import Vue from 'vue';


//引用axios
import axios from 'axios';
//整一个全局的共有的默认前缀，智能拼接
axios.defaults.baseURL = 'http://127.0.0.1:8899/api/';
// axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';

// 让所有的vue的实例都共享axios
Vue.prototype.$http = axios;
Vue.prototype.axios = axios;


//全局引入mint-ui
import Mint from 'mint-ui';
Vue.use(Mint);
import 'mint-ui/lib/style.css';


//全局引入mui的css
import '../../statics/css/mui.css';