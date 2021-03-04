<template>
    <transition appear name="slide">
        <music-list :title="title" :bg-image="image" :songs="this.songs"></music-list>
    </transition>
</template>

<script>

    import MusicList from '../music-list/music-list'
    import axios from 'axios'

    export default {
        name: "recommend_detial",
        created() {
            this.getData()
            this.getSongs()
        },
        data() {
            return {
                discList: [],
                songs: []
            }
        },
        methods: {
            getData() {  // 拿出store中的数据
                // console.log('请求数据')
                // 判断是否有数据
                if (!this.$store.state.discList.id) {
                    this.$router.push('/recommend')
                }
                this.discList = this.$store.state.discList
            },
            // 请求获取歌曲列表
            getSongs() {
                // console.log(this.discList.id)
                axios.get(`/songlist?id=${this.discList.id}`).then(res => {
                    // console.log(res.data)

                    // 处理数据
                    this.normalizeSongs(res.data.data)
                }).catch(err => {
                    console.log(err)
                })

            },
            // 处理获取到的数据
            normalizeSongs(data) {

                // console.log(data.songlist)
                // 遍历数据拿到歌曲列表
                data.songlist.forEach(item => {
                    let song = {
                        name: item.songname,
                        id: item.songmid,
                        singer: item.singer[0].name,
                        album: item.albumname
                    }
                    this.songs.push(song)
                    // console.log(this.songs)
                })
            }
        },
        components: {
            MusicList
        },
        computed: {
            title() {
                return this.discList.title
            },
            image() {
                return this.discList.image
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