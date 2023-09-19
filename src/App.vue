<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer" app>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="text-h6">
            ToDoList
          </v-list-item-title>
          <v-list-item-subtitle>
            Vue Js
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

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

    <v-app-bar app>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title>Application</v-toolbar-title>
    </v-app-bar>

    <v-main>
      <RouterView />
    </v-main>
  </v-app>
</template>

<script>
import { RouterView } from 'vue-router';

export default {
    data: () => ({
        drawer: null,
        items: [
            { title: 'Tarefas', icon: 'mdi-view-dashboard', to: '/' },
            { title: 'Sobre', icon: 'mdi-image', to: '/sobre' },
        ],
        right: null,
    }),
    components: { RouterView }
}
</script>