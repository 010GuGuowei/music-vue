<template>
    <div class="music-list">
        <div class="back" @click="back">
            <i class="icon icon-back"></i>
        </div>
        <h1 class="title" v-html="title"></h1>
        <div class="bg-image" :style="bgStyle" ref="bgImage">
            <!-- 随机播放的按钮 -->
            <div class="play-wrapper">
                <div ref="playBtn" v-show="songs.length>0" class="play" @click="random">
                    <i class="icon icon-play"></i>
                    <span class="text">随机播放全部</span>
                </div>
            </div>
            <div class="filter" ref="filter"></div>
        </div>
        <div class="bg-layer" ref="layer"></div>

        <scroll :data="songs" class="list" ref="list"
                :listen-scroll="listenScroll" :probe-type="probeType" @scroll="scroll">
            <div class="song-list-wrapper">
                <song-list :songs="songs" @select="selectItem"></song-list>
            </div>
            <div v-show="!songs.length" class="loading-container">
                <loading></loading>
            </div>
        </scroll>
    </div>
</template>


<script>
    import Scroll from '../../base/scroll/scroll'
    import SongList from '../../base/song-list/song-list'
    import Loading from '../../base/loading/loading'

    const resolved_height = 40      // 顶部预留高度

    export default {
        name: "detial",
        props: {
            bgImage: {
                type: String,
                default: ''
            },
            songs: {
                type: Array,
                default() {
                    return []
                }
            },
            title: {
                type: String,
                default: ''
            },
            rank: {
                type: Boolean,
                default: false
            }
        },
        data() {
            return {
                scrollY: 0
            }
        },
        created() {
            this.listenScroll = true
            this.probeType = 3      // 在任何时候都派发滚动事件
        },
        methods: {
            // 返回上一级
            back() {
                // console.log('back')
                this.$router.go(-1)
            },
            // 随机播放
            random() {
                console.log('random')
            },
            // 获取纵向滚动的值
            scroll(scroll) {
                this.scrollY = scroll.y
            },
            // 播放点击的音乐
            selectItem(item,index){
                // console.log(this.songs)
                this.$store.dispatch('selectPlay',{
                    list :this.songs,
                    index : index
                })

            },

        },
        mounted() {
            // 获取图片的高度
            this.imageHeight = this.$refs.bgImage.clientHeight
            // 设置滚动区域的 top 值
            this.$refs.list.$el.style.top = `${this.imageHeight}px`
            // 根据图片的高度算出滚动区域的最大值
            this.maxTranslateY = -this.imageHeight + resolved_height
        },
        computed: {
            // 返回图片地址
            bgStyle() {
                return `background-image:url(${this.bgImage})`
            },

        },
        components: {
            Scroll, SongList, Loading
        },
        // 监听滚动区域的高度
        watch: {
            // 监听滚动区域的高度
            scrollY(newVal) {
                // bgImage的z-index值
                let zIndex = 0
                // 缩放的比例
                let scale = 1
                let percent = Math.abs(newVal / this.imageHeight)
                if (newVal > 0) {
                    scale = scale + percent
                    zIndex = 10
                }
                // 定义一个滚动的最大值
                let translateY = Math.max(this.maxTranslateY, newVal)
                this.$refs.layer.style['transform'] = `translate3d(0,${translateY}px,0)`

                // 如果滚动的高度大于 translateY 设置背景图片的样式 达到顶部预留
                if (newVal < this.maxTranslateY) {
                    zIndex = 10
                    this.$refs.bgImage.style.paddingTop = 0     // 内边距清零
                    this.$refs.bgImage.style.height = `${resolved_height}px`    // 设置高度
                    this.$refs.playBtn.style.display = 'none'       // 隐藏播放按钮


                } else {      // 不大于则重置样式
                    this.$refs.bgImage.style.paddingTop = '70%'
                    this.$refs.bgImage.style.height = 0
                    this.$refs.playBtn.style.display = ''
                }
                // 设置背景图片的层级
                this.$refs.bgImage.style.zIndex = zIndex
                // 背景图片缩放的实现
                this.$refs.bgImage.style['transform'] = `scale(${scale})`
            }
        }
    }
</script>

<style scoped>
    .music-list {
        position: fixed;
        z-index: 100;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        background: #222;
    }

    .music-list .back {
        position: absolute;
        top: 0;
        left: 6px;
        z-index: 50;
    }

    .music-list .back .icon-back {
        display: block;
        padding: 10px;
        font-size: 24px;
        color: #ffcd32;
    }

    .music-list .title {
        position: absolute;
        top: 0;
        left: 10%;
        z-index: 40;
        width: 80%;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
        text-align: center;
        line-height: 40px;
        font-size: 18px;
        color: #fff;
    }

    .music-list .bg-image {
        position: relative;
        width: 100%;
        height: 0;
        padding-top: 70%;
        -webkit-transform-origin: top;
        transform-origin: top;
        background-size: cover;
    }

    .music-list .bg-image .play-wrapper {
        position: absolute;
        bottom: 20px;
        z-index: 50;
        width: 100%;
    }

    .music-list .bg-image .play-wrapper .play {
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        width: 135px;
        padding: 7px 0;
        margin: 0 auto;
        text-align: center;
        border: 1px solid #ffcd32;
        color: #ffcd32;
        border-radius: 100px;
        font-size: 0;
    }

    .music-list .bg-image .play-wrapper .play .icon-play {
        display: inline-block;
        vertical-align: middle;
        margin-right: 6px;
        font-size: 14px;
    }

    .music-list .bg-image .play-wrapper .play .text {
        display: inline-block;
        vertical-align: middle;
        font-size: 12px;
    }

    .music-list .bg-image .filter {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(7, 17, 27, 0.4);
    }

    .music-list .bg-layer {
        position: relative;
        height: 100%;
        background: #222;
    }

    .music-list .list {
        position: absolute;
        top: 0;
        bottom: 0;
        width: 100%;
        background: #222;
    }

    .music-list .list .song-list-wrapper {
        padding: 20px 30px;
    }

    .music-list .list .loading-container {
        position: absolute;
        width: 100%;
        top: 50%;
        -webkit-transform: translateY(-50%);
        transform: translateY(-50%);
    }

</style>