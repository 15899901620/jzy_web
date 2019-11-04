<template>
    <div :class="classes">
        <Carousel
            :autoplay="true"
            :height= heightNum
            :autoplay-speed="10000">
            <Carousel-item v-for="(item, index) in bannerData" :key="index">
                <div class="demo-carousel"  >
                    <img :src="item.adImg"/>
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
    .demo-carousel{
        img{width: 100%; height: 100%}
    }
</style>
