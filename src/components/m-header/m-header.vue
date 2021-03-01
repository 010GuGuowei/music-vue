<template>
    <div class="m-header">
        <div class="icon"></div>
        <h1 class="text"> My Music</h1>
<!--        Header 组件-->
    </div>
</template>

<script>
    export default {
        name : 'm-header'
    }

</script>


<style scoped >
    .m-header {
        position: relative;
        height: 44px;
        text-align: center;
        color: #ffcd32;
        font-size: 0;
    }
    .m-header .icon {
        display: inline-block;
        vertical-align: top;
        margin-top: 6px;
        width: 30px;
        height: 32px;
        margin-right: 9px;
        background-img:url(./logo@2x111.png);
        background-size: 30px 32px;
    }
    @media (-webkit-min-device-pixel-ratio: 3), (min-device-pixel-ratio: 3) {
        .m-header .icon[data-v-be498722] {
            background-image: url(./logo@3x111.png);
        }
    }
    .m-header .text {
        display: inline-block;
        vertical-align: top;
        line-height: 44px;
        font-size: 18px;
    }
    .m-header .mine {
        position: absolute;
        top: 0;
        right: 0;
    }
    .m-header .mine .icon-mine {
        display: block;
        padding: 12px;
        font-size: 20px;
        color: #ffcd32;
    }

</style>