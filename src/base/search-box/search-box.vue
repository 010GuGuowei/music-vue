<template>
    <div class="search-box">
            <i class="icon-search icon"></i>
            <input class="box" v-model="query" :placeholder="placeholder">
            <i v-show="query" class="icon-dismiss icon" @click="clear"></i>
    </div>
</template>

<script>
    export default {
        name: "search-box",
        props: {
            placeholder:{
                type : String,
                default : '搜索歌曲'
            }
        },
        components: {},
        data() {
            return {
                query:''
            };
        },
        //方法
        methods: {
            clear(){
                console.log('清空搜索框')
                this.query = ''
            },
            addQuery(query){
                console.log('hotKey',query)
                this.query = query
            }
        },
        //计算属性
        computed: {},
        //侦听器
        watch: {
            query(newVal){
                this.$emit('query',newVal)
            }
        },
        //过滤器
        filters: {},

        //组件创建之前
        beforeCreate() {
        },
        //组件创建之后
        created() {
        },
        //页面渲染之前
        beforeMount() {
        },
        //页面渲染之后
        mounted() {
        },
        //页面视图数据更新之前
        beforeUpdate() {
        },
        //页面视图数据更新之后
        updated() {
        },
        //页面销毁之前
        beforeDestroy() {
        },
        //页面销毁之后
        destroyed() {
        },
    }
</script>

<style scoped>

    /*搜索框*/
    .search-box {
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        width: 100%;
        padding: 0 6px;
        height: 40px;
        background: #333;
        border-radius: 6px;
    }

    .search-box .icon-search {
        font-size: 24px;
        color: #222;
    }

    .search-box .box {
        -webkit-box-flex: 1;
        -ms-flex: 1;
        flex: 1;
        margin: 0 5px;
        line-height: 18px;
        background: #333;
        color: #fff;
        font-size: 14px;
        outline: 0;
    }

    .search-box .box::-webkit-input-placeholder {
        color: rgba(255, 255, 255, 0.3);
    }

    .search-box .box:-ms-input-placeholder {
        color: rgba(255, 255, 255, 0.3);
    }

    .search-box .box::-ms-input-placeholder {
        color: rgba(255, 255, 255, 0.3);
    }

    .search-box .box::placeholder {
        color: rgba(255, 255, 255, 0.3);
    }

    .search-box .icon-dismiss {
        font-size: 18px;
        color: #222;
    }
</style>