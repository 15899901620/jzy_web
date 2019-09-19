<template>
    <div class="body">
        <Header title="头部"></Header>
        <div class="container">
            <div class="w1200">
                <div class="mt10 fs14">
                    <a>巨正源首页</a> > <span class="gray">现货超市</span>
                    <span class="fr">共<span class="orangeFont">{{this.total}}</span>件相关产品</span>
                </div>

                <div class="screenList">
                    <!--原料分类-->
                    <div class="screenibre">
                        <dl class="fl filter_item">
                            <dt class="scTitle">原料分类：</dt>
                            <dd class="pro_brand_list" :class="categoryMore ? 'h50' : ''">
                                <a v-for="(item, index) in category" :key="index" @click="categoryClick(item.id)">
                                    {{item.name}}
                                </a>
                            </dd>
                        </dl>
                        <div class="fr pro_m_select" :class="categoryMore ? '' : 'arrow-up'" @click="categoryOpen">{{categoryMoreVal}}</div>
                    </div>
                    <!--加工级别-->
                    <div class="screenibre">
                        <dl class="fl filter_item">
                            <dt class="scTitle">加工级别：</dt>
                            <dd class="pro_brand_list" :class="processMore ? 'h50' : ''">
                                <a v-for="(item, index) in process" :key="index" @click="processClick(item.id)">
                                    {{item.name}}
                                </a>
                            </dd>
                        </dl>
                        <div class="fr pro_m_select" :class="processMore ? '' : 'arrow-up'" @click="processOpen">{{processMoreVal}}</div>
                    </div>
                    <!--用途-->
                    <!--<div class="screenibre">
                        <dl class="fl filter_item">
                            <dt class="scTitle">用途：</dt>
                            <dd class="pro_brand_list" :class="purposeMore ? 'h50' : ''">
                                <a v-for="(item, index) in purpose" :key="index" @click="purposeClick(item.id)">
                                    {{item.name}}
                                </a>
                            </dd>
                        </dl>
                        <div class="fr pro_m_select" :class="purposeMore ? '' : 'arrow-up'" @click="purposeOpen">{{purposeMoreVal}}</div>
                    </div>-->
                    <!--特性-->
                    <!--<div class="screenibre">
                        <dl class="fl filter_item">
                            <dt class="scTitle">特性：</dt>
                            <dd class="pro_brand_list" :class="featureMore ? 'h50' : ''">
                                <a v-for="(item, index) in feature" :key="index" @click="featureClick(item.id)">
                                    {{item.name}}
                                </a>
                            </dd>
                        </dl>
                        <div class="fr pro_m_select" :class="featureMore ? '' : 'arrow-up'" @click="featureOpen">{{featureMoreVal}}</div>
                    </div>
-->
                    <div class="XHsearch" style="display: flex;">
                        <span>厂商</span><input type="text" v-model="manufacturer" class="XHsearchInput" placeholder="请输入厂商"/>
                        <span class="ml15">牌号</span><input type="text" v-model="skuName" class="XHsearchInput" placeholder="请输入牌号"/>
                        <div v-if="isLogin" class="ml20">
                            <input type="text" v-model="minPrice" class="priceInput" placeholder="￥最低价"/>-
                            <input type="text" v-model="maxPrice" class="priceInput" placeholder="￥最高价"/>
                        </div>
                        <div class="xhBtn" @click="spotData">确定</div>
                    </div>
                </div>
                <!--现货列表-->
                <div class="mt20">
                    <div class="XhlistTitle">
                        <h1 style="width: 10%;">品种</h1>
                        <h1 style="width: 16%;">牌号</h1>
                        <h1 style="width: 16%;">厂商</h1>
                        <h1 style="width: 10%;">交货仓</h1>
                        <h1 style="width: 9%;">包装方式</h1>
                        <h1 style="width: 9%;">剩余数量（吨）</h1>
                        <h1 style="width: 11%;">单价（元/吨）</h1>
                        <h1 style="width: 8%;">距下架时间</h1>
                        <h1 style="width: 8%;">提货期限</h1>
                        <h1 style="width: 8%;">操作</h1>
                    </div>
                    <ul class="Xhlist">
                        <template v-if="spotlist">
                            <li v-for="(item, index) in spotlist" :key="index">
                                <span style="width: 10%;">{{item.category_name}}</span>
                                <span style="width: 16%;">{{item.sku_name}}</span>
                                <span style="width: 16%;white-space:nowrap;text-overflow:ellipsis;word-break:keep-all;overflow: hidden;">{{item.manufacturer}}</span>
                                <span style="width: 10%;">{{item.warehouse_name}}</span>
                                <span style="width: 9%;" v-if='item.packing_modes=="1"'>标准包装</span>
                                <span style="width: 9%;" v-else>非标准包装</span>
                                <span style="width: 9%;">{{item.available_num}}</span>
                     
                                <span v-if="isLogin" class="orangeFont" style="width: 11%;position:relative;text-align:right;padding-right:18px;">
                                    <Tag v-if="item.is_jry" color="error" style="padding:1px 5px;line-height:20px;float:left;position:absolute;left:5px;top:-3px;">易</Tag>
                                    <i style="padding-left:30px;">{{item.finalPriceFormat}}</i>
                                </span>
                                <span v-else class="orangeFont" style="width: 9%;" title="登录后查看">{{item.finalPriceFormat}}</span>
                                <span style="width: 8%;">
                                    <TimeDown :endTime="item.price_valid_time" hoursShow endMsg="已失效" :onTimeOver="reloadPage"></TimeDown>
                                </span>
                                <span style="width: 8%;">{{item.delivery_deadline}}</span>
                                <span style="width: 8%;">
                                    <div v-if="isLogin && item.available_num > 0" class="ListBtn" @click="addOrder(item.id)">下单</div>
                                    <div v-else-if="isLogin && item.available_num == 0" class="ListBtn">已售完</div>
                                    <div v-else class="ListBtn" @click="toLogin">登录</div>
                                </span>
                            </li>
                        </template>
                        <template v-else>
                            <li>
                                <p style="width:100%; text-align:center">暂无任何有效的报价信息！</p>
                            </li>
                        </template>
                    </ul>
                    <div class="whitebg ovh text-xs-center" style="padding: 30px 0" v-if="spotlist">
                        <pages :total="total" :show-total="showTotal" :value="current_page"></pages>
                    </div>
                </div>
            </div>
        </div>
        <Footer size="default" title="底部" style="margin-top:18px;"></Footer>
    </div>
</template>

<script>
    import Header from '../../components/header'
    import Footer from '../../components/footer'
    import pagination from '../../components/pagination'
    import { getCookies } from '../../config/storage'
    import { spotList, filterConditon } from '../../api/spot'
    import { sendHttp } from '../../api/common'
    import server from '../../config/api'
    import TimeDown from '../../components/timeDown'

    export default {
        name: "spot",
        fetch({store, params}) {
            return Promise.all([
                store.dispatch('menu/getMenuList'),
                store.dispatch('system/getSystemCnf'),
                store.dispatch('helper/getHelpCate', {parentId: 0, indexShow: 1}),
                store.dispatch('system/getLinksInfo'),

            ])
        },
        components: {
            Header,
            Footer,
            pages: pagination.pages,
            TimeDown
        },
        /*asyncData ({app, params, query, headers}) {//请求
            let myParams = {
                sku_name: query.keyword || '',
                current_page: query.page|| 1,
                page_size: 10
            }
            return sendHttp(app, false, server.api.spot.initSpotList, myParams).then(function (res) {
                    return { spotlist: res.data.items, total: res.data.total  }
                })
        },*/
        data() {
            return {
                isLogin: false,
                color: '',
                current_page: parseInt(this.$route.query.page)|| 1,
                page_size: 10,
                category: [],
                process: [],
                //purpose: [],
                feature: [],
                categoryId: '',
                processId: '',
                //purposeId: '',
                featureId: '',
                skuName: this.$route.query.keyword || '',
                manufacturer: '',
                minPrice: '',
                maxPrice: '',
                categoryMore: true,
                processMore: true,
                //purposeMore: true,
                featureMore: true,
                categoryMoreVal: '更多',
                processMoreVal: '更多',
                //purposeMoreVal: '更多',
                featureMoreVal: '更多',

                spotlist:[],
                total: 0,
            }
        },
        methods: {
            hasLogin() {
                let data = getCookies('userinfor')
                if(data !== false){
                    this.isLogin = true
                }
            },
            toLogin(){
                window.location.href = '/login'
            },
            addOrder(id) {
                this.$router.push({
                    name: 'spot-order-id',
                    params: {
                        id : id
                    }
                })
            },
            categoryClick(id) {
                this.categoryId = id
                this.spotData()
            },
            processClick(id) {
                this.processId = id
                this.spotData()
            },
            /*purposeClick(id) {
                this.purposeId = id;
                this.spotData();
            },*/
            featureClick(id) {
                this.featureId = id
                this.spotData()
            },
            categoryOpen() {
                this.categoryMore = !this.categoryMore;
                if (this.categoryMore) {
                    this.categoryMoreVal = "更多"
                } else {
                    this.categoryMoreVal = "收回"
                }
            },
            processOpen() {
                this.processMore = !this.processMore
                if (this.processMore) {
                    this.processMoreVal = "更多"
                } else {
                    this.processMoreVal = "收回"
                }
            },
            /*purposeOpen() {
                this.purposeMore = !this.purposeMore
                if (this.purposeMore) {
                    this.purposeMoreVal = "更多"
                } else {
                    this.purposeMoreVal = "收回"
                }
            },*/
            featureOpen() {
                this.featureMore = !this.featureMore
                if (this.featureMore) {
                    this.featureMoreVal = "更多"
                } else {
                    this.featureMoreVal = "收回"
                }
            },
            showTotal(total) {
                return `全部 ${total} 条`;
            },
            reloadPage(){
                this.$router.go(0)
            },
            async spotData() {
                let params = {
                    category_id: this.categoryId,
                    level_id: this.processId,
                    //purpose_id: this.purposeId,
                    //feature_id: this.featureId,
                    sku_name: this.skuName,
                    manufacturer: this.manufacturer,
                    min_price: this.minPrice,
                    max_price: this.maxPrice,
                    current_page: this.current_page,
                    page_size: this.page_size
                };
                const res = await spotList(this, params);
                this.spotlist = res.data.items;
                this.total = res.data.total;
            },
            async filterConditonData() {
                let params = {};
                const res = await filterConditon(this, params);
                this.category = res.data.categoryFilter;
                this.process = res.data.specLevelFilter;
                //this.purpose = res.data.specPurposeFilter;
                //this.feature = res.data.specFeatureFilter;
            },
        },
        created() {
        },
        mounted() {
            this.hasLogin()
            this.filterConditonData()
            this.spotData()
        },
        watch: {
            '$route'(to, from) {
                this.$router.go(0)
            }
        },
        head() {
            return {
                title: '巨正源-化工交易平台',
                page: 10,
                meta: [
                    {name: 'viewport', content: 'width=device-width, initial-scale=1'},
                    {name: 'keywords', content: '化工, 交易, 丙烷脱氢'},
                    {hid: 'description', name: 'description', content: '巨正源-化工交易平台，提供丙烷脱氢,石化产品贸易、仓储服务、成品油运输服务'}
                ]
            }
        }
    }
</script>
<style scoped>
    .Xhlist li {
        height: 55px;
        display: flex;
        align-items: center;
        margin-bottom: 1px;
        background-color: #fff;
    }

    .h50 {
        height: 50px;
    }

    .arrow-up {
        background: url(/img/icon.png) no-repeat 42px -147px;
    }
</style>
