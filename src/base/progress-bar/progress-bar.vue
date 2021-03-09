<template>
    <div class="progress-bar" ref="progressBar">
        <div class="bar-inner">
            <div class="progress" ref="progress"></div>
            <div class="progress-btn-wrapper" ref="progressBtn"
                 @touchstart.prevent="progressTouchStart"
                 @touchmove.prevent="progressTouchMove"
                 @touchend="progressTouchEnd"
            >
                <div class="progress-btn"></div>
            </div>
        </div>
    </div>
</template>

<script>
    const progressBtnWidth = 16     // 进度条按钮的宽度
    export default {
        name: "progress-bar",
        props: {
            percent: {   // 播放进度
                type: Number,
                default: 0
            },
        },
        components: {},
        data() {
            return {};
        },
        //方法
        methods: {
            // 滚动条的按下事件
            progressTouchStart(e) {
                this.touch.initiated = true     // 已经按下，初始化
                this.touch.startX = e.touches[0].pageX   // 点击的位置
                this.touch.left = this.$refs.progress.clientWidth   // 当前进度条的位置(宽度)
            },
            // 滚动条的拖拽事件
            progressTouchMove(e) {
                // 如果touch没有初始化直接返回
                if (!this.touch.initiated) {
                    return
                }
                // 拖拽的偏移量
                let X = e.touches[0].pageX - this.touch.startX
                // 拖拽时的位置
                let offsetWidth = Math.min(this.$refs.progressBar.clientWidth - progressBtnWidth, Math.max(0, this.touch.left + X))
                this._offset(offsetWidth)
            },
            // 滚动条的按下、拖拽结束
            progressTouchEnd() {
                // 重置
                this.touch.initiated = false
                // 派发事件 同步播放进度
                this.triggerPercent()
            },
            triggerPercent(){
                // 拖拽后的进度 = 当前的进度条的宽度 / 进度条的总宽度
                const barWidth = this.$refs.progressBar.clientWidth - progressBtnWidth
                const percent = this.$refs.progress.clientWidth / barWidth
                // 派发事件告诉 player
                this.$emit('percentChange' , percent)

            },
            _offset(offsetWidth) {
                // 偏移的宽度
                this.$refs.progress.style.width = `${offsetWidth}px`
                // 按钮的位置
                this.$refs.progressBtn.style.transform = `translate3d(${offsetWidth}px,0,0)`
            }
        },
        //计算属性
        computed: {},
        //侦听器
        watch: {
            // 根据播放进度移动进度条
            percent(newVal) {
                // console.log(newVal)
                // 位置大于零 且不在拖动的状态
                if (newVal >= 0 && !this.touch.initiated) {
                    // 进度条的宽度
                    const barWidth = this.$refs.progressBar.clientWidth - progressBtnWidth
                    // 偏移的宽度  歌曲播放的比例*总宽度
                    const offsetWidth = newVal * barWidth
                    this._offset(offsetWidth)
                    // // 偏移的宽度
                    // this.$refs.progress.style.width = `${offsetWidth}px`
                    // // 按钮的位置
                    // this.$refs.progressBtn.style.transform = `translate3d(${offsetWidth}px,0,0)`
                }
            }
        },
        //过滤器
        filters: {},

        //组件创建之前
        beforeCreate() {
        },
        //组件创建之后
        created() {
            // 添加一个播放进度的共享数据
            this.touch = {}
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

    .progress-bar {
        height: 30px;
    }

    .progress-bar .bar-inner {
        position: relative;
        top: 13px;
        height: 4px;
        background: rgba(0, 0, 0, 0.3);
    }

    .progress-bar .bar-inner .progress {
        position: absolute;
        height: 100%;
        background: #ffcd32;
    }

    .progress-bar .bar-inner .progress-btn-wrapper {
        position: absolute;
        left: -8px;
        top: -13px;
        width: 30px;
        height: 30px;
    }

    .progress-bar .bar-inner .progress-btn-wrapper .progress-btn {
        position: relative;
        top: 7px;
        left: 7px;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        width: 16px;
        height: 16px;
        border: 3px solid #fff;
        border-radius: 50%;
        background: #ffcd32;
    }


</style>