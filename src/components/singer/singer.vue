<template>
    <div class="singer">
        <MHeader/>
        <tab></tab>
        <list-view :data="singerList" @select="selectSinger"/>
        <router-view></router-view>
    </div>
</template>

<script>

    // 获取常用汉字拼音的方法
    import pinyin from '../../base/pinyin/pinyin'
    import axios from 'axios'
    import ListView from '../../base/listview/listview'
    import MHeader from '../m-header/m-header';
    import Tab from '../tab/tab';

    // 热门歌手数据的条数
    const HOT_SINGER_LEN = 10
    const HOT_NAME = '热门'

    export default {
        name: "singer",
        created() {
            this._getSingerList()
        },
        activated(){

        },
        data() {
            return {
                singerList: [],
            }
        },
        methods: {
            // 获取歌手列表数据
            _getSingerList() {
                axios.get('singer/list').then(res => {
                    // console.log(res.data.data.list)
                   this.singerList= this.normalizeSinger(res.data.data.list)
                    // console.log(res.data.data.list)
                }).catch(err => {
                    console.log('歌手列表获取失败', err)
                })
            },

            // 歌手列表的排序与分组
            normalizeSinger(list) {
               // console.log(list)
                // 保存排序后的数据
                let data = {
                    singer: {
                        title: '热门',
                        items: []
                    }
                }
                // 遍历添加前十条数据到 hot
                list.forEach((item, index) => {
                    if (index < HOT_SINGER_LEN) {
                        data.singer.items.push({
                            id: item.singer_mid,
                            name: item.singer_name,
                            //picUrl: item.singer_pic
                            avatar :`http://y.gtimg.cn/music/photo_new/T001R300x300M000${item.singer_mid}.jpg?max_age=2592000`
                            // picUrl: `//y.gtimg.cn/music/photo_new/T001R300x300M000${item.singer_mid}.jpg?max_age=2592000`
                        })
                    }
                    // 获取汉字的首字母,给获取到的数据添加拼音键值对
                    // console.log(pinyin.GetJP('周杰伦').substr(0,1))
                    item.pinyin = pinyin.GetJP(item.singer_name).substr(0, 1)
                    // console.log('pinyin',list)
                    // 根据首字母进行分类
                    let key = item.pinyin = pinyin.GetJP(item.singer_name).substr(0, 1)
                    // console.log(key)
                    if(!data[key]){
                        data[key] = {
                            title : key,
                            items : []
                        }
                    }
                    if(data[key]){
                        data[key].items.push({
                            id: item.singer_mid,
                            name: item.singer_name,
                            // picUrl : item.singer_pic
                            avatar: `http://y.gtimg.cn/music/photo_new/T001R300x300M000${item.singer_mid}.jpg?max_age=2592000`
                        })
                    }
                })
                // console.log(data)
                // 排序
                let hot = []
                let ret = []
                for (let key in data) {

                    let val = data[key]
                    // console.log(val)
                    // 利用正则匹配以字母开头的 title
                    if (val.title.match(/[a-zA-Z]/)) {
                        // 添加到 ret
                        ret.push(val)
                    } else if (val.title == '热门') {     // 热门
                        hot.push(val)
                    }
                }
                // console.log(hot,ret)
                // 排序
                ret.sort((a, b) => {
                    return a.title.charCodeAt(0) - b.title.charCodeAt(0)
                })
                return hot.concat(ret)
            },

            // 跳转到详情
            selectSinger(singer) {
                this.$router.push(`/singer-detail/${singer.id}`)
                // console.log(singer.id)
                this.setSinger(singer)
            },
            // 保存到 store
            setSinger(singer) {
                // console.log(singer)
                this.$store.commit('SET_SINGER', singer)
                // console.log(this.$store.state.singer)
            },
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