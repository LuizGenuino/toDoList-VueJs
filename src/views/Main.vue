<template>
    <div>
      <v-navigation-drawer v-model="drawer" app>
        <v-img
          src="https://picsum.photos/1920/1080?random"
          gradient="to top right, rgba(19,84,122,.5), rgba(128,208,199,.8)"
          dark
          class="pa-5 text-center"
          height="170"
        >
        <v-avatar
          size="80"
        >
          <img src="@/assets/logo.png" alt="Logo">
        </v-avatar>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title class="text-h6"> ToDoList </v-list-item-title>
              <v-list-item-subtitle> Vue Js </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-img>
  
        <v-divider></v-divider>
  
        <v-list dense nav>
          <v-list-item v-for="item in items" :key="item.title" link :to="item.to">
            <v-list-item-icon>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>
  
            <v-list-item-content>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>
  
      <v-app-bar
        app
        prominent
        height="170"
        color="#fcb69f"
        dark
        src="https://picsum.photos/1920/1080?random"
      >
        <template v-slot:img="{ props }">
          <v-img
            v-bind="props"
            gradient="to top right, rgba(19,84,122,.5), rgba(128,208,199,.8)"
          ></v-img>
        </template>
  
        <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
        <center>
          <v-app-bar-title class="mt-10" >
            <InputTask/>
          </v-app-bar-title>
        </center>
      </v-app-bar>
      <v-main>
        <slot></slot>
      </v-main>
    </div>
  </template>
  
  <script>
  import InputTask from '../components/InputTask/inputTask.vue';
  
  export default {
    name: "MainPage",
    data: () => ({
      drawer: true,
      items: [
        { title: "Tarefas", icon: "mdi-view-dashboard", to: "/tarefas" },
        { title: "Categorias", icon: "mdi-shape-plus", to: "/categorias" },
        { title: "Sobre", icon: "mdi-image", to: "/sobre" },
      ],
      right: null,
    }),
    components: { InputTask },
  };
  </script>