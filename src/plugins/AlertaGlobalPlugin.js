// AlertaGlobalPlugin.js

import Vue from 'vue';
import AlertaGlobal from '@/components/AlertaGlobal/AlertaGlobal.vue'
import { setAlertaGlobal } from '@/config/globalConfig.js';

let instanciaAlertaGlobal;

function criarInstanciaAlertaGlobal() {
  const AlertaGlobalConstructor = Vue.extend(AlertaGlobal);
  return new AlertaGlobalConstructor().$mount();
}

function getInstanciaAlertaGlobal() {
  if (!instanciaAlertaGlobal) {
    instanciaAlertaGlobal = criarInstanciaAlertaGlobal();
    document.body.appendChild(instanciaAlertaGlobal.$el);
    setAlertaGlobal(instanciaAlertaGlobal);
  }
  return instanciaAlertaGlobal;
}

function mostrarAlerta(tipo, mensagem) {
  const alertaGlobal = getInstanciaAlertaGlobal();
  alertaGlobal.exibirAlerta(tipo, mensagem);
}

const AlertaGlobalPlugin = {
  install(Vue) {
    // Registra o componente globalmente
    Vue.component('AlertaGlobal', AlertaGlobal);

    // Adiciona o método $alertaGlobal ao protótipo do Vue
    Vue.prototype.$alertaGlobal = mostrarAlerta;
  },
};

export default AlertaGlobalPlugin;
