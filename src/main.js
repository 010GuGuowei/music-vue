import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/index.js'
import VueLazyLoad from 'vue-lazyload'
// import axios from 'axios'
// Vue.use(axios)

// 懒加载
Vue.use(VueLazyLoad,{
  loading:require('./common/image/default.png')   // 懒加载的图片地址
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(App),
  router,
  store
})
