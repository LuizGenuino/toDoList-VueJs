import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    tarefas: [
      {
        id: 1,
        title: "Ir ao Mercado",
        subtitle:
          "Preciso comprar mais macarrão com queijo, presunto e refrigerante",
        concluded: false,
      },
    ],
  },
  getters: {
  },
  mutations: {
    addTask(state, novaTarefa) {
      if (novaTarefa.title !== "" || novaTarefa.title !== " ") {
        const tarefa = { ...novaTarefa, id: state.tarefas.length + 1 };
        state.tarefas.push(tarefa);
      }
    },

    deleteTask(state, idTask) {
      state.tarefas = state.tarefas.filter(tarefa => tarefa.id !== idTask)
    },

    editTask(state, newTask){
      if (newTask.title !== "" || newTask.title !== " ") {
        let newArray = [...state.tarefas]
        const tarefaIndex = newArray.findIndex(tarefa => tarefa.id === newTask.id);
        if (tarefaIndex !== -1) {
          // Toggle do estado da tarefa
          console.log(tarefaIndex);
          newArray[tarefaIndex] = newTask;
          state.tarefas = newArray
        }
      }
    }
  },
  actions: {
  },
  modules: {
  }
})
