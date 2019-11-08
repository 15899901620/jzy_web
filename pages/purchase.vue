<template>
    <div class="body">
        <Header-small title="采购中心">
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
        <div class="container" title="">
            <div class="tac fs0 Tenderbanner" style="background: url('img/purchasebanner.jpg')no-repeat center" >
                <!--&lt;!&ndash;        <img src="/img/Tenderingbanner.png"  style="width: 100%" />&ndash;&gt;-->
            </div>
            <div class="trenderCenter">
                <div class="trendLogin fs14">
                    <div class="trendLoginCenter" v-if="!SupplierInfor" style="margin:20px 32px;">
                        <p class="trendTitle">快速注册立即发布采购信息</p>
                        <purchase></purchase>
                    </div>

                    <div class="membercenter" v-else>
                        <div class="head" @click="WinmemberCenter"></div>
                        <p class="mt10">Hi,上午好！</p>
                        <p class="mb40 mt10">欢迎来到巨正源招标平台</p>
                    </div>
                </div>
            </div>
            <!--  招标流程-->
            <div class="whitebg dflexAlemJust" style="padding: 40px 0 50px;">
                <img src="/img/pur_flow.png" />
            </div>

        <div class="w1200">
            <h1 class="financeTitle">[ 采购信息平台服务产品 ]</h1>
            <div class="linerbg"><div class="siderbg"></div></div>
            <ul class="purinfor">
                <li>
                    <h1>项目进度跟踪</h1>
                    <div class="img_icon">
                        <img src="img/pur_icon01.png">
                    </div>
                    <div class="purtext">全程跟踪项目建设进展，专职人员专业跟进。短信、邮件、电话实时反馈</div>
                </li>
                <li>
                    <h1>专题信息定制</h1>
                    <div class="img_icon">
                        <img src="img/pur_icon02.png">
                    </div>
                    <div class="purtext">根据企业业务需求，个性定制，精准推送企业关注的招标采购信息</div>
                </li>
                <li>
                    <h1>产品精准营销</h1>
                    <div class="img_icon">
                        <img src="img/pur_icon03.png">
                    </div>
                    <div class="purtext">依托强大采购数据，实时推送企业产品致采购需求负责人手机和邮箱</div>
                </li>
            </ul>
        </div>
        </div>
        <Footer size="small" title="底部" style="margin-top:18px;"></Footer>

    </div>
</template>

<script>
    import Header from "../components/header";
    import Footer from "../components/footer";
    import register from "../components/register-form";


    export default {
        name: "tenderRegister",
        components: {
            Header,
            HeaderSmall: Header.small,
            purchase: register.purchase,
            Footer
        },
        computed: {
        },
        fetch({ store, params }) {
            return Promise.all([
                //获取顶部、中部、底部导航信息
                store.dispatch('common/getNavList'),
                //获取系统配置
                store.dispatch('common/getSysConfig'),
            ]);
        },
    }
</script>

<style lang="less" scoped>

    .Tenderbanner{
        height: 500px;
    }
    .trenderCenter {
        width: 1200px;
        margin: 0 auto;
        position: relative;
        z-index: 4;
        height: 0px;
    }
    .trendLogin {
        background: #fff;
        position: absolute;
        top: -456px;
        right: 0;
        width: 350px;
        border-radius: 3px;
    }

    .trendTitle {
        font-size: 22px;
        text-align: center;
    }

    .trendLoginCenter {
        margin: 30px 40px 45px;
    }

    .financeTitle{
        text-align: center;
        font-size: 30px;
        font-weight: bold;
        margin-top: 60px;
    }
    .linerbg{
        width: 172px;
        margin: 10px auto 60px;
        background-color: #64b5f8;
        height: 1px;
        position: relative;
        .siderbg{
            width: 52px;
            height: 6px;
            background-color: #007de4;
            position: absolute;
            top: -3px;
            left: 60px;;
        }
    }
    .purinfor{
        display: flex;
        flex-direction: row;
        li{
            h1{font-size: 24px;color: #333;text-align: center;margin:40px auto 50px;}
            .img_icon{margin: 0 auto}
            .purtext{width: 270px;margin: 40px auto 60px; font-size: 18px;}
            width: 399px;
            background-color: #FFFFFF;
            display: flex;
            flex-direction: column;
            margin-left: 2px;
        }
    }
</style>
