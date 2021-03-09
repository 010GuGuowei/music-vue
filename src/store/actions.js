import mutations from "./mutations";
import * as types from './mutation-types'

// 点击歌曲列表开始播放点击的歌曲
// fullScreen = true , playing = true , playList = list , currentIndex = index sequenceList = list

export const selectPlay = function ({commit, state}, {list, index}) {
    commit(types.SET_CURRENT_INDEX, index)
    commit(types.SET_PLAY_LIST, list)
    commit(types.SET_PLAYING_STATE, true)
    commit(types.SET_FULL_SCREEN, true)
    commit(types.SET_SEQUENCE_LIST, true)
}