export const singer = state => state.singer

export const discList = state => state.discList

export const rank = state => state.rank

export const playing = state => state.playing

export const fullScreen = state => state.fullScreen

export const playList = state => state.playList

export const sequenceList = state => state.sequenceList

export const currentIndex = state => state.currentIndex

export const mode = state => state.mode
// 当前播放的歌曲
export const currentSong = (state) => {
    // 通过当前的播放列表和index得到当前播放的歌曲  拿不到返回一个空对象
    return state.playList[state.currentIndex] || {}
}