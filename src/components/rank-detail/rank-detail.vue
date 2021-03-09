<template>
    <div class="top-list">
        <transition appear name="slide">
<!--        <p>toplist</p><p>toplist</p><p>toplist</p><p>toplist</p><p>toplist</p><p>toplist</p><p>toplist</p>-->
        <music-list :title="title" :bg-image="image" :songs="this.songs"></music-list>
        </transition>
    </div>
</template>

<script>
    import axios from 'axios'
    import MusicList from '../music-list/music-list'
    import { createSong, isValidMusic, processSongsUrl } from '../../common/js/song'


    export default {
        name: "rank-detial",
        created() {

            if(!this.$store.state.rank){
                this.$router.push('/rank')
                return
            }
            this.getRank()
            this.getRankList()
        },
        data(){
            return{
                rank:{},
                songs:[],
            }
        },
        methods:{
            getRank(){
                // 从 store 中拿出 rank
                this.rank = this.$store.state.rank
            },
            // 请求数据
            getRankList(){
                if(!this.rank.id){
                    this.$router.push('/rank')
                    return
                }
                // console.log(this.rank)
                axios.get(`/top?id=${this.rank.id}`).then( res => {
                    // console.log(res.data.data)
                    this.getSongsList(res.data.data.list)
                })
            },
            // 处理数据 拿到歌曲列表
            getSongsList(list){
                let data = []
                console.log(list)
                list.forEach(item => {
                    let song = {
                        id : item.id,
                        duration : item.interval,
                        mid : item.mid,
                        name : item.name,
                        singer : item.singerName,
                        album : item.album.name,
                        rank : item.rank,
                        lyric : '',
                        url : '',
                        filename : `C400${item.mid}.m4a`,
                        image : `http://y.gtimg.cn/music/photo_new/T002R300x300M000${item.album.pmid}.jpg?max_age=2592000`
                    }
                    // console.log(song)
                    data.push(song)
                })
                processSongsUrl(data).then(res => {
                    this.songs = res
                    // console.log(this.songs)
                })
            }
        },
        computed:{
          title(){
              return this.rank.title
          },
            image(){
              return this.rank.image
            }
        },
        components:{
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
