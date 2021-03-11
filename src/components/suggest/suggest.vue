<template>
    <scroll class="suggest">
        <ul class="suggest-list">
            <li v-for="(item ,index) in result" class="suggest-item" @click="selectItem(item, index)">
                <div class="icon">
                    <div class="icon-play"></div>
                </div>
                <div class="name">
                    <p class="text">{{item.name}}-{{item.singer}}</p>
                </div>
            </li>
        </ul>
    </scroll>
</template>

<script>
    import axios from "axios";
    import Scroll from '../../base/scroll/scroll'
    import {getPlayUrl} from "../../common/js/getUrl";

    export default {
        name: "suggest",
        props: {
            query: {     // 搜索的关键词
                type: String,
                default: ''
            },
        },
        components: {
            Scroll
        },
        data() {
            return {
                timer: '',
                page: 1,
                pageSize : 30,
                result: [],
            };
        },
        //方法
        methods: {
            // 搜索的实现
            search(query) {
                if(!query){
                    return
                }
                let that = this
                this.timer = setTimeout(function () {
                    // 请求搜索结果
                    axios.get(`/search?key=${query}&pageNo=${this.page}&pageSize=30`).then(res => {
                        // console.log(res.data.data.list)
                        getPlayUrl(that.normalizeSearch(res.data.data.list)).then(res => {
                            // console.log(res)
                            that.result = res
                        })
                    }).catch(err => {
                        console.log('请求失败', err)
                    })
                }, 500)
            },
            // 处理的得到的数据
            normalizeSearch(list) {
                // console.log(list)
                let data = []
                list.forEach((item, index) => {
                    let song = {
                        mid: item.songmid,
                        name: item.songname,
                        singer: item.singer[0].name,
                        albummid: item.albummid,
                        duration: item.interval,
                        //image : `https://y.gtimg.cn/music/photo_new/T002R300x300M000003Fghwn0gHHgA.jpg?max_age=2592000`
                        image: `https://y.gtimg.cn/music/photo_new/T002R300x300M000${item.albummid}.jpg?max_age=2592000`,
                        url: '',
                    }
                    data.push(song)
                })
                // console.log(data)
                return data
            },
            // 点击播放
            selectItem(item, index) {
                // console.log(item,index)
                this.$store.dispatch('selectPlay', {
                    list: this.result,
                    index: index
                })
            }
        },
        //计算属性
        computed: {},
        //侦听器
        watch: {
            query(newVal) {
                // console.log(newVal)
                clearTimeout(this.timer)
                this.search(newVal)
            }
        },
        //过滤器
        filters: {},

        //组件创建之前
        beforeCreate() {
        },
        //组件创建之后
        created() {
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
    .suggest {
        height: 100%;
        overflow: hidden;
    }

    .suggest .suggest-list {
        padding: 0 30px;
    }

    .suggest .suggest-list .suggest-item {
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        padding-bottom: 20px;
    }

    .suggest .suggest-list .icon {
        -webkit-box-flex: 0;
        -ms-flex: 0 0 30px;
        flex: 0 0 30px;
        width: 30px;
    }

    .suggest .suggest-list .icon [class^="icon-"] {
        font-size: 14px;
        color: rgba(255, 255, 255, 0.3);
    }

    .suggest .suggest-list .name {
        -webkit-box-flex: 1;
        -ms-flex: 1;
        flex: 1;
        font-size: 14px;
        color: rgba(255, 255, 255, 0.3);
        overflow: hidden;
    }

    .suggest .suggest-list .name .text {
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
    }

    .suggest .no-result-wrapper {
        position: absolute;
        width: 100%;
        top: 50%;
        -webkit-transform: translateY(-50%);
        transform: translateY(-50%);
    }

</style>