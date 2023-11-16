// AlertaGlobalPlugin.js

import Vue from 'vue';
import AlertaGlobal from '@/components/AlertaGlobal/AlertaGlobal.vue';

let instanciaAlertaGlobal;

function criarInstanciaAlertaGlobal() {
  const AlertaGlobalConstructor = Vue.extend(AlertaGlobal);
  return new AlertaGlobalConstructor().$mount();
}

function getInstanciaAlertaGlobal() {
  if (!instanciaAlertaGlobal) {
    instanciaAlertaGlobal = criarInstanciaAlertaGlobal();
    document.body.appendChild(instanciaAlertaGlobal.$el);
  }
  return instanciaAlertaGlobal;
}

function mostrarAlerta(tipo, mensagem) {
  const alertaGlobal = getInstanciaAlertaGlobal();
  alertaGlobal.exibirAlerta(tipo, mensagem);
}

const AlertaGlobalPlugin = {
  install() {
    Vue.prototype.$alertaGlobal = mostrarAlerta;
  },
};

export default AlertaGlobalPlugin;
