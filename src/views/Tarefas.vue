
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
    <ListaTarefas />

  </div>
</template>
<script>
 /* eslint-disable */
import ListaTarefas from '@/components/Tarefas/listaTarefas.vue';
/* eslint-disable vue/multi-word-component-names */
export default {
  name: "Tarefas",

  components: {
    ListaTarefas,
  },

  data() {
    return {
      novaTarefa: { title: "", subtitle: "", concluded: false },
    };
  },

  created(){
    this.$store.commit('searchTask')
  },

  methods: {
    handleAddTask() {
        this.$store.dispatch('addNewTask', this.novaTarefa)
        this.novaTarefa = { title: "", subtitle: "", concluded: false }
    },

  },

};
</script>