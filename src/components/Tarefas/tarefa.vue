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
          <v-btn icon  x-large
          @click.stop=""
          >
            <v-icon color="info">mdi-pencil-circle</v-icon>
          </v-btn>
          
        </v-list-item-action>
        <v-list-item-action>
          <v-btn icon x-large
          @click.stop="handleRemoveTask(tarefa.id)"
          >
            <v-icon color="error">mdi-delete-circle</v-icon>
          </v-btn>
          
        </v-list-item-action>
      </template>
    </v-list-item>
    <v-divider></v-divider>
  </div>
</template>

<script>
/* eslint-disable vue/multi-word-component-names */
export default {
  name: "Tarefa",

  props: ["tarefa"],

  methods: {
    
    handleRemoveTask(idTask){
        this.$store.commit('removeTask', idTask)
    }
  }
};
</script>