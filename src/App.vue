<template>
  <div id="app">
<!-- <m-header></m-header>-->
<!--    <MHeader /> &lt;!&ndash; 两种方式&ndash;&gt;-->
<!--    <tab></tab>-->
    <keep-alive>
        <router-view />
    </keep-alive>
  </div>

</template>

<script >
  // 引入 m-header 组件
  import MHeader from'./components/m-header/m-header.vue';
  import Tab from'./components/tab/tab.vue';

// 引入axios
  import axios from 'axios'

  export default {
    components:{
      MHeader,Tab
    }

  }


</script>

<style spoced>
    @import url(./common/stylus/res.css);
  body{
    background-color:#222;
    color:#ffcd32;
  }
</style>