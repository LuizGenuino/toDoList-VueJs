<template>
  <div>
    <v-list-item
      :class="{ 'light-blue lighten-4': tarefa.concluded }"
      @click="handleEditTask(tarefa.id)"
    >
      <template v-slot:default="{}">
        <v-list-item-action>
          <v-checkbox :input-value="tarefa.concluded"></v-checkbox>
        </v-list-item-action>

        <v-list-item-content>
          <v-col cols="12" md="6" sm="8" xl="9">
            <v-list-item-title
              :class="{ 'text-decoration-line-through': tarefa.concluded }"
              >{{ tarefa.title }}</v-list-item-title
            >
            <v-list-item-subtitle>{{ tarefa.subtitle }}</v-list-item-subtitle>
          </v-col>
          <v-col cols="12" md="6" sm="4" xl="3">
            <v-row>
              <v-col cols="6" sm="12" md="6">
                <v-chip
                  :color="preference.color"
                  class="white--text text-caption"
                  >{{ preference.name }}</v-chip
                >
              </v-col>
              <v-col
                cols="6"
                sm="12"
                md="6"
                v-if="tarefa.categories.length > 0"
              >
                <v-row>
                  <div
                    v-for="(item, index) in tarefa.categories"
                    :key="index"
                    class="ma-1 text-center"
                  >
                    <v-icon color="primary">{{ item.icon }}</v-icon>
                    <p class="primary--text font-weight-black text-caption">
                      {{ item.name }}
                    </p>
                  </div>
                </v-row>
              </v-col>
            </v-row>
          </v-col>
        </v-list-item-content>
        <v-list-item-action>
          <TarefaMenu :tarefa="tarefa" @getTask="$emit('getTask')" />
        </v-list-item-action>
      </template>
    </v-list-item>
    <v-divider></v-divider>
  </div>
</template>

<script>
import { TaskService } from "@/integrations/services";
/* eslint-disable */
import TarefaMenu from "./tarefaMenu.vue";
export default {
  name: "Tarefa",

  components: {
    TarefaMenu,
  },
  props: {
    tarefa: Object, // Assumindo que 'tarefa' é um objeto
  },
  computed: {
    preference() {
      if (this.tarefa.preference === 1) {
        return { color: "error", name: "Urgente" };
      }
      if (this.tarefa.preference === 2) {
        return { color: "warning", name: "Importante" };
      } else {
        return { color: "info", name: "Normal" };
      }
    },
  },
  methods: {
    async handleEditTask(idTask) {
      try {
        const taskService = new TaskService();
        taskService.setId(idTask);
        await taskService.update({ concluded: !this.tarefa.concluded });
        this.$emit("getTask");
      } catch (error) {
        this.$getAlertaGlobal().exibirAlerta("error", `${error.message}`);
      }
    },
  },
};
</script>