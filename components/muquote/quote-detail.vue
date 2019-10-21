<template>
  <!--出价提示-->
  <Modal
      title="需求详情"
      v-model="loading"
      @on-cancel="AddressCancel"
      :width='1050'
      class-name="vertical-center-modal">
    <p slot="header" style="color:#666; text-align:left; font-size:14px;">
      <Icon type="ios-create" style="font-size:18px;"/>
      <span>查看报价</span>
    </p>
    <div>
		<div style="line-height:32px; margin-left: 40px">
             <Row index="">
              <Col span="12">询价编号 : {{OrderList.billNo}}</Col>
			  <Col span="12">发布时间 : {{OrderList.createTime}}</Col>
           
            </Row>
            <Row index="">
              <Col span="12">出发地：{{dispatchFullAddress}}</Col>
              <Col span="12">到达地：{{dispatchFullAddress}}</Col>
            </Row>
             <Row index="">
              <Col span="12">询价有效时间: {{OrderList.inquiryMinute}}小时
              </Col>
              <Col span="12">报价倒计时:   
                  <span class='red'>
					<TimeDown :isshow="Timeloading" :timeStyleType='2' :endTime="OrderList.inquiryEndTime" hoursShow></TimeDown>
				</span>	
              </Col>
			  
            </Row>
			<Row index="">
			   <Col span="12">订单状态 :  
					<span    v-if='OrderList.status==2'      >已入选</span>
					<span   v-else-if='OrderList.status==1' >已报价</span>
					<span   v-else  >未入选</span> 				
			   </Col>
			    <Col span="12">是否含税 :   
					<span v-if='OrderList.isTax==0'>否</span>
					<span v-else>是</span>
			   </Col>
            </Row>
			
          </div>
    </div>
    <div class="whitebg mt20" style="padding:0px 18px 18px;">
			<div style="line-height:32px; ">
				<Row index="" style="background: #fafafa;line-height: 42px;text-align: center; border-bottom: 1px solid #eee;">
				<Col span="4">货物名称</Col>
				<Col span="3">分类</Col>
				<Col span="2">货物数量</Col>
				<Col span="3">单价（元/吨）</Col>
				<Col span="3">总金额</Col>
				<Col span="4">询价人</Col>
				<Col span="2">联系人</Col>
				<Col span="3">联系电话</Col>
			
		
				<Col span="3"></Col>

				</Row>
				<Row   style="line-height: 32px;text-align: center;border-bottom: 1px solid #eee;">
				<Col span="4">{{OrderList.freightGoods}}</Col>
				<Col span="3"> {{freightGoodsCname}}</Col>
				<Col span="2">{{OrderList.weight}}吨</Col>
				<Col span="3">{{price}}</Col>
				<Col span="3">¥{{price*OrderList.weight}}</Col>
				<Col span="4">{{OrderList.memberName}}</Col>
				<Col span="2">{{OrderList.contact}}</Col>
				<Col span="3">{{OrderList.phone}}</Col>
		
		
			
				</Row>
				<Row>
				<Col v-if='this.datalist==null'><p style="font-size:14px; text-align:center; width:100%;">暂无任何信息！</p></Col>

				</Row>
		</div>

    
    </div>

    <p slot="footer" style="text-align:center">

    </p>
  </Modal>
</template>

<script>
	import AddressFrom from "../address-from";
	import {getCookies} from '../../config/storage'
	import {sendHttp} from "../../api/common";
	import TimeDown from '../../components/timeDown'
	import countdown from '../../components/countdown'
	import server from "../../config/api";


	export default {
		name: 'QuoteDeatil',
		components: {
			AddressFrom,
			TimeDown,
			countdown
		},
		data() {
			return {
				options4: {
					disabledDate: date => {
						// this成功指向vue实例
						return date && date.valueOf() > this.date || date && date.valueOf() < Date.now() - 86400000;
					}
				},
				Timeloading: false,
				detailloading: false,
				tax_id: 0,
				isAddressFormShow: false,
				loading: false,
				localList: [
					'30',
					'60',
					'120'
				],
				taxList: [
					'否',
					'是',
				],
				tax: '否',
				title: '60',
				OrderList: {},
				dispatchFullAddress:'',
				receiptFullAddress:'',
				freightGoodsCname:'',
				price:'',
				date: '',
				formAddress: {		
					memberId: '',
					contact: '',    //收货人姓名
					phone: '',   //收货人电话
					idNumber: '',  //身份证
					countryId: '',   //国家
					state: '', //省
					city: '',     //市
					district: '',      //区县
					address: '',//详细地址
					defaultAddress: false,    //设置默认地址
					demandBeginDate: '',
					demandEndDate: '',
					alias: ''             //别名
				},

			}
		},
		props: {
			isshow: {
				type: Boolean,
				default: false
			},
			datalist: {
				type: Object
			}
		},
		methods: {
			reloadPage() {
				this.$router.go(0)
			},
			demandDate(e) {
				this.formAddress.demandBeginDate = e[0]
				this.formAddress.demandEndDate = e[1]
			},
			getSelectCountry(res) {
				this.formAddress.countryId = res.countryId
				this.formAddress.state = res.provinceId
				this.formAddress.city = res.cityId
				this.formAddress.district = res.areaId
			},
			AddressCancel() {
				this.loading = false
				this.$emit('unChange', false)
			},
			cancelDelay() {

			},
			selectLang(e) {
				this.title = this.localList[e]
			},
			selectTax(e) {
				this.tax = this.taxList[e]
				this.tax_id = e
			},
			async dataList() {
				let params = {
					id: this.datalist.demandId,
				}
				const res = await sendHttp(this, true, server.api.freight.freightDemand, params, 2)
				this.dispatchFullAddress=this.datalist.dispatchFullAddress
				this.receiptFullAddress=this.datalist.receiptFullAddress
				this.freightGoodsCname=this.datalist.freightGoodsCname
				this.price=this.datalist.price
				this.OrderList = res.data
				this.formAddress.phone = res.data.phone
				this.formAddress.contact = res.data.contact
				this.formAddress.demandBeginDate = res.data.demandBeginDate
				this.formAddress.demandEndDate = res.data.demandEndDate
				let t = new Date(res.data.demandEndDate)
				this.date = t.getTime();

			},
			
		},
		watch: {
			isshow: function (e) {
				if (e === true) {
					this.dataList();
					this.loading = true
					this.isAddressFormShow = true
				} else {
					this.loading = false
				}
			}
		},
	}

</script>
<style scoped>
.ivu-form-item-content{
	position: relative;
    line-height: 40px;
    font-size: 12px;
}
</style>
