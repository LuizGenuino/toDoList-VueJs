<template>
  <v-app id="inspire">
    <AlertaGlobal ref="alertaGlobal" />
    <RouterView />
  </v-app>
</template>

<script>
import AlertaGlobal from "@/components/AlertaGlobal/AlertaGlobal.vue";
import { setAlertaGlobal } from "@/config/globalConfig";

export default {
  components: {
    AlertaGlobal,
  },
  mounted() {
    // Configura o AlertaGlobal nas variáveis globais ao montar o componente
    setAlertaGlobal(this.$refs.alertaGlobal);
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
