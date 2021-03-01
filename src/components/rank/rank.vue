<template>
    <div class="rank">
        <MHeader />
        <tab></tab>
        <scroll class="toplist" :data="topList" ref="toplist">
            <div>
                <ul>
                    <li v-for="(item,index) in topList" class="item">
                        <div class="icon">
                            <img :src="item.picUrl" width="100" height="100">
                        </div>
                        <ul class="songlist">
                            <li v-for="(song,index) in item.songList" class="song">
                                <span>{{index + 1}}.</span>
                                <span>{{song.songname}} - {{song.singername}}</span>
                            </li>
                        </ul>
                    </li>
                </ul>

                <loading class="loading-container" v-show="!topList.length"></loading>
            </div>
        </scroll>
        <router-view></router-view>
    </div>


</template>

<script>

    import {getTopList} from "../../api/rank";
    import Scroll from '../../base/scroll/scroll'
    import Loading from '../../base/loading/loading'
    import MHeader from'../m-header/m-header';
    import Tab from'../tab/tab';

    export default {
        name: "rank",
        data() {
            return {
                topList: []
            }
        },
        created() {
            // 延时20
            setTimeout(() => {
                this._getTopList()
            }, 20)

        },
        methods: {
            // 获取排行榜列表
            _getTopList() {
                getTopList().then(res => {
                    this.topList = res.data.topList
                    console.log(this.topList)
                }).catch(err => {
                    console.log(err)
                })
            },
        },
        components: {
            Scroll,
            Loading,MHeader,Tab
        }

    }
</script>

<style scoped>

    .rank {
        position: fixed;
        width: 100%;
        top: 0;
        bottom: 0;
    }
    .rank .toplist {
        height: 100%;
        overflow: hidden;
    }
    .rank .toplist .item {
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        margin: 0 20px;
        padding-top: 20px;
        height: 100px;
    }

    .rank .toplist .item:last-child {
        padding-bottom: 20px;
    }

    .rank .toplist .item .icon {
        -webkit-box-flex: 0;
        -ms-flex: 0 0 100px;
        flex: 0 0 100px;
        width: 100px;
        height: 100px;
    }

    .rank .toplist .item .songlist {
        -webkit-box-flex: 1;
        -ms-flex: 1;
        flex: 1;
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
        padding: 0 20px;
        height: 100px;
        overflow: hidden;
        background: #333;
        color: rgba(255, 255, 255, 0.3);
        font-size: 12px;
    }

    .rank .toplist .item .songlist .song {
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
        line-height: 26px;
    }

    .rank .toplist .loading-container {
        position: absolute;
        width: 100%;
        top: 50%;
        -webkit-transform: translateY(-50%);
        transform: translateY(-50%);
    }

</style>