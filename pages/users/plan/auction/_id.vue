<template>
  <div class="clearfix graybg">
    <div class="w1200 dflex " style="margin-bottom: 40px">
      <usernav></usernav>
      <div class="memberInfor ml20 mt20">
        <!--个人信息-->
        <div class="whitebg" style="padding:0px 18px 18px;">
          <h3 class="fs16 " style="line-height: 46px; border-bottom: 1px solid #ddd;">竞拍合约详情 <span
              v-if="dataInfo.availableNum > 0 && dataInfo.status == 1" style="float:right;color:red; font-size:16px;">转单倒计时： <TimeDown :endTime="dataInfo.lastOrderedDate" hoursShow endMsg="已失效"></TimeDown></span>
          </h3>
          <div style="line-height:32px;">
            <Row index="">
              <Col span="12">公司名称：{{dataInfo.companyName}}</Col>
              <Col span="12">竞拍编号：{{dataInfo.auctionNo}}</Col>
            </Row>
            <Row index="">
              <Col span="12">合约编号：{{dataInfo.planNo}}</Col>
              <Col span="12">创建时间：{{dataInfo.createTime}}</Col>
            </Row>
            <Row index="">
              <Col span="12">转单状态：
                <Tag v-if="dataInfo.status === 0" color="default">已取消</Tag>
                <Tag v-else-if="dataInfo.status === 1" color="default">待转单</Tag>
                <Tag v-else-if="dataInfo.status === 2" color="default">已转单</Tag>
              </Col>
              <Col span="12">付款状态：
                <Tag v-if="dataInfo.takenNum == 0" color="default">待支付</Tag>
                <Tag v-else-if="dataInfo.totalNum > dataInfo.takenNum" color="orange">部分支付</Tag>
                <Tag v-else color="default">已支付</Tag>
              </Col>
            </Row>
            <Row index="">
              <Col span="12">最迟转单时间：
                <span>{{dataInfo.lastOrderedDate}}</span>
              </Col>
            </Row>
          </div>
        </div>

        <div class="whitebg mt20" style="padding:0px 18px 18px;">
          <h3 class="fs16 " style="line-height: 46px; border-bottom: 1px solid #ddd;">商品信息</h3>
          <div style="line-height:32px; ">
            <Row index="">
              <Col span="12">商品名称：{{dataInfo.skuName}}</Col>
              <Col span="12">商品编码：{{dataInfo.skuNo}}</Col>
            </Row>
            <Row index="">
              <Col span="12">产品等级：
                <template v-if="dataInfo.productGrade == 1">优等品</template>
                <template v-else-if="dataInfo.productGrade == 2">一等品</template>
                <template v-else-if="dataInfo.productGrade == 3">合格品</template>
              </Col>
              <Col span="12">生产厂商：{{dataInfo.manufacturer}}</Col>
            </Row>
            <Row index="">
              <Col span="12">包装方式：
                <template v-if="dataInfo.packingModes == 1">标准包装</template>
                <template v-else-if="dataInfo.packingModes == 2">非标准包装</template>
              </Col>
              <Col span="12">单位：{{dataInfo.uomName}}</Col>
            </Row>
          </div>
        </div>

        <div class="whitebg mt20" style="padding:0px 18px 18px;">
          <h3 class="fs16 " style="line-height: 46px; border-bottom: 1px solid #ddd;">转单提货信息</h3>
          <div style="line-height:32px; ">
            <Row index="">
              <Col span="12">合约数量：{{dataInfo.totalNum}}{{dataInfo.uomName}}</Col>
              <Col span="12">待提数量：{{dataInfo.availableNum}}{{dataInfo.uomName}}</Col>
            </Row>
            <Row index="">
              <Col span="12">提货方式：待订单中确定</Col>
              <Col span="12">有效提货时间：
                <span>{{dataInfo.deliveryStart}} 至 {{dataInfo.deliveryDeadline}}</span>
              </Col>
            </Row>
          </div>
        </div>

        <div class="whitebg mt20" style="padding:0px 18px 18px;">
          <h3 class="fs16 " style="line-height: 46px; border-bottom: 1px solid #ddd;">商品信息</h3>
          <div style="line-height:32px; ">
            <Row index=""
                 style="background: #fafafa;line-height: 42px;text-align: center; border-bottom: 1px solid #eee;">
              <Col span="5">货物信息</Col>
              <Col span="4">发货仓</Col>
              <Col span="4">合计单价（元/{{dataInfo.uomName}}）</Col>
              <Col span="3">数量</Col>
              <Col span="4">合计</Col>
              <Col span="4">保证金金额</Col>
            </Row>
            <Row index="" style="line-height: 32px;text-align: center;border-bottom: 1px solid #eee;">
              <Col span="5">{{dataInfo.skuName}}</Col>
              <Col span="4">{{dataInfo.warehouseName}}</Col>
              <Col span="4">{{$utils.amountFormat(dataInfo.bidPrice)}}</Col>
              <Col span="3">{{dataInfo.totalNum}}</Col>
              <Col span="4">{{$utils.amountFormat(dataInfo.totalAmount)}}</Col>
              <Col span="4">{{$utils.amountFormat(dataInfo.depositAmount)}}</Col>
            </Row>
          </div>
          <div style="display: flex;justify-content: flex-end;margin: 30px 0;">
            <Button v-if="dataInfo.availableNum > 0 && dataInfo.status == 1" class="submitspotOrder" @click='toCreateOrder'>转订单</Button>
            <Button class="submitspotback ml10" @click='goBack'>返回</Button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
	import Navigation from '../../../../components/navigation'
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
				//获取竞拍合约信息
				store.dispatch('bidders/getPlanDetail', {id: params.id}),
			])
		},
		computed:{
			...mapState({
				dataInfo: state => state.bidders.planDetail,
			})
		},
		data() {
			return {
        id:!this.$route.params.id ? 0 : this.$route.params.id
			}
		},
		methods: {
			goBack(){
				history.go(-1)
      },
			toCreateOrder(){
         location.href = '/auction/change/' + this.$route.params.id
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