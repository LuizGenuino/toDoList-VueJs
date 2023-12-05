<template>
  <v-menu v-model="menu" :close-on-content-click="false" offset-y>
    <template v-slot:activator="{ on }">
      <v-text-field
        :value="selectedItemsText"
        label="Selecione"
        readonly
        color="primary"
        class="primary--text"
        v-on="on"
      ></v-text-field>
    </template>

    <v-row class="white m-400">
      <v-col
        v-for="item in options"
        :key="item.id"
        cols="6"
        md="4"
        @click="toggleItem(item)"
        :class="{ 'light-blue lighten-4': selectedItems.includes(item) }"
      >
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title class="text-center">
              <v-icon class="text-center" color="primary">{{
                item.icon
              }}</v-icon>
            </v-list-item-title>
            <v-list-item-title class="text-center primary--text">{{
              item.name
            }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-col>
    </v-row>
  </v-menu>
</template>
  
  <script>
import { CategoryService } from "@/integrations/services";

export default {
  name: "MultipleSelect",
  props: {
    itensExist: {
      type: Array,
      required: false,
      default: () => [],
    }
  },
  data() {
    return {
      menu: false,
      options: [],
      selectedItems: [],
    };
  },
  computed: {
    selectedItemsText() {
      return this.selectedItems.map((item) => item.name).join(", ");
    },
  },
  methods: {
    toggleItem(item) {
      const index = this.selectedItems.findIndex(
        (selectedItem) => selectedItem.id === item.id
      );
      if (index === -1) {
        this.selectedItems.push(item);
      } else {
        this.selectedItems.splice(index, 1);
      }
      this.$emit("addCategories", this.selectedItems)
    },

    async getCategories() {
      try {
        const categoryService = new CategoryService();
        const response = await categoryService.list();
        for (const item of response.data) {
          this.options.push({ id: item.id, name: item.name, icon: item.icon });
        }
      } catch (error) {
        console.error(error.message);
        this.$getAlertaGlobal().exibirAlerta(
          "error",
          "Erro ao obter categorias"
        );
      }
    },
  },
  created() {
    this.getCategories();
    if (this.itensExist.length > 0) {
      this.selectedItems = [...this.itensExist];
      this.$emit("addCategories", this.selectedItems)
    }
  },
};
</script>
  
  <style scoped>
/* Adicione estilos personalizados conforme necessário */
</style>
  