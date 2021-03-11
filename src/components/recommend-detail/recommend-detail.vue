<template>
    <transition appear name="slide">
        <music-list :title="title" :bg-image="image" :songs="this.songs"></music-list>
    </transition>
</template>

<script>

    import MusicList from '../music-list/music-list'
    import {createSong, isValidMusic, processSongsUrl} from '../../common/js/song'
    import {getUrl,getPlayUrl} from "../../common/js/getUrl";
    import axios from 'axios'

    export default {
        name: "recommend_detial",
        created() {
            this._getSongList()
        },
        data() {
            return {
                songs: []
            }
        },
        methods: {
            // 请求获取歌曲列表
            _getSongList() {
                let id = this.$store.state.discList.id
                if (!id) {
                    this.$router.push('/recommend')
                    return
                }
                // console.log(id)
                axios.get(`/songlist?id=${id}`).then(res => {
                    // console.log(res.data.data.songlist)
                    // 处理请到的数据
                    let list = this._normalizeSongs(res.data.data.songlist)
                    getPlayUrl(list).then(res => {
                        console.log('getPlayUrl',res)
                        this.songs = res
                    })
                }).catch(err => {
                    console.log(err)
                })
            },
            // 处理数据
            _normalizeSongs(list) {
                let ret = []
                list.forEach((musicData) => {
                    if (isValidMusic(musicData)) {
                        ret.push(createSong(musicData))
                    }
                })
                // console.log(ret)
                return ret
            },
            // 处理获取到的数据
            // normalizeSongs(list) {
            //     let data = []
            //     // console.log('处理数据前',list)
            //     // 遍历数据拿到歌曲列表
            //     list.forEach(item => {
            //         let song = {
            //             // id: item.id,
            //             lyric: '',
            //             interval: item.interval,
            //             name: item.songname,
            //             mid: item.songmid,
            //             singer: item.singer[0].name,
            //             album: item.albumname,
            //             url: '',
            //             image: `http://y.gtimg.cn/music/photo_new/T002R300x300M000${item.albummid}_1.jpg?max_age=2592000`
            //         }
            //         data.push(song)
            //     })
            //     // console.log(data)
            //     return  data
            // },
        },
        components: {
            MusicList
        },
        computed: {
            title() {
                return this.$store.state.discList.title
                // return this.discList.title
            },
            image() {
                return this.$store.state.discList.image
            }
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