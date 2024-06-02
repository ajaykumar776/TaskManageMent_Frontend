import { createRouter, createWebHistory } from 'vue-router';
import UserLogin from '../components/UserLogin.vue';
import UserRegister from '../components/UserRegister.vue';
import TodoList from '../components/TodoList.vue';
import CreateTodo from '../components/CreateTodo.vue';
import EditTodo from '../components/EditTodo.vue';
// import Vue from 'vue'; 
const routes = [

  { 
    path: '/', 
    component: UserLogin, 
    meta: { requiresGuest: true } 
  },

  { 
    path: '/login', 
    component: UserLogin, 
    meta: { requiresGuest: true } 
  },

  { 
    path: '/register', 
    component: UserRegister, 
    meta: { requiresGuest: true } 
  }, 

  { 
    path: '/dashboard', 
    component: TodoList, 
    meta: { requiresAuth: true } 
  }, 

  {
    path: '/todo/create',
    name: 'CreateTodo',
    component: CreateTodo,
    meta: { requiresAuth: true } 
  },

  {
    path: '/todo/:id/edit',
    name: 'EditTodo',
    component: EditTodo,
    meta: { requiresAuth: true } 
  },

];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem('auth_token');

  if (to.meta.requiresAuth) {
    if (isAuthenticated) {
      // Vue.component('Navbar').methods.checkAuth();
      next();
    } else {
      next('/login');
    }
  } else if (to.meta.requiresGuest) {
    if (isAuthenticated) {
      next('/dashboard');
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
