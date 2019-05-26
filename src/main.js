import Vue from 'vue'
import App from './App'

// 引入request
import WXrequest from './utils/wx-request'
Vue.prototype.$httpWX = WXrequest
// 引入全局的vuex
import store from './store/index'
Vue.prototype.$store = store


Vue.config.productionTip = false
App.mpType = 'app'

const app = new Vue(App)
app.$mount()
