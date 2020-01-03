<template>
<div style="background-color: #f7f7f7">
<!--    <div class="Announ_header">-->
<!--        <h1>巨正源科技XXX中标公告</h1>-->
<!--        <span>中标公告</span>-->
<!--    </div>-->
<!--    <div class="Announ_content">-->
<!--        <p class="lh40" style="text-indent: 35px">XXX备采购项目（招标编号：0832-SPCS3456634）A包，评标委员会评审中标结果如下：</p>-->
<!--        <div class="Announ_content_list"><span class="title">中标单位</span>：<span class="txt">XXCC有限责任公司</span></div>-->
<!--        <div class="Announ_content_list"><span class="title">中标金额</span>：<span class="txt">人民币肆拾玖万捌仟捌佰元整（￥498，800.00）</span></div>-->
<!--        <div class="Announ_content_list"><span>为体现“公开、公平、公正”的原则，公示三日</span></div>-->
<!--        <div class="Announ_content_list"><span>评标委员会成员</span>：<span>xxx、xxx、xxx</span></div>-->
<!--        <div class="Announ_content_list"><span class="title">联系人</span>：<span class="txt">xxx</span></div>-->
<!--        <div class="Announ_content_DateName">-->
<!--            <span class="tar">东莞巨正源科技有限公司</span><span class="tar mt10">二0一九年十一月十七日</span>-->
<!--        </div>-->
<!--    </div>-->

    <Header-small shortType = 'suppler'  title="招标中心">
        <div slot="headerother">
            <div
                    data-v-228ad150
                    class="dflexAlem gray fs14"
                    style="color: rgb(102, 102, 102);    margin-top: 50px;"
            >
                <span data-v-228ad150 class="bbright pr10 blackFont">已有账号？</span>
                <a data-v-228ad150 href="/login" class="blueFont pl10">直接登录</a>
            </div>
        </div>
    </Header-small>
    <div class="mt10 mb40" style="background-color: #f7f7f7">
        <!--页面路径-->
        <div class="w1200">
            <div class="mt10 fs14">
                <breadcrumb>
                    <breadcrumb-item><i type="home"></i><nuxt-link to="/">巨正源首页</nuxt-link></breadcrumb-item>
                    <breadcrumb-item><nuxt-link to="/tendering">招标中心</nuxt-link></breadcrumb-item><breadcrumb-item>中标详情</breadcrumb-item>
                </breadcrumb>
            </div>
        </div>

        <div class="graybg mt10">
            <div class="w1200 dflex">
                <!--详情-->
                <div class="Notice">
<!--                    <DetailsBidding></DetailsBidding>-->

                    <div v-html="dataList.openNoticeContent"></div>
                        <div style="display: flex; justify-content: flex-end;    position: absolute; bottom: 22px;  right: 22px;" v-if="dataList.openNoticeFile">
                            <Button type="primary" size="large"@click="down(dataList.openNoticeFile)" style="width: 120px">下载</Button>
                        </div>
                </div>

                <!-- 右边模块 -->
                <div class="rightMode">
                    <!--个人中心-->
                    <membercenter></membercenter>
                    <!--通知公告-->
                    <Notice></Notice>
                    <!--常见问题-->
                    <!-- <Commonproblem></Commonproblem> -->
                    <!--联系我们-->
                    <Contact></Contact>

                </div>



            </div>




    </div>
</div>

<!--    <div style="display: flex; justify-content: center; padding-right:30px">-->
<!--        <div v-html="dataList.openNoticeContent"></div>-->
<!--    </div>-->
<!--    <div style="display: flex; justify-content: flex-end" v-if="dataList.openNoticeFile">-->
<!--        <Button type="primary" size="large"@click="down(dataList.openNoticeFile)">下载</Button>-->
<!--    </div>-->

    <Footer size="default" title="底部" style="margin-top:18px;"></Footer>
</div>
</template>

<script>
     import Header from "../../components/header";

    //import DetailsBidding from './trenderCompontent/DetailsBidding'
    import membercenter from  '../trender/trenderCompontent/membercenter'
    import Commonproblem from  '../trender/trenderCompontent/Commonproblem'
    import Contact from  '../trender/trenderCompontent/Contact'
    import Notice from  '../trender/trenderCompontent/Notice'
     import Footer from '../../components/footer'


     import { sendHttp } from "../../api/common";
    import server from "../../config/api";
    export default {
        name: "_id",
        components:{
            HeaderSmall: Header.small,
            membercenter,
            Footer,
            Contact,
            Commonproblem,
            membercenter,
            Notice,
        },
        fetch({ store, params }) {
            return Promise.all([
                //获取顶部、中部、底部导航信息
                store.dispatch('common/getNavList'),
                //获取系统配置
                store.dispatch('common/getSysConfig'),
                //获取友情链接
                store.dispatch('common/getFriendlyList'),
                //获取底部帮助分类
                store.dispatch('helper/getHelpCate', {
                    catId: 0,
                    indexShow: 1
                }),
            ]);
        },
        data(){
            return{
                id: !this.$route.query.id ? 1 :this.$route.query.id,
                dataList:{}
            };
        },
        methods:{
            async SourceData() {
                let params = {
                    id: this.id,
                };
                const res = await sendHttp(this, false, server.api.biddding.bidddingDetail,params)
                console.log("res", res)
                this.dataList = res.data
            },
            down(res){
                window.open(res)
            }
        },
        mounted(){
            this.SourceData()
            document.querySelector('body').setAttribute('style', 'background-color:#ffffff;')
        },
        beforeCreate () {

         },
        //销毁前清除
        beforeDestroy () {
            document.querySelector('body').removeAttribute('style')
        },
    }
</script>

<style lang="less" scoped>
    .Notice{width: 80%; background-color: #FFFFFF; position: relative;}
    .rightMode{width: 21%;   margin-left: 1%;}
    .Announ_header{
        text-align: center;font-size: 22px;
        h1{font-weight: bold}
    }
    .Announ_content{
        display: flex; justify-content: center;
        flex-direction:column;
        font-size: 18px;
        width: 80%;
        margin: 30px auto 0;
        letter-spacing: 1px;
        &_list{
            display: flex;
            margin-left: 38px;
            margin-top: 15px;
            .title{width: 15%; text-align-last: justify}
        }
        &_DateName{
            display: flex;
            justify-content: flex-end;
            flex-direction: column;
            margin-top: 80px;
            margin-bottom: 50px;
        }
    }

</style>
