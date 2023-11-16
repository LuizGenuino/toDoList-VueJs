
<template>
 <MainPage>
    
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
  </MainPage>
</template>
<script>
import ListaTarefas from '@/components/Tarefas/listaTarefas.vue';
import MainPage from './Main.vue'
/* eslint-disable vue/multi-word-component-names */
export default {
  name: "Tarefas",

  components: {
    ListaTarefas,
    MainPage
  },

  created(){
    this.$store.commit('searchTask')
  },

};
</script>