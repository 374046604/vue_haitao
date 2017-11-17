// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './vuex'
import VueLazyload from 'vue-lazyload'

Vue.use(VueLazyload)

// or with options
Vue.use(VueLazyload, {
  preLoad: 1.3,
  try: 2,
  loading: './assets/logo.png',
  error: './m-images/error.jpg',
  attempt: 2
})

Vue.config.productionTip = false

//历史记录 是否是无痕模式
let oldType = true;
if (oldType) {
  //创建一个
  var nullObj = [];
  window.localStorage.setItem('lishi', JSON.stringify(nullObj));
} else {
  window.localStorage='';
}


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: {
    App
  },
  mounted() {
    //初始化进来 获取当前是否登陆
    //是否是微信
    //购物车数量
    this.$store.commit('checkUser');
    this.$store.commit('isWeixn');
    this.$store.commit('carCount');
  }
})
