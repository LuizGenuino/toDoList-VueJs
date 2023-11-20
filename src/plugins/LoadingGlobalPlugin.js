// LoadingGlobalPlugin.js

import Vue from 'vue';
import LoadingGlobal from '@/components/LoadingGlobal/LoadingGlobal.vue'
import { setLoadingGlobal } from '@/config/globalConfig.js';

let instanciaLoadingGlobal;

function criarInstanciaLoadingGlobal() {
  const LoadingGlobalConstructor = Vue.extend(LoadingGlobal);
  return new LoadingGlobalConstructor().$mount();
}

function getInstanciaLoadingGlobal() {
  if (!instanciaLoadingGlobal) {
    instanciaLoadingGlobal = criarInstanciaLoadingGlobal();
    document.body.appendChild(instanciaLoadingGlobal.$el);
    setLoadingGlobal(instanciaLoadingGlobal);
  }
  return instanciaLoadingGlobal;
}

function mostrarLoading(value, messagem) {
  const loadingGlobal = getInstanciaLoadingGlobal();
  loadingGlobal.loading(value, messagem);
}

const LoadingGlobalPlugin = {
  install(Vue) {
    // Registra o componente globalmente
    Vue.component('LoadingGlobal', LoadingGlobal);

    // Adiciona o método $loadingGlobal ao protótipo do Vue
    Vue.prototype.$loadingGlobal = mostrarLoading;
  },
};

export default LoadingGlobalPlugin;
