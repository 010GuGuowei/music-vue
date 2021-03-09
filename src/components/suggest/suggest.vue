<template>
    <div class="suggest">
        <ul>
            <li>
                <div class="icon">
                    <i></i>
                </div>
                <div class="name">
                    <p class="text"></p>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
    export default {
        name: "suggest",
        props: {
            query:{
                type : String,
                default : ''
            }
        },
        components: {},
        data() {
            return {};
        },
        //方法
        methods: {
            search(val){
                console.log(val)
            }
        },
        //计算属性
        computed: {},
        //侦听器
        watch: {
            query(newVal){
                this.search(newVal)
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

</style>