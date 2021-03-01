<template>
    <div class="loading">
        <img src="./loading.gif" height="24" width="24">
        <p class="desc">{{title}}</p>
    </div>
</template>

<script>
    export default {
        name: "loading",
        props:{
            title:{
                type:String,
                default:'正在载入...'
            }
        }

    }
</script>

<style scoped>
    .loading {
        width: 100%;
        text-align: center;
    }
    .loading .desc {
        line-height: 20px;
        font-size: 12px;
        color: rgba(255,255,255,0.5);
    }

</style>