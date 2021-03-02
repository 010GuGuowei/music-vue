<template>

	<div class="detial">

		  <div class="music-list">
		    <!-- <div class="back" @click="back"> -->
		    <div class="back">
		      <i class="icon-back"></i>
		    </div>
		    <h1 class="title" v-html="data.title"></h1>
		    <div class="bg-image" :style="bgStyle" ref="bgImage">
		      <div class="play-wrapper">
		        <!-- <div ref="playBtn" v-show="songs.length>0" class="play" @click="random"> -->
		        <div ref="playBtn" v-show="data.length>0" class="play" >
		          <i class="icon-play"></i>
		          <span class="text">随机播放全部</span>
		        </div>
		      </div>
		      <!-- <div class="filter" ref="filter"></div> -->
		    </div>
<!-- 		    <div class="bg-layer" ref="layer"></div>
		    <scroll :data="songs" @scroll="scroll"
		            :listen-scroll="listenScroll" :probe-type="probeType" class="list" ref="list">
		      <div class="song-list-wrapper">
		        <song-list :songs="songs" :rank="rank" @select="selectItem"></song-list>
		      </div>
		      <div v-show="!songs.length" class="loading-container">
		        <loading></loading>
		      </div>
		    </scroll> -->
		  </div>
	</div>

</template>

<script>
	import MusicList from '../music-list/music-list'
	// import {
	// 	getSingerDetail
	// } from '../../api/singer'
	import axios from 'axios'
	import {
		createSong,
		isValidMusic,
		processSongsUrl
	} from '../../common/js/song'

	export default {
		name: "detial",

		data() {
			return {
				data: {},
				songs: [],
			}
		},
		created() {
			// 歌手详情
			this._getSingerDetial()
		},
		methods: {
			// singer 详情的请求
			_getSingerDetial() {
				// 拿到 store 里的data
				this.data = this.$store.state.data
				if (!this.data.url) { // 不通过歌手页面无法直接进入歌手详情页
					this.$router.push('/recommend')
					return
				}
				console.log(this.data)
				// 请求数据
				this.getDetial()

			},
			getDetial(){
				if(this.data.class == 'recommend'){
					console.log('请求推荐歌单',this.data.url)
					axios.get({
						url:`/${this.data.url}`
					}).then( res => {
						console.log(res.data)
					}).catch( err => {
						console.log('请求失败')
					})
				}
			}
			// 遍历获取到的数据 


		},
		computed: {
			title() {
				return this.data.name
			},
			bgStyle() {
				return `background-image:url(${this.data.image})`

			}
		},
		components: {
			MusicList
		}
	}
</script>
<style scoped>
.music-list {
        position: fixed;
        z-index: 100;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        background: #222;
    }
    .music-list .back {
        position: absolute;
        top: 0;
        left: 6px;
        z-index: 50;
    }
    .music-list .back .icon-back {
        display: block;
        padding: 10px;
        font-size: 22px;
        color: #ffcd32;
    }
    .music-list .title {
        position: absolute;
        top: 0;
        left: 10%;
        z-index: 40;
        width: 80%;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
        text-align: center;
        line-height: 40px;
        font-size: 18px;
        color: #fff;
    }
    .music-list .bg-image {
        position: relative;
        width: 100%;
        height: 0;
        padding-top: 70%;
        -webkit-transform-origin: top;
        transform-origin: top;
        background-size: cover;
    }
    .music-list .bg-image .play-wrapper {
        position: absolute;
        bottom: 20px;
        z-index: 50;
        width: 100%;
    }
    .music-list .bg-image .play-wrapper .play {
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        width: 135px;
        padding: 7px 0;
        margin: 0 auto;
        text-align: center;
        border: 1px solid #ffcd32;
        color: #ffcd32;
        border-radius: 100px;
        font-size: 0;
    }
    .music-list .bg-image .play-wrapper .play .icon-play {
        display: inline-block;
        vertical-align: middle;
        margin-right: 6px;
        font-size: 16px;
    }
    .music-list .bg-image .play-wrapper .play .text {
        display: inline-block;
        vertical-align: middle;
        font-size: 12px;
    }
    .music-list .bg-image .filter {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(7,17,27,0.4);
    }
    .music-list .bg-layer {
        position: relative;
        height: 100%;
        background: #222;
    }
    .music-list .list {
        position: absolute;
        top: 0;
        bottom: 0;
        width: 100%;
        background: #222;
    }
     .song-list-wrapper {
        padding: 20px 30px;
    }
    .music-list .list .loading-container {
        position: absolute;
        width: 100%;
        top: 50%;
        -webkit-transform: translateY(-50%);
        transform: translateY(-50%);
    }



</style>
