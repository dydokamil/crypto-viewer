import Vue from "vue"
import Vuex from "vuex"

import App from "./App.vue"
import _store from "./store"

Vue.config.productionTip = false

Vue.use(Vuex)

const store = new Vuex.Store(_store)

new Vue({
  render: h => h(App),
  store,
}).$mount("#app")
