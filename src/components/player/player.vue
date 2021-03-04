<template>
    <div class="player" v-show="playList.length > 0">
        <div class="normal-player" v-show="fullScreen">
           <div class="background">
               <img width="100%" height="100%" :src="currentSong.image">
           </div>
            <!-- 顶部 -->
            <div class="top">
                <div class="back">
                    <i class="icon-back" @click="back"><</i>
                </div>
                <h2 class="title"> {{currentSong.name}} </h2>
                <h3 class="subtitle"> {{currentSong.singer}} </h3>
            </div>
            <!-- 中间 -->
            <div class="middle">
                <div class="middle-l">
                    <div class="cd-wrapper">
                        <div class="cd">
                            <img class="image" :src="currentSong.image">
                        </div>
                    </div>
                </div>
            </div>
            <!-- 底部 -->
            <div class="bottom">
                <div class="operators">
                    <div class="icon i-left">
                        <i class="icon-sequence">O</i>
                    </div>
                    <div class="icon i-left">
                        <i class="icon-prev">👈</i>
                    </div>
                    <div class="icon i-center">
                        <i class="icon-play">| |</i>
                    </div>
                    <div class="icon i-right">
                        <i class="icon-next">👉</i>
                    </div>
                    <div class="icon i-right">
                        <i class="icon icon-not-favorite">O</i>
                    </div>
                </div>
            </div>
        </div>
        <!-- 固定到底部的方式 -->
        <div class="mini-player" v-show="!fullScreen">
            我是一个缩小的播放器  ||

        </div>

    </div>
</template>

<script>
import {mapGetters} from 'vuex'

    export default {
        name: "player",
        props: {},
        components: {},
        data() {
            return {
                playing : false,
            };
        },
        //方法
        methods: {
            back(){
                console.log('back')
                this.$store.commit('SET_FULL_SCREEN', false)

            }
        },
        //计算属性
        computed: {
            ...mapGetters([
                'playList',  // 播放列表如果存在则显示
                'fullScreen',   // 是否全屏显示播放页面
                'currentSong'


            ])
        },
        //侦听器
        watch: {},
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
        font-size: 22px;
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
        border: 10px solid rgba(255,255,255,0.1);
    }
    .player .normal-player .middle .middle-l .cd-wrapper .cd .play {
        -webkit-animation: rotate-data-v-510e566f 20s linear infinite;
        animation: rotate-data-v-510e566f 20s linear infinite;
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
        color: rgba(255,255,255,0.5);
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
        color: rgba(255,255,255,0.5);
        font-size: 14px;
    }
    .player .normal-player .middle .middle-r .lyric-wrapper .text.current {
        color: #fff;
    }
    .player .normal-player .middle .middle-r .lyric-wrapper .pure-music {
        padding-top: 50%;
        line-height: 32px;
        color: rgba(255,255,255,0.5);
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
        background: rgba(255,255,255,0.5);
    }
    .player .normal-player .bottom .dot-wrapper .dot.active {
        width: 20px;
        border-radius: 5px;
        background: rgba(255,255,255,0.8);
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
        color: rgba(255,205,49,0.5);
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
        padding: 0 10px 0 20px;
    }
    .player .mini-player .icon .imgWrapper {
        height: 100%;
        width: 100%;
    }
    .player .mini-player .icon .imgWrapper img {
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
        color: rgba(255,255,255,0.3);
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
        color: rgba(255,205,49,0.5);
    }
    .player .mini-player .control .icon-mini {
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