<template>
  <div>
    <v-dialog v-model="dialog" persistent max-width="350">
      <v-card>
        <v-card-title class="text-h5"> Criar Tarefa </v-card-title>
        <v-row class="pa-2">
          <v-col cols="12" sm="12">
            <v-text-field
              v-model="novaTarefa.title"
              label="Titulo da Tarefa"
              outlined
              clearable
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="12">
            <v-textarea
              v-model="novaTarefa.subtitle"
              label="Subtitulo da Tarefa"
              outlined
            ></v-textarea>
          </v-col>
          <v-col cols="12" md="12" sm="12">
            <v-select
              v-model="novaTarefa.preference"
              :items="preference"
              label="Prioridade"
              outlined
              hide-details
              dense
            >
            </v-select>
          </v-col>
          <v-col cols="12" md="12" sm="12">
            <MultipleSelect @addCategories="addCategories" />
          </v-col>
        </v-row>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="error" text @click="$emit('closeDialogCreate')">
            Cancelar
          </v-btn>
          <v-btn color="primary" text @click="handleCreateTask()">
            Salvar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import { TaskService } from "@/integrations/services";
import MultipleSelect from "../IconSelect/MultipleSelect.vue";
export default {
  components: { MultipleSelect },
  name: "DialogCreateTask",
  data() {
    return {
      dialog: true,
      novaTarefa: {
        title: "",
        subtitle: "",
        preference: 3,
        categories: [],
      },
      preference: ["Urgente", "Importante", "Normal"],
    };
  },

  created() {
    this.listPreference();
  },

  methods: {
    listPreference() {
      const preference = { 1: "Urgente", 2: "Importante", 3: "Normal" };
      this.novaTarefa = {
        ...this.novaTarefa,
        preference: preference[this.novaTarefa.preference],
      };
    },

    addCategories(categrieList) {
      const categories = [];
      categrieList.forEach((element) => {
        categories.push(element.id);
      });
      this.novaTarefa = { ...this.novaTarefa, categories: categories };
    },

    async handleCreateTask() {
      try {
        this.$getLoadingGlobal().loading(true, "Criando Tarefa...");
        if(this.novaTarefa.title ==="" || this.novaTarefa.title ===" " || this.novaTarefa.categories.length <= 0 || !this.novaTarefa.preference ){
          this.$getAlertaGlobal().exibirAlerta("error", "Deve conter Titulo, Prioridade e Categoria!");
          return
        }
        const preference = { Urgente: 1, Importante: 2, Normal: 3 };
        this.novaTarefa.preference = preference[this.novaTarefa.preference];

        const taskService = new TaskService();
        await taskService.insert(this.novaTarefa);

        this.getTask();
        this.$getAlertaGlobal().exibirAlerta(
          "success",
          "Tarefa Criada com Sucesso!"
        );
        this.$emit("closeDialogCreate");
      } catch (error) {
        this.$getLoadingGlobal().loading(false);
        this.$getAlertaGlobal().exibirAlerta("error", `${error.message}`);
      } finally {
        this.$getLoadingGlobal().loading(false);
        this.listPreference();
      }
    },

    async getTask(){
      try {
        this.$getLoadingGlobal().loading(true, "Caregando Tarefas...");
        await this.$store.dispatch('getTask');
      } catch (error) {
        this.$getAlertaGlobal().exibirAlerta("error", error.message);
      }finally{
        this.$getLoadingGlobal().loading(false);
      }
    }
  },
};
</script>