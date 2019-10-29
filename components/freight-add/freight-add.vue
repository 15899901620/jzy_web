<template>
  <!--出价提示-->
  <Modal
      title="填写用车信息"
      v-model="loading"
      @on-cancel="AddressCancel"
      :width='700'
      class-name="vertical-center-modal">
    <p slot="header" style="color:#666; text-align:left; font-size:14px;">
      <Icon type="ios-create" style="font-size:18px;"/>
      <span>填写用车信息</span>
    </p>
    <div class="">
      <Form ref="formAddress" :model="formAddress" :label-width="100" :rules="ruleValidate">
        <Row index="0">
          <Col span="12">
            <FormItem label="订单号">
              <Input v-model="datalist.orderNo" disabled placeholder="请输入订单号"></Input>
            </FormItem>
          </Col>
          <Col span="12">
            <FormItem label="货物名称">
              <Input v-model="datalist.skuName" disabled placeholder="请输入货物名称"></Input>
            </FormItem>
          </Col>
        </Row>
        <Row index="0">
          <Col span="12" style="margin-top: 5px;">
            <FormItem label="数量">
              <Input v-model="datalist.orderNum" disabled placeholder="请输入数量"></Input>
            </FormItem>
          </Col>
          <Col span="12" style="margin-top: 5px;">
            <FormItem label="提货仓库">
              <Input v-model="formAddress.warehouseName" disabled placeholder="请输入提货仓库"></Input>
            </FormItem>
          </Col>
        </Row>
        <Row index="0">
          <Col span="12" style="margin-top: 5px;">
            <FormItem label="联系人" prop="name">
              <Input v-model="formAddress.contact" disabled placeholder="请输入收货人的姓名"></Input>
            </FormItem>
          </Col>
          <Col span="12" style="margin-top: 5px;">
            <FormItem label="联系电话" prop="phone">
              <Input v-model="formAddress.phone" disabled placeholder="请输入收货人的联系电话"></Input>
            </FormItem>
          </Col>
        </Row>
        <Row index="1">
          <Col span="22" style="margin-top: 5px;">
            <FormItem label="提货地址">
              <Input v-model="formAddress.warehouseAddress" disabled></Input>
            </FormItem>
          </Col>
        </Row>
        <Row index="2">
          <Col span="12" style="margin-top: 5px;">
            <FormItem label="用车日期" prop="demandEndDate">
              <DatePicker type="date" transfer :value='formAddress.demandBeginDate' :options="options4"
                          format="yyyy-MM-dd" @on-change="formAddress.demandBeginDate = $event"></DatePicker>
            </FormItem>
          </Col>
          <FormItem label="截止日期" prop="demandEndDate">
            <DatePicker type="date" transfer :value='formAddress.demandEndDate' :options="options4" format="yyyy-MM-dd"
                        @on-change="formAddress.demandEndDate = $event"></DatePicker>
          </FormItem>
          </Col>
        </Row>
        <Row index="3">
          <Col span="12" style="margin-top: 5px;">
            <FormItem label="询价有效时间">
              <Dropdown placement="bottom-start" trigger="click" @on-click="selectLang">
                <Button type="primary">
                  {{title}}小时
                  <Icon type="ios-arrow-down"></Icon>
                </Button>
                <DropdownMenu slot="list">

                  <DropdownItem v-for="(value, key) in localList" :name="key" :key="key">{{value}}</DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </FormItem>
          </Col>
          <Col span="12">
            <FormItem label="是否含税" style="margin-top: 5px;">
              <Dropdown placement="bottom-start" trigger="click" @on-click="selectTax">
                <Button type="primary">
                  {{tax}}
                  <Icon type="ios-arrow-down"></Icon>
                </Button>
                <DropdownMenu slot="list">

                  <DropdownItem v-for="(value, key) in taxList" :name="key" :key="key">{{value}}</DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </FormItem>
          </Col>
        </Row>
        <Row index="4">
          <Col style="margin-top: 5px;">
            <FormItem label="收货地址" prop="pickupMode">
              <address-from
                  :country="1"
                  :province="44"
                  :isshow="this.isAddressFormShow"
                  @selectAddress="getSelectCountry"
              >
              </address-from>
            </FormItem>
          </Col>
        </Row>
      </Form>
    </div>
    <p slot="footer" style="text-align:center">
      <Button type="primary" @click="AddressOk">我要找车</Button>
    </p>
  </Modal>
</template>

<script>
	import AddressFrom from "../address-from";
	import {getCookies} from '../../config/storage'
	import {sendHttp} from "../../api/common";
	import server from "../../config/api";

	export default {
		name: 'AddressDialog',
		components: {
			AddressFrom
		},
		data() {
			// 收货人姓名
			const validatename = (rule, value, callback) => {
				if (value === '') {
					callback(new Error('收货人姓名不能为空'));
				} else {
					callback();
				}
			};
			//收货人电话
			const validatephone = (rule, value, callback) => {
				if (!value) {
					callback('电话不能为空'); // 校验不通过
					return false;
				} else {
					const isPhone = /^([0-9]{3,4}-)?[0-9]{7,8}$/; // 0571-86295197
					const isPhone02 = /^\d{3,4}-\d{3,4}-\d{3,4}$/; // 4001-550-520
					const isMob = /^1[0-9]{10}$/;
					const valuePhone = value.trim();
					if (isMob.test(valuePhone) || isPhone.test(valuePhone) || isPhone02.test(valuePhone)) { // 正则验证
						callback(); // 校验通过
						return true;
					} else {
						callback('请输入正确手机号或座机电话'); // 校验不通过
						return false;
					}
				}
			};

			//国家
			const validatecountryId = (rule, value, callback) => {
				if (value === '') {
					callback(new Error('国家不能为空'));
				} else {
					callback();
				}
			};
			//身份证号
			const validateidNumber = (rule, value, callback) => {
				if (value === '') {
					callback(new Error('身份证号不能为空'));
				}
				if (value.length == 15) {
					var patrn = /^[1-9]\d{5}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}$/
					if (!patrn.exec(value)) {
						callback(new Error('请输入正确的身份证号'));
					} else {
						callback();
					}
				} else if (value.length == 18) {
					var patrn = /^[1-9]\d{5}(18|19|20|(3\d))\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/
					if (!patrn.exec(value)) {
						callback(new Error('请输入正确的身份证号'));
					} else {
						callback();
					}
				} else {
					callback(new Error('请输入正确的身份证号'));
				}

			};
			const validateaddress = (rule, value, callback) => {
				if (value === '') {
					callback(new Error('详细地址不能为空'));
				} else {
					callback();
				}
			};
			const validatedemandEnd = (rule, value, callback) => {
				if (value === '') {
					callback(new Error('用车时间不能为空'));
				} else {
					callback();
				}
			};
			return {
				options4: {
					disabledDate: date => {
						// this成功指向vue实例
						return date && date.valueOf() < Date.now() - 86400000;
					}
				},

				tax_id: 1,
				isAddressFormShow: false,
				loading: false,
				localList: [
					'1',
					'2',
					'3',
					'4',
					'5',
					'6',
					'7',
					'8',
				],
				taxList: [
					'否',
					'是',
				],
				tax: '是',
				title: '1',
				OrderList: {},
				userinfo: {},
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
					receiver_district: '',
					provinceId: '',
					warehouseAddress:'',
					dispatchFullAddress: '',
					warehouseName:'',
					address: '',//详细地址
					defaultAddress: false,    //设置默认地址
					demandBeginDate: this.$utils.dateFormat(new Date(), 'yyyy-MM-dd'),
					demandEndDate: this.$utils.dateFormat(new Date(), 'yyyy-MM-dd'),
					alias: ''             //别名
				},
				ruleValidate: {
					name: [
						{validator: validatename, trigger: 'blur', required: true}
					],
					phone: [
						{validator: validatephone, trigger: 'blur', required: true}
					],
					countryId: [
						{validator: validatecountryId, trigger: 'blur', required: true}
					],
					idNumber: [
						{validator: validateidNumber, trigger: 'blur', required: true}
					],
					address: [
						{validator: validateaddress, trigger: 'blur', required: true}
					],
					demandEndDate: [
						{validator: validatedemandEnd, trigger: 'blur', required: true}
					],
				}
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
			async dataList() {	
			


			},
			selectLang(e) {
				this.title = this.localList[e]
			},
			selectTax(e) {
				this.tax = this.taxList[e]
				this.tax_id = e
			},

			async dataList() {
				// var date= new Date(Date.parse(res.data.demandEndDate.replace(/-/g, "/")))
				let res={}
				let params = {
					orderId: this.datalist.id,
				}
				res = await sendHttp(this, true, server.api.order.getOrderInfoById, params, 1)
				console.log(res)
				
				this.formAddress.contact = res.data.contacter	
				this.formAddress.phone =  res.data.phone	
				this.formAddress.warehouseAddress =  res.data.warehouseAddress
				this.formAddress.warehouseName =  res.data.warehouseName			
				let t = new Date(this.datalist.deliveryDeadline)
				this.date = t.getTime();
				this.formAddress.demandEndDate = this.$utils.dateFormat(t, 'yyyy-MM-dd')
				
        //todo 在此初始化，展示用户的联系人，默认到物流联系人，没有物流联系人填充账号联系人
        //todo 在些初始化，展示提货地址，提货地址为仓库的详细地址
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
						isTax: this.tax_id,
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
					const res = await sendHttp(this, true, server.api.biddding.freightDemand, params, 1)
					if (res.data == true) {
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
							title: res.data.message,
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
</style>
