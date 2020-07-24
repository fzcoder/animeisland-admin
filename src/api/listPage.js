import Vue from 'vue'
import axios from 'axios'
// 配置请求的根路径
axios.defaults.baseURL = 'http://127.0.0.1:8090/api'
Vue.prototype.$http = axios