<template>
 <Modal
    v-model="isshow"
    title="年计划详情"
    width="50%"
    :loading="loading"
    :mask-closable="false"
    @on-cancel="cancel"

    >
    <Form ref="formItem" :model="formItem" :label-width="110" >
          <Row :gutter="24" index="0">
            <Col span="12">
               <FormItem label="年份">
                <Input  :value="datalist.year" disabled placeholder="保存后自动生成"/>
              </FormItem>
            </Col>
            <Col span="12">
              <FormItem label="年计划编号" >
                  <Input  :value="datalist.planNo" disabled placeholder="保存后自动生成"/>
              </FormItem>
            </Col>
          </Row>
          <Row :gutter="24" index="3">
            <Col span="12">
              <FormItem label="客户编码">
                <Input :value="datalist.memberNo" disabled/>
              </FormItem>
            </Col>
            <Col span="12">
              <FormItem label="公司名称" >
                <Input :value="datalist.companyName" disabled/>
              </FormItem>
            </Col>
          </Row>
          <Row :gutter="24" index="4">
            <Col span="12">
              <FormItem label="商品名称" prop="warehouseId"  >
               <Input :value="datalist.skuName"  disabled />
              </FormItem>
            </Col>
            <Col span="12">
              <FormItem label="年计划量">
                <Input v-model="datalist.yearNum" disabled/>
              </FormItem>
            </Col>
          </Row>
          <Row :gutter="24" index="2">
            <Col span="12">
              <FormItem label="包装方式" >
                <Input v-if="datalist.packingModes==1" value="标准包装" disabled>  </Input>
                <Input v-else value="非标准包装" disabled></Input>
              </FormItem>
            </Col>
            <Col span="12">
                <FormItem label="产品等级">
                    <Input v-if="datalist.productGrade==1" value="优等品" disabled>  </Input>
                    <Input v-else-if="datalist.productGrade==2" value="一等品" disabled>   </Input>
                    <Input v-else value="合格品" disabled>  </Input>
                </FormItem>
            </Col>
         
          </Row>
          <Row :gutter="24" index="4">
            <Col span="12">
              <FormItem label="剩余可用数量" >
                    <Input v-model="datalist.availableNum" disabled/>
              </FormItem>
            </Col>
            <Col span="12">
              <FormItem label="商品编码">
                <Input v-model="datalist.skuNo" disabled/>
              </FormItem>
            </Col>
          </Row>
            <Row :gutter="24" index="4">
            <Col span="12">
              <FormItem label="税率" >
                    <Input v-model="datalist.taxRate" disabled/>
              </FormItem>
            </Col>
            <Col span="12">
              <FormItem label="客户经理">
                <Input v-model="datalist.salesmanName" disabled/>
              </FormItem>
            </Col>
          </Row>
    </Form>
     <div slot="footer"></div>
      </Modal>
</template>

<script>
  import server from "../../../../config/api";
  export default {
    name: 'feedingAdd',
    components: {
    },
    props: {
      datalist: {
          type: Object
      },
      isshow: {
        type: Boolean,
        default: false
      },
     
    },
    data() {
      return {
        self: this,
        HouseValid: ['09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21'],
        MinValid: ['00', '10', '20', '30', '40', '50'],
        lastOrderedDate : '',
        lastOrderedHouse: '',
        lastOrderedMin  : '',
        dataLists:{},
        formItem: {
        },
       viewMember: false,
        loading:false,
        addmodal:false,
        isClear: false,
        monthData:[
            {value:'1',labal:'1'},  
            {value:'2',labal:'2'},
            {value:'3',labal:'3'},
            {value:'4',labal:'4'},
            {value:'5',labal:'5'},
            {value:'6',labal:'6'},
            {value:'7',labal:'7'},
            {value:'8',labal:'8'},
            {value:'9',labal:'9'},
            {value:'10',labal:'10'},
            {value:'11',labal:'11'},
            {value:'12',labal:'12'},
        ],
        ruleValidate: {
        }
      }
    },
    methods: {
      getBeginDate (res) {
            this.formItem.valid_time = res
      },
      cancel () {
        this.$emit('unChange', false)
      },
    },

    isshow: function (e) {
      if (e === true) {
        this.viewMember = true
      } else {
        this.viewMember = false
      }
    },
    mounted () {
    },

  }
</script>
<style>
  .uploadimg {
    width: 100%
  }
  .uploadimg img {
    height: 60px;
  }
  .tableMember {
    border-top-width: 0px;
    width: 100%;
    margin-top: 10px;
    font-size: 14px;
  }

  .tableMember tr td {
    border: .1px solid #dedede;
    height: 30px;
    padding-left: 10px
  }
</style>
