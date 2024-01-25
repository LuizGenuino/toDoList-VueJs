
<template>
  <v-row align="center" justify="center">
    <v-col cols="12" sm="8" md="4" class="m-400">
      <v-card class="elevation-12 pa-2">
        <v-card-title class="mb-4 d-flex justify-center align-center">
          <img src="@/assets/logo.png" alt="Logo" class="logo" />
        </v-card-title>
        <v-card-text>
          <v-form @submit.prevent="login">
            <v-text-field
              v-model="email"
              label="Email"
              required
              :error-messages="emailErrors"
              @input="validateEmail"
            ></v-text-field>
            <v-text-field
              v-model="password"
              label="Senha"
              :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
              :type="showPassword ? 'text' : 'password'"
              @click:append="showPassword = !showPassword"
              required
            ></v-text-field>
            <v-row class="justify-space-between pa-3">
              <v-btn type="submit" color="primary" class="mt-4"> Entrar </v-btn>
              <v-btn text color="primary" class="mt-4" @click="()=>this.$router.push('/criar-usuario')"> Criar Conta </v-btn>
            </v-row>
          </v-form>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import { AuthService } from "@/integrations/services";
export default {
  // eslint-disable-next-line
  name: "Login",
  data() {
    return {
      email: "",
      password: "",
      showPassword: false,
      emailErrors: [],
      loginError: false,
    };
  },
  methods: {
    validateEmail() {
      this.emailErrors = [];
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(this.email)) {
        this.emailErrors.push("Formato de e-mail inválido");
      }
    },
    async login() {
      if (this.email.length > 4 && this.password.length > 4) {
        try {
          this.$getLoadingGlobal().loading(true);
          const authService = new AuthService();
          const { data } = await authService.insert({
            email: this.email,
            password: this.password,
          });
          localStorage.setItem("ToDoList@token", data.token);
          localStorage.setItem("ToDoList@user", JSON.stringify(data.user));
          this.$router.push("/tarefas");
        } catch (err) {
          this.$getLoadingGlobal().loading(false);
          this.$getAlertaGlobal().exibirAlerta("error", err.message);
        }
      } else {
        this.$getAlertaGlobal().exibirAlerta(
          "error",
          "Preencha os Campos corretamente!"
        );
      }
    },
  },
};
</script>

<style scoped>
.logo {
  width: 150px;
}

.content {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
