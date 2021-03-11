<template>
    <div class="player" v-show="playList.length > 0">
        <transition name="normal">
            <div class="normal-player" v-show="fullScreen">
                <div class="background">
                    <img width="100%" height="100%" :src="currentSong.image">
                </div>
                <!-- 顶部 -->
                <div class="top">
                    <div class="back">
                        <i class="icon-back icon" @click="back"></i>
                    </div>
                    <h2 class="title"> {{currentSong.name}} </h2>
                    <h3 class="subtitle"> {{currentSong.singer}} </h3>
                </div>
                <!-- 中间 -->
                <div class="middle">
                    <div class="middle-l">
                        <div class="cd-wrapper" ref="cdWrapper">
                            <div class="cd">
                                <img :class="cdCls" class="image" :src="currentSong.image">
                            </div>
                        </div>
                    </div>
                </div>
                <!-- 底部 -->
                <div class="bottom">
                    <div class="progress-wrapper">
                        <span class="time time-l">{{format(currentTime)}}</span>
                        <div class="progress-bar-wrapper">
                            <progress-bar :percent="percent" @percentChange="onProgressBarChange"></progress-bar>
                        </div>
                        <span class="time time-r">{{format(currentSong.duration)}}</span>
                    </div>
                    <div class="operators">
                        <!--底部控制栏-->
                        <div class="icon i-left" @click="changeMode">
                            <i :class="modeIcon"></i>
                        </div>
                        <div class="icon i-left" :class="disableCls">
                            <i class="icon icon-prev" @click="prev"></i>
                        </div>
                        <div class="icon i-center" :class="disableCls">
                            <i :class="playIcon" @click="togglePlaying"></i>
                        </div>
                        <div class="icon i-right" :class="disableCls">
                            <i class="icon icon-next" @click="next"></i>
                        </div>
                        <div class="icon i-right">
                            <i class="icon icon-not-favorite"></i>
                        </div>
                    </div>
                </div>
            </div>
        </transition>
        <!-- 底部小播放器 -->
        <transition name="mimi">
            <div class="mini-player" v-show="!fullScreen" @click="open">
                <!-- 专辑图片 -->
                <div class="icon">
                    <div class="imgWrapper">
                        <div class="mimiImage">
                            <img :src="currentSong.image" width="40" height="40">
                        </div>
                    </div>
                </div>
                <!-- 歌曲信息 -->
                <div class="text">
                    <h2 class="name" v-html="currentSong.name"></h2>
                    <p class="desc" v-html="currentSong.singer">{{currentSong.singer}}</p>
                </div>
                <!-- 播放暂停 -->
                <div class="control">
                    <div>
                        <i :class="miniIconPlay" @click.stop="togglePlaying"></i>
                    </div>
                </div>
                <!-- 播放列表 -->
                <div class="control">
                    <i class="icon icon-playlist icon-play-list"></i>
                </div>
            </div>
        </transition>
        <audio
                ref="audio"
                @timeupdate="updateTime"
                :src="currentSong.url"
                @ended="end"
        ></audio>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex'
    import ProgressBar from '../../base/progress-bar/progress-bar'
    import {playMode} from '../../common/js/config'
    import {shuffle} from '../../common/js/util'
    import {sequenceList} from "../../store/getters";

    export default {
        name: "player",
        props: {},
        components: {ProgressBar},
        data() {
            return {
                songReady: false,    // 可以点击下一首的状态
                currentTime: 0,        // 当前歌曲的播放时间
            };
        },
        //方法
        methods: {
            // 接搜到进度条改变，改变播放进度
            onProgressBarChange(percent) {
                // console.log(percent)
                // 当前歌曲的总时长 * 播放进度
                this.$refs.audio.currentTime = this.currentSong.duration * percent
                // 如果现在处于暂停状态 自动播放
                if (!this.playing) {
                    this.$store.commit('SET_PLAYING_STATE', !this.playing)
                }
            },
            // 改变播放模式的icon图标,以及播放列表
            changeMode() {
                let mode = (this.mode + 1) % 3
                this.$store.commit('SET_PLAY_MODE', mode)
                // 修改播放列表
                let list = null
                if(mode === playMode.random){
                    // 随机列表
                    list = shuffle(this.sequenceList)
                    // console.log('random',this.playList)
                }
                else {
                    // 非随机模式改回顺序列表
                    list = this.sequenceList
                }
                // 更新index
                this.updateCurrentIndex(list)
                // 更新列表
                this.$store.commit('SET_PLAY_LIST',list)
            },
            // 跟新当前播放歌曲的index
            updateCurrentIndex(list){
                let index = list.findIndex((item) => {
                    return this.currentSong.id === item.id
                })
                // console.log('index',index)
                this.$store.commit('SET_CURRENT_INDEX',index)
            },
            // 播放暂停
            togglePlaying() {
                // console.log('播放,暂停')
                // if(!this.songReady){
                //     return
                // }
                this.$store.commit('SET_PLAYING_STATE', !this.playing)
                // this.songReady = false
            },
            // 上一首
            prev() {
                console.log('prev')
                // if(!this.songReady){
                //     return
                // }
                let index = this.currentIndex - 1
                // 如果是第一首 播放最后一首
                if (index === -1) {
                    index = this.playList.length - 1
                }
                this.$store.commit('SET_CURRENT_INDEX', index)
                if (!this.playing) {
                    this.$store.commit('SET_PLAYING_STATE', true)
                }
                // this.songReady = false
            },
            // 当前歌曲播放完成后自动播放下一首
            end(){
                // 单曲循环模式
                if(this.mode === playMode.loop){
                    this.$refs.audio.currentTime = 0
                    this.$refs.audio.play()
                }else{
                    this.next()
                }
            },
            // 下一首
            next() {
                // if(!this.songReady){
                //     return
                // }
                // console.log('播放列表', this.playList)
                let index = this.currentIndex + 1
                // 如果是最后一首播放第一首
                if (index === this.playList.length) {
                    index = 0
                }
                this.$store.commit('SET_CURRENT_INDEX', index)
                // 改变播放的状态
                if (!this.playing) {
                    this.$store.commit('SET_PLAYING_STATE', true)
                }
                // this.songReady = false
            },
            // 歌曲可以播放的状态
            // ready(){
            //     this.songReady = true
            //     console.log(this.songReady)
            // },
            // error(){
            //     this.songReady = true
            // },
            // 缩小
            back() {
                // console.log('back')
                this.$store.commit('SET_FULL_SCREEN', false)
            },
            // 打开
            open() {
                // console.log('open')
                this.$store.commit('SET_FULL_SCREEN', true)
            },
            // 歌曲的播放时间
            updateTime(e) {
                this.currentTime = e.target.currentTime
            },
            // 进度条左边的时间处理
            format(time) {
                time = time | 0     // 取整
                const minute = time / 60 | 0    // 分
                const second = this._pad(time % 60)        // 秒
                return `${minute}:${second}`
            },
            // 数字补零
            _pad(num) {
                let len = num.toString().length
                let n = 2
                if (len < 2) {
                    num = '0' + num
                }
                return num
            }
        },
        //计算属性
        computed: {
            // 歌曲播放的进度
            percent() {
                return this.currentTime / this.currentSong.duration
            },
            // 迷你播放器的暂停播放图标切换
            miniIconPlay() {
                return this.playing ? 'icon-mini icon icon-pause-mini' : 'icon-mini icon icon-play-mini'
            },
            // 播放暂停的图标切换
            playIcon() {
                return this.playing ? 'icon icon-pause' : 'icon icon-play'
            },
            // cd 旋转的效果
            cdCls() {
                return this.playing ? 'play' : 'play pause'
            },
            // 播放模式的icon改变
            modeIcon() {

                if (this.mode === playMode.sequence) {
                    return 'icon icon-sequence'
                } else if (this.mode === playMode.random) {
                    return 'icon icon-random'
                } else {
                    return 'icon icon-loop'
                }
            },
            // 切歌时按钮的样式
            disableCls() {
                return this.songReady ? '' : 'disable'
            },
            ...mapGetters([
                'playList',  // 播放列表如果存在则显示
                'fullScreen',   // 是否全屏显示播放页面
                'currentSong',   // 当前播放歌曲的信息
                'playing',       // 歌曲的播放状态
                'currentIndex',      // 当前播放歌曲的索引
                'mode',        // 播放模式
                'sequenceList',     // 播放顺序列表
            ])
        },
        //侦听器
        watch: {
            currentSong(newSong , oldSong) {
                if(newSong.id === oldSong.id){
                    return
                }
                // 延时，在下次DOM更新后执行
                this.$nextTick(() => {
                    this.$refs.audio.play()
                })
            },
            // 播放的状态
            playing(newPlaying) {
                const audio = this.$refs.audio
                this.$nextTick(() => {
                    newPlaying ? audio.play() : audio.pause()
                })
            }
        },
        //过滤器
        filters: {},

        //组件创建之前
        beforeCreate() {
        },
        //组件创建之后
        created() {
            // this.getPlayingState()
        },
        //页面渲染之前
        beforeMount() {
        },
        //页面渲染之后
        mounted() {
        },
        //页面视图数据更新之前
        beforeUpdate() {
        },
        //页面视图数据更新之后
        updated() {
        },
        //页面销毁之前
        beforeDestroy() {
        },
        //页面销毁之后
        destroyed() {
        },
    }
</script>

<style scoped>
    .player .normal-player {
        position: fixed;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        z-index: 150;
        background: #222;
    }

    .player .normal-player .background {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        z-index: -1;
        opacity: 0.6;
        -webkit-filter: blur(20px);
        filter: blur(20px);
    }

    .player .normal-player .top {
        position: relative;
        margin-bottom: 25px;
    }

    .player .normal-player .top .back {
        position: absolute;
        top: 0;
        left: 6px;
        z-index: 50;
    }

    .player .normal-player .top .back .icon-back {
        display: block;
        padding: 9px;
        font-size: 24px;
        color: #ffcd32;
        -webkit-transform: rotate(-90deg);
        transform: rotate(-90deg);
    }

    .player .normal-player .top .title {
        width: 70%;
        margin: 0 auto;
        line-height: 40px;
        text-align: center;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
        font-size: 18px;
        color: #fff;
    }

    .player .normal-player .top .subtitle {
        line-height: 20px;
        text-align: center;
        font-size: 14px;
        color: #fff;
    }

    .player .normal-player .middle {
        position: fixed;
        width: 100%;
        top: 80px;
        bottom: 170px;
        white-space: nowrap;
        font-size: 0;
    }

    .player .normal-player .middle .middle-l {
        display: inline-block;
        vertical-align: top;
        position: relative;
        width: 100%;
        height: 0;
        padding-top: 80%;
    }

    .player .normal-player .middle .middle-l .cd-wrapper {
        position: absolute;
        left: 10%;
        top: 0;
        width: 80%;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        height: 100%;
    }

    .player .normal-player .middle .middle-l .cd-wrapper .cd {
        width: 100%;
        height: 100%;
        border-radius: 50%;
    }

    .player .normal-player .middle .middle-l .cd-wrapper .cd .image {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        border-radius: 50%;
        border: 10px solid rgba(255, 255, 255, 0.1);
    }

    .player .normal-player .middle .middle-l .cd-wrapper .cd .play {
        -webkit-animation: rotate-data-v-510e566f 20s linear infinite;
        animation: rotate-data-v-510e566f 20s linear infinite;
    }

    .player .normal-player .middle .middle-l .cd-wrapper .cd .pause {
        -webkit-animation-play-state: paused;
    }

    .player .normal-player .middle .middle-l .playing-lyric-wrapper {
        width: 80%;
        margin: 30px auto 0 auto;
        overflow: hidden;
        text-align: center;
    }

    .player .normal-player .middle .middle-l .playing-lyric-wrapper .playing-lyric {
        height: 20px;
        line-height: 20px;
        font-size: 14px;
        color: rgba(255, 255, 255, 0.5);
    }

    .player .normal-player .middle .middle-r {
        display: inline-block;
        vertical-align: top;
        width: 100%;
        height: 100%;
        overflow: hidden;
    }

    .player .normal-player .middle .middle-r .lyric-wrapper {
        width: 80%;
        margin: 0 auto;
        overflow: hidden;
        text-align: center;
    }

    .player .normal-player .middle .middle-r .lyric-wrapper .text {
        line-height: 32px;
        color: rgba(255, 255, 255, 0.5);
        font-size: 14px;
    }

    .player .normal-player .middle .middle-r .lyric-wrapper .text.current {
        color: #fff;
    }

    .player .normal-player .middle .middle-r .lyric-wrapper .pure-music {
        padding-top: 50%;
        line-height: 32px;
        color: rgba(255, 255, 255, 0.5);
        font-size: 14px;
    }

    .player .normal-player .bottom {
        position: absolute;
        bottom: 50px;
        width: 100%;
    }

    .player .normal-player .bottom .dot-wrapper {
        text-align: center;
        font-size: 0;
    }

    .player .normal-player .bottom .dot-wrapper .dot {
        display: inline-block;
        vertical-align: middle;
        margin: 0 4px;
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.5);
    }

    .player .normal-player .bottom .dot-wrapper .dot.active {
        width: 20px;
        border-radius: 5px;
        background: rgba(255, 255, 255, 0.8);
    }

    .player .normal-player .bottom .progress-wrapper {
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        width: 80%;
        margin: 0px auto;
        padding: 10px 0;
    }

    .player .normal-player .bottom .progress-wrapper .time {
        color: #fff;
        font-size: 12px;
        -webkit-box-flex: 0;
        -ms-flex: 0 0 30px;
        flex: 0 0 30px;
        line-height: 30px;
        width: 30px;
    }

    .player .normal-player .bottom .progress-wrapper .time.time-l {
        text-align: left;
    }

    .player .normal-player .bottom .progress-wrapper .time.time-r {
        text-align: right;
    }

    .player .normal-player .bottom .progress-wrapper .progress-bar-wrapper {
        -webkit-box-flex: 1;
        -ms-flex: 1;
        flex: 1;
    }

    .player .normal-player .bottom .operators {
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
    }

    .player .normal-player .bottom .operators .icon {
        -webkit-box-flex: 1;
        -ms-flex: 1;
        flex: 1;
        color: #ffcd32;
    }

    .player .normal-player .bottom .operators .icon.disable {
        color: rgba(255, 205, 49, 0.5);
    }

    .player .normal-player .bottom .operators .icon i {
        font-size: 30px;
    }

    .player .normal-player .bottom .operators .i-left {
        text-align: right;
    }

    .player .normal-player .bottom .operators .i-center {
        padding: 0 20px;
        text-align: center;
    }

    .player .normal-player .bottom .operators .i-center i {
        font-size: 40px;
    }

    .player .normal-player .bottom .operators .i-right {
        text-align: left;
    }

    .player .normal-player .bottom .operators .icon-favorite {
        color: #d93f30;
    }

    .player .normal-player.normal-enter-active,
    .player .normal-player.normal-leave-active {
        -webkit-transition: all 0.4s;
        transition: all 0.4s;
    }

    .player .normal-player.normal-enter-active .top,
    .player .normal-player.normal-leave-active .top,
    .player .normal-player.normal-enter-active .bottom,
    .player .normal-player.normal-leave-active .bottom {
        -webkit-transition: all 0.4s cubic-bezier(0.86, 0.18, 0.82, 1.32);
        transition: all 0.4s cubic-bezier(0.86, 0.18, 0.82, 1.32);
    }

    .player .normal-player.normal-enter,
    .player .normal-player.normal-leave-to {
        opacity: 0;
    }

    .player .normal-player.normal-enter .top,
    .player .normal-player.normal-leave-to .top {
        -webkit-transform: translate3d(0, -100px, 0);
        transform: translate3d(0, -100px, 0);
    }

    .player .normal-player.normal-enter .bottom,
    .player .normal-player.normal-leave-to .bottom {
        -webkit-transform: translate3d(0, 100px, 0);
        transform: translate3d(0, 100px, 0);
    }

    .player .mini-player {
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        position: fixed;
        left: 0;
        bottom: 0;
        z-index: 180;
        width: 100%;
        height: 60px;
        background: #333;
    }

    .player .mini-player.mini-enter-active,
    .player .mini-player.mini-leave-active {
        -webkit-transition: all 0.4s;
        transition: all 0.4s;
    }

    .player .mini-player.mini-enter,
    .player .mini-player.mini-leave-to {
        opacity: 0;
    }

    .player .mini-player .icon {
        -webkit-box-flex: 0;
        -ms-flex: 0 0 40px;
        flex: 0 0 40px;
        width: 40px;
        height: 40px;
        /*padding: 0 10px 0 20px;*/
    }

    .player .mini-player .icon .imgWrapper {
        height: 100%;
        width: 100%;
    }

    .player .mini-player .icon .imgWrapper img {
        margin-left: 20px;
        /*margin-right: 10px;*/
        border-radius: 50%;
    }

    .player .mini-player .icon .imgWrapper img.play {
        -webkit-animation: rotate-data-v-510e566f 10s linear infinite;
        animation: rotate-data-v-510e566f 10s linear infinite;
    }

    .player .mini-player .icon .imgWrapper img.pause {
        -webkit-animation-play-state: paused;
        animation-play-state: paused;
    }

    .player .mini-player .text {
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-orient: vertical;
        -webkit-box-direction: normal;
        -ms-flex-direction: column;
        flex-direction: column;
        -webkit-box-pack: center;
        -ms-flex-pack: center;
        justify-content: center;
        -webkit-box-flex: 1;
        -ms-flex: 1;
        flex: 1;
        line-height: 20px;
        overflow: hidden;
        margin-left: 30px;
    }

    .player .mini-player .text .name {
        margin-bottom: 2px;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
        font-size: 14px;
        color: #fff;
    }

    .player .mini-player .text .desc {
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
        font-size: 12px;
        color: rgba(255, 255, 255, 0.3);
    }

    .player .mini-player .control {
        -webkit-box-flex: 0;
        -ms-flex: 0 0 30px;
        flex: 0 0 30px;
        width: 30px;
        padding: 0 10px;
    }

    .player .mini-player .control .icon-play-mini,
    .player .mini-player .control .icon-pause-mini,
    .player .mini-player .control .icon-playlist {
        font-size: 30px;
        color: rgba(255, 205, 49, 0.5);
    }

    .player .mini-player .control .icon-play {
        font-size: 32px;
        position: absolute;
        left: 0;
        top: 0;
    }

    @-webkit-keyframes rotate-data-v-510e566f {
        0% {
            -webkit-transform: rotate(0);
            transform: rotate(0);
        }
        100% {
            -webkit-transform: rotate(360deg);
            transform: rotate(360deg);
        }
    }

    @keyframes rotate-data-v-510e566f {
        0% {
            -webkit-transform: rotate(0);
            transform: rotate(0);
        }
        100% {
            -webkit-transform: rotate(360deg);
            transform: rotate(360deg);
        }
    }

</style>