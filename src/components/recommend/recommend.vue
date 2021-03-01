<template>
    <div class="recommend" ref="recommend">
        <MHeader />
        <tab></tab>
        <scroll ref="scroll" class="recommend-content" :data="discList">
            <div>
                <div v-if="recommends.length" class="slider-wrapper">
                    <div class="slider-content">
                        <!-- 轮播图组件-->
                        <banner ref="slider">
                            <div v-for="(item,index) in recommends" :key="index">

        <!--    点击轮播图跳转   <a :href="item.h5Url">-->
                                <a >
                                    <img @load="loadImage" :src="item.picUrl">
                                </a>
                            </div>
                        </banner>

                    </div>
                </div>
                <!--推荐歌单列表-->
                <div class="recommend-list">
                    <h1 class="list-title">热门歌单推荐</h1>
                    <ul>
                        <li v-for="(item,index) in discList" class="item" :key="index" @click="selectItem(item)">
                            <div class="icon">
                                <img width="60" height="60" v-lazy="item.cover_url_big">
                            </div>
                            <div class="text">
                                <h2 class="name" v-html="item.title"></h2>
                                <p class="desc" v-html="item.creator_info.nick"></p>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
             <div class="loading-container" v-show="!discList.length">
                 <loading></loading>
             </div>
        </scroll>
        <router-view></router-view>
    </div>
</template>

<script>

    import MHeader from'../m-header/m-header';
    import Tab from'../tab/tab';

    // 引入滚动插件
    import Scroll from '../../base/scroll/scroll'
    import axios from 'axios'
    // 引入轮播图组件
    import Banner from '../../base/banner/banner'

    import Loading from '../../base/loading/loading'


    export default {
        name: "recommend",
        // 组件
        components: {
            Banner,
            Scroll,
            Loading,
            MHeader,
            Tab
        },

        data() {
            return {
                recommends: [],
                discList: [],
                detial:[],

            }
        },
        mounted() {
            this.getRecommend()
            setTimeout(() => {
                this.getPlayList()
            },1000)

        },

        // 方法
        methods: {
            // 获取轮播图的数据
            getRecommend() {
                // 发送请求,拿到轮播图的数据
                axios({
                    url: '/recommend/banner'
                }).then(res => {
                    // console.log(res)
                    this.recommends = res.data.data
                    // console.log(this.recommends)
                }).catch(err => console.log(err))
            },
            // 获取推荐歌单的数据
            getPlayList() {
                axios({
                    url: '/recommend/playList'
                }).then(res => {
                    this.discList = res.data.data.list
                    console.log(this.discList)

                }).catch(err => console.log(err))
            },
            loadImage(){
                if(!this.chackLoaded){
                    this.$refs.scroll.refresh()
                    this.chackLoaded = true
                }

            },
            // 点击跳转详情页面
            selectItem(item){
                // 获取歌单详情数据
                axios({
                    url:`songlist?id=${item.tid}`
                }).then( res => {
                    console.log(res.data.data)
                    this.detial = res.data.data
                }).catch( err => {
                    console.log(err)
                })
                // 跳转到详情
                // this.$router.push(`/detial/${item.disstid}`)
            },
            setRecommend(){
                console.log(item)
            }

        },
        computed:{
            title(){
                return this.detial.desc
            },
            bgImage(){
                return this.detial.dir_pic_url2
            },
            songs(){
                return this.detial.songlist
            }
        }


    }
</script>

<style scoped>
    .recommend {
        position: absolute;
        width: 100%;
        top: 0;
        bottom: 0;
    }

    .recommend .recommend-content {
        height: 100%;
        overflow: hidden;
    }

    .recommend .recommend-content .slider-wrapper {
        position: relative;
        width: 100%;
        height: 0;
        padding-top: 40%;
        overflow: hidden;
    }

    .recommend .recommend-content .slider-wrapper .slider-content {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
    }

    .recommend .recommend-content .recommend-list .list-title {
        height: 65px;
        line-height: 65px;
        text-align: center;
        font-size: 14px;
        color: #ffcd32;
    }

    .recommend .recommend-content .recommend-list .item {
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        padding: 0 20px 20px 20px;
    }

    .recommend .recommend-content .recommend-list .item .icon {
        -webkit-box-flex: 0;
        -ms-flex: 0 0 60px;
        flex: 0 0 60px;
        width: 60px;
        padding-right: 20px;
    }

    .recommend .recommend-content .recommend-list .item .text {
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-orient: vertical;
        -webkit-box-direction: normal;
        -ms-flex-direction: column;
        flex-direction: column;
        -webkit-box-pack: center;
        -ms-flex-pack: center;
        justify-content: center;
        -webkit-box-flex: 1;
        -ms-flex: 1;
        flex: 1;
        line-height: 20px;
        overflow: hidden;
        font-size: 14px;
    }

    .recommend .recommend-content .recommend-list .item .text .name {
        margin-bottom: 10px;
        color: #fff;
    }

    .recommend .recommend-content .recommend-list .item .text .desc {
        color: rgba(255, 255, 255, 0.3);
    }

    /*.recommend .recommend-content .loading-container {*/
    /*    position: absolute;*/
    /*    width: 100%;*/
    /*    top: 50%;*/
    /*    -webkit-transform: translateY(-50%);*/
    /*    transform: translateY(-50%);*/
    /*}*/


</style>