import Vue from 'vue'
import Vuex from 'vuex'

import App from './App.vue'
import _store from './store'

Vue.config.productionTip = false

Vue.use(Vuex)

const store = new Vuex.Store(_store)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: (h) => h(App),
  store
}).$mount('App')
