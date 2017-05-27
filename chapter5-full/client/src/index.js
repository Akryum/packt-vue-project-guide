import Vue from 'vue'
import AppLayout from './components/AppLayout.vue'
import router from './router'
import state from './state'
import VueFetch, { $fetch } from './plugins/fetch'
import VueState from './plugins/state'
import './global-components'

Vue.use(VueFetch)
Vue.use(VueState, state)

async function main () {
  try {
    const result = await $fetch('user')
    state.user = await result.json()
  } catch (e) {
    console.warn(e.message)
  }

  new Vue({
    el: '#app',
    data: state,
    router,
    render: h => h(AppLayout),
  })
}

main()
