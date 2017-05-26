import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from './components/Home.vue'
import FAQ from './components/FAQ.vue'
import Tickets from './components/Tickets.vue'
import Login from './components/Login.vue'

Vue.use(VueRouter)

const routes = [
  { path: '/', name: 'home', component: Home },
  { path: '/faq', name: 'faq', component: FAQ },
  { path: '/login', name: 'login', component: Login },
  { path: '/tickets', name: 'tickets', component: Tickets },
]

const router = new VueRouter({
  routes,
  mode: 'history',
})

export default router
