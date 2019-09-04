import Vue from 'vue'
import App from './App'
import router from './router'
import store from "./store";
Vue.config.productionTip = false
import VueLazyload from 'vue-lazyload'
import loading from "./commom/imgs/loading.gif";
import { Button } from 'mint-ui'
import './mock/mockServer'//加载mockServer
import './filters'//加载过滤器
//注册全局组件在main.js
Vue.component(Button.name, Button)
// or with options
Vue.use(VueLazyload, {
  preLoad: 1.3,
  error: 'dist/error.png',
  loading,
  attempt: 1
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App),
  store
})
