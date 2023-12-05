<template>
  <div>
    <v-dialog v-model="dialog" persistent max-width="350">
      <v-card>
        <v-card-title class="text-h5"> Editar Tarefa </v-card-title>
        <v-row class="pa-2">
          <v-col cols="12" sm="12">
            <v-text-field
              v-model="editarTarefa.title"
              label="Titulo da Tarefa"
              outlined
              clearable
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="12">
            <v-textarea
              v-model="editarTarefa.subtitle"
              label="Subtitulo da Tarefa"
              outlined
            ></v-textarea>
          </v-col>
          <v-col cols="12" md="12" sm="12">
            <v-select
              v-model="editarTarefa.preference"
              :items="preference"
              label="Prioridade"
              outlined
              hide-details
              dense
            >
            </v-select>
          </v-col>
          <v-col cols="12" md="12" sm="12">
            <MultipleSelect
              :itensExist="editarTarefa.categories"
              @addCategories="addCategories"
            />
          </v-col>
        </v-row>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="error" text @click="$emit('closeDialogEdit')">
            Cancelar
          </v-btn>
          <v-btn color="primary" text @click="handleEditTask()"> Editar </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import { TaskService } from "@/integrations/services";
import MultipleSelect from "../MultipleSelect/MultipleSelect.vue";
export default {
  components: { MultipleSelect },
  name: "DialogEditTask",
  props: {
    tarefa: Object, // Assumindo que 'tarefa' é um objeto
  },
  data() {
    return {
      dialog: true,
      editarTarefa: {},
      preference: ["Urgente", "Importante", "Normal"],
    };
  },
  created() {
    this.listPreference();
  },

  methods: {
    listPreference() {
      const preference = { 1: "Urgente", 2: "Importante", 3: "Normal" };
      this.editarTarefa = {
        ...this.tarefa,
        preference: preference[this.tarefa.preference],
      };
    },

    addCategories(categrieList) {
      const categories = [];
      categrieList.forEach((element) => {
        categories.push(element.id);
      });
      this.editarTarefa = { ...this.editarTarefa, categories: categories };
    },

    async handleEditTask() {
      try {
        this.$getLoadingGlobal().loading(true, "Alterando Tarefa...");

        const preference = { Urgente: 1, Importante: 2, Normal: 3 };
        this.editarTarefa.preference = preference[this.editarTarefa.preference];

        const taskService = new TaskService();
        taskService.setId(this.editarTarefa.id);
        await taskService.update({
          preference: this.editarTarefa.preference,
          title: this.editarTarefa.title,
          subtitle: this.editarTarefa.subtitle,
          categories: this.editarTarefa.categories,
        });

        this.$emit("getTask");
        this.$getAlertaGlobal().exibirAlerta(
          "success",
          "Tarefa Editada com Sucesso!"
        );
      } catch (error) {
        this.$getLoadingGlobal().loading(false);
        this.$getAlertaGlobal().exibirAlerta("error", `${error.message}`);
      } finally {
        this.listPreference();
        this.$getLoadingGlobal().loading(false);
        this.$emit("closeDialogEdit");
      }
    },
  },
};
</script>