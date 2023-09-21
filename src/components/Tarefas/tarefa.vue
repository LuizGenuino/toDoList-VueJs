<template>
  <div>
    <v-list-item
      :class="{ 'light-blue lighten-4': tarefa.concluded }"
      @click="tarefa.concluded = !tarefa.concluded"
    >
      <template v-slot:default="{}">
        <v-list-item-action>
          <v-checkbox :input-value="tarefa.concluded"></v-checkbox>
        </v-list-item-action>

        <v-list-item-content>
          <v-list-item-title
            :class="{ 'text-decoration-line-through': tarefa.concluded }"
            >{{ tarefa.title }}</v-list-item-title
          >
          <v-list-item-subtitle>{{ tarefa.subtitle }}</v-list-item-subtitle>
        </v-list-item-content>
        <v-list-item-action>
        <TarefaMenu :tarefa="tarefa" />
        </v-list-item-action>
      </template>
    </v-list-item>
    <v-divider></v-divider>
  </div>
</template>

<script>
 /* eslint-disable */
 import TarefaMenu from './tarefaMenu.vue';
export default {
  name: "Tarefa",

  components: {
    TarefaMenu
  },
  props: {
    tarefa: Object // Assumindo que 'tarefa' é um objeto
  },
  methods: {
    
    handleRemoveTask(idTask){
        this.$store.commit('removeTask', idTask)
    }
  }
};
</script>