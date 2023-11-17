
<template>
 <MainPage>
    
    <ListaTarefas v-if="taskList.length > 0"  :tasks="taskList"/>
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
      taskList: []
    }
  },
  methods: {
  
    async getTask(){
      try {
        const taskService = new TaskService()
        const response = await taskService.list()
        console.log(response);
        this.taskList = response.data
      } catch (error) {
        console.log(error);
        this.$getAlertaGlobal().exibirAlerta("error", error.message);
      }
    }

  },

  created(){
    this.getTask()
  },

};
</script>