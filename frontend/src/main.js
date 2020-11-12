import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify';
import axios from 'axios';
import VueAxios from 'vue-axios';

Vue.use(VueAxios, axios);
Vue.config.productionTip = false
/* $backUrl = livebox admin > Informations system > Internet > Adresse IPv4 WAN */
// Vue.prototype.$backUrl = "http://86.216.32.227:1991"
Vue.prototype.$backUrl = "http://localhost:1991"

new Vue({
  vuetify,
  router,
  render: h => h(App)
}).$mount('#app')
