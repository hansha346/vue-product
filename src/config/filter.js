import Vue from 'vue';

import moment from 'moment';
// 过滤器，格式化日期
Vue.filter('fmtdate', (date, fmrStr) => {
    return moment(date).format(fmrStr);
})