
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
    <v-list flat subheader two-line class="pa-3">
      <v-list-item-group multiple active-class="">
        <div v-for="(tarefa, index) in $store.state.tarefas" :key="index">
          <Tarefa :tarefa="tarefa" />
        </div>
      </v-list-item-group>
    </v-list>
  </div>
</template>
<script>
import Tarefa from "@/components/Tarefas/tarefa.vue";
/* eslint-disable vue/multi-word-component-names */
export default {
  name: "Tarefas",

  components: {
    Tarefa,
  },

  data() {
    return {
      novaTarefa: { title: "", subtitle: "", concluded: false },
     
    };
  },

  methods: {
    handleAddTask() {
        this.$store.commit('addTask', this.novaTarefa)
        this.novaTarefa = { title: "", subtitle: "", concluded: false }
    },
  },

};
</script>