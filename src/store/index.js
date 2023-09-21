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
    searchTask(state) {
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

  },
  actions: {
    async addNewTask({ commit }, task) {
      await commit('addTask', task)
      await commit('searchTask')
    },

    async editTask({ commit }, newTask) {
      if (newTask.title !== "" || newTask.title !== " ") {
        db.collection('tasks').doc({ id: newTask.id }).update({
          ...newTask
        }).then(() => {
          commit('searchTask')
        })
      }
    },

    async deleteTask({ commit }, idTask) {
      db.collection('tasks').doc({ id: idTask }).delete().then(() => {
        commit('searchTask')
      })
    },
  },
  modules: {
  }
})
