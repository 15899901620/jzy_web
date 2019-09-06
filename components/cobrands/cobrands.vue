<template>
    <div :class="classes">
        <carousel
            :autoplay="true"
            :height = "174"
            :autoplay-speed="9000">
            <carousel-item  v-for="(item, index) in brandList" :key="index">
                <ul class="coorperList">
                    <li v-for="(items, k) in item" :key="k">
                        <a href="#"><img :src="returnImage(items)"/></a>
                    </li>
                </ul>
            </carousel-item>
        </carousel>
    </div>
</template>

<script>
import carousel from '../carousel'
const prefixCls = 'ant-cobrands'
import { mapState } from 'vuex'
import {parse} from 'qs'
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
            currlist:[]
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
                  // console.log(this.brandList)

                  let onedata = []
                  for(let k in cobrand) {
                    onedata.push(Object.assign({}, cobrand[k]))
                  }
                  this.brandList.push(onedata)


                  // console.log(this.brandList.length)
                }
                
            }
        }
    },
    mounted(){
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
