<template>
  <Modal
      v-model="editmodal"
      title="编辑月计划"

      width="50%"
      :loading="loading"
      :mask-closable="false"
  >
    <Form ref="formItem" :model="formItem" :label-width="110" :rules="ruleValidate">
      <Row :gutter="24" index="3">
        <Col span="12">
          <FormItem label="年份" prop="yearPlanId">
            <Input v-model="dataList.year" disabled style="width:80%"/>
          </FormItem>
        </Col>
      </Row>
      <Row :gutter="24" index="4">
        <Col span="12">
          <FormItem label="月份">
            <Input v-model="canMonth" disabled style="width:80%"/>
          </FormItem>
        </Col>
        <Col span="12">
          <FormItem label="月计划量" prop="monthNum">
            <Input v-model="formItem.monthNum" style="width:80%"/>
          </FormItem>
        </Col>
      </Row>
      <Row :gutter="24" index="4">
        <Col span="12">
          <FormItem label="包装方式" prop="packingModes">
            <Input v-model="dataList.packingModes" disabled style="width:80%"/>
          </FormItem>
        </Col>
        <Col span="12">
          <FormItem label="产品等级" prop="productGrade">
            <Input v-model="dataList.productGrade" disabled style="width:80%"/>
          </FormItem>
        </Col>
      </Row>
      <Row :gutter="24" index="5">
        <Col span="12">
          <FormItem label="产品编号" prop="skuNo">
            <Input v-model="dataList.skuNo" disabled style="width:80%"/>
          </FormItem>
        </Col>
        <Col span="12">
          <FormItem label="产品名称" prop="skuName">
            <Input v-model="dataList.skuName" disabled style="width:80%"/>
          </FormItem>
        </Col>
      </Row>
      <Row :gutter="24" index="6">
        <Col span="12">
          <FormItem label="单位" prop="uomName">
            <Input v-model="dataList.uomName" disabled style="width:80%"/>
          </FormItem>
        </Col>
        <Col span="12">
          <FormItem label="产商" prop="manufacturer">
            <Input v-model="dataList.manufacturer" disabled style="width:80%"/>
          </FormItem>
        </Col>
      </Row>
      <Row :gutter="24" index="6">
        <Col span="12">
          <FormItem label="参考单价" prop="uomName">
            <Input v-model="dataList.finalPrice" disabled style="width:80%"/>
          </FormItem>
        </Col>
      </Row>
    </Form>
    <div slot="footer">
       
      <Button type="text" size="large" @click="cancel('formItem')">取消</Button>
       
      <Button type="primary" size="large" @click="define('formItem')">确定</Button>
    </div>
  </Modal>
</template>

<script>
import server from "../../../../config/api";
import {sendHttp} from "../../../../api/common";

export default {
	name: 'monthplanadd',
	props: {
		datalist: {
			type: Object
		},
		isshow: {
			type: Boolean,
			default: false
		}
	},
	components: {},
	data() {
		return {
			self: this,
			editmodal: false,
			loading: true,
			loading1: false,
			loading2: false,
			dataList: {},
			canMonth: '',
			packingData: [
				{value: 1, labal: '标准包装'},
				{value: 2, labal: '非标准包装'}
			],
			gradeData: [
				{value: 1, labal: '优等品'},
				{value: 2, labal: '一等品'},
				{value: 3, labal: '合格品'}
			],
			monthData: [
				{value: 1, labal: '1'},
				{value: 2, labal: '2'},
				{value: 3, labal: '3'},
				{value: 4, labal: '4'},
				{value: 5, labal: '5'},
				{value: 6, labal: '6'},
				{value: 7, labal: '7'},
				{value: 8, labal: '8'},
				{value: 9, labal: '9'},
				{value: 10, labal: '10'},
				{value: 11, labal: '11'},
				{value: 12, labal: '12'},
			],

			checkprod: [],
			warehouseData: [],
			isClear: false,

			formItem: {
				id: 0,
				monthNum: '',
			},
			ruleValidate: {
				month: [
					{required: true, message: '月份不能为空', trigger: 'blur'}
				],
				monthNum: [
					{required: true, message: '月计划量不能为空', trigger: 'blur'}
				],
			}
		}
	},
	methods: {
		async define() {

			let params = {
				...this.formItem
			}
			var res = await sendHttp(this, true, server.api.month.monthedit, params)
			if (!res.data.errorcode && res.status === 200) {
				this.$Message.info({content: '添加成功'})
				this.$emit('unChange', false)
			} else {
				this.$Notice.warning({
					title: res.data.message,
					duration: 5
				});
			}
		},
		getBillDate(res) {
			this.formItem.month = res
		},
		async getwarehouse() {
			var res = await sendHttp(this, true, server.api.month.yeardetail, {id: this.formItem.id})

			this.dataList = res.data
			if (this.dataList.packingModes == 1) {
				this.dataList.packingModes = '标准包装'
			} else {
				this.dataList.packingModes = '非标准包装'
			}
			if (this.dataList.productGrade == 1) {
				this.dataList.productGrade = '优等品'
			} else if (this.dataList.productGrade == 2) {
				this.dataList.productGrade = '一等品'
			} else {
				this.dataList.productGrade = '合格品'
			}

		}
	},
	cancel(formItem) {
		this.$emit('unChange', false)
		this.formItem.monthNum = ''
		this.$refs.month.handleClear()
	},

	mounted() {

	},
	watch: {
		datalist: {
			handler(newValue, oldValue) {
				this.formItem.monthNum = newValue.monthNum
				this.formItem.id = newValue.id
				this.canMonth = newValue.month
			}
		},
		isshow: function (e) {
			if (e === true) {
				this.editmodal = true
				this.getwarehouse()
			} else {
				this.editmodal = false
			}
		},
		formItem: {
			//深度监听，可监听到对象、数组的变化
			handler(val, oldVal) {

				// val.finalPrice = parseFloat(val.basePrice) + parseFloat(val.customerAdd) + parseFloat(val.shippingFee) + parseFloat(val.manuallyAdd) + parseFloat(val.warehouseAdd) + parseFloat(val.packingAdd) + parseFloat(val.jryAdd)
				// val.netPrice = (parseFloat(val.basePrice) + parseFloat(val.customerAdd) + parseFloat(val.shippingFee) + parseFloat(val.manuallyAdd) + parseFloat(val.warehouseAdd) + parseFloat(val.packingAdd) + parseFloat(val.jryAdd)) / (1 + parseInt(val.taxRate)/100)

			},
			deep: true
		}
	}
}
</script>
<style>
  .uploadimg {
    width: 100%
  }

  .uploadimg img {
    height: 60px;
  }
</style>
