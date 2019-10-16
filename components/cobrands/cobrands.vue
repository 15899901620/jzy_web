<template>
    <div :class="classes">
<!--        <carousel-->
<!--            :autoplay="true"-->
<!--            :height = "174"-->
<!--            :autoplay-speed="9000">-->
<!--            <carousel-item  v-for="(item, index) in brandList" :key="index">-->
<!--                <ul class="coorperList">-->
<!--                    <li v-for="(items, k) in item" :key="k">-->
<!--                        <a href="#"><img :src="returnImage(items)"/></a>-->
<!--                    </li>-->
<!--                </ul>-->
<!--            </carousel-item>-->
<!--        </carousel>-->

            <ul class="coorperatTitle">
                <li  :class="{tabs_tab_active: currentValue === index}" v-for="(item,index) in coorper" :key="index" @click="handleChange(index)">{{item.name}}</li>
            </ul>

            <ul class="coorperList" v-show="currentValue === 0">
                <template v-for="(item, index) in brandList"  >
                    <li v-for="(items, k) in item" :key="k" v-if="k<7">
                        <a href="#"><img :src="items.image"/></a>
                    </li>
                </template>
            </ul>

            <ul class="Link" v-show="currentValue === 1">
                <li v-for="(item, index) in $store.state.common.friendlyList" :key="index">
                    <a :href="item.linkUrl" target="_blank">{{ item.name }}</a>
                </li>
            </ul>

    </div>
</template>

<script>
import carousel from '../carousel'
const prefixCls = 'ant-cobrands'
import { mapState } from 'vuex'
import { parse } from 'qs'
import { cooperativeBrand } from '~/api/coobrand'
import Swiper from 'swiper';


export default {
    name: 'cobrands',
    components:{
        carousel,
        carouselItem:carousel.item
    },
    data() {
        return {
            brandList: [],
            cobrandData:[],
            currlist:[],
            coorper:[
                {name:"合作品牌"},
                {name:"友情链接"},
            ],
            currentValue: 0
        }
    },
    computed:{
        ...mapState({
            cobrandsInfo: state => state.home.cobrandsInfo,
        }),
        classes() {
            return [
                `${prefixCls}`,
                { [`${prefixCls}-cobrands`]: this.vertical },
            ];
        },
    },
    methods: {

        //点击tab标题触发
        handleChange: function(index) {
             this.currentValue=index
        },

        returnImage (res) {
            return parse(res).image
        },
        async cooperatbrand() {
            let params = {
                current_page: 1,
                page_size: 52,
            }
            const res = await cooperativeBrand(this, params)
            let cobrand = res.data.items
            let total = res.data.total
            if(cobrand) {
                let i = 0
                let a = 14
                let b = 0
                let da = []
                let ba =[]
                if(total > a) {
                  let towdata = []
                  let showdata = []
                  let m =[]
                  for(let k in cobrand) {
                    if(i < a){
                      towdata.push(Object.assign({}, cobrand[k]))
                      m[b] = towdata
                      i = i+1
                    }else{
                      towdata =[]
                      b = b+1
                      i = 0
                    }
                  }
                  this.brandList = m
                }else{
                  let onedata = []
                  for(let k in cobrand) {
                    onedata.push(Object.assign({}, cobrand[k]))
                  }
                  this.brandList.push(onedata)
                }

            }
        }
    },
    mounted(){
        console.log('brandList:',this.brandList)
        new Swiper ('.swiper-container', {
            loop: true,
            // 如果需要分页器
            pagination: '.swiper-pagination',
            // 如果需要前进后退按钮
            nextButton: '.swiper-button-next',
            prevButton: '.swiper-button-prev',
            // 如果需要滚动条
            scrollbar: '.swiper-scrollbar',
        })
    },
    created(){
        this.cooperatbrand()
    }

}
</script>

<style>

</style>
