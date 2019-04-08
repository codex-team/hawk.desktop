import Vue from 'vue'
import axios from 'axios'
import App from '../../hawk.garage/src/App.vue'
import router from '../../hawk.garage/src/router'
import store from '../../hawk.garage/src/store'

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.http = Vue.prototype.$http = axios
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
