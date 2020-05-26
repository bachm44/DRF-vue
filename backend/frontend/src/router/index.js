import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'



Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue'),
    meta: {
      requiresVisitor: true
    }
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('../views/Register.vue'),
    meta: {
      requiresVisitor: true
    }
  },
  { path: '*', redirect: '/' }
]

const router = new VueRouter({
  routes
})


/*
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!this.$store.dispatch("isAuthenticated")) {
      next({
        name: 'Login'
      })
    } else {
      next()
    }
  } else if (to.matched.some(record => record.meta.requiresVisitor)) {
    if (this.$store.dispatch("isAuthenticated")) {
      next({
        name: 'Home'
      })
    } else {
      next()
    }
  } else {
    next()
  }
})
*/
export default router
