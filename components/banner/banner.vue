<template>
    <div :class="classes">
        <Carousel
            :autoplay="true"
            :height= heightNum
            :autoplay-speed="10000">
            <Carousel-item v-for="(item, index) in bannerData" :key="index">
                <div class="demo-carousel"   :style="{background: 'url(' + item.adImg + ')no-repeat center' }" >
                </div>
            </Carousel-item>
        </Carousel>
    </div>
</template>
<script>
import carousel from '../carousel'

const prefixCls = 'ant-banner'

export default {
    name: 'Banner',
    props: {
        bannerData:{
            type:Array,
            default: ()=>[]
        },
        heightNum: {
            type: Number,
            default:320
        }
    },
    components: {
       carousel,
       carouselItem:carousel.item
    },
    computed:{
        classes() {
            return [
                `${prefixCls}`,
                { [`${prefixCls}-shortcut`]: this.vertical },
            ];
        },
    }

}
</script>
<style lang="less">
    .demo-carousel{ width: 100%; height: 320px; }
</style>
