
<template>
  <MainPage>
    <h1 class="text-center">Meu Perfil</h1>
    <div class="px-4 py-10">
      <v-form @submit.prevent="updateUser" class="m-800 ma-auto">
        <v-row class="pa-2">
          <v-col cols="12" sm="6">
            <v-text-field
              v-model="editaUsuario.name"
              label="Nome"
              required
              :error-messages="nameErrors"
              @input="validateName"
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="6">
            <v-text-field
              v-model="editaUsuario.cellphone"
              label="N° de Celular"
              placeholder="+00 (00) 0 0000-0000"
              v-mask="'+## (##) # ####-####'"
              :error-messages="cellphoneErrors"
              @input="validateCellphone"
              required
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="12">
            <v-text-field
              v-model="editaUsuario.email"
              label="Email"
              required
              :error-messages="emailErrors"
              @input="validateEmail"
            ></v-text-field>
          </v-col>
          <!-- <v-col cols="12" sm="6">
            <v-text-field
              v-model="editaUsuario.password"
              label="Senha"
              :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
              :type="showPassword ? 'text' : 'password'"
              @click:append="showPassword = !showPassword"
              :error-messages="passwordErrors"
              @input="validatePassword"
              required
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="6">
            <v-text-field
              v-model="repeatPassword"
              label="Confirme a Novamente"
              :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
              :type="showPassword ? 'text' : 'password'"
              @click:append="showPassword = !showPassword"
              :error-messages="confirmPasswordErrors"
              @input="validateConfirmPassword"
              required
            ></v-text-field>
          </v-col> -->
          <v-col cols="12" sm="6">
            <v-text-field
              v-model="editaUsuario.birthday"
              label="Data de Nascimento"
              placeholder="DD/MM/YYYY"
              v-mask="'##/##/####'"
              :error-messages="birthdayErrors"
              @input="validateBirthDate"
              required
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="6">
            <v-text-field
              v-model="editaUsuario.cpf"
              label="CPF"
              placeholder="000.000.000-00"
              v-mask="'###.###.###-##'"
              :error-messages="cpfErrors"
              @input="validateCPF"
              required
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row class="justify-center pa-3">
          <v-btn type="submit" color="primary" class="mt-4">
            Atualizar Dados
          </v-btn>
        </v-row>
      </v-form>
    </div>
  </MainPage>
</template>
   <script>
import { UserService } from "@/integrations/services";
import MainPage from "./Main.vue";
/* eslint-disable vue/multi-word-component-names */
export default {
  name: "Perfil",

  components: {
    MainPage,
  },

  data() {
    return {
      userID: "",
      editaUsuario: {
        name: "",
        email: "",
        cellphone: "",
        cpf: "",
        birthday: "",
        password: "",
      },
      repeatPassword: "",
      showPassword: false,
      nameErrors: [],
      emailErrors: [],
      cellphoneErrors: [],
      cpfErrors: [],
      birthdayErrors: [],
      passwordErrors: [],
      confirmPasswordErrors: [],
      createUserError: false,
      formValid: false,
    };
  },

  methods: {
    validateName() {
      this.nameErrors = [];
      if (this.editaUsuario.name.length < 3) {
        this.nameErrors.push("Nome é Obrigatorio");
        this.formValid = false;
      }
    },
    validateEmail() {
      this.emailErrors = [];
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(this.editaUsuario.email)) {
        this.emailErrors.push("Formato de e-mail inválido");
        this.formValid = false;
      }
    },
    validatePassword() {
      if (this.editaUsuario.password.length < 6) {
        this.passwordErrors.push("Senha deve ter pelo menos 6 caracteres");
        this.formValid = false;
        return;
      } else {
        this.passwordErrors = [];
        this.formValid = true;
        return;
      }
    },
    validateConfirmPassword() {
      if (
        this.editaUsuario.password !== this.repeatPassword ||
        this.repeatPassword.length < 1 ||
        this.editaUsuario.password.length < 1
      ) {
        this.confirmPasswordErrors.push("As senhas devem ser iguais!");
        this.formValid = false;
        return;
      } else {
        this.confirmPasswordErrors = [];
        this.formValid = true;
        return;
      }
    },
    validateCPF() {
      this.cpfErrors = [];
      const strCPF = this.editaUsuario.cpf.replace(/[^\d]+/g, "");
      let sum = 0;
      let remainder;

      if (strCPF === "00000000000" || strCPF.length !== 11) {
        this.cpfErrors.push("CPF inválido.");
        this.formValid = false;
        return;
      }

      for (let i = 1; i <= 9; i++)
        sum += parseInt(strCPF.substring(i - 1, i)) * (11 - i);
      remainder = (sum * 10) % 11;

      if (remainder === 10 || remainder === 11) remainder = 0;
      if (remainder !== parseInt(strCPF.substring(9, 10))) {
        this.cpfErrors.push("CPF inválido.");
        this.formValid = false;
        return;
      }

      sum = 0;
      for (let i = 1; i <= 10; i++)
        sum += parseInt(strCPF.substring(i - 1, i)) * (12 - i);
      remainder = (sum * 10) % 11;

      if (remainder === 10 || remainder === 11) remainder = 0;
      if (remainder !== parseInt(strCPF.substring(10, 11))) {
        this.cpfErrors.push("CPF inválido.");
        this.formValid = false;
        return;
      }
    },

    validateCellphone() {
      this.cellphoneErrors = [];
      const cellphone = this.editaUsuario.cellphone.replace(/[^\d]+/g, "");

      if (cellphone.length !== 13) {
        this.cellphoneErrors.push("Número de celular inválido.");
        this.formValid = false;
      }
    },

    validateBirthDate() {
      this.birthdayErrors = [];
      const birthDate = this.editaUsuario.birthday;
      const dateRegex = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/(\d{4})$/;

      if (!dateRegex.test(birthDate)) {
        this.birthdayErrors.push("Data de nascimento inválida.");
        this.formValid = false;
      }
      if (birthDate.length === 10) {
        if (
          new Date(this.converterDataBRparaUS(birthDate)).getTime() >
          new Date().getTime()
        ) {
          this.birthdayErrors.push("Data de nascimento inválida.");
          this.formValid = false;
        }
      }
    },

    async updateUser() {
      this.formValid = true;
      this.validateName();
      this.validateEmail();
      this.validateCPF();
      this.validateCellphone();
      this.validateBirthDate();
      if (!this.formValid) {
        this.$getAlertaGlobal().exibirAlerta(
          "error",
          "Verifique os erros no formulário."
        );
        return;
      }
      // Sua lógica para criar o usuário
      try {
        this.$getLoadingGlobal().loading(true);
        const userService = new UserService();
        userService.setId(this.userID);
        const data = {
          ...this.editaUsuario,
          cellphone: this.editaUsuario.cellphone.match(/\d+/g).join(""),
          cpf: this.editaUsuario.cpf.match(/\d+/g).join(""),
          birthday: this.converterDataBRparaUS(this.editaUsuario.birthday),
        };
        const response = await userService.update(data);
        localStorage.setItem("ToDoList@user", JSON.stringify(response.data));

        this.$getAlertaGlobal().exibirAlerta(
          "success",
          "Dados Atualizados com Sucesso!"
        );
      } catch (err) {
        // Tratamento de erro
        this.$getLoadingGlobal().loading(false);
        this.$getAlertaGlobal().exibirAlerta("error", err.message);
      } finally {
        this.$getLoadingGlobal().loading(false);
        this.getDataLocalStorage();
      }
    },

    converterDataBRparaUS(dataBR) {
      // Divide a data em três partes: dia, mês e ano
      const partes = dataBR.split("/");

      // Verifica se a data está no formato correto
      if (partes.length !== 3) {
        return;
      }

      // Reorganiza as partes da data no formato americano
      const dataUS = `${partes[2]}-${partes[1]}-${partes[0]}`;

      return dataUS;
    },

    converterDataUSparaBR(dataUS) {
      // Divide a data em três partes: dia, mês e ano
      let partes = dataUS.split("T");
      partes = partes[0].split("-");

      // Verifica se a data está no formato correto
      if (partes.length !== 3) {
        return;
      }

      // Reorganiza as partes da data no formato americano
      const dataBR = `${partes[2]}/${partes[1]}/${partes[0]}`;

      return dataBR;
    },

    getDataLocalStorage() {
      const data = JSON.parse(localStorage.getItem("ToDoList@user"));
      this.userID = data.id;
      this.editaUsuario = {
        name: data.name,
        email: data.email,
        cellphone: data.cellphone,
        cpf: data.cpf,
        birthday: this.converterDataUSparaBR(data.birthday),
      };
    },
  },

  mounted() {
    this.getDataLocalStorage();
  },
};
</script>