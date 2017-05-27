import Vue from 'vue'
import VueRouter from 'vue-router'
import state from './state'

import Home from './components/Home.vue'
import FAQ from './components/FAQ.vue'
import Tickets from './components/Tickets.vue'
import Login from './components/Login.vue'
import NotFound from './components/NotFound.vue'

Vue.use(VueRouter)

const routes = [
  { path: '/', name: 'home', component: Home },
  { path: '/faq', name: 'faq', component: FAQ },
  { path: '/login', name: 'login', component: Login, meta: { guest: true } },
  { path: '/tickets', name: 'tickets', component: Tickets, meta: { private: true } },
  { path: '*', component: NotFound },
]

const router = new VueRouter({
  routes,
  mode: 'history',
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(m => m.meta.private)) {
    // If private page and not authenticated, redirect to login
    if (!state.user) {
      next({ name: 'login', params: {
        wantedRoute: to.fullPath,
      }})
      return
    }
  }
  if (to.matched.some(m => m.meta.guest)) {
    // If authenticated and page is guest-only, redirect to home
    if (state.user) {
      next({ name: 'home' })
      return
    }
  }
  next()
})

export default router
