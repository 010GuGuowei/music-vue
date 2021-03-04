import Vue from 'vue'
import Router from 'vue-router'


Vue.use(Router)

// 引入顶部导航部分的页面
import Recommend from '../components/recommend/recommend.vue' // 推荐页面
import Rank from '../components/rank/rank.vue'    // 排行页面
import Singer from '../components/singer/singer.vue'    // 歌手页面
import Search from '../components/search/search.vue'    // 搜索页面
import SingerDetail from '../components/singer-detail/singer-detail'  // 歌手详情页
import RecommendDetial from '../components/recommend-detail/recommend-detail'  // 推荐歌单详情页
import RankDetial from '../components/rank-detail/rank-detail'

const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}

export default new Router({
    routes: [
        {
            path: '/',
            redirect: '/recommend',
        },
        {
            path: '/recommend',
            name: 'Recommend',
            component: Recommend,
        },
        {
            path: '/recommend-detial',
            name:'recommend-detial',
            component:RecommendDetial,
        },
        {
            path: '/rank',
            name: 'Rank',
            component: Rank,
        },
        {
            path:'/rank/:id',
            name:'rank_detial',
            component: RankDetial,
        },
        {
            path: '/singer',
            name: 'Singer',
            component: Singer,
        },
        {
            path: '/singer-detail/:id',
            name: 'singer-detail',
            component: SingerDetail
        },
        {
            path: '/search',
            name: 'Search',
            component: Search
        },

    ]
})
