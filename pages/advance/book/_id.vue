<template>
    <div class="body">
        <Header name="头部"></Header>
        <div class="container" title="">
            <div class="w1200">
                <div class="mt10">
                    <a>巨正源首页</a>><span class="gray">预售专栏</span>
                </div>
            </div>
            <div class="w1200 whitebg" style="margin-top: 10px;">
                <div class="w1200 sku_name">
                    <span>巨正源</span>&nbsp;&nbsp;东莞&nbsp;&nbsp;T03&nbsp;&nbsp;现货&nbsp;&nbsp;100吨
                </div>
                <div class="w1200 dflex sku_option">
                    <div class="detail dflexAlemJust">
                        <div class="info">
                            <ul>
                                <li>
                                    <span>单价：</span>¥10400.00/吨
                                </li>
                                <li>
                                    <span>保证金比例：</span>10%
                                </li>
                                <li>
                                    <span>厂商：</span>巨正源
                                </li>
                                <li>
                                    <span>牌号：</span>F08
                                </li>
                                <li>
                                    <span>品种：</span>PP
                                </li>
                                <li>
                                    <span>交货地：</span>东莞市
                                </li>
                                <li>
                                    <span>发布时间：</span>2019-09-23
                                </li>
                                <li>
                                    <span>到货时间：</span>2019-09-23
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="option dflexAlemJust">
                        <div class="info">
                            <div class="num"><span>预定数量</span><span>60.00</span><span class="gray">10吨起拍</span></div>
                            <div class="txt"><span>保证金</span>需冻结保证金10%</div>
                            <div class="btn">
                                <span></span>
                                <button class="xhBtn yellowbg">预定</button>
                                <button class="xhBtn">缴纳保证金</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="w1200">
                <div class="sku_name mt20 whitebg">
                    <span style="font-weight: 400">预定信息</span>
                </div>
                <div class="w1200 whitebg">
                    <div class="advance-table">
                        <div class="XhlistTitle graybg">
                            <span style="width: 14%;">品种</span>
                            <span style="width: 14%;">牌号</span>
                            <span style="width: 14%;">厂商</span>
                            <span style="width: 15%;">库区</span>
                            <span style="width: 14%;">总吨数 </span>
                            <span style="width: 15%;">交货时间</span>
                            <span style="width: 14%;">单价（元/吨）</span>
                        </div>
                        <ul class="Xhlist">
                            <template v-if="spotList">
                                <li v-for="(item, index) in spotList" :key="index">
                                    <span style="width: 14%;">PP</span>
                                    <span style="width: 14%;">F08</span>
                                    <span style="width: 14%;">{{item.manufacturer}}</span>
                                    <span style="width: 15%;">东莞</span>
                                    <span style="width: 14%;">{{item.total_num}}</span>
                                    <span style="width: 15%;">{{item.last_delivery_time}}</span>
                                    <span class="orangeFont" style="width: 14%;">¥{{item.base_price}}</span>
                                </li>
                            </template>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        <Footer size="default" title="底部" style="margin-top:18px;"></Footer>
    </div>
</template>

<script>
    import Header from '../../../components/header'
    import Footer from '../../../components/footer'
    export default {
        name: "advance-book-id",
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
            Footer
        },
        computed: {
            spotList: function () {
                return this.$store.state.advance.advanceList
            }
        },
    }
</script>

<style scoped>
    .sku_name {
        height: 70px;
        line-height: 70px;
        font-size: 16px;
    }
    .sku_name span {
        margin-left: 24px;
        font-weight: 700;
    }
    .sku_option {
        height: 210px;
    }
    .sku_option .detail {
        width: 575px;
        height: 190px;
        border: 1px solid #f4f4f4;
        margin-left: 24px;
    }
    .sku_option .detail .info {
        width: 490px;
        font-size: 14px;
    }
    .sku_option .detail .info ul li {
        width: 50%;
        height: 36px;
        line-height: 36px;
        float: left;
    }
    .sku_option .detail .info ul li span {
        color: #fd7600;
    }
    .sku_option .option {
        width: 546px;
        height: 190px;
        background: #f4f4f4;
        margin-left: 30px;
    }
    .sku_option .option .info {
        width: 490px;
        font-size: 14px;
    }
    .sku_option .option .info span {
        display: inline-block;
        width: 100px;
        height: 40px;
        line-height: 40px;
    }
    .advance-table {
        width: 1152px;
        margin: 0 auto;
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
</style>
