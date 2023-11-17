// globalConfig.js

import Vue from 'vue';

const globalConfig = {
  alertaGlobal: null,
};

export const setAlertaGlobal = (alertaGlobal) => {
  globalConfig.alertaGlobal = alertaGlobal;
};

export const getAlertaGlobal = () => globalConfig.alertaGlobal;

Vue.prototype.$setAlertaGlobal = setAlertaGlobal;
Vue.prototype.$getAlertaGlobal = getAlertaGlobal;
