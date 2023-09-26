import db from "@/services/localbase"

export default {
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