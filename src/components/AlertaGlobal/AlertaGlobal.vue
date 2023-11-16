<template>
  <v-snackbar
    :color="alertColor"
    :timeout="timeout"
    :value="alertVisible"
    top
    right
    multi-line
  >
    {{ mensagem }}
    <v-btn @click="fecharAlerta" text> Fechar </v-btn>
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
      timeout: 10000, // Tempo em milissegundos (10 segundos)
    };
  },
  methods: {
    exibirAlerta(tipo, mensagem) {
      this.alertVisible = true;
      this.mensagem = mensagem;

      switch (tipo) {
        case "erro":
          this.alertColor = "error";
          break;
        case "sucesso":
          this.alertColor = "success";
          break;
        case "aviso":
          this.alertColor = "warning";
          break;
        default:
          this.alertColor = "info";
      }

      setTimeout(() => {
        this.fecharAlerta();
      }, this.timeout);
    },

    error(mensagem) {
      this.alertVisible = true;

      this.mensagem = mensagem;

      this.alertColor = "error";

      setTimeout(() => {
        this.fecharAlerta();
      }, this.timeout);
    },

    success(mensagem) {
      this.alertVisible = true;

      this.mensagem = mensagem;

      this.alertColor = "success";

      setTimeout(() => {
        this.fecharAlerta();
      }, this.timeout);
    },

    warning(mensagem) {
      this.alertVisible = true;

      this.mensagem = mensagem;

      this.alertColor = "warning";

      setTimeout(() => {
        this.fecharAlerta();
      }, this.timeout);
    },

    info(mensagem) {
      this.alertVisible = true;

      this.mensagem = mensagem;

      this.alertColor = "info";

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
