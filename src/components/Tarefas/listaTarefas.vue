<template>
  <div>
    <drop-list :items="Tasks" @reorder="$event.apply(Tasks)" class="px-2 py-4">
      <template v-slot:item="{ item, reorder }">
        <drag :key="item.id" :data="item">
            <Tarefa
              style="background-color: white"
              :style="
                reorder
                  ? { borderLeft: '2px solid #1976D2', marginLeft: '-2px' }
                  : {}
              "
              :tarefa="item"
            />
          <v-divider />
        </drag>
      </template>
    </drop-list>
  </div>
</template>

<script>
import { Drag, DropList } from "vue-easy-dnd";
import Tarefa from "./tarefa.vue";
export default {
  name: "ListaTarefas",

  components: {
    Drag,
    DropList,
    Tarefa,
  },
  data: function () {
    return {};
  },

  computed: {
    Tasks() {
      return this.$store.state.tarefas;
    },
  },
};
</script>

<style>
</style>