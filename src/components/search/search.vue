<template>
    <div class="search">
        <MHeader/>
        <tab></tab>
        <div class="search-box-wrapper">
            <SearchBox ref="searchBox" @query="onQueryChange"></SearchBox>
        </div>
        <!-- 热门搜索 -->
        <div class="shortcut-wrapper" v-show="!query">
            <div class="shortcut">
                <div>
                    <div class="hot-key">
                        <h1 class="title">热门搜索</h1>
                        <ul>
                            <li class="item" v-for="(item,index) in searchHot" :key="index" @click="setQuery(item)">
                                <span>{{item}}</span>
                            </li>
                        </ul>
                    </div>
                    <!-- 搜索历史 -->
                    <div class="search-history">
                        <h2 class="title">
                            <span class="text">搜索历史</span>
                            <span class="clear" @click="clearHistory">
                                <i class="icon icon-clear"></i>
                            </span>
                        </h2>
                    </div>
                </div>
            </div>
        </div>
        <!-- 搜索列表 -->
        <div class="search-result" v-show="query">
            <suggest :query="query"></suggest>
        </div>
    </div>
</template>

<script>
    import MHeader from '../m-header/m-header';
    import SearchBox from '../../base/search-box/search-box'
    import Tab from '../tab/tab';
    import Suggest from '../suggest/suggest'
    import axios from 'axios'
    import BScroll from 'better-scroll'


    export default {
        name: "search",
        data() {
            return {
                searchHot: [],
                query: '',
                searchList: [],
                timer: ''
            }
        },
        components: {
            MHeader, Tab,SearchBox,Suggest,
        },
        created() {
            this.getSearchHot()
        },
        methods: {
            // 获取热门搜索
            getSearchHot() {
                axios.get('/search/hot').then(res => {
                    // console.log('热词' ,res.data.data)
                    this.normalizeSearchHot(res.data.data)
                }).catch(err => {
                    console.log('获取搜索热词失败', err)
                })
            },
            // 处理热词
            normalizeSearchHot(data) {
                // console.log('normalizeSearchHot', data)
                data.forEach(item => {
                    // console.log(item.k)
                    this.searchHot.push(item.k)
                })
                // 取出前十条数据
                this.searchHot.splice(10, 20)
                // console.log(this.searchHot)

            },
            // 处理搜索的结果
            // normalizeSearch(list) {
            //     list.forEach(item => {
            //         let song = {
            //             id: item.songmid,
            //             name: item.songname,
            //             singer: item.singer[0].name,
            //             album: item.albumname
            //         }
            //         this.searchList.push(song)
            //     })
            //     console.log(this.searchList)
            // },

            // 热词的点击效果
            setQuery(item){
                this.$refs.searchBox.addQuery(item)
            },
            // 清空搜索框
            clear() {
                console.log('clear')
                this.query = ""
            },
            // 清空历史搜索记录
            clearHistory() {
                console.log('清空搜索记录')
            },
            onQueryChange(query){
              this.query = query
            },

        },
        watch: {
            // 监听input框
            query(newVal) {
                clearTimeout(this.timer)
                if(!newVal){
                    return
                }
                this.query = newVal
                console.log('this.query',this.query)

            }
        }
    }
</script>

<style scoped>
    .search .search-box-wrapper {
        margin: 20px;
    }

    .search .shortcut-wrapper {
        position: fixed;
        top: 178px;
        bottom: 0;
        width: 100%;
    }

    .search .shortcut-wrapper .shortcut {
        height: 100%;
        overflow: hidden;
    }

    .search .shortcut-wrapper .shortcut .hot-key {
        margin: 0 20px 20px 20px;
    }

    .search .shortcut-wrapper .shortcut .hot-key .title {
        margin-bottom: 20px;
        font-size: 14px;
        color: rgba(255, 255, 255, 0.5);
    }

    .search .shortcut-wrapper .shortcut .hot-key .item {
        display: inline-block;
        padding: 5px 10px;
        margin: 0 20px 10px 0;
        border-radius: 6px;
        background: #333;
        font-size: 14px;
        color: rgba(255, 255, 255, 0.3);
    }

    .search .shortcut-wrapper .shortcut .search-history {
        position: relative;
        margin: 0 20px;
    }

    .search .shortcut-wrapper .shortcut .search-history .title {
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        height: 40px;
        font-size: 14px;
        color: rgba(255, 255, 255, 0.5);
    }

    .search .shortcut-wrapper .shortcut .search-history .title .text {
        -webkit-box-flex: 1;
        -ms-flex: 1;
        flex: 1;
    }

    .search .shortcut-wrapper .shortcut .search-history .title .clear {
        position: relative;

    }

    .search .shortcut-wrapper .shortcut .search-history .title .clear:before {
        content: '';
        position: absolute;
        top: -10px;
        left: -10px;
        right: -10px;
        bottom: -10px;
    }

    .search .shortcut-wrapper .shortcut .search-history .title .clear .icon-clear {
        font-size: 14px;
        color: rgba(255, 255, 255, 0.3);
    }

    .search .search-result {
        position: fixed;
        width: 100%;
        top: 178px;
        bottom: 0;
    }



</style>