
<template>
  <div>
    
    <ListaTarefas />
    <div
    v-if="!$store.state.tarefas.length"
    class="mt-16 animate__animated animate__bounceInUp"
    >
      <center>
        <v-icon
        size="100"
        color="primary"
        >
          mdi-check
        </v-icon>
        <div
        class="text-h5 primary--text"
        >
          Nenhuma Tarefa
        </div>
      </center>
    </div>
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

  created(){
    this.$store.commit('searchTask')
  },

};
</script>