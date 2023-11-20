<template>
  <div>
    <v-menu offset-y>
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          color="primary"
          dark
          v-bind="attrs"
          v-on="on"
          icon
        >
          <v-icon dark>mdi-dots-vertical</v-icon>
        </v-btn>
      </template>
      <v-list>
        <v-list-item v-for="(item, index) in items" :key="index" @click="toggleDialog(index)">
            <v-icon left :color="item.color">{{ item.icon }}</v-icon>
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
    <DialogEditTask v-if="items[0].dialog" @closeDialogEdit="toggleDialog(0)" :tarefa="tarefa"  @getTask="$emit('getTask')"/>
    <DialogDeleteTask  v-if="items[1].dialog" @closeDialogDelete="toggleDialog(1)" :tarefa="tarefa"   @getTask="$emit('getTask')"/>
  </div>
</template>
<script>
import DialogDeleteTask from '../Dialogs/dialogDeleteTask.vue';
import DialogEditTask from '../Dialogs/dialogEditTask.vue';
export default {
  components: { DialogEditTask, DialogDeleteTask },
  props: {
    tarefa: Object // Assumindo que 'tarefa' é um objeto
  },
  name: "TarefaMenu",
  data() {
    return {
      items: [
        { icon:'mdi-pencil', color:'info',  title: "Editar", dialog: false },
        { icon:'mdi-trash-can', color:'error',  title: "Excluir", dialog: false },
      ],
    };
  },
  methods: {
    toggleDialog(index) {
      if(index !== 0 || this.tarefa.concluded !== true){
        this.items[index].dialog = !this.items[index].dialog;
      }
    }
  }
};
</script>
