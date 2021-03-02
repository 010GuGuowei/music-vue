import Vue from 'vue'
import Vuex from 'vuex'
// import createLogger from "vuex/types/logger";

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        singer: {},
        discList: {},
        rank:{}
    },
    mutations: {
        SET_SINGER: (state, singer) => {
            state.singer = singer
        },
        SET_DESCLIST: (state, discList) =>{
             state.discList = discList
        },
        SET_RANK:(state,rank) => {
            state.rank = rank
        }
,

},
actions: {
}
,
modules: {
}
,
// plugins: debug ? [createLogger] : []
})
