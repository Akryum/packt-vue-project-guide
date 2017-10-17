import Vue from 'vue'
import Vuex from 'vuex'

import cart from './cart'
import item from './item'
import items from './items'
import ui from './ui'

Vue.use(Vuex)

const store = new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',

  actions: {
    init () {
      console.log('store init')
    },
  },

  modules: {
    cart,
    item,
    items,
    ui,
  },
})

export default store

if (module.hot) {
  module.hot.accept([
    './cart',
    './item',
    './items',
    './ui',
  ], () => {
    store.hotUpdate({
      modules: {
        cart: require('./cart').default,
        item: require('./item').default,
        items: require('./items').default,
        ui: require('./ui').default,
      },
    })
  })
}
