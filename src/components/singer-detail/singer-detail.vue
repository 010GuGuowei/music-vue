<template>

    <div class="singer-detail">
        <transition appear name="slide">
            <music-list :title="title" :bg-image="bgImage" :songs="this.songs"></music-list>
            <!--        <router-view></router-view>-->
        </transition>
    </div>

</template>

<script>
    import MusicList from '../music-list/music-list'
    import {getUrl, getPlayUrl} from '../../common/js/getUrl'
    import axios from 'axios'


    export default {
        name: "singer-detail",

        data() {
            return {
                singer: {},
                songs: [],
            }
        },
        created() {
            // 歌手详情
            this._getSingerDetial()
        },
        methods: {

            // _getSingerDetial() {
            //     // 拿到 store 里的singer
            //     this.singer = this.$store.state.singer
            //     // console.log(this.singer)
            //     if (!this.singer.id) {  // 不通过歌手页面无法直接进入歌手详情页
            //         this.$router.push('/singer')
            //         return
            //     }
            //     // 请求数据
            //     axios.get('singer/songs',{
            //        params :{
            //            singermid : this.singer.id,
            //            page : 1,
            //            num : 60
            //        }
            //     }).then(res => {
            //         // console.log(res.data.data)
            //         this.songs =  this. normalizeSongs(res.data.data.list)
            //     }).catch( err => {
            //         console.log( err)
            //     })
            // },
            // // 处理拿到的数据
            // normalizeSongs(list) {
            //     // console.log(list)
            //     let data = []
            //     list.forEach(item => {
            //         let song = {
            //             id : item.id,
            //             mid : item.mid,
            //             name : item.name,
            //             filename :`C400${item.mid}.m4a`,
            //             singer : item.singer[0].name,
            //             lyric : '',     // 歌词
            //             album : item.album.name,
            //             image : `https://y.gtimg.cn/music/photo_new/T002R300x300M000${item.album.pmid}.jpg?max_age=2592000`,
            //             /*歌曲时长*/
            //             interval : item.interval,
            //             /* 图片地址 https://y.gtimg.cn/music/photo_new/T002R300x300M000000MkMni19ClKG_3.jpg?max_age=2592000*/
            //             /*        https://isure.stream.qqmusic.qq.com/C4000013WPvt4fQH2b.m4a?guid=9010401956&vkey=1AF12C069E76EF4EEC919F4D898F2E448C1DE2BCC33F7AA1484D127BE908E0A9C3642F48C46A97D7BA2A41549216F129FF25525D89DB1580&uin=0&fromtag=66*/
            //             /*播放地址 https://isure.stream.qqmusic.qq.com/C400${item.mid}.m4a?guid=9010401956&vkey=E95E9D00B21DC8D651D9046449BDD1449184B487771F8024EDB9589A9357D111C35EDB2835B560AAF555771FC7A43C1E59C299022362CC11&uin=1427698733&fromtag=66*/
            //             url : ''
            //         }
            //         data.push(song)
            //
            //     })
            //     // console.log(processSongsUrl)
            //     // lyricGet(data)
            //     processSongsUrl(data)
            //     return data
            //
            // }

            _getSingerDetial() {
                this.singer = this.$store.state.singer
                console.log(this.singer)
                // 若果不是从歌手页面跳转到详情则返回歌手页面
                if (!this.singer.id) {
                    this.$router.push(`/singer`)
                    return
                }
                // 请求服务器获取歌曲列表
                axios.get(`/singer/songs?singermid=${this.singer.id}&num=60`).then(res => {
                    // console.log(res.data.data.list)
                    this.normalizeSongs(res.data.data.list)
                }).catch(err => {
                    console.log(err)
                })

            },
            // 处理数据，拿到需要的
            normalizeSongs(list) {
                // console.log(list)
                let data = []
                list.forEach(item => {
                    let song = {
                        id: item.id,
                        mid: item.mid,
                        name: item.name,
                        filename: `C400${item.mid}.m4a`,
                        singer: item.singer[0].name,
                        lyric: '',     // 歌词
                        album: item.album.name,
                        image: `https://y.gtimg.cn/music/photo_new/T002R300x300M000${item.album.pmid}.jpg?max_age=2592000`,
                        /*歌曲时长*/
                        duration: item.interval,
                        /* 图片地址 https://y.gtimg.cn/music/photo_new/T002R300x300M000000MkMni19ClKG_3.jpg?max_age=2592000*/
                        /*        https://isure.stream.qqmusic.qq.com/C4000013WPvt4fQH2b.m4a?guid=9010401956&vkey=1AF12C069E76EF4EEC919F4D898F2E448C1DE2BCC33F7AA1484D127BE908E0A9C3642F48C46A97D7BA2A41549216F129FF25525D89DB1580&uin=0&fromtag=66*/
                        /*播放地址 https://isure.stream.qqmusic.qq.com/C400${item.mid}.m4a?guid=9010401956&vkey=E95E9D00B21DC8D651D9046449BDD1449184B487771F8024EDB9589A9357D111C35EDB2835B560AAF555771FC7A43C1E59C299022362CC11&uin=1427698733&fromtag=66*/
                        url: ''
                    }
                    data.push(song)
                })
                getPlayUrl(data).then(res => {
                    // console.log(res)
                    this.songs = res
                })
            },


            // 处理返回的数据
            _normalizeSongs(list) {
                let ret = []
                list.forEach((item) => {
                    let {musicData} = item
                    if (isValidMusic(musicData)) {
                        ret.push(createSong(musicData))
                    }
                })
                // console.log(ret)
                return ret
            }

        },
        computed: {
            title() {
                return this.singer.name
            },
            bgImage() {
                return this.singer.avatar
            }
        },
        components: {
            MusicList
        }
    }
</script>

<style scoped>

    .slide-enter-active, .slide-leave-active {
        transition: all 0.3s
    }


    .slide-enter, .slide-leave-to {
        transform: translate3d(100%, 0, 0)
    }


</style>