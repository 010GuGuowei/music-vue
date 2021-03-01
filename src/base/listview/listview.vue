<template>
    <scroll class="listview" :data="data" ref="listview">
        <ul>
            <li v-for="group in data" class="list-group" ref="listGroup">
                <h2 class="list-group-title">{{group.title}}</h2>
                <ul>
                    <li v-for="item in group.item" class="list-group-item" @click="selectItem(item)">
                        <img class="avatar" v-lazy="item.picUrl">
                        <span class="name">{{item.name}}</span>
                    </li>
                </ul>
            </li>
        </ul>
        <!-- 右侧导航栏 -->
        <div class="list-shortcut" @touchstart="onShortcutTouch" @tuchmove.stop.prevent="onShortcutTouchMove">
            <ul>
                <li v-for="(item , index ) in shortcutList" class="item" :data-index="index">
                    {{item}}
                </li>
            </ul>
        </div>


        <!--        <div class="list-fixed" ref="fixed" v-show="fixedTitle">-->
        <!--            <div class="fixed-title">{{fixedTitle}}</div>-->
<!--                </div>-->
<!--                <div v-show="!data.length" class="loading-container">-->
                    <loading></loading>
    </scroll>


</template>

<script>
    import Scroll from '../scroll/scroll'   // 引入局部滚动组件
    import {getData} from '../../common/js/dom'     // 获取和设置自定义属性得方法
    import Loading from '../../base/loading/loading'

    export default {
        props: {
            data: {
                type: Array,
                default: []
            }
        },
        components: {
            Scroll,Loading
        },
        name: "listview",
        methods: {
            onShortcutTouch(e) {
                let index = getData(e.target, 'index')
                this.$refs.listview.scrollToElement(this.$refs.listGroup[index], 0)
            },
            // onShortcutTouchMove(){
            //
            // },
            // 派发事件,知道点击的是哪个元素 传给singer组件
            selectItem(item) {
                this.$emit('select', item)
                // console.log(item)
            }
        },
        computed: {
            shortcutList() {
                return this.data.map(group => {
                    return group.title.substring(0, 1)
                })
            }
        }


    }
</script>

<style scoped>
    .listview {
        position: relative;
        width: 100%;
        height: 100%;
        overflow: hidden;
        background: #222;
    }

    .listview .list-group {
        padding-bottom: 30px;
    }

    .listview .list-group .list-group-title {
        height: 30px;
        line-height: 30px;
        padding-left: 20px;
        font-size: 12px;
        color: rgba(255, 255, 255, 0.5);
        background: #333;
    }

    .listview .list-group .list-group-item {
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        padding: 20px 0 0 30px;
    }

    .listview .list-group .list-group-item .avatar {
        width: 50px;
        height: 50px;
        border-radius: 50%;
    }

    .listview .list-group .list-group-item .name {
        margin-left: 20px;
        color: rgba(255, 255, 255, 0.5);
        font-size: 14px;
    }

    .listview .list-shortcut {
        position: absolute;
        z-index: 30;
        right: 0;
        top: 50%;
        -webkit-transform: translateY(-50%);
        transform: translateY(-50%);
        width: 20px;
        padding: 20px 0;
        border-radius: 10px;
        text-align: center;
        background: rgba(0, 0, 0, 0.3);
        font-family: Helvetica;
    }

    .listview .list-shortcut .item {
        padding: 3px;
        line-height: 1;
        color: rgba(255, 255, 255, 0.5);
        font-size: 12px;
    }

    .listview .list-shortcut .item.current {
        color: #ffcd32;
    }

    .listview .list-fixed {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
    }

    .listview .list-fixed .fixed-title {
        height: 30px;
        line-height: 30px;
        padding-left: 20px;
        font-size: 12px;
        color: rgba(255, 255, 255, 0.5);
        background: #333;
    }

    .listview .loading-container {
        position: absolute;
        width: 100%;
        top: 50%;
        -webkit-transform: translateY(-50%);
        transform: translateY(-50%);
    }

</style>