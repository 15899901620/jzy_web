<template>
  <div class="clearfix graybg">
    <div class="w1200 dflex " style="margin-bottom: 40px">
      <usernav></usernav>
      <div class="memberInfor ml20  whitebg bdccc  mt20">
        <h1 class="fs16 ml25 mt25 pb10 pr" style="border-bottom: 2px solid #DEDEDE;width: 95%;" >我的专料
          <div class="bodbottom" style="width: 8%; height: 2px;"></div>
        </h1>
        <div class="" style="width: 95%; margin: 0 auto;">
          <div class="order_operate">
            <div class="dflex">
              <input type="text" placeholder="输入订单号/产品名称查询" name="" id="" value="" class="orderInput" />
              <div class="check">查看</div>
            </div>
          </div>
          <!--表格-->
          <div class="TableTitle graybg">
            <span style="width: 15%;">商品信息</span>
            <span style="width: 15%;">单价(元)</span>
            <span style="width: 15%;">数量(吨)</span>
            <span style="width: 15%;">冻结金额</span>
            <span style="width: 15%;">库区</span>
            <span style="width: 15%;">交货方式</span>
            <span style="width: 15%;">状态</span>
            <span style="width: 15%;">订单操作</span>
          </div>
          
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Navigation from '../../components/navigation'
export default {
  name: "userSpecmat",
  layout:'membercenter',
  components:{
      usernav: Navigation.user
  },
  fetch({ store }) {
    return Promise.all([
      store.dispatch('system/getSystemCnf'),
      store.dispatch('menu/getMenuList')
    ])
  },
  data() {
    return {
      
    }
  },
  methods:{
   
  }
}
</script>