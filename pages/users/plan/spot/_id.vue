<template>
  <div class="clearfix graybg">
    <div class="w1200 dflex " style="margin-bottom: 40px">
      <usernav></usernav>
      <div class="memberInfor ml20 mt20">
        <!--个人信息-->
        <div class="whitebg" style="padding:0px 18px 18px;">
          <h3 class="fs16 " style="line-height: 46px; border-bottom: 1px solid #ddd;">现货合约详情 <span
              v-if="dataInfo.available_num > 0 && dataInfo.status == 1" style="float:right;color:red; font-size:16px;">转单倒计时： <TimeDown :endTime="dataInfo.last_ordered_date" hoursShow endMsg="已失效"></TimeDown></span>
          </h3>
          <div style="line-height:32px;">
            <Row index="">
              <Col span="">公司名称：{{dataInfo.company_name}}</Col>
            </Row>
            <Row index="">
              <Col span="12">合约编号：{{dataInfo.plan_no}}</Col>
              <Col span="12">创建时间：{{dataInfo.create_time}}</Col>
            </Row>
            <Row index="">
              <Col span="12">转单状态：
                <Tag v-if="dataInfo.status === 0" color="default">已取消</Tag>
                <Tag v-else-if="dataInfo.status === 1" color="default">待转单</Tag>
                <Tag v-else-if="dataInfo.status === 2" color="default">已转单</Tag>
              </Col>
              <Col span="12">付款状态：
                <Tag v-if="dataInfo.taken_num == 0" color="default">待支付</Tag>
                <Tag v-else-if="dataInfo.total_num > dataInfo.taken_num" color="orange">部分支付</Tag>
                <Tag v-else color="default">已支付</Tag>
              </Col>
            </Row>
            <Row index="">
              <Col span="12">最迟转单时间：
                <span>{{dataInfo.last_ordered_date}}</span>
              </Col>
            </Row>
          </div>
        </div>

        <div class="whitebg mt20" style="padding:0px 18px 18px;">
          <h3 class="fs16 " style="line-height: 46px; border-bottom: 1px solid #ddd;">商品信息</h3>
          <div style="line-height:32px; ">
            <Row index="">
              <Col span="12">商品名称：{{dataInfo.sku_name}}</Col>
              <Col span="12">商品编码：{{dataInfo.sku_no}}</Col>
            </Row>
            <Row index="">
              <Col span="12">产品等级：
                <template v-if="dataInfo.product_grade == 1">优等品</template>
                <template v-else-if="dataInfo.product_grade == 2">一等品</template>
                <template v-else-if="dataInfo.product_grade == 3">合格品</template>
              </Col>
              <Col span="12">生产厂商：{{dataInfo.manufacturer}}</Col>
            </Row>
            <Row index="">
              <Col span="12">包装方式：
                <template v-if="dataInfo.packing_modes == 1">标准包装</template>
                <template v-else-if="dataInfo.packing_modes == 2">非标准包装</template>
              </Col>
              <Col span="12">单位：{{dataInfo.uom_name}}</Col>
            </Row>
          </div>
        </div>

        <div class="whitebg mt20" style="padding:0px 18px 18px;">
          <h3 class="fs16 " style="line-height: 46px; border-bottom: 1px solid #ddd;">转单提货信息</h3>
          <div style="line-height:32px; ">
            <Row index="">
              <Col span="12">合约数量：{{dataInfo.total_num}}{{dataInfo.uom_name}}</Col>
              <Col span="12">待提数量：{{dataInfo.available_num}}{{dataInfo.uom_name}}</Col>
            </Row>
            <Row index="">
              <Col span="12">提货方式：待订单中确定</Col>
              <Col span="12">有效提货时间：
                <span>{{dataInfo.delivery_start}} 至 {{dataInfo.delivery_deadline}}</span>
              </Col>
            </Row>
            <!--<Row index="">
              <Col span="12">自提起提量：{{dataInfo.take_their_min}}{{dataInfo.uom_name}}</Col>
              <Col span="12">自提加量幅度：{{dataInfo.take_bid_increment}}{{dataInfo.uom_name}}</Col>
            </Row>
            <Row index="">
              <Col span="12">配送起配量：{{dataInfo.delivery_min}}{{dataInfo.uom_name}}</Col>
              <Col span="12">配送加量幅度：{{dataInfo.delivery_bid_increment}}{{dataInfo.uom_name}}</Col>
            </Row>-->
          </div>
        </div>

        <div class="whitebg mt20" style="padding:0px 18px 18px;">
          <h3 class="fs16 " style="line-height: 46px; border-bottom: 1px solid #ddd;">商品信息</h3>
          <div style="line-height:32px; ">
            <Row index=""
                 style="background: #fafafa;line-height: 42px;text-align: center; border-bottom: 1px solid #eee;">
              <Col span="5">货物信息</Col>
              <Col span="4">发货仓</Col>
              <Col span="4">合计单价（元/{{dataInfo.uom_name}}）</Col>
              <Col span="3">数量</Col>
              <Col span="4">合计</Col>
              <Col span="4">保证金金额</Col>
            </Row>
            <Row index="" style="line-height: 32px;text-align: center;border-bottom: 1px solid #eee;">
              <Col span="5">{{dataInfo.sku_name}}</Col>
              <Col span="4">{{dataInfo.warehouse_name}}</Col>
              <Col span="4">{{this.amountFormat(dataInfo.final_price)}}</Col>
              <Col span="3">{{dataInfo.total_num}}</Col>
              <Col span="4">{{this.amountFormat(dataInfo.total_amount)}}</Col>
              <Col span="4">{{this.amountFormat(dataInfo.deposit_amount)}}</Col>
            </Row>
          </div>
          <div style="display: flex;justify-content: flex-end;margin: 30px 0;">
            <Button v-if="dataInfo.available_num > 0 && dataInfo.status == 1" class="submitspotOrder" @click='toCreateOrder'>转订单</Button>
            <Button class="submitspotback ml10" @click='goBack'>返回</Button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
	import Navigation from '../../../../components/navigation'
	import utils from '../../../../plugins/common'
	import TimeDown from '../../../../components/timeDown'
	import { mapState } from 'vuex'

	export default {
		name: "spotPlanDetail",
		layout: 'membercenter',
		middleware: 'memberAuth',
		components: {
			usernav: Navigation.user,
			TimeDown
		},
		fetch({store, params}) {
			return Promise.all([
				//获取顶部、中部、底部导航信息
				store.dispatch('common/getNavList'),
				//获取系统配置
				store.dispatch('common/getSysConfig'),
				store.dispatch('spot/getSpotPlanDetail', {id: params.id}),
			])
		},
		computed:{
			...mapState({
				dataInfo: state => state.spot.spotPlanDetail,
			})
		},
		data() {
			return {
			}
		},
		methods: {
			amountFormat(amount, sign) {
				return utils.amountFormat(amount, sign)
			},
			goBack(){
				history.go(-1)
      },
			toCreateOrder(){

      }
		},
		mounted(){
    },
		watch: {
			'$route'(to, from) {
				this.$router.go(0);
			}
		}
	}
</script>
<style scoped>
  .submitspotOrder{border-radius: 5px;padding: 10px 40px;background-color: #ff7300;font-size: 18px;display: flex;align-items: center;color: #fff; cursor: pointer;}
  .submitspotback{border-radius: 5px;padding: 10px 40px;border:1px solid #ff7300; color:#ff7300;font-size: 18px;display: flex;align-items: center;  cursor: pointer;}
  .submitspotOrder:hover{border:1px solid #ff7300;}
  .ivu-btn:hover {border:1px solid #ff7300;}
</style>