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
            display: "none",
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

        mouseEnter() {
            var ul = document.getElementById('TimeL-ul')
            console.log("ul_li",ul)
            var li = ul.getElementsByTagName('li')
            console.log("li",li)
            if (li.length >= 5) {
                this.display = "flex";
            } else {
                this.display = "none";
            }
        },
        mouseLeave() {
            this.display = "none";
        },





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



//             setTimeout(function () {
//                 var chefElement = {
//                     minSpeed: 10,//每次移动的距离
//                     //获取页面元素
//                     prev: document.getElementById('prev'),
//                     next: document.getElementById('next'),
//                     parent: document.getElementById('parent'),
//                     ul: document.getElementById('TimeL-ul'),
//                     li: document.getElementById('TimeL-ul').getElementsByTagName('li'),
//                     liWidth: document.getElementById('TimeL-ul').getElementsByTagName('li')[0].offsetWidth,
//                     type: true,
//                     nextTimer: null,
//                     prevTimer: null,
//                     parent_n: null
//                 }
// console.log("chefElement:",chefElement.li)
//                 chefElement.prev.onclick = function () {
//                     if (chefElement.type) {
//                         clearInterval(chefElement.prevTimer);
//                         chefElement.ul.insertBefore(chefElement.li[chefElement.li.length - 1], chefElement.li[0]);
//                         chefElement.liWidth = chefElement.li[0].offsetWidth;
//                         chefElement.ul.style.left = '-' + chefElement.liWidth + 'px';
//                         chefElement.prevTimer = setInterval(pre, chefElement.animationSpeed);
//                         chefElement.type = false;
//                     }
//                 };
//                 next.onclick = function () {
//
//                     if (chefElement.type) {
//                         chefElement.liWidth = 0;
//                         clearInterval(chefElement.nextTimer);
//                         chefElement.nextTimer = setInterval(nex, chefElement.animationSpeed);
//                         chefElement.type = false;
//                     }
//                 };
//
//                 //next动画函数
//                 function nex() {
//
//                     chefElement.ul.style.left = '-' + chefElement.liWidth + 'px';
//                     chefElement.liWidth += chefElement.minSpeed;
//                     if (chefElement.liWidth >= chefElement.li[0].offsetWidth) {
//                         clearInterval(chefElement.nextTimer);
//                         chefElement.ul.appendChild(chefElement.li[0]);
//                         chefElement.ul.style.left = 0;
//                         chefElement.type = true;
//                     }
//                 }
//
//                 //prev动画函数
//                 function pre() {
//
//                     chefElement.ul.style.left = '-' + chefElement.liWidth + 'px';
//                     chefElement.liWidth -= chefElement.minSpeed;
//                     if (chefElement.liWidth <= -1) {
//                         chefElement.ul.style.left = 0;
//                         clearInterval(chefElement.prevTimer);
//                         chefElement.type = true;
//                     }
//                 }
// // *****限时竞拍******
//             }, 2000)
//             var that = this
//             let TL = document.getElementsByClassName('Time-limited_list')[0].getElementsByTagName('li')
//             let TLWidth = TL[0].offsetWidth
//             that.TLlength = TL.length * TLWidth


    },
    created(){
        this.cooperatbrand()
    }

}
</script>

<style>

</style>
