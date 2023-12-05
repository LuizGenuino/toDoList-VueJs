<template>
  <div class="pt-10">
    <v-btn color="primary" @click="toggleDialog()" >
      <v-icon>mdi-plus</v-icon>
      Nova Tarefa
    </v-btn>
   <dialogCreateTask v-if="show" @closeDialogCreate="toggleDialog()" />
  </div>
</template>

<script>
import dialogCreateTask from '../Dialogs/dialogCreateTask.vue';
export default {
  components: { dialogCreateTask },
  name: "InputTask",
  data() {
    return {
      show: false
    };
  },

  methods: {
    toggleDialog() {
      this.show = !this.show
    },
  },
};
</script>

<style>
</style>