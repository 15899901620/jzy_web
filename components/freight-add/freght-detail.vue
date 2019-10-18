<template>
  <!--出价提示-->
  <Modal
      title="需求详情"
      v-model="loading"
      @on-cancel="AddressCancel"
      :width='1000'
      class-name="vertical-center-modal">
    <p slot="header" style="color:#666; text-align:left; font-size:14px;">
      <Icon type="ios-create" style="font-size:18px;"/>
      <span>查看货物需求</span>
    </p>
    <div>
      <Form ref="formAddress" :model="formAddress" :label-width="100" style="font-size:14px; padding-left:18px;">
        <Row index="0">
          <Col span="12">
            <FormItem label="订单号">
              <span>{{OrderList.orderNo}}</span>
            </FormItem>
          </Col>
          <Col span="12">
            <FormItem label="需求编号">
              <span>{{OrderList.billNo}}</span>
            </FormItem>
          </Col>
        </Row>
        <Row index="0">
          <Col span="12">
            <FormItem label="货物名称">
              <span>{{OrderList.freightGoods}}</span>
            </FormItem>
          </Col>
          <Col span="12">
            <FormItem label="货运数量">
              <span>{{OrderList.weight}}吨</span>
            </FormItem>
          </Col>

        </Row>
        <Row index="0">
          <Col span="12">
            <FormItem label="联系人">
              <span>{{OrderList.contact}}</span>
            </FormItem>

          </Col>
          <Col span="12">
            <FormItem label="联系电话">
              <span>{{OrderList.phone}}</span>
            </FormItem>

          </Col>
        </Row>
        <Row index="2">
          <Col span="12">
            <FormItem label="用车开始日期">
              <span>{{OrderList.demandBeginDate}}</span>
            </FormItem>
          </Col>
          <Col span="12">
            <FormItem label="用车结束日期">
              <span>{{OrderList.demandEndDate}}</span>
            </FormItem>
          </Col>
        </Row>
        <Row index="3">
          <Col span="12">
            <FormItem label="询价有效时间">
              <span>{{OrderList.inquiryMinute}}小时</span>
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
				<FormItem label="提货仓库">
				{{OrderList.dispatchFullAddress}}
				</FormItem>
			</Col>
			<Col span="12">
				<FormItem label="收货地址">
				{{OrderList.receiptFullAddress}}
				</FormItem>
         	</Col>
        </Row>
      </Form>
    </div>
    <div class="whitebg mt20" style="padding:0px 18px 18px;">
      <div style="line-height: 46px; border-bottom: 1px solid #ddd;">
        <span class="fs16" style="line-height: 46px; ">承运商报价信息</span>
        <span class="fr mr15 red">
          报价倒计时：
          <TimeDown :isshow="Timeloading" :timeStyleType='2' :endTime="OrderList.inquiryEndTime" hoursShow></TimeDown>
        </span>
      </div>

      <div style="line-height:32px; ">

        <Row :gutter="24"  index="" style="background: #fafafa;line-height: 42px;text-align: center; border-bottom: 1px solid #eee;">
          <Col span="4">货物名称</Col>
          <Col span="3">单价（元/吨）</Col>
          <Col span="3">总运费</Col>
          <Col span="5">承运商</Col>
          <Col span="3">承运商电话</Col>
          <Col span="2">状态</Col>
          <Col span="3">操作</Col>
        </Row>
        <Row :gutter="24"  v-for="(item, index) in OrderList.freightOffers" :key='index' index=""
             style="line-height: 32px;text-align: center;border-bottom: 1px solid #eee;">
          <Col span="4">
            <template v-if="item.freightGoods">
              {{item.freightGoods}}
            </template>
            <template v-else>
              <span class="gray">&nbsp;</span>
            </template>
          </Col>
          <Col span="3">
            <template v-if="item.price">
              ¥{{item.price}}
            </template>
            <template v-else>
              <span class="gray">&nbsp;</span>
            </template>
          </Col>
          <Col span="3">
            <template v-if="item.price">
              ¥{{item.price*OrderList.weight}}
            </template>
            <template v-else>
              <span class="gray">&nbsp;</span>
            </template>
            </Col>
          <Col span="5">
            <template v-if="item.supplierName">
              {{item.supplierName}}
            </template>
            <template v-else>
              <span class="gray">&nbsp;</span>
            </template>
          </Col>
          <Col span="3">
            <template v-if="item.supplierMobile">
              {{item.supplierMobile}}
            </template>
            <template v-else>
              <span class="gray">&nbsp;</span>
            </template>

          </Col>
          <Col span="2">
            <span v-if="item.status==1">竞价中</span>
            <span v-if="item.status==2">已中标</span>
            <span v-if="item.status==3">未中标</span>
          </Col>
          <Col span="3">
            <span v-if='item.status==1 '><a
                style="background-color: #23aa36;padding: 4px 18px; color: #fff; border-radius: 3px;"
                @click='setSelected(item)'>入 选</a></span>
          </Col>
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
		name: 'AddressDetail',
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
			},
			type: {
				default: '1'
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
				let res={}
				if(this.type==2){
					let params = {
					orderId: this.datalist.orderId,
					}
					 res = await sendHttp(this, true, server.api.freight.InfoByOrderId, params, 2)
				}else{
					let params = {
					orderId: this.datalist.id,
					}
					res = await sendHttp(this, true, server.api.freight.InfoByOrderId, params, 1)
				}
				console.log('11',res)
				this.OrderList = res.data
				this.formAddress.phone = res.data.phone
				this.formAddress.contact = res.data.contact
				this.formAddress.demandBeginDate = res.data.demandBeginDate
				this.formAddress.demandEndDate = res.data.demandEndDate
				let t = new Date(res.data.demandEndDate)
				this.date = t.getTime();

			},
			setSelected(row) {
				console.log(row)
				this.$Modal.confirm({
					content: '<p>是否选择该承运商，确认后无法取消</p>',
					onOk: () => {
						let params = {
							id: row.id,
						}
						sendHttp(this, true, server.api.freight.setSelected, params, 1).then(response => {
							if(response.errorcode==501106){
								alert(response.message)
							}else{
								this.AddressCancel();
							}

						}).catch(err => {
							this.$Notice({
								desc: err.response.data.message
							})
						})

					}
				})

			},
			async AddressOk() {
				//设置别名
				if (!this.formAddress.phone) {
					this.$Notice.warning({
						title: '联系电话不能为空',
						duration: 5,
						closable: true
					});
					return
				} else if (!this.formAddress.countryId) {
					this.$Notice.warning({
						title: '请选择国家',
						duration: 5,
						closable: true
					});
					return
				} else if (!this.formAddress.state) {
					this.$Notice.warning({
						title: '请选择省份',
						duration: 5,
						closable: true
					});
					return
				} else if (!this.formAddress.city) {
					this.$Notice.warning({
						title: '请选择城市',
						duration: 5,
						closable: true
					});
					return
				} else if (!this.formAddress.district) {
					this.$Notice.warning({
						title: '请选择区/县',
						duration: 5,
						closable: true
					});
					return
				} else {
					let params = {
						inquiryMinute: this.title,
						tax_id: this.tax_id,
						orderId: this.datalist.id,
						contact: this.formAddress.contact,
						phone: this.formAddress.phone,   //收货人电话
						receiptCountryId: this.formAddress.countryId,   //国家
						receiptState: this.formAddress.state, //省
						receiptCity: this.formAddress.city,     //市
						receiptDistrict: this.formAddress.district,      //区县
						demandBeginDate: this.formAddress.demandBeginDate,
						demandEndDate: this.formAddress.demandEndDate,
					}
					//   const res = await addressAdd(this, params)

					const res = await sendHttp(this, true, server.api.biddding.freightDemand, params, 1)
					if (res) {
						this.$Modal.success({
							title: '提示',
							content: '添加成功',
							duration: 5,
							closable: true
						})
						this.loading = false
						this.$emit('unChange', false)
					} else {
						this.$Modal.warning({
							title: '提示',
							title: '添加地址失败，请联系客服',
							duration: 5,
							closable: true
						});
						return
					}
				}
			}
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
<style lang="less">
  .vertical-center-modal {
    display: flex;
    align-items: center;
    justify-content: center;

    .ivu-modal {
      top: 0;

      .ivu-modal-content {
        .ivu-modal-header {
          border-top-left-radius: 6px;
          border-top-right-radius: 6px;
          background-color: #f9f9f9;
        }
      }
    }
  }

  .ivu-form-item {
    margin-bottom: 5px;
  }
</style>
