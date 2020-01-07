<template>
  <Modal
    v-model="addmodal"
    title="添加月计划"
    @on-cancel="cancel"
    width="50%"
    :loading="loading"
    :mask-closable="false"
    >
    <Form ref="formItem" :model="formItem" :label-width="110"  :rules="ruleValidate">
        <Tabs size="small">
          <TabPane label="商品信息" >

             <Row :gutter="24" index="3">
               <Col span="12">
                 <FormItem label="年份" prop="yearPlanId" >
                   <Input v-model="rowData.year"  disabled placeholder="请输入年计划id" style="width:80%" />
                 </FormItem>
               </Col>
               <Col span="12">
                 <FormItem label="月计划量" prop="monthNum" >
                      <input-special :min="min" :max="max" :step="1" v-model="formItem.monthNum" style="width:270px"  @change="changeNum"></input-special>
                    <!-- <InputNumber :max="50" :min="160" :step="1" v-model="formItem.monthNum" prop="monthNum"></InputNumber> -->
                 </FormItem>
               </Col>
            </Row>
             <Row :gutter="24" index="4">
                <Col span="12">
               <FormItem label="月份" >
                     <Input v-model="canMonth" disabled   style="width:80%" />
                  </FormItem>
                </Col>
              </Row>
            <Row :gutter="24" index="4">
              <Col span="12">
                <FormItem label="包装方式"  prop="packingModes">
                     <Input v-model="dataList.packingModes" disabled   style="width:80%" />
                </FormItem>
              </Col>
              <Col span="12">
              <FormItem label="产品等级" prop="productGrade">
                    <Input v-model="dataList.productGrade" disabled   style="width:80%" />
              </FormItem>
            </Col>
          </Row>
          <Row :gutter="24" index="5">
            <Col span="12">
              <FormItem label="产品编号" prop="skuNo" >
                <Input v-model="dataList.skuNo" disabled placeholder="请输入产品编号" style="width:80%" />
              </FormItem>
            </Col>
            <Col span="12">
              <FormItem label="产品名称" prop="skuName" >
                <Input v-model="dataList.skuName" disabled placeholder="请输入产品名称" style="width:80%" />
              </FormItem>
            </Col>
          </Row>
          <Row :gutter="24" index="6" >
            <Col span="12">
               <FormItem label="单位" prop="uomName" >
                <Input v-model="dataList.uomName" disabled placeholder="请输入单位" style="width:80%" />
              </FormItem>
            </Col>
            <Col span="12">
              <FormItem label="产商" prop="manufacturer" >
                <Input v-model="dataList.manufacturer" disabled placeholder="请输入分产商" style="width:80%" />
              </FormItem>
            </Col>
          </Row>
        </TabPane>
        <TabPane label="价格信息">
          <Row :gutter="24" index="7">
            <Col span="12">
              <FormItem label="单位定价(￥)" prop="basePrice" >
                <Input v-model="dataList.basePrice"  disabled placeholder="请输入单位定价" style="width:80%"/>
              </FormItem>
            </Col>
            <Col span="12">
              <FormItem label="客户加价(￥)" prop="customerAdd" >
                <Input v-model="dataList.customerAdd" disabled placeholder="请输入客户加价" style="width:80%"/>
              </FormItem>
            </Col>
          </Row>
          <Row :gutter="24" index="8">
            <Col span="12">
              <FormItem label="配送运费(￥)" prop="shippingFee" >
                <Input v-model="dataList.shippingFee" disabled placeholder="请输入配送运费" style="width:80%"/>
              </FormItem>
            </Col>
            <Col span="12">
              <FormItem label="手工加价(￥)" prop="author" >
                <Input v-model="dataList.manuallyAdd" disabled placeholder="请输入手工加价" style="width:80%"/>
              </FormItem>
            </Col>
          </Row>
          <Row :gutter="24" index="9">
            <Col span="12">
              <FormItem label="库区加价(￥)" prop="author" >
                <Input v-model="dataList.warehouseAdd" disabled placeholder="请输入库区加价" style="width:80%"/>
              </FormItem>
            </Col>
            <Col span="12">
              <FormItem label="包装差价(￥)" prop="author" >
                <Input v-model="dataList.packingAdd" disabled placeholder="请输入包装差价" style="width:80%"/>
              </FormItem>
            </Col>
          </Row>
          <Row :gutter="24" index="10">
            <Col span="12">
              <FormItem label="巨融易加价(￥)" prop="author" >
                <Input v-model="dataList.jryAdd" disabled placeholder="请输入巨融易加价" style="width:80%"/>
              </FormItem>
            </Col>
            <Col span="12">
              <FormItem label="税率" prop="author" >
                <Input v-model="dataList.taxRate" disabled placeholder="请输入税率" style="width:80%"/> %
              </FormItem>
            </Col>
          </Row>
          <Row :gutter="24" index="11">
            <Col span="12">
              <FormItem label="合计含税价格(￥)" prop="author" >
                <Input v-model="dataList.finalPrice" disabled placeholder="请输入合计含税价格" style="width:80%"/>
              </FormItem>
            </Col>
            <Col span="12">
              <FormItem label="净价格(￥)" prop="author" >
                <Input v-model="dataList.netPrice" disabled placeholder="请输入净价格" style="width:80%"/>
              </FormItem>
            </Col>
          </Row>
        </TabPane>
      </Tabs>
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
import InputSpecial from '../../../../components/input-special'
export default {
  name: 'monthplanadd',
  props: {
    rowData: {
      type:Object
    },
    isshow: {
      type: Boolean,
      default: false
    }
  },
  components: {
      InputSpecial
  },
  data () {
    return {
      self: this,
      max:0,
      min:0,
      addmodal: false,
      loading: true,
      loading1:false,
      loading2:false,
      dataList:{},
      canMonth:'',
      packingData: [
        { value:1, labal: '标准包装' },
        { value:2, labal: '非标准包装' }
      ],
      gradeData: [
        { value:1, labal: '优等品' },
        { value:2, labal: '一等品' },
        { value:3, labal: '合格品' }
      ],

      checkprod: [],
      warehouseData: [],
      isClear: false,

      formItem: {
        yearId: 0,
        monthNum:0,
        month:0,
      },
      ruleValidate: {
        month: [
          { required: true, message: '月份不能为空', trigger: 'blur' }
        ],
      }
    }
  },
  methods: {
      changeNum(value) {
				this.formItem.monthNum = value
			},
        async  define () {

               let params = {
                    ...this.formItem
               }
            var res= await sendHttp(this, true, server.api.month.monthadd,params)
            if(!res.data.errorcode && res.status ===200){
                this.$Message.info({content: '添加成功'})
                this.$emit('unChange', false)
            }else{

                this.$Notice.warning({
                    title: res.data.message,
                    duration: 5
                });
            }
       },
        getBillDate (res) {
             this.formItem.month = res
        },
      async getwarehouse() {
          var res= await sendHttp(this, true, server.api.month.yeardetail, {id: this.formItem.yearId})

           this.dataList=res.data 

           this.formItem.monthNum=Math.round(this.dataList.yearNum/(12-this.dataList.createMonth+1 ))
           this.min=Math.round(this.formItem.monthNum/2)
           this.max=this.formItem.monthNum*2
           console.log(this.max)
           if(this.dataList.packingModes == 1){
                this.dataList.packingModes ='标准包装'
           } else{
                this.dataList.packingModes ='非标准包装'
           }
            if(this.dataList.productGrade == 1){
                this.dataList.productGrade ='优等品'
           } else if(this.dataList.productGrade == 2){
                this.dataList.productGrade ='一等品'
           }else{
                this.dataList.productGrade ='合格品'
           }

      },
       cancel (formItem) {
        this.$emit('unChange', false)
        this.formItem.monthNum=''
        // this.$refs.month.handleClear()
      },
    },


  mounted () {

   },
  watch: {
    rowData: {

      handler (newValue, oldValue) {

        this.formItem.monthNum= Math.round(newValue.defaultNum)
        this.max= Math.round(newValue.defaultUpNum)
        this.min=Math.round(newValue.defaultDownNum)
        this.formItem.yearId = newValue.id
        this.canMonth = newValue.canMonth
        this.formItem.month = newValue.canMonth
      }
    },
    isshow: function (e) {
      if (e === true) {
        this.addmodal = true
        this.getwarehouse()
      } else {
        this.addmodal = false
      }
    },
    formItem:{
      //深度监听，可监听到对象、数组的变化
      handler(val, oldVal){

        // val.finalPrice = parseFloat(val.basePrice) + parseFloat(val.customerAdd) + parseFloat(val.shippingFee) + parseFloat(val.manuallyAdd) + parseFloat(val.warehouseAdd) + parseFloat(val.packingAdd) + parseFloat(val.jryAdd)
        // val.netPrice = (parseFloat(val.basePrice) + parseFloat(val.customerAdd) + parseFloat(val.shippingFee) + parseFloat(val.manuallyAdd) + parseFloat(val.warehouseAdd) + parseFloat(val.packingAdd) + parseFloat(val.jryAdd)) / (1 + parseInt(val.taxRate)/100)

      },
      deep:true
    }
  }
}
</script>
<style>
  .uploadimg {width: 100%}
  .uploadimg img { height: 60px;}
</style>
