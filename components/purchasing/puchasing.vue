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
            <Input v-model="formItem.intentionNum"  class="CarrierIput"   placeholder="请输入商品名称" style="width:90%"/>
          </FormItem>
        </Col>
      </Row>
      <Row :gutter="24" index="1">
        <Col span="24">
          <FormItem label="库区" prop="warehouseId" >
            <Select v-model="formItem.warehouseId" style="width:90%" @on-change="getWarehouseName" label-in-value	>
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
            <DatePicker @on-change="getDatetime"  type="date" placeholder="交货时间" style="width: 90%;"></DatePicker>
          </FormItem>
        </Col>
      </Row>
      <div style="text-align: center;">
        <Button type="primary" v-on:click="addDeand">发布求购</Button>
      </div>
    </Form>

    <Modal v-model="ISlogin" width="400">
        <p slot="header" style="color:#666;text-align:left">
            <Icon type="ios-information-circle"></Icon>
            <span>提示</span>
        </p>
        <div style="text-align:center; font-size:14px;">
            <p>你未登录会员无法发布求购，请您登录后再发布！</p>
        </div>
        <div slot="footer">
              <Button type="primary" :loading="modal_loading" @click="goLogin">去登录</Button>
        </div>
    </Modal>
  </div>
</template>

<script>
import { getWarehouseList } from '../../api/logistics'
import { getproductlist, gooddemandadd } from '../../api/product'
import { getCookies } from '../../config/storage'


export default {
  name:'puchasing',
  data() {
    return {
      ISlogin: false,
      loading1: false,
      modal_loading: false,
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
    getDatetime(res){
      this.formItem.intentionDate = res
    },
    getWarehouseName(res) {
      this.formItem.warehouseName=res.label
    },
    selectProName (res) {
      if (res) {
        let splitData = res.label.split('-')
        this.formItem.skuId = res.value
        this.formItem.skuNo = splitData[0]
        this.formItem.skuName = splitData[1]
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
    addDeand () {
      let userinfo = !getCookies('userinfor') ? '' : getCookies('userinfor')
      if (!userinfo) {
        this.ISlogin = true;
        return false
      }
      this.formItem.memberId = userinfo.id
     gooddemandadd(this, this.formItem).then(response => {
        if (response.status === 200 && response.data ==true) {
           this.$Modal.success({
                title: '提示',
                content: '求购发布成功！'
            });
        }
     }).catch(err => {
        this.loading1 = false
        if (err) {
          this.$Modal.warning({
              title: '提示',
              content: '求购发布不成功！'
          });
        }
      })
    },
    goLogin(){
      window.location.href = '/login'
    }
  },
  mounted() {
    this.getwarehouse()
  }
}
</script>

<style>

</style>