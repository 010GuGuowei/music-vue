<template>
    <div class="singer">
        <MHeader/>
        <tab></tab>
        <list-view :data="singerList" @select="selectSinger"/>
        <router-view></router-view>
    </div>
</template>

<script>
    import {getSingerList} from '../../api/singer'
    import {ERR_OK} from '../../api/config'

    import ListView from '../../base/listview/listview'
    import MHeader from '../m-header/m-header';
    import Tab from '../tab/tab';
    // 热门歌手数据的条数
    const hot_singer_len = 10

    export default {
        name: "singer",
        created() {
            this._getSingerList()
        },
        data() {
            return {
                singerList: [],
            }
        },
        methods: {
            // 获取歌手列表数据
            _getSingerList() {
                getSingerList().then(res => {
                    if (ERR_OK == 0) {
                        // console.log(res.data.list)
                        this.singerList = this._normalizeSinger(res.data.list)
                        // console.log(this.singerList)
                    }
                })
            },
            // 歌手列表类的封装
            _normalizeSinger(list) {
                // 保存分类后的数据
                let map = {
                    // 热门数据
                    hot: {
                        title: '热门',
                        item: []
                    }
                }
                // 遍历传进来的歌手列表
                list.forEach((item, index) => {
                    // 如果数据少于 hot_singer_len 则添加到 hot 里面
                    if (index < hot_singer_len) {
                        map.hot.item.push({
                            id: item.Fsinger_mid,  // 歌手id
                            name: item.Fsinger_name,    // 歌手name
                            picUrl: `http://y.gtimg.cn/music/photo_new/T001R300x300M000${item.Fsinger_mid}.jpg?max_age=2592000`    // 歌手头像图片地址

                        })
                    }
                    // 根据返回数据中的 Findex 把歌手进行分类
                    let key = item.Findex       // Findex => 歌手首字母拼音大写
                    // 不存在则新建数组 保存歌手信息
                    if (!map[key]) {
                        map[key] = {
                            title: key,
                            item: []       // 保存歌手的信息
                        }
                    }
                    // 存在则添加
                    map[key].item.push({
                        id: item.Fsinger_id,  // 歌手id
                        name: item.Fsinger_name,    // 歌手name
                        picUrl: `http://y.gtimg.cn/music/photo_new/T001R300x300M000${item.Fsinger_mid}.jpg?max_age=2592000`    // 歌手头像图片地址
                    })
                })
                // console.log(map)
                // 为了得到有序列表 处理 map
                // 根据定义的 title 分类
                let hot = []    // 热门
                let ret = []    // A-Z
                let remainder = []  // 剩余的
                for (let key in map) { // 遍历
                    let val = map[key]
                    if (val.title.match(/[a-zA-Z]/)) { // 利用正则匹配以字母开头的 title
                        // 添加到 ret
                        ret.push(val)
                    } else if (val.title == '热门') {     // 热门
                        hot.push(val)
                    } else {        // 剩余的
                        val.title = '#'
                        remainder.push(val)
                    }
                }
                // 排序
                ret.sort((a, b) => {
                    return a.title.charCodeAt(0) - b.title.charCodeAt(0)
                })
                return hot.concat(ret, remainder)
            },
            selectSinger(singer) {
                this.$router.push(`/detial/${singer.id}`)
                // console.log(singer.id)
                this.setSinger(singer)
            },
            // 保存到 store
            setSinger(singer) {
                this.$store.commit('SET_SINGER', singer)
                // console.log(this.$store.state.singer)
            }

        },
        components: {
            ListView, MHeader, Tab
        },
    }
</script>

<style scoped>
    .singer {
        position: fixed;
        top: 0;
        bottom: 0;
        width: 100%;
    }

</style>