<template>

    <div class="detial">

        <music-list :title="title" :bg-image="bgImage" :songs="this.songs"></music-list>

    </div>

</template>

<script>
    import MusicList from '../music-list/music-list'
     import {getSingerDetail} from '../../api/singer'
     // import musicList from '../music-list/music-list'
     import { createSong,isValidMusic,processSongsUrl } from '../../common/js/song'

    export default {
        name: "detial",

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

            _getSingerDetial(){
                // 拿到 store 里的singer
                this.singer = this.$store.state.singer
                if(!this.singer.id){  // 不通过歌手页面无法直接进入歌手详情页
                    this.$router.push('/recommend')
                    return
                }
                console.log(this.singer)
                // 请求数据
                getSingerDetail(this.singer.id).then(res => {   //成功
                    if(res.code === 0){
                        // 处理返回的歌曲列表
                        this.songs = this.normalizeSongs(res.data.list)
                        console.log(this.songs)


                    }else{
                        console.log('服务器请求失败')
                    }
                })
            },
            // 遍历获取到的数据
            normalizeSongs(list){
                let data = []
                list.forEach( item => {
                   let {musicData} = item
                    if(isValidMusic(musicData)){
                        data.push(createSong(musicData))
                    }
                })
                return data
            }

        },
        computed: {
            title(){
               return this.singer.name
            },
            bgImage(){
                return this.singer.picUrl
            }
        },
        components:{
            MusicList
        }
    }
</script>

<style scoped>


</style>