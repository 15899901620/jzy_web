
<template>
	<div class="body">
		<Header-small title="专料下单">
		<div slot="headerother">
        <ul class="sp_cat_title_list">
          <li class="curr"><i>1</i><p>编辑信息</p></li>
          <li class="curr"><i>2</i><p>生成合约</p></li>
          <template v-if="order_no">
            <li class="curr"><i>3</i><p>合约转单</p></li>
            <li class="curr"><i>4</i><p>生成订单</p></li>
            <template v-if="order_status == 2">
              <li><i>5</i><p>支付货款</p></li>
              <li><i>6</i><p>下单完成</p></li>
            </template>
            <template v-else>
              <li class="curr"><i>5</i><p>支付货款</p></li>
              <li class="curr"><i>6</i><p>下单完成</p></li>
            </template>
          </template>
          <template v-else>
            <li><i>3</i><p>合约转单</p></li>
            <li><i>4</i><p>生成订单</p></li>
            <li><i>5</i><p>支付货款</p></li>
            <li><i>6</i><p>下单完成</p></li>
          </template>
        </ul>
      </div>
		</Header-small>
		<div class="container" title="">
            <div class="w1200 whitebg" style="margin-top: 20px; margin-bottom: 40px; border:1px solid #eee;">
                <div class="submit"></div>
                <h1 class="tac fs24 mt25 mb15">订单提交成功</h1>
                <div class="tac fs14">
                    <span>订单号：<span>{{orderNo}}</span></span><a class="blueFont ml15">查看详情</a>
                </div>
                <div class="OrderTime" >
                    请尽早提货，逾期会收取仓储费
                </div>
                <div class="OrderTime" style="display: none;">
                    我们将按照您指定的地址帮您安排发货
                </div>
                <div class="tac gray">
                    <p>如有疑问您可以通过一下联系方式与我们取得联系</p>
                    <p>联系电话：{{this.$store.state.common.sysConfig.SERVICEHOTLINE}}</p>
                </div>
                <div class="orderbtn">
                    <a class="submitBtn btnBg" href="/special">继续采购</a><a class="submitBtn btnBorderBg ml30" href="/users/usertotalorder">我的订单</a>
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
    name: "special-order-success",
    components: {
        HeaderSmall: Header.small,
        Footer,
    },
    fetch({
        store,
        params
    }) {
        return Promise.all([
        		//获取顶部、中部、底部导航信息
				store.dispatch('common/getNavList'),
				//获取系统配置
				store.dispatch('common/getSysConfig')

        ])
    },

    data() {
        return {
            orderNo:this.$route.query.orderNo,
            id:''
        }
    },
    methods: {
        async Datas(){
            this.orderNo=this.$route.query.orderNo
            this.id=this.$route.query.id
        }
    },
    computed: {

        classes() {
            return [
                `${prefixCls}`,
                { [`${prefixCls}-footer`]: this.vertical },
            ];
        },
    },
    mounted() {
        this.Datas()
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
   .submit{ width: 74px;height: 74px; background: url(../../../static/img/icon.png)no-repeat -7px -519px; margin: 0 auto;margin-top: 70px;}
  .OrderTime{border-top: 1px solid #dedede; width: 30%;margin: 10px auto; padding: 5px; text-align: center; font-size: 14px;}
  .submitBtn{padding: 10px 40px; font-size: 16px;border-radius: 3px;}
  .orderbtn{margin: 40px auto 70px;display: flex;justify-content: center; align-items: center;}
  .btnBg{background-color: #1890ff; color: #fff;border: 1px solid #1890ff; box-sizing: border-box;}
  .btnBorderBg{background-color: #f0f9ff; color: #1890ff; border: 1px solid #1890ff; box-sizing: border-box;}
</style>
