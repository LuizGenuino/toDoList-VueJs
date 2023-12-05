import db from "@/services/localbase"

export default {
    async getTask({ commit }) {
        await commit('getTask')
    },

    async addNewTask({ commit }, task) {
        await commit('addTask', task)
        await commit('searchTask')
    },

    async editTask({ commit }, newTask) {
        if (newTask.title !== "" && newTask.title !== " " && newTask.title) {
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
}