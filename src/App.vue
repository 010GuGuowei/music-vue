<template>
  <div id="app">
<!-- <m-header></m-header>-->
<!--    <MHeader /> &lt;!&ndash; 两种方式&ndash;&gt;-->
<!--    <tab></tab>-->

        <router-view />
        <player></player>
  </div>

</template>

<script >

import Player from './components/player/player'


  export default {
    components:{
        Player
    }

  }


</script>

<style spoced>
    @import url(./common/stylus/res.css);
    *{touch-action: none;}
  body{
    background-color:#222;
    color:#ffcd32;
  }



</style>