
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
import { async } from 'q';


export default {
    name: "special-order-id",
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
            orderinfo: {
                isDelivery: 0,
                isPerDeposit: 0,
                isJryService: 0,
                jryDays: 0,
                jryCost: '0.00',
                totalAmount: '0.00',
                depositAmount: '0.00',
                orderType: 4,
                sourceId: 0,
                feedingId: 0,
                transportationMode: '公路运输',
                orderNum: 0,
                addressId: 0
            },
            RegisterName: 'member',
            nowIndex: 0,
            index: 0,
            specialId: !this.$route.params.id ? 0 : this.$route.params.id
        }
    },
    methods: {
       async getSourceData() {
            let params = {
                id: this.specialId
            }
            const res = await specialDetail(this, params)
            this.orderinfo = res.data
            console.log('data00', res)
        },
        //创建订单
        async createOrder() {
            let params = {
                ...this.orderinfo
            }
            const res = await submitOrder(this, params)
            if (res){
                //创建成功！
            }
        }
    },
    mounted() {
      this.getSourceData()
    },
    head() {
        return {
            title: '会员注册-巨正源',
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
