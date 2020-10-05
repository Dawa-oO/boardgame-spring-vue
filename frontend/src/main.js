import Vue from 'vue'
import App from './App.vue'
import router from './router'

Vue.config.productionTip = false
/* $backUrl = livebox admin > Informations system > Internet > Adresse IPv4 WAN */
Vue.prototype.$backUrl = "http://86.216.32.227:1991"

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
