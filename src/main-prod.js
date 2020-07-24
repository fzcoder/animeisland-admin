import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
// 导入全局样式表
import '../src/assets/css/global.css'
// 导入element-ui 及其样式
import './plugins/element.js'
import 'element-ui/lib/theme-chalk/index.css'

// 配置请求的根路径
axios.defaults.baseURL = 'http://192.168.1.106:8090/api'
Vue.prototype.$http = axios

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
