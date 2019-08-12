
<template>
	<div class="body">
		<Header-small title="专料下单">
			<div slot="headerother">
				 <ul class="sp_cat_title_list">
                    <li class="curr"><i>1</i><p>编辑详细信息</p></li>
                    <li class="curr"><i>2</i><p>提交订单成功</p></li>
                    <li><i>3</i><p>支付货款</p></li>
                    <li><i>4</i><p>支付完成</p></li>
                </ul>
			</div>
		</Header-small>
		<div class="container" title="内容区块">
            <div class="w1200 whitebg bdccc" style="margin-top: 20px; margin-bottom: 40px;">
               

            <div class="submit"></div>
            <h1 class="tac fs24 mt25 mb15">订单提交成功</h1>
            <div class="tac fs14">
                <span>订单号：<span>{{orderNo}}</span></span><a class="blueFont ml15">查看详情</a>
            </div>
            <div class="OrderTime" >
                请前提货，逾期收取仓储费
            </div>
            <div class="OrderTime" style="display: none;">
                我们将按照您指定的地址帮您安排发货
            </div>
            <div class="tac gray">
                <p>如有疑问您可以通过一下联系方式与我们取得联系</p>
                <p>联系电话：{{systeminfo.SERVICEHOTLINE}}</p>
            </div>
            <div class="orderbtn">
                <a class="submitBtn btnBg" @click="submitBtn()">继续采购</a><a class="submitBtn btnBorderBg ml30">我的订单</a>
            </div>
        

            </div>
		</div>
		<Footer size="small" title="底部" style="margin-top:18px;"></Footer>
	</div>
</template>

<script>
import Header from '../../../components/header'
import Footer from '../../../components/footer'
import { mapState} from 'vuex'
import { specialDetail, getWeek, submitOrder } from '../../../api/special'


export default {
    name: "order-success",
    components: {
        HeaderSmall: Header.small,
        Footer,
    },
    fetch({
        store,
        params
    }) {
        return Promise.all([
            store.dispatch('menu/getMenuList'),
            store.dispatch('system/getSystemCnf'),
        ])
    },
    
    data() {
        return {
            orderNo:'',
            id:''
        }
    },
    methods: {
        submitBtn(){
            this.$router.push({name:'special'})
        },
        async Datas(){
            this.orderNo=this.$route.query.orderNo
            this.id=this.$route.query.id
        }
    },
    computed: {
        ...mapState({
            systeminfo: state => state.system.systeminfo,
        }),
        classes() {
            return [
                `${prefixCls}`,
                { [`${prefixCls}-footer`]: this.vertical },
            ];
        },
    },
    mounted() {
    },
    head() {
        return {
            title: '订单创建成功-巨正源',
            page: 10,
            meta: [{
                    name: 'viewport',
                    content: 'width=device-width, initial-scale=1'
                },
                {
                    name: 'keywords',
                    content: '化工, 交易, 会员注册'
                },
                {
                    hid: 'description',
                    name: 'description',
                    content: '会员注册巨正源-化工交易平台，提供丙烷脱氢,石化产品贸易、仓储服务、成品油运输服务'
                }
            ]
        }
    }
}
</script>
<style scoped>
  .lineborder{height: 1px; background-color: #eeeeee;width: 97%;margin: 0 auto;}
</style>
