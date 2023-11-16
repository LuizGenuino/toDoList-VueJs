<template>
  <v-container class="fill-height">
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="4">
        <v-card class="elevation-12">
          <v-card-title>
            <img src="@/assets/logo.png" alt="Logo" class="logo" />
            Login
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
              <v-btn type="submit" color="primary"> Entrar </v-btn>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { AuthService } from '@/integrations/services';
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
      try {
        const authService = new AuthService()
        const {data} = await authService.insert({email: this.email, password:this.password})
        console.log(data);
        localStorage.setItem("ToDoList@token", data.token)
        localStorage.setItem("ToDoList@user", JSON.stringify(data.user))
        this.$router.push('/tarefas')
      } catch (err) {
        console.error(err)
        this.$alertaGlobal('error', err.message);
      }
    },
  },
};
</script>

<style scoped>
.logo {
  width: 40px;
  margin-right: 8px;
}
</style>
