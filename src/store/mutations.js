import db from "@/services/localbase"
import { TaskService } from "@/integrations/services";

export default {

    async getTask(state) {
        try {
            const taskService = new TaskService()
            const response = await taskService.list()
            state.tarefas = response.data
        } catch (error) {
            console.error(error);
        }
    },

    searchTask(state) {
        db.collection('tasks').get().then(tasks => {
            state.tarefas = tasks
        })
    },

    addTask(state, novaTarefa) {
        if (novaTarefa.title !== "" && novaTarefa.title !== " " && novaTarefa.title) {
            const tarefa = { ...novaTarefa, id: state.tarefas.length + 1 };
            db.collection('tasks').add({
                ...tarefa
            })
        }
    },
}