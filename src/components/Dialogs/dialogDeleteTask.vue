<template>
  <div>
    <v-dialog v-model="dialog" persistent max-width="350">
      <v-card>
        <v-card-title class="text-h5"> Editar Tarefa </v-card-title>
        <v-divider></v-divider>
        <v-card-text class="mt-3">
          Tem certeza que deseja excluir está Tarefa? A ação não pode ser desfeitas!
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="error" text @click="$emit('closeDialogDelete')">
            Cancelar
          </v-btn>
          <v-btn color="primary" text @click="handleDeleteTask">
            Excluir
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import { TaskService } from '@/integrations/services';
export default {
  name: "DialogDeleteTask",
  props: {
    tarefa: Object // Assumindo que 'tarefa' é um objeto
  },
  data() {
    return {
      dialog: true,
    };
  },

  methods: {
    async handleDeleteTask(){
      try {
        this.$getLoadingGlobal().loading(true, "Excluindo Tarefa...");
        const taskService = new TaskService()
        taskService.setId(this.tarefa.id)
        await taskService.delete()
        this.$emit('getTask')
        this.$emit('closeDialogDelete')
        this.$getAlertaGlobal().exibirAlerta("success", 'Tarefa Excluida com Sucesso!');
      } catch (error) {
        this.$getLoadingGlobal().loading(false);
        this.$getAlertaGlobal().exibirAlerta(
          "error",
          `${error.message}`
        );
      } finally {
        this.$getLoadingGlobal().loading(false);
        this.$emit("closeDialogEdit");
      }
    }
  }
};
</script>