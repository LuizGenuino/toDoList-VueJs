<template>
  <v-app id="inspire">
    <AlertaGlobal ref="alertaGlobal" />
    <loadingGlobal ref="loadingGlobal" />
    <RouterView />
  </v-app>
</template>

<script>
import AlertaGlobal from "@/components/AlertaGlobal/AlertaGlobal.vue";
import { setAlertaGlobal } from "@/config/globalConfig";
import { setLoadingGlobal } from "@/config/globalConfig";
import LoadingGlobal from './components/LoadingGlobal/LoadingGlobal.vue';

export default {
  components: {
    AlertaGlobal,
    LoadingGlobal,
  },
  mounted() {
    // Configura o AlertaGlobal nas variáveis globais ao montar o componente
    setAlertaGlobal(this.$refs.alertaGlobal);
    setLoadingGlobal(this.$refs.loadingGlobal)
  },
};
</script>
<style >
.m-200{
  max-width: 200px!important;
 }

 .m-400{
  max-width: 400px!important;
 }

 .m-600{
  max-width: 600px!important;
 }

 .m-800{
  max-width: 800px!important;
 }

 .m-1000{
  max-width: 1000px!important;
 }

 .m-1200{
  max-width: 1200px!important;
 }
</style>
