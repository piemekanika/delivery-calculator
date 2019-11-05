import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '@/views/Home.vue'
import Login from '@/views/Login.vue'
import Secret from '@/views/Secret.vue'

import store from '@/store'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
    meta: {
      requiredRole: 'ROLE_USER'
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/secret',
    name: 'Secret',
    component: Secret,
    meta: {
      requiredRole: 'ROLE_ADMIN'
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  function userHasEnoughRight(roleNeeded: string): boolean {
    const userRoles = store.getters['user/userRoles']

    console.log(userRoles, roleNeeded)
    return userRoles.includes(roleNeeded)
  }

  const requireRole = to.meta.requiredRole

  if (to.path === '/login' || userHasEnoughRight(requireRole)) {
    next()
  } else if (requireRole !== 'ROLE_USER') {
    next('/')
  } else {
    next('/login')
  }
})

export default router
