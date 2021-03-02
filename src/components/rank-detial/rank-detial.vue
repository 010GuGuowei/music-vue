<template>
    <div class="top-list">
<!--        <p>toplist</p><p>toplist</p><p>toplist</p><p>toplist</p><p>toplist</p><p>toplist</p><p>toplist</p>-->
        <music-list :title="title" :bg-image="image" :songs="this.songs"></music-list>
    </div>
</template>

<script>
    import axios from 'axios'
    import MusicList from '../music-list/music-list'

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
                // console.log(this.rank)
                axios.get(`/top?id=${this.rank.id}`).then( res => {
                    console.log(res.data.data)
                    // this.rank.image = res.data.data.info.picUrl
                    // console.log(this.rank.image)
                    this.getSongsList(res.data.data.list)
                })
            },
            // 处理数据 拿到歌曲列表
            getSongsList(list){
                // console.log(list)
                list.forEach(item => {
                    let song = {
                        id : item.songId,
                        name : item.name,
                        singer : item.singerName,
                        album : item.album.name,
                        rank : item.rank
                    }
                    // console.log(song)
                    this.songs.push(song)
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

</style>
