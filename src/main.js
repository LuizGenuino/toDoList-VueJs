import Vue from 'vue';
import App from './App.vue';
import vuetify from './plugins/vuetify';
import './registerServiceWorker';
import router from './router';
import store from './store';
import AlertaGlobalPlugin from './plugins/AlertaGlobalPlugin.js';
import { setAlertaGlobal } from '@/config/globalConfig';


Vue.config.productionTip = false;

// Use o plugin do AlertaGlobal
Vue.use(AlertaGlobalPlugin);



new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
  mounted() {
// Configura o AlertaGlobal no arquivo de configuração global
  setAlertaGlobal(this.$getAlertaGlobal());
  },
}).$mount('#app');


