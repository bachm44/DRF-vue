import Vue from 'vue'
import Vuex from 'vuex'
import todos from './modules/todos'
import auth from './modules/auth'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    todos,
    auth
  }
})
