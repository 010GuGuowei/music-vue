import {playMode} from '../common/js/config'

const state = {
    singer: {}, // 歌手
    discList: {},   // 推荐列表
    rank:{},    // 排行榜
    playing:false,   // 播放状态
    fullScreen : false,  // 全屏播放器展开或收起
    playList : [],  // 播放列表
    sequenceList: [], // 播放顺序列表
    currentIndex: -1,  // 当前播放歌曲的索引
    mode:playMode.sequence  // 播放模式,默认顺序播放

}

export default state