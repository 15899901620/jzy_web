<template>
  <div>
    <Row :gutter="24" index="0">
      <Col span="3">品种</Col>
      <Col span="3">牌号</Col>
      <Col span="3">厂商</Col>
      <Col span="3">交货仓</Col>
      <Col span="3">剩余数量（吨）</Col>
      <Col span="3">更新时间</Col>
      <Col span="3">单价（元/吨）</Col>
      <Col span="3">操作</Col>
    </Row>
    <Row :gutter="24" v-for="(item, index) in spotlist" :key="index" :index="index+1">
      <Col span="3">{{item.category_name}}</Col>
      <Col span="3">{{item.sku_name}}</Col>
      <Col span="3">{{item.manufacturer}}</Col>
      <Col span="3">{{item.warehouse_name}}</Col>
      <Col span="3">{{item.available_num}}</Col>
      <Col span="3">{{item.finalPriceFormat}}</Col>
      <Col span="3">{{item.relativeCreateTime}}</Col>
      <Col span="3"><Button type="primary">Primary</Button></Col>
    </Row>
  </div>
</template>

<script>
export default {
  name: 'SpotList',
  data(){
    return{
      totop: false
    }
  },
  computed: {
    ...mapState({
      spotlist: state => state.system.systeminfo
    })
  },
  methods: {
   
  },
  mounted(){
  },
}
</script>

<style>

</style>