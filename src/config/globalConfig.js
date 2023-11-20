// globalConfig.js

import Vue from 'vue';

const globalConfig = {
  alertaGlobal: null,
  loadingGlobal: null
};

export const setAlertaGlobal = (alertaGlobal) => {
  globalConfig.alertaGlobal = alertaGlobal;
};

export const getAlertaGlobal  = () => globalConfig.alertaGlobal;

export const setLoadingGlobal = (loadingGlobal) => {
  globalConfig.loadingGlobal = loadingGlobal;
};

export const getLoadingGlobal = () => globalConfig.loadingGlobal;

Vue.prototype.$setAlertaGlobal = setAlertaGlobal;
Vue.prototype.$getAlertaGlobal = getAlertaGlobal;

Vue.prototype.$setLoadingGlobal = setLoadingGlobal;
Vue.prototype.$getLoadingGlobal = getLoadingGlobal;