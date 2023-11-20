
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
import { TaskService } from '@/integrations/services';
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
      return [...this.tasks]
    }
  },

  methods: {
  
    async getTask(){
      try {
        this.$getLoadingGlobal().loading(true, "Caregando Tarefas...");
        const taskService = new TaskService()
        const response = await taskService.list()
        this.tasks = response.data
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