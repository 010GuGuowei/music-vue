import Vue from 'vue'
import Router from 'vue-router'


Vue.use(Router)

// 引入顶部导航部分的页面
import Recommend from '../components/recommend/recommend.vue' // 推荐页面
import Rank from '../components/rank/rank.vue'    // 排行页面
import Singer from '../components/singer/singer.vue'    // 歌手页面
import Search from '../components/search/search.vue'    // 搜索页面
import Detial from '../components/detial/detial'  // 歌手详情页



export default new Router({
  routes: [
    {
      path: '/',
     redirect:'/recommend'
    },
    {
      path: '/recommend',
      name: 'Recommend',
      component: Recommend
    },

    {
      path: '/rank',
      name: 'Rank',
      component: Rank
    },
    {
      path: '/singer',
      name: 'Singer',
      component: Singer,
    },
    {
      path:'/detial/:id',
      name:'detial',
      component: Detial
    },
    {
      path: '/search',
      name: 'Search',
      component: Search
    },
  ]
})
