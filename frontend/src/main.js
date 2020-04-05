import Vue from 'vue'
import App from './App.vue'
import router from './router'

Vue.config.productionTip = false
Vue.prototype.$backUrl = "http://192.168.1.38:1991"

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
