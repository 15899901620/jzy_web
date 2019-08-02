<template>
  <div class="clearfix graybg">
     <div class="w1200 dflex " style="margin-bottom: 40px">
      <usernav></usernav>
      <div class="memberInfor ml20  whitebg bdccc  mt20">
        <!--个人信息-->
        <h1 class="fs16 ml25" style="margin-top:15px">全部订单</h1>
        <div class="TableList">
          <div class="titleOrder mt15" >
            <ul class="dflex">
              <li class="curr">全部订单</li><li>全部订单（2个）</li><li>已付款（0个）</li><li>待付款（2个）</li>
            </ul>
          </div>
          <div class="order_operate">
            <div class="dflex">
              <input type="text" placeholder="输入订单号/产品名称查询" name="" id="" value="" class="orderInput" /><div class="check">查看</div>
            </div>
            <!-- <div class="dflexAlem">
              <span style="width: 90px;">起始日期</span><input type="text" class="layui-input" id="test6" placeholder="选择订单时间">
            </div> -->
          </div>
          <div class="TableTitle graybg">
            <span style="width: 15%;">商品信息</span>
            <span style="width: 15%;">单价(元)</span>
            <span style="width: 15%;">数量(吨)</span>
            <span style="width: 15%;">库区</span>
            <span style="width: 15%;">订单总金额(元)</span>
            <span style="width: 15%;">订单状态</span>
            <span style="width: 15%;">订单操作</span>
          </div>
          <template v-if="datalist.length > 0">
            <table v-for="(item, index) in datalist" :key="index" class="listT mt10" border="" cellspacing="" cellpadding="">
              <tbody>
                <tr class="Ttitle graybg" >
                  <td colspan="7">
                    <span class="ml10">订单编号：<span class="blue">{{item.orderNo}}</span></span>
                    <span class="ml15">订单类型：{{getOrderType(item.orderType)}}</span>
                    <span class="ml15">下单时间：<span class="gray">{{item.createTime}}</span></span>
                    <span class="fr mr15" v-show="item.status == 1"><span class="gray">最后付款：</span> <span class="gray">{{item.depositPayLastTime}}</span></span>
                  </td>
                </tr>
                <tr class="detailTable">

                  <td>{{item.skuNo}} {{item.skuName}}</td>
                  <td><span class="orangeFont">￥{{item.finalPrice}}</span> <span style="color:#999">/吨</span></td>
                  <td>{{item.orderNum}}</td>
                  <td>{{item.warehouseName}}</td>
                  <td>￥{{item.totalAmount}}</td>
                  <td>
                    <span v-if="item.status == 3" class="greenFont" >{{getOrderState(item.status)}}</span>
                    <span v-else-if="item.status == 0" class="gray" >{{getOrderState(item.status)}}</span>
                    <span v-else class="orangeFont" >{{getOrderState(item.status)}}</span>
                  </td>
                  <td class="operate">
                    <div class="" v-if="item.status == 1">
                      <a class="Paybtn mt15">去付款</a>
                    </div>
                    <div class="" v-if="item.status == 2">
                      <a class="Paybtn mt15">去付款</a>
                    </div>
                    <a class="mt5 blackFont">查看详情</a>
                  </td>
                </tr>
              </tbody>
            </table>
          </template>
          <template v-else>
            <p style="font-size:14px; text-align:center; width:100%;">暂无任何信息！</p>
          </template>
          <!--页码-->
          <pages :total="total" :show-total="showTotal" @change="changePage" :value="current_page" style="margin-top:20px;"></pages>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import userright from './userCompontent/userright'
import Navigation from '../../components/navigation'
import { orderpage } from '../../api/order'
import { getCookies } from '../../config/storage'
import pagination from '../../components/pagination'
import config from '../../config/config'

export default {
  name: "usertotalorder",
  layout:'membercenter',
  components:{
    usernav: Navigation.user,
    pages: pagination.pages
  },
  fetch({ store }) {
    return Promise.all([
      store.dispatch('system/getSystemCnf'),
      store.dispatch('menu/getMenuList')
    ])
  },
  data() {
    return {
      datalist: [],
      current_page: 1,
      page_size:10,
      total: 0,
      formSearch: {
        orderType: '',
        status: '',
        orderNo: '',
        skuName: ''
      }
    }
  },
  methods:{
    showTotal(total) {
        return `全部 ${total} 条`;
    },
    inLogin () {
      let userinfo = !getCookies('userinfor') ? '' : getCookies('userinfor')
      if (!userinfo) {
        this.$router.push('/login')
      }
    },
     //订单类型
    getOrderType(typeId) {
      if(!typeId) return
      return config.orderType[typeId]
    },
    //订单状态
    getOrderState(typeId) {
      if(!typeId) return
      return config.orderState[typeId]
    },
    changePage (row) {
      this.$router.push({name:'usertotalorder',query:{page:row}})
    },
    async getSourceData () {
      let params = {
        current_page: this.current_page,
        page_size: this.page_size,
        ...this.formSearch
      }
      const res= await orderpage(this, params)
      this.datalist = res.data.items
      this.total = res.data.total
    }
  },
  created(){
    this.inLogin()
    this.getSourceData()
  },
  watch: {
    '$route' (to, from) {
        this.$router.go(0);
    }
  }
}
</script>