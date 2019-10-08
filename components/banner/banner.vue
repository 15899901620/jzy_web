<template>
    <div :class="classes">
        <carousel
            :autoplay="true"
            :height= heightNum
            :autoplay-speed="10000">
            <carousel-item v-for="(item, index) in bannerData" :key="index">
                <div class="demo-carousel" style="display: flex; justify-content: center;"><img :src="item.adImg"/></div>
            </carousel-item>
        </carousel>
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
