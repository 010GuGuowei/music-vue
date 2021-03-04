// import * as types from './mutation-types'
//
// const mutations = {
//     [types.SET_SINGER]: (state, singer) => {
//         state.singer = singer
//     },
//     [types.SET_DESCLIST]: (state, discList) => {
//         state.discList = discList
//     },
//     [types.SET_RANK]: (state, rank) => {
//         state.rank = rank
//     },
//     [types.SET_PLAYING_STATE]: (state, boolean) => {
//         state.playing = boolean
//     },
//     [types.SET_FULL_SCREEN]: (state, boolean) => {
//         state.fullScreen = boolean
//     },
//     [types.SET_PLAY_LIST]: (state, list) => {
//         state.playList = list
//     },
//     [types.SET_SEQUENCE_LIST]: (state, list) => {
//         state.sequenceList = list
//     },
//     [types.SET_CURRENT_INDEX]: (state, index) => {
//         state.currentIndex = index
//     },
//     [types.SET_PLAY_MODE]: (state, mode) => {
//         state.mode = mode
//     }
//
// }
//
//

const mutations = {
    SET_SINGER: (state, singer) => {
        state.singer = singer
    },
    SET_DESCLIST: (state, discList) => {
        state.discList = discList
    },
    SET_RANK: (state, rank) => {
        state.rank = rank
    },
    SET_PLAYING_STATE: (state, boolean) => {
        state.playing = boolean
    },
    SET_FULL_SCREEN: (state, boolean) => {
        state.fullScreen = boolean
    },
    SET_PLAY_LIST: (state, list) => {
        state.playList = list
    },
    SET_SEQUENCE_LIST: (state, list) => {
        state.sequenceList = list
    },
    SET_CURRENT_INDEX: (state, index) => {
        state.currentIndex = index
    },
    SET_PLAY_MODE: (state, mode) => {
        state.mode = mode
    }

}


export default mutations