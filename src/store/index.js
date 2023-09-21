import Vue from 'vue'
import Vuex from 'vuex'
import Localbase from 'localbase'

let db = new Localbase('db')

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    tarefas: [],
  },


  getters: {
  },


  mutations: {
    searchTask(state){
      db.collection('tasks').get().then(tasks => {
        state.tarefas = tasks
      })
    },

    addTask(state, novaTarefa) {
      if (novaTarefa.title !== "" || novaTarefa.title !== " ") {
        const tarefa = { ...novaTarefa, id: state.tarefas.length + 1 };
        db.collection('tasks').add({
          ...tarefa
        })
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
    async addNewTask({commit}, task){
      await commit('addTask', task)
      await commit('searchTask')
    }
  },
  modules: {
  }
})
