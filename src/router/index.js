import Vue from 'vue';
import VueRouter from 'vue-router';
import goods from '@/components/goods/goods';
import ratings from '@/components/ratings/ratings';
import seller from '@/components/seller/seller';

Vue.use(VueRouter);


let routes = [
  {
    path: '/', redirect: '/goods'
  },
  {
    path: '/goods', component: goods,
  },
  {
    path: '/ratings', component: ratings,
  },
  {
    path: '/seller', component: seller,
  },
];

export default new VueRouter({
  routes,
  linkActiveClass: 'active', // 将激活的路由添加一个自定义名称
});
