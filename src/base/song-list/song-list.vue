<template>
    <div class="song-list">
        <ul>
            <li v-for="(item,index) in songs" class="item">
                <div class="rank" v-show="rank">
                    <span></span>
                </div>
                <div class="content">
                    <h2 class="name">{{item.name}}</h2>
                    <div class="desc">{{item.singer +'·'+ item.album}}</div>
                </div>
            </li>
        </ul>
    </div>
</template>

<script type="text/ecmascript-6">
    export default {
        props: {
            songs: {
                type: Array,
                default() {
                    return []
                }
            },
            rank: {
                type: Boolean,
                default: false
            }
        },
        methods: {
            selectItem(item, index) {
                this.$emit('select', item, index)
            },
            getDesc(song) {
                return `${song.singer}·${song.album}`
            },
            getRankCls(index) {
                if (index <= 2) {
                    return `icon icon${index}`
                } else {
                    return 'text'
                }
            },
            getRankText(index) {
                if (index > 2) {
                    return index + 1
                }
            }
        }
    }
</script>

<style scoped>
    .song-list .item {
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        height: 64px;
        font-size: 14px;
    }

    .song-list .item .rank {
        -webkit-box-flex: 0;
        -ms-flex: 0 0 25px;
        flex: 0 0 25px;
        width: 25px;
        margin-right: 30px;
        text-align: center;
    }

    .song-list .item .rank .icon {
        display: inline-block;
        width: 25px;
        height: 24px;
        background-size: 25px 24px;
    }

    .song-list .item .rank .icon.icon0 {
        background-image: url(./first@2x.png);
    }

    @media (-webkit-min-device-pixel-ratio: 3), (min-device-pixel-ratio: 3) {
        .song-list .item .rank .icon.icon0 {
            background-image: url(./first@3x.png)
        }
    }

    .song-list .item .rank .icon.icon1 {
        background-image: url(./second@2x.png)
    }

    @media (-webkit-min-device-pixel-ratio: 3), (min-device-pixel-ratio: 3) {
        .song-list .item .rank .icon.icon1 {
            background-image: url(./second@2x.png)
        }
    }

    .song-list .item .rank .icon.icon2 {
        background-image: url(./third@2x.png)
    }

    @media (-webkit-min-device-pixel-ratio: 3), (min-device-pixel-ratio: 3) {
        .song-list .item .rank .icon.icon2 {
            background-image: url(./third@3x.png)
        }
    }

    .song-list .item .rank .text {
        color: #ffcd32;
        font-size: 18px;
    }

    .song-list .item .content {
        -webkit-box-flex: 1;
        -ms-flex: 1;
        flex: 1;
        line-height: 20px;
        overflow: hidden;
    }

    .song-list .item .content .name {
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
        color: #fff;
    }

    .song-list .item .content .desc {
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
        margin-top: 4px;
        color: rgba(255, 255, 255, 0.3);
    }

</style>
