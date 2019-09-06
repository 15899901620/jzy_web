<template>
  <div style="padding: 18px 0px;">
    <Form ref="formItem" :model="formItem" :rules="ruleItem" :label-width="90">
      <Row :gutter="24" index="1">
        <Col span="24">
            <FormItem label="搜索商品" prop='skuId'>
                  <Select
                    style="width:90%"
                    prefix="ios-search"
                    v-model="formItem.skuId"
                    filterable
                    remote
                    label-in-value
                    @on-change="selectProName"
                    :label='formItem.skuNo'
                    :remote-method="sourceData"
                    :loading="loading1" >
                    <Option v-for="(item, index) in checkprod" :value="item.id" :key="index">{{item.skuNo}}-{{item.title}}-{{item.uomName}}-{{item.manufacturer}}</Option>
                  </Select>
                </FormItem>
              </Col>
        </Col>
      </Row>
      <Row :gutter="24" index="1">
        <Col span="24">
          <FormItem prop="phone" label="数       量">
            <Input v-model="formItem.intentionNum"  class="CarrierIput"   placeholder="请输入产品名称" style="width:90%"/>
          </FormItem>
        </Col>
      </Row>
      <Row :gutter="24" index="1">
        <Col span="24">
          <FormItem label="库区" prop="warehouseId">
            <Select v-model="formItem.warehouseId" style="width:90%">
              <Option  v-for="item in warehouseData" :value="item.id" :key="item.id">{{ item.wName }}</Option>
            </Select>
          </FormItem>
        </Col>
      </Row>
      <Row :gutter="24" index="1">
        <Col span="24">
          <FormItem label="产品等级" prop="productGrade">
            <Select v-model="formItem.productGrade" style="width:90%">
              <Option v-for="(item, index) in gradeData" :value="item.value" :key="index">{{item.labal}}</Option>
            </Select>
          </FormItem>
        </Col>
      </Row>
      <Row :gutter="24" index="1">
        <Col span="24">
          <FormItem prop="phone" label="交货时间">
            <DatePicker  v-model="formItem.intentionDate"  type="date" placeholder="交货时间" style="width: 90%;"></DatePicker>
          </FormItem>
        </Col>
      </Row>
      <div style="text-align: center;">
        <Button type="primary">发布求购</Button>
      </div>
    </Form>
  </div>
</template>

<script>
import { getWarehouseList } from '../../api/logistics'
import { getproductlist } from '../../api/product'
export default {
  name:'puchasing',
  data() {
    return {
      loading1: false,
      formItem: {
        memberId: '',
        skuId: '',
        skuNo: '',
        skuName: '',
        warehouseId: '',
        warehouseName: '',
        intentionNum: '',
        productGrade: '',
        intentionDate: ''
      },
      warehouseData:[],
      gradeData: [
        { value:1, labal: '优等品' },
        { value:2, labal: '一等品' },
        { value:3, labal: '合格品' }
      ],
      checkprod: [],
      ruleItem: {

      }
    }
  },
  methods:{
    selectProName (res) {
      if (res) {
        let splitData = res.label.split('-')
        this.formItem.skuId = res.value
        this.formItem.skuNo = splitData[0]
        this.formItem.skuName = splitData[1]
        this.formItem.uomName = splitData[2]
        this.formItem.manufacturer = splitData[3]
      }
    },
    getwarehouse () {
       getWarehouseList(this,{}).then(response => {
         this.warehouseData = response.data
       })
    },
    sourceData (query) {
      let params= {
        current_page: this.current_page,
        page_size: this.page_size,
        title: query
      }
      this.loading1 = true
      getproductlist(this, params).then(response => {
        this.loading1 = false
        if (response.status === 200) {
          this.checkprod = response.data.items
        }
      }).catch(err => {
        this.loading1 = false
        if (err) {
          this.$Notice.warning({
            title: '提醒',
            desc: '获取不成功！请联系管理员'
          })
        }
      })
    },
  },
  mounted() {
    this.getwarehouse()
  }
}
</script>

<style>

</style>