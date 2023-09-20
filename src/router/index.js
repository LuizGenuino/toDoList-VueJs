import Vue from 'vue'
import VueRouter from 'vue-router'
import Tarefas from '../views/Tarefas.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Tarefas',
    component: Tarefas
  },
  {
    path: '/about',
    name: 'Sobre',
    component: () => import( '../views/Sobre.vue')
  } 
  
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router