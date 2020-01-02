<template>
<div>
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
    <div style="display: flex; justify-content: center; padding-right:30px">
        <div v-html="dataList.openNoticeContent"></div>
    </div>
    <div style="display: flex; justify-content: flex-end" v-if="dataList.openNoticeFile">
        <Button type="primary" size="large"@click="down(dataList.openNoticeFile)">下载</Button>
    </div>
</div>
</template>

<script>
    import { sendHttp } from "../../api/common";
    import server from "../../config/api";
    export default {
        name: "_id",
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
