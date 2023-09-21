<template>
  <div>
    <v-dialog v-model="dialog" persistent max-width="350">
      <v-card>
        <v-card-title class="text-h5"> Editar Tarefa </v-card-title>
        <v-row class="pa-2" >
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
        </v-row>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="error" text @click="$emit('closeDialogEdit')">
            Cancelar
          </v-btn>
          <v-btn color="primary" text @click="handleEditTask">
            Editar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
export default {
  name: "DialogEditTask",
  props: {
    tarefa: Object // Assumindo que 'tarefa' é um objeto
  },
  data() {
    return {
      dialog: true,
      editarTarefa: {}
    };
  },
  created(){
    this.editarTarefa = {...this.tarefa}
  },
  methods: {
    handleEditTask(){
      this.$store.commit('editTask', this.editarTarefa)
      this.$emit('closeDialogEdit')
    }
  }
};
</script>