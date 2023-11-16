import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import AlertaGlobalPlugin from './plugins/AlertaGlobalPlugin.js';

Vue.config.productionTip = false

Vue.use(AlertaGlobalPlugin);

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
