<template>
    <div :class="classes">
        <ul class="coorperatTitle">
            <!--                <li  :class="{tabs_tab_active: currentValue === index}" v-for="(item,index) in coorper" :key="index" @click="handleChange(index)">{{item.name}}</li>-->
            <li class="tabs_tab_active"  >合作品牌</li>
        </ul>
        <ul class="logisticImage" >
            <template v-for="(item, index) in brandList"  >
                <li v-for="(items, k) in item" :key="k" v-if="k<14">
                    <div class="flip_wrap">
                        <div class="flip">
                            <!-- 正面-->
                            <div class="side front"><img :src="items.image"/></div>
                            <!-- 反面 -->
                            <div class="side back"><div class="text">{{ items.name }}</div></div>
                        </div>
                    </div>
                </li>
            </template>
        </ul>


    </div>
</template>

<script>
    const prefixCls = 'ant-cobrands'
    import { mapState } from 'vuex'
    import { parse } from 'qs'
    import { cooperativeBrand } from '~/api/coobrand'
    export default {
        name: "cobrands.vue",

        props: {
            isDelivery: {
                default: '0'
            },
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
        methods:{
            async cooperatbrand() {
                let params = {
                    current_page: 1,
                    page_size: 52,
                    isDelivery:this.isDelivery
                }
                const res = await cooperativeBrand(this, params)
                let cobrand = res.data.items
                console.log("cobrand:", cobrand)
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
                    console.log("brandList:",this.brandList)
                }
            }
        },
        created(){
            this.cooperatbrand()
        }

    }
</script>

<style lang="less">

    .flip_wrap{
        display: inline-block;
        width:100%;height: 100%;
        transform-style: preserve-3d;
        perspective:2000px;/*perspective属性定义3D元素距视图的距离,以像素计。该属性允许您改变 3D 元素查看 3D 元素的视图。*/
        -webkit-perspective:2000px;
        -moz-perspective:2000px;
        -ms-perspective:2000px;
        -o-perspective:2000px;
        box-sizing:border-box;
    }
    .flip{
        width:100%;
        height:100%;
        position: relative;
        backface-visibility:hidden;/*背对屏幕时隐藏*/
        -webkit-backface-visibility:hidden;
        -moz-backface-visibility:hidden;
        -ms-backface-visibility:hidden;
        -o-backface-visibility:hidden;
        transition: all 1s ease; /*为翻牌添加过渡效果*/
        -webkit-transition: all 1s ease;
        -moz-transition: all 1s ease;
        -ms-transition: all 1s ease;
        -o-transition: all 1s ease;
        transform-style: preserve-3d; /*子元素将保留其 3D 位置。*/
        -webkit-transform-style: preserve-3d; /*子元素将保留其 3D 位置。*/
    }
    .side{
        width:100%;
        height:100%;
        position: absolute;/*让背面和正面重叠*/
        left: 0;
        top: 0;
        font-size: 16px;
        text-align: center;
    }
    .front{
        font-size: 18px;
        background:#fff;
        display: flex;
        justify-content: center;
        align-items: center;
        img{
            width: 180px;
            height: 90px;
        }
    }
    .back{
        backface-visibility:hidden;/*背对屏幕时隐藏*/
        -webkit-backface-visibility:hidden;
        -moz-backface-visibility:hidden;
        -ms-backface-visibility:hidden;
        -o-backface-visibility:hidden;
        -webkit-transform:rotateY(180deg);
        -moz-transform:rotateY(180deg);
        -ms-transform:rotateY(180deg);
        -o-transform:rotateY(180deg);
        background: #FFFFFF;
        padding: 20px;
        box-sizing: border-box;
        .text{
            text-align: left;
            text-indent: 30px;
            color: #666666;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 6;
            -webkit-box-orient: vertical;
        }

    }
    .flip_wrap:hover .flip{
        transition: all 1s ease; /*为翻牌添加过渡效果*/
        -webkit-transition: all 1s ease;
        -moz-transition: all 1s ease;
        -ms-transition: all 1s ease;
        -o-transition: all 1s ease;
        transform:rotateY(180deg);
        -webkit-transform:rotateY(180deg);
        -moz-transform:rotateY(180deg);
        -ms-transform:rotateY(180deg);
        -o-transform:rotateY(180deg);
    }



    .logisticImage{
        display: flex;
        flex-wrap:wrap;
    }
    .logisticImage li{
        width: 300px;
        height: 200px;
    }








</style>
