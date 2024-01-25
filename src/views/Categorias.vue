
<template>
  <MainPage>
    <h1 class="text-center" >Categorias</h1>
    <v-row class="pa-6 ma-6">
      <v-col cols="12" sm="8">
        <v-text-field
          v-model="novaCategoria.name"
          label="Titulo da Tarefa"
          outlined
          clearable
        ></v-text-field>
      </v-col>
      <v-col cols="6" sm="2">
        <singleSelect :selectIcon="novaCategoria.icon" @addIcon="addIcon" />
      </v-col>
      <v-col cols="6" sm="2">
        <v-btn
          x-large
          width="100%"
          color="primary"
          @click="handleSelectFunction()"
        >
          Salvar
        </v-btn>
      </v-col>
    </v-row>
    <v-row class="pa-6 ma-6">
      <v-chip
        class="ma-2"
        color="primary"
        label
        text-color="white"
        v-for="category in listCategoryIcons"
        :key="category.id"
      >
        <v-icon left> {{ category.icon }} </v-icon>
        {{ category.name }}

        <v-menu offset-y>
          <template v-slot:activator="{ on, attrs }">
            <v-btn dark v-bind="attrs" v-on="on" icon>
              <v-icon right>mdi-dots-vertical</v-icon>
            </v-btn>
          </template>
          <v-list>
            <v-list-item
              v-for="(item, index) in items"
              :key="index"
              @click="handleMenu(index, category)"
            >
              <v-icon left :color="item.color">{{ item.icon }}</v-icon>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-chip>
    </v-row>

    <v-dialog v-model="items[1].dialog" persistent max-width="350">
      <v-card>
        <v-card-title class="text-h5"> Excluir Categoria </v-card-title>
        <v-divider></v-divider>
        <v-card-text class="mt-3">
          Tem certeza que deseja excluir está Categoria? A ação não pode ser
          desfeitas!
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="error" text @click="items[1].dialog = false">
            Cancelar
          </v-btn>
          <v-btn
            color="primary"
            text
            @click="handleDeleteCategory(categorySelected.id)"
          >
            Excluir
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </MainPage>
</template>
   <script>
import SingleSelect from "@/components/IconSelect/SingleSelect.vue";
import MainPage from "./Main.vue";
import { CategoryService } from "@/integrations/services";
/* eslint-disable vue/multi-word-component-names */
export default {
  name: "Categorias",

  components: {
    MainPage,
    SingleSelect,
  },

  data() {
    return {
      categorySelected: {},
      listCategory: [],
      novaCategoria: {
        name: "",
        icon: "",
      },
      items: [
        { icon: "mdi-pencil", color: "info", title: "Editar", dialog: false },
        {
          icon: "mdi-trash-can",
          color: "error",
          title: "Excluir",
          dialog: false,
        },
      ],
    };
  },

  computed: {
    listCategoryIcons() {
      return this.listCategory;
    },
  },

  methods: {
    addIcon(icon) {
      this.novaCategoria.icon = icon;
    },

    handleMenu(index, category) {
      this.items[index].dialog = true;
      this.categorySelected = category;
      if (index === 0) {
        this.novaCategoria = {
          name: category.name,
          icon: category.icon,
        };
      }
    },

    handleSelectFunction() {
      if (this.categorySelected.id) {
        this.handleUpdateCategory();
      } else {
        this.handleCreateCategory();
      }
    },

    async handleCreateCategory() {
      if (this.novaCategoria.icon === "" || this.novaCategoria.name === "") {
        this.$getAlertaGlobal().exibirAlerta(
          "error",
          "Preencha os dois Campos Corretamente!"
        );
        return;
      }
      try {
        this.$getLoadingGlobal().loading(true, "Criando Categoria...");
        const categoryService = new CategoryService();
        await categoryService.insert({ ...this.novaCategoria });
        this.$getAlertaGlobal().exibirAlerta(
          "success",
          `Categoria Criada com Sucesso!`
        );
        this.getCategories();
      } catch (error) {
        this.$getLoadingGlobal().loading(false);
        this.$getAlertaGlobal().exibirAlerta("error", `${error.message}`);
      } finally {
        this.$getLoadingGlobal().loading(false);
        this.categorySelected = {};
        this.novaCategoria = {
          name: "",
          icon: "",
        };
      }
    },

    async handleUpdateCategory() {
      if (this.novaCategoria.icon === "" || this.novaCategoria.name === "") {
        this.$getAlertaGlobal().exibirAlerta(
          "error",
          "Preencha os dois Campos Corretamente!"
        );
        return;
      }
      try {
        this.$getLoadingGlobal().loading(true, "Editando Categoria...");
        const categoryService = new CategoryService();
        await categoryService.setId(this.categorySelected.id);
        await categoryService.update({ ...this.novaCategoria });
        this.$getAlertaGlobal().exibirAlerta(
          "success",
          `Categoria Editada com Sucesso!`
        );
        this.getCategories();
      } catch (error) {
        this.$getLoadingGlobal().loading(false);
        this.$getAlertaGlobal().exibirAlerta("error", `${error.message}`);
      } finally {
        this.$getLoadingGlobal().loading(false);
        this.categorySelected = {};
        this.novaCategoria = {
          name: "",
          icon: "",
        };
      }
    },

    async getCategories() {
      try {
        const categoryService = new CategoryService();
        const response = await categoryService.list();
        this.listCategory = [];
        for (const item of response.data) {
          this.listCategory.push({
            id: item.id,
            name: item.name,
            icon: item.icon,
          });
        }
      } catch (error) {
        console.error(error.message);
        this.$getAlertaGlobal().exibirAlerta(
          "error",
          "Erro ao obter categorias"
        );
      }
    },

    async handleDeleteCategory(id) {
      try {
        this.$getLoadingGlobal().loading(true, "Excluindo Categoria...");
        const categoryService = new CategoryService();
        categoryService.setId(id);
        await categoryService.delete();
        this.$emit("getTask");
        this.$emit("closeDialogDelete");
        this.$getAlertaGlobal().exibirAlerta(
          "success",
          "Categoria Excluida com Sucesso!"
        );
        this.getCategories();
        this.items[1].dialog = false;
      } catch (error) {
        this.$getLoadingGlobal().loading(false);
        this.$getAlertaGlobal().exibirAlerta("error", `${error.message}`);
      } finally {
        this.$getLoadingGlobal().loading(false);
        this.$emit("closeDialogEdit");
        this.categorySelected = {};
        this.novaCategoria = {
          name: "",
          icon: "",
        };
      }
    },
  },
  created() {
    this.getCategories();
  },
};
</script>
