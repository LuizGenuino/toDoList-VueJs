<template>
  <div>
    <v-row class="pa-4">
      <v-col cols="12" sm="4">
        <v-text-field
          v-model="novaTarefa.title"
          label="Titulo da Tarefa"
          outlined
          clearable
        ></v-text-field>
      </v-col>
      <v-col cols="12" sm="6">
        <v-text-field
          v-model="novaTarefa.subtitle"
          label="Subtitulo da Tarefa"
          outlined
          clearable
        ></v-text-field>
      </v-col>
      <v-col cols="12" sm="2">
        <v-btn x-large depressed color="primary" @click="handleAddTask">
          Enviar
        </v-btn>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
    name: "InputTask",
    data() {
    return {
      novaTarefa: { title: "", subtitle: "", concluded: false },
    };
  },
  
  methods: {
    handleAddTask() {
        this.$store.dispatch('addNewTask', this.novaTarefa)
        this.novaTarefa = { title: "", subtitle: "", concluded: false }
    },

  },
};
</script>

<style>
</style>