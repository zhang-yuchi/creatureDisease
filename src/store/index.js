import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    username:""
  },
  mutations: {
    changeUsername:(state,payload)=>{
      state.username = payload.name
    }
  },
  actions: {
  },
  modules: {
  }
})
