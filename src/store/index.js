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

    removeTask(state, idTask) {
      state.tarefas = state.tarefas.filter(tarefa => tarefa.id !== idTask)
    }
  },
  actions: {
  },
  modules: {
  }
})
