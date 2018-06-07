import Vue from 'vue';
import App from './App';
import router from '@/router';
// 这里引入的是router目录，会默认识别里面的index.js文件
import '@/common/stylus/index.styl';

import VueResource from 'vue-resource';
Vue.use(VueResource);

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App),
  // 这里的render: h => h(App)是es6的写法   
  // 转换过来就是：暂且可理解为是渲染App组件
  // render:(function(h){
  //     return h(App);
  // });
  
  // components: { App },
  // template: '<App/>'
  // 不换为render: h => h(App)会空白 why？
});


