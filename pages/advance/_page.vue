<template>
    <div class="body">
        <Header title="头部"></Header>
        <div class="container" title="">
            <div class="w1200">

                <div class="mt10">
<!--                    <a>巨正源首页</a>><span class="gray">预售专栏</span>-->
                    <breadcrumb>
                        <breadcrumb-item><i type="home"></i><nuxt-link to="/">巨正源</nuxt-link></breadcrumb-item>
                        <breadcrumb-item>预售专栏</breadcrumb-item>
                    </breadcrumb>
                </div>
            </div>
            <div class="w1200 dflex" style="margin-top: 10px;">
                <div style="width: 76%;">
                    <div class="whitebg">
                        <h1 class="AdvSaleTitle">预售专栏</h1>
                    </div>
                    <div class="dflex whitebg" style="justify-content: space-between; align-items: center;">
                        <div class="XHsearch" style="display: flex;">
                            <span>品种</span><input type="text" v-model="categoryName" class="XHsearchInput" placeholder="请输入品种"/>
                            <span class="ml15">牌号</span><input type="text" v-model="skuName" class="XHsearchInput" placeholder="请输入牌号"/>
                            <div class="ml20">
                                <input type="text" v-model="minPrice" class="priceInput" placeholder="￥最低价"/>-<input type="text"
                                                                                                  class="priceInput" v-model="maxPrice"
                                                                                                  placeholder="￥最高价"/>
                            </div>
                            <div class="xhBtn" @click="spotData">确定</div>
                        </div>
                        <div class="mr15 fs14">共搜到<span class="orangeFont">{{this.$store.state.advance.advanceList.length}}</span>条数据</div>
                    </div>

                    <div class="XhlistTitle graybg">
                        <span style="width: 11%;">品种</span>
                        <span style="width: 11%;">牌号</span>
                        <span style="width: 10%;">厂商</span>
                        <span style="width: 14%;">库区</span>
                        <span style="width: 13%;">总吨数 </span>
                        <span style="width: 14%;">交货时间</span>
                        <span style="width: 14%;">单价（元/吨）</span>
                        <span style="width: 13%;">操作</span>
                    </div>

                    <ul class="Xhlist">
                        <template v-if="spotList">
                            <li v-for="(item, index) in spotList" :key="index">
                                <span style="width: 11%;">{{item.category_name}}</span>
                                <span style="width: 11%;">{{item.sku_name}}</span>
                                <span style="width: 10%;">{{item.manufacturer}}</span>
                                <span style="width: 14%;">{{item.warehouse_name}}</span>
                                <span style="width: 13%;">{{item.total_num}}</span>
                                <span style="width: 14%;">{{item.last_delivery_time}}</span>
                                <span class="orangeFont" style="width: 14%;">¥{{item.base_price}}</span>
                                <span style="width: 13%;"><div class="ListBtn" @click="addBook(item.id)">预定</div></span>
                            </li>
                        </template>
                    </ul>
                    <div class="whitebg ovh" style="padding:18px; text-align:center;">
                        <pages :total="total" :show-total="showTotal" :value="currentPage"></pages>
                    </div>
                </div>

                <div class="ml10" style="width: 23%;">
                    <div class="whitebg">
                        <h1 style="padding: 16px 15px;background-color: #fcfcfc; font-size: 16px;border-bottom:1px solid #DEDEDE">
                            求购信息</h1>

                        <!--求购-->

                        <purchasing></purchasing>
                    </div>
                    <!--最近交易-->

<!--                    <div class="mt20 whitebg">-->
<!--                        <h1 style="padding: 16px 15px;background-color: #fcfcfc;  font-size: 16px;border-bottom:1px solid #DEDEDE">-->
<!--                            最近交易-->
<!--                            <span class="fr gray dflexAlem"><i class="fresh"></i>换一批</span></h1>-->
<!--                        <ul class="currdate">-->
<!--                            <li>-->
<!--                                <span class="fwb">FB2310 北欧化工</span>-->
<!--                                <span class="mt5">价格：￥9400.00/吨</span>-->
<!--                                <div class="mt5 mb10" style="display: flex;justify-content: space-between;"><span-->
<!--                                        class="redFont">待付款</span><span>2019-04-28</span></div>-->
<!--                            </li>-->
<!--                            <li>-->
<!--                                <span class="fwb">FB2310 北欧化工</span>-->
<!--                                <span class="mt5">价格：￥9400.00/吨</span>-->
<!--                                <div class="mt5 mb10" style="display: flex;justify-content: space-between;"><span-->
<!--                                        class="redFont">待付款</span><span>2019-04-28</span></div>-->
<!--                            </li>-->
<!--                            <li>-->
<!--                                <span class="fwb">FB2310 北欧化工</span>-->
<!--                                <span class="mt5">价格：￥9400.00/吨</span>-->
<!--                                <div class="mt5 mb10" style="display: flex;justify-content: space-between;"><span-->
<!--                                        class="redFont">待付款</span><span>2019-04-28</span></div>-->
<!--                            </li>-->
<!--                            <li>-->
<!--                                <span class="fwb">FB2310 北欧化工</span>-->
<!--                                <span class="mt10">价格：￥9400.00/吨</span>-->
<!--                                <div class="mt10 mb15" style="display: flex;justify-content: space-between;"><span-->
<!--                                        class="redFont">待付款</span><span>2019-04-28</span></div>-->
<!--                            </li>-->
<!--                            <li>-->
<!--                                <span class="fwb">FB2310 北欧化工</span>-->
<!--                                <span class="mt10">价格：￥9400.00/吨</span>-->
<!--                                <div class="mt10 mb15" style="display: flex;justify-content: space-between;"><span-->
<!--                                        class="redFont">待付款</span><span>2019-04-28</span></div>-->
<!--                            </li>-->
<!--                        </ul>-->
<!--                    </div>-->
                </div>


            </div>
        </div>
        <Footer size="default" title="底部" style="margin-top:18px;"></Footer>
    </div>
</template>

<script>

    import {mapState} from 'vuex'
    import Header from '../../components/header'
    import Footer from '../../components/footer'
    import pagination from '../../components/pagination'
    import purchasing from '../../components/purchasing'
    import breadcrumb from '../../components/breadcrumb'

    export default {
        name: "advance",
        fetch({store, params, query}) {
            return Promise.all([
                //获取顶部、中部、底部导航信息
                store.dispatch('common/getNavList'),
                //获取系统配置
                store.dispatch('common/getSysConfig'),
                //获取友情链接
                store.dispatch('common/getFriendlyList'),
                // 获取预售
                store.dispatch('advance/getAdvanceList', {
                    current_page: query.page || 1,
                    page_size: 10
                })
            ])
        },
        components: {
            Header,
            Footer,
            pages: pagination.pages,
            purchasing,
            breadcrumbItem:breadcrumb.item,
            breadcrumb
        },
        data() {
            return {
                skuName: '',
                categoryName: '',
                minPrice: '',
                maxPrice: '',
                currentPage: parseInt(this.$route.query.page) || 1,
                pageSize: 10,
            }
        },
        methods: {
            addBook(id) {
                this.$router.push({
                    name: 'advance-book-id',
                    params: {
                        id: id
                    }
                })
            },
            showTotal(total) {
                return `全部 ${total} 条`;
            },
            reloadPage() {
                this.$router.go(0)
            },
            async spotData() {
                let params = {
                    sku_name: this.skuName,
                    category_name: this.categoryName,
                    min_price: this.minPrice,
                    max_price: this.maxPrice,
                    current_page: this.currentPage,
                    page_size: this.pageSize
                };

                this.$store.dispatch('advance/getAdvanceList', params)
            },
        },
        watch: {
            '$route'(to, from) {
                this.$router.go(0);
            }
        },
        created(){},
        computed: {
            spotList: function () {
                console.log("advanceList:",this.$store.state.advance.advanceList)
                return this.$store.state.advance.advanceList
            },
            total: function () {
                return this.$store.state.advance.total
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
    .AdvSaleTitle {
        border-bottom: 1px solid #DEDEDE;
        padding: 16px 0;
        font-size: 16px;
        margin-left: 20px;
    }

    .XHsearch {
        padding: 20px;
        display: flex;
        align-items: center;
        font-size: 14px
    }

    .XHsearchInput {
        width: 120px;
        height: 30px;
        border: 1px solid #D2D2D2;
        margin-left: 10px;
        padding-left: 5px;
        box-sizing: border-box;
    }

    .priceInput {
        width: 90px;
        height: 30px;
        margin: 0 10px;
        border: 1px solid #D2D2D2;
        padding-left: 5px;
        box-sizing: border-box;
    }

    .xhBtn {
        padding: 6px 20px;
        background-color: #007de4;
        box-sizing: border-box;
        color: #fff;
        border-radius: 3px;
        margin-left: 10px;
    }

    .orangeFont {
        color: #ff9800;
    }

    .XhlistTitle {
        display: flex;
        align-items: center;
    }

    .XhlistTitle span {
        text-align: center;
        margin: 10px 0;
        font-size: 14px
    }

    .Xhlist li {
        display: flex;
        align-items: center;
        margin-bottom: 1px;
        background-color: #fff;
        font-size: 14px
    }

    .Xhlist li:hover {
        background-color: #f2f8fe;
    }



    .Xhlist li span {
        text-align: center;
        margin: 20px 0;
    }

    /*下单按钮*/
    .ListBtn {
        cursor: pointer;
        width: 76px;
        line-height: 30px;
        margin: 0 auto;
        color: #007de4;
        border-radius: 3px;
        border: 1px solid #007de4;
        background-color: #f2f8fe;
    }

    .ListBtn:hover {
        background-color: #007de4;
        color: #fff;
    }

    /*求购信息*/
    .purInfor {
        margin-top: 20px;
        margin-left: 15px;
    }

    .purInfor li {
        margin: 15px auto;
        display: flex;
        align-items: center;
    }

    .purInfor li .Infortitle {
        color: #999;
        width: 60px;
        font-size: 14px
    }

    .purInfor li .input {
        padding-left: 10px;
        box-sizing: border-box;
        width: 168px;
        line-height: 30px;
        border: 1px solid #DDDDDD;
        border-radius: 3px;
        margin-left: 10px;
    }

    .date_icon {
        position: absolute;
        right: 8px;
        top: 7px;
        width: 25px;
        height: 25px;
        background: url(/img/icon.png) no-repeat 0px -282px;
    }

    .DateTIME {
        width: 168px;
        margin-left: 12px;
        position: relative;
        cursor: pointer;
    }

    .purinfobtn {
        cursor: pointer;
        background-color: #007de4;
        display: inline-block;
        color: #fff;
        padding: 9px 20px;
        border-radius: 3px;
        margin-left: 73px;
        margin-bottom: 20px;
        margin-top: 10px;
    }

    .redFont {
        color: #f70503;
    }

    /*最近交易*/
    .fresh {
        display: inline-block;
        width: 17px;
        height: 17px;
        background: url(/img/icon.png) no-repeat -2px -317px;
        margin-right: 6px;
    }

    .currdate {
        margin: 18px 20px;
        overflow: hidden;
    }

    .currdate li {
        border-bottom: 1px dotted #DDDDDD;
        display: flex;
        flex-direction: column;
        margin-top: 10px;
        font-size: 14px;
    }

    .currdate li:last-child {
        margin-bottom: 30px;
    }
</style>
