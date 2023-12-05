
<template>
 <MainPage>
    
    <ListaTarefas v-if="taskList.length > 0"  :tasks="taskList" @getTask="getTask()"/>
    <div
    v-else
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

  data() {
    return{

      tasks: []
    }
  },

  computed:{
    taskList(){
      return [...this.$store.state.tarefas]
    }
  },

  methods: {
  
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

  created(){
    this.getTask()
  },

};
</script>