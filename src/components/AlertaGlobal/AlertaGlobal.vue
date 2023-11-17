<template>
  <v-snackbar :color="alertColor" :timeout="timeout" :value="alertVisible" top right multi-line >
    <div class="d-flex justify-space-between align-center">
      {{ mensagem }}
      <v-btn
        fab
        x-small
        @click="fecharAlerta"
        :color="alertColor"
      >
        <v-icon>
          mdi-close
        </v-icon>
      </v-btn>
    </div>
  </v-snackbar>
</template>

<script>
export default {
  name: "AlertaGlobal",
  data() {
    return {
      alertVisible: false,
      alertColor: "",
      mensagem: "",
      timeout: 6000, // Tempo em milissegundos (10 segundos)
    };
  },
  methods: {
    exibirAlerta(tipo, mensagem) {
      this.alertVisible = true;
      this.mensagem = mensagem;

      switch (tipo) {
        case "error":
          this.alertColor = "error";
          break;
        case "success":
          this.alertColor = "success";
          break;
        case "warning":
          this.alertColor = "warning";
          break;
          case "info":
          this.alertColor = "info";
          break;
        default:
          this.alertColor = "info";
      }

      setTimeout(() => {
        this.fecharAlerta();
      }, this.timeout);
    },

    fecharAlerta() {
      this.alertVisible = false;

    },
  },
};
</script>

<style scoped>
/* Adicione estilos personalizados conforme necessário */
</style>
