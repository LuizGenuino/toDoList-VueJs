<template>
  <v-container fluid style="height: 300px;  pointer-events: none;">
    <v-row justify="center" class="elemento">
      <v-menu bottom min-width="200px" rounded offset-y>
        <template v-slot:activator="{ on }">
          <v-btn icon x-large v-on="on">
            <v-avatar color="brown" size="48">
              <span class="white--text text-h5">{{ user.initials }}</span>
            </v-avatar>
          </v-btn>
        </template>
        <v-card>
          <v-list-item-content class="justify-center">
            <div class="mx-auto text-center">
              <v-avatar color="brown">
                <span class="white--text text-h5">{{ user.initials }}</span>
              </v-avatar>
              <h3>{{ user.fullName }}</h3>
              <p class="text-caption mt-1">
                {{ user.email }}
              </p>
              <v-divider class="my-3"></v-divider>
              <v-btn depressed rounded text @click="() => this.$router.push('/perfil')"> Editar Conta </v-btn>
              <v-divider class="my-3"></v-divider>
              <v-btn depressed rounded text @click="logout"> Sair </v-btn>
            </div>
          </v-list-item-content>
        </v-card>
      </v-menu>
    </v-row>
  </v-container>
</template>

<script>
export default {
     // eslint-disable-next-line
  name: "Avatar",
  data: () => ({
    user: {
      initials: "",
      fullName: "",
      email: "",
    },
  }),
  methods:{
    logout(){
        localStorage.removeItem("ToDoList@token")
        localStorage.removeItem("ToDoList@user")
        this.$router.push("/login");
    },

    initialsName(fullName){
      const name = fullName.split(" ")
      if(name.length < 3){
        return name[0].split("")[0].toUpperCase() + name[1].split("")[0].toUpperCase()
      }
      if(name[1].length < 3){
       return name[0].split("")[0].toUpperCase() + name[2].split("")[0].toUpperCase()
      }
      return name[0].split("")[0].toUpperCase() + name[1 ].split("")[0].toUpperCase()
    },
  },
   
  created(){
    const dataUser =  JSON.parse(localStorage.getItem("ToDoList@user"))
    this.user = {
      initials:  this.initialsName(dataUser.name),
      fullName: dataUser.name,
      email: dataUser.email,
    }
  },
};
</script>
<style scoped>
.elemento {
  pointer-events: painted;
}

</style>