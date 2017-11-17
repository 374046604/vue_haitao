import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router)

export default new Router({
  routes: [

    {
      path: '/index',
      name: 'Index',
      component: resolve => require(['../pages/Home.vue'], resolve)
    },
    {
      path: '/home',
      name: 'Home',
      component: resolve => require(['../pages/Home.vue'], resolve)
    },
    {
      path: '/',
      component: resolve => require(['../pages/Home.vue'], resolve)
    },
    {
        path: '/search',
        name: 'Search',
        component: resolve => require(['../pages/Search.vue'], resolve)
    },
    {
        path: '/goodsResult',
        name: 'goodsResult',
        component: resolve => require(['../pages/goodsResult.vue'], resolve)
    },
    {
        path: '/class',
        name: 'class',
        component: resolve => require(['../pages/class.vue'], resolve)
    },
    // {
    //     path: '/my',
    //     name: 'my',
    //     component: resolve => require(['../pages/my.vue'], resolve)
    // },
    // {
    //     path: '/login',
    //     name: 'login',
    //     component: resolve => require(['../pages/login.vue'], resolve)
    // },
    // {
    //     path: '/goodsDetails',
    //     name: 'goodsDetails',
    //     component: resolve => require(['../pages/goodsDetails.vue'], resolve)
    // },
    {
        path: '/shopCar',
        name: 'shopCar',
        component: resolve => require(['../pages/Shopcar.vue'], resolve)
    },
    // {
    //     path: '/surePay',
    //     name: 'surePay',
    //     component: resolve => require(['../pages/surePay.vue'], resolve)
    // },
    {
        path: '/hot',
        name: 'hot',
        component: resolve => require(['../pages/Hot.vue'], resolve)
    },
    // {
    //     path: '/address',
    //     name: 'address',
    //     component: resolve => require(['../pages/address.vue'], resolve)
    // },
    // {
    //     path: '/addAddress',
    //     name: 'addAddress',
    //     component: resolve => require(['../pages/addAddress.vue'], resolve)
    // },
    // {
    //     path: '/order',
    //     name: 'order',
    //     component: resolve => require(['../pages/order.vue'], resolve)
    // },
    // {
    //     path: '/orderDetails',
    //     name: 'orderDetails',
    //     component: resolve => require(['../pages/orderDetails.vue'], resolve)
    // },
    // {
    //     path: '/register',
    //     name: 'register',
    //     component: resolve => require(['../pages/register.vue'], resolve)
    // }
  ],

  scrollBehavior(to, from, savedPosition) {
    return {
      x: 0,
      y: 0
    }
  }
});
