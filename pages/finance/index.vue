<template>
    <div class="body">
        <Header name="头部"></Header>
        <div class="container" title="">
            <template v-for="(item,index) in $store.state.common.adList.ad9">
                <div class="materials_banner" :style="{background:'url(' + item.adImg + ')no-repeat center; height:416px'}">
                    <!-- <img :src="item.adImg"/>-->
                </div>
            </template>

            <div class="whitebg ovh" >
                <div class="w1200">
                    <h1 class="financeTitle">[ 什么是巨易融 ]</h1>
                    <div class="financeText">巨易融是巨正源科技公司，针对中小微企业倾力打造的企业贷款产品，助力中小微企业提升资金使用效率，为您提升营业收入。</div>
                    <div class="fs24 mt25">结合您在巨正源电商平台的历史交易情况，即可轻松完成订单贷款。</div>
                    <ul class="listImg">
                        <li>
                            <div class="tac">
                                <img src="img/finance_icon01.png" />
                            </div>
                            <div class="tac">
                                <p>放贷快</p>
                                <span><span class="redFont">3分</span>钟申请 极速放款</span>
                            </div>
                        </li>
                        <li>
                            <div class="tac">
                                <img src="img/finance_icon02.png" />
                            </div>
                            <div class="tac">
                                <p>金额高</p>
                                <span>可申请<span class="redFont">200万</span></span>
                            </div>
                        </li>
                        <li>
                            <div class="tac">
                                <img src="img/finance_icon03.png" />
                            </div>
                            <div class="tac">
                                <p>利息省</p>
                                <span>年利率低至<span class="redFont">5%</span></span>
                            </div>
                        </li>
                        <li>
                            <div class="tac">
                                <img src="img/finance_icon04.png" />
                            </div>
                        <div class="tac">
                            <p>范围广</p>
                            <span>支持全国<span class="redFont">小微</span>企业</span>
                        </div>
                    </li>

                    </ul>
                </div>
            </div>
            <div class="flowBG">
                <div class="w1200">
                    <h1 class="financeTitle">[ 申请流程 ]</h1>
                    <div class="flowImage">
                        <img src="img/flow_icon.png">
                    </div>
                </div>
            </div>


        </div>
        <Footer size="default" title="底部" style="margin-top:0px;"></Footer>
    </div>
</template>

<script>
    import Header from '../../components/header'
    import Footer from '../../components/footer'
    export default {
        name: "finance",
        fetch({ store, params, query }) {
            return Promise.all([
                //获取顶部、中部、底部导航信息
                store.dispatch('common/getNavList'),
                //获取系统配置
                store.dispatch('common/getSysConfig'),
                //获取友情链接
                store.dispatch('common/getFriendlyList'),
                store.dispatch('common/getBannerList',9),
                //获取底部帮助分类
                store.dispatch('helper/getHelpCate', {
                    catId: 0,
                    indexShow: 1
                }),
            ])
        },
        components:{
            Header,
            Footer
        },
        mounted(){
            console.log("adList:",this.$store.state.common.adList.ad9[0].adImg)
        },
    }
</script>

<style lang="less" scoped>
    .financeTitle{
        text-align: center;
        font-size: 30px;
        font-weight: bold;
        margin-top: 60px;
    }
    .financeText{
        font-size: 28px;
        font-weight: bold;
        color: #e2ac64;
        margin-top: 50px;
    }
    .listImg{display: flex; flex-direction: row;justify-content: space-between;margin: 60px auto 80px;
    li{
        display: flex;
        flex-direction: column;
        justify-content: center;
        p{
            font-size: 24px;font-weight: bold;color: #e2ac64;
        }
        span{
            font-size: 20px;
        }
    }
    }
    .flowBG{
        background-color: #fffbf7;overflow: hidden;
        .flowImage{margin: 95px auto 80px; text-align: center}
    }
</style>
