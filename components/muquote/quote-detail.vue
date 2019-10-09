<template>
  <!--出价提示-->
  <Modal
      title="需求详情"
      v-model="loading"
      @on-cancel="AddressCancel"
      :width='800'
      class-name="vertical-center-modal">
    <p slot="header" style="color:#666; text-align:left; font-size:14px;">
      <Icon type="ios-create" style="font-size:18px;"/>
      <span>查看报价</span>
    </p>
    <div>
      <Form ref="formAddress" :model="formAddress" :label-width="100" >
        <Row index="0">
          <Col span="12">
            <FormItem label="订单号">
              <span style="line-height:40px">{{OrderList.orderNo}}</span>
            </FormItem>
          </Col>
          <Col span="12">
            <FormItem label="需求编号">
              {{OrderList.billNo}}
            </FormItem>
          </Col>
        </Row>
        <Row index="0">
          <Col span="12">
            <FormItem label="货物名称">
              {{OrderList.freightGoods}}
            </FormItem>
          </Col>
          <Col span="12">
            <FormItem label="货运数量">
              {{OrderList.weight}}吨
            </FormItem>
          </Col>

        </Row>
        <Row index="0">
          <Col span="12">
            <FormItem label="联系人">
              {{OrderList.contact}}
            </FormItem>

          </Col>
          <Col span="12">
            <FormItem label="联系电话">
              {{OrderList.phone}}
            </FormItem>

          </Col>
        </Row>
        <Row index="2">
          <Col span="12">
            <FormItem label="货物价格">
              {{price}}/吨
            </FormItem>
          </Col>
          <Col span="12">
            <FormItem label="分类">
              {{freightGoodsCname}}
            </FormItem>
          </Col>
        </Row>
        <Row index="3">
          <Col span="12">
            <FormItem label="询价有效时间">
              {{OrderList.inquiryMinute}}小时
            </FormItem>
          </Col>
          <Col span="12">
            <FormItem label="是否含税">
              <span v-if='OrderList.isTax==0'>否</span>
              <span v-else>是</span>
            </FormItem>
          </Col>

        </Row>
        <Row index="4">
			<Col span="12">
				<FormItem label="出发地">
				{{dispatchFullAddress}}
				</FormItem>
			</Col>
			<Col span="12">
				<FormItem label="到达地">
				{{receiptFullAddress}}
				</FormItem>
         	</Col>
        </Row>
      </Form>
    </div>
    <div class="whitebg mt20" style="padding:0px 18px 18px;">
        <span class="fr mr15 red">
          报价倒计时：
          <TimeDown :isshow="Timeloading" :timeStyleType='2' :endTime="OrderList.inquiryEndTime" hoursShow></TimeDown>
        </span>


    
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
				const res = await sendHttp(this, true, server.api.freight.freightDemand, params, 1)
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
