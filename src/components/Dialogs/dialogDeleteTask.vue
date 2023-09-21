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
  created(){
    this.editarTarefa = {...this.tarefa}
  },
  methods: {
    handleDeleteTask(){
      this.$store.commit('deleteTask', this.tarefa.id)
      this.$emit('closeDialogDelete')
    }
  }
};
</script>