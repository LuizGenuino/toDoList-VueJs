import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
  {
    path: "*",
    redirect: "/login",
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue'),
    beforeEnter: (to, from, next) => {
      // Chama a função para limpar os dados do localStorage
      loginPersistence();
      next();
    },
  },
  {
    path: '/trocar-senha',
    name: 'ForgotPassword',
    component: () => import('../views/ForgotPassword.vue')
  },
  {
    path: '/tarefas',
    name: 'Tarefas',
    component: () => import('../views/Tarefas.vue'),
    meta: { requiresAuth: true } // Adiciona meta informando que essa rota requer autenticação
  },
  {
    path: '/categorias',
    name: 'Categorias',
    component: () => import('../views/Categorias.vue'),
    meta: { requiresAuth: true } // Adiciona meta informando que essa rota requer autenticação
  },
  {
    path: '/sobre',
    name: 'Sobre',
    component: () => import('../views/Sobre.vue'),
    meta: { requiresAuth: true } // Adiciona meta informando que essa rota requer autenticação
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

// Adicione uma navegação de guarda para verificar o token antes de acessar rotas protegidas
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('ToDoList@token');

  if (to.matched.some(record => record.meta.requiresAuth)) {
    // Esta rota requer autenticação
    if (!token ) {
      // Se não houver token, redirecione para a página de login
      localStorage.removeItem('ToDoList@token');
      localStorage.removeItem('ToDoList@user');
      next({ path: '/login' });
    } else {
      // Se houver token, permita o acesso à rota
      next();
    }
  } else {
    // Se a rota não requer autenticação, permita o acesso
    next();
  }
});

function loginPersistence() {
  const token = localStorage.getItem('ToDoList@token');
  if (token) {
    router.push('/tarefas');
  } else {
    // Se não houver token, limpe os dados do localStorage
    localStorage.removeItem('ToDoList@token');
    localStorage.removeItem('ToDoList@user');
  }
}

export default router;
