import Vue from 'vue'
import Vuex from 'vuex'
// import createLogger from "vuex/types/logger";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    singer:{}
  },
  mutations: {
    SET_SINGER : (state ,singer) => {
      state.singer = singer
    }
  },
  actions: {
  },
  modules: {
  },
  // plugins: debug ? [createLogger] : []
})
