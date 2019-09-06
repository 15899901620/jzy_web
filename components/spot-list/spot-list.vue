<template>
  <div class="hotspot">
    <Row :gutter="24" index="0" class="spothead">
      <Col span="3">品种</Col>
      <Col span="4">牌号</Col>
      <Col span="4">厂商</Col>
      <Col span="4">交货仓</Col>
      <Col span="2">数量（吨）</Col>
      <Col span="3">单价（元/吨）</Col>
      <Col span="2">更新时间</Col>
      <Col span="2">操作</Col>
    </Row>
    <Row :gutter="24" v-for="(item, index) in spotlist" :key="index" :index="index+1" class="spotabody">
      <Col span="3">{{item.category_name}}</Col>
      <Col span="4">{{item.sku_name}}</Col>
      <Col span="4">{{item.manufacturer}}</Col>
      <Col span="4">{{item.warehouse_name}}</Col>
      <Col span="2">{{item.available_num}}</Col>
      <Col span="3">{{item.finalPriceFormat}}</Col>
      <Col span="2">{{item.relativeCreateTime}}</Col>
      <Col span="2"><Button type="primary" v-on:click="addOrder(item)" size="small">下单</Button></Col>
    </Row>

    <Modal v-model="ISlogin" width="400">
      <p slot="header" style="color:#666;text-align:left">
          <Icon type="ios-information-circle"></Icon>
          <span>提示</span>
      </p>
      <div style="text-align:center; font-size:14px;">
          <p>你未登录会员无法下单，请您登录后再下单！</p>
      </div>
      <div slot="footer">
            <Button type="primary" :loading="modal_loading" @click="goLogin">去登录</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { getCookies } from '../../config/storage'

export default {
  name: 'SpotList',
  data(){
    return{
      ISlogin: false
    }
  },
  methods: {
    addOrder(item) {
      let userinfo = !getCookies('userinfor') ? '' : getCookies('userinfor')
      if (!userinfo) {
        this.ISlogin = true;
        return false
      }
      console.log(item)
      this.$router.push({
        name: 'spot-order-id',
        params: {
            id : item.id
        }
      })
    },
    goLogin(){
      window.location.href = '/login'
    }
   
  },

  computed: {
    ...mapState({
      spotlist: state => state.spot.spotlist,
    })
  },
}
</script>
<style lang="less" scoped>
.hotspot {
  width: 100%;
  overflow: hidden;

  .spothead {
    background: #fafafa;
    color: #333;
    .ivu-col {
      padding: 5px 0px;
      line-height: 42px;
      text-align: center;
      font-size: 14px;
    }
  }
  .spotabody {
    color: #666;
    .ivu-col {
      padding: 5px 0px;
      line-height: 38px;
      text-align: center;
      font-size: 14px;
      border-bottom:1px solid #eee; 
    }
  }
  .spotabody:hover {
    background: #fafafa;
  }
}
</style>