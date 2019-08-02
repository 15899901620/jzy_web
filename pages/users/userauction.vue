<template>
  <div class="clearfix graybg">
    <div class="w1200 dflex " style="margin-bottom: 40px">
      <usernav></usernav>
      <div class="memberInfor ml20  whitebg bdccc  mt20">
        <!--个人信息-->
        <h1 class="fs16 ml25 mt25 pb10 pr" style="border-bottom: 2px solid #DEDEDE;width: 95%;" >我的竞拍
          <div class="bodbottom" style="width: 8%; height: 2px;"></div>
        </h1>

        <div class="" style="width: 95%; margin: 0 auto;">
          <div class="order_operate">
            <div class="dflex">
              <input type="text" placeholder="输入竞拍计划编号查询" ref="searchval" class="orderInput"   />
              <div class="check">查看</div>
            </div>
            <!-- <div class="dflex" style="align-items: center;">
              <span style="width: 90px;">起始日期</span><input type="text" class="layui-input" id="test6" placeholder="选择订单时间">
            </div> -->
          </div>
          <div class="TableTitle graybg">
            <span style="width: 12.5%;">商品信息</span>
            <span style="width: 12.5%;">单价(元)</span>
            <span style="width: 12.5%;">竞拍数量(吨)</span>
            <span style="width: 12.5%;">冻结金额</span>
            <span style="width: 12.5%;">库区</span>
            <span style="width: 12.5%;">产品等级</span>
            <span style="width: 12.5%;">状态</span>
            <span style="width: 12.5%;">操作</span>
          </div>
          <template v-if="datalist.length > 0">
            <table v-for="(item, index) in datalist" :key="index" class="listT mt10" border="" cellspacing="" cellpadding="">
              <tbody>
                <tr class="Ttitle graybg" >
                  <td colspan="8">
                    <span class="ml10">计划编号：<span class="gray">{{item.auctionNo}}</span></span>
                    <span class="ml15">下单时间：<span class="gray">{{item.createTime}}</span></span>
                    <span class="fr mr15"><span class="gray">最后提货时间：</span>{{item.lastDeliveryTime}}</span>
                  </td>
                </tr>
                <tr class="detailTable">
                  <td style="width: 12.5%;">{{item.skuNo}} {{item.skuName}}</td>
                  <td style="width: 12.5%;"><span class="orangeFont">￥{{item.bidPrice}}</span> <span style="color:#999">/吨</span></td>
                  <td style="width: 12.5%;">
                    <p>总数：{{item.totalNum}}{{item.uomName}}</p>
                    <p>已提：{{item.takenNum}}{{item.uomName}}</p>
                    <p>未提：{{item.availableNum}}{{item.uomName}}</p>
                  </td>
                  <td style="width: 12.5%;">
                    <span v-if="item.isUnfreeze ===0">{{item.depositAmount}}</span>
                    <span v-if="item.isUnfreeze ===1">0</span>
                  </td>
                  <td style="width: 12.5%;">{{item.warehouseName}}</td>
                  <td style="width: 12.5%;">
                    <span v-if="item.productGrade ===1">优等品</span>
                    <span v-if="item.productGrade ===2">一等品</span>
                    <span v-if="item.productGrade ===3">合格品</span>
                  </td>
                  <td style="width: 12.5%;">
                      <span class="gray" v-if="item.status === 0">已取消</span>
                      <span class="gray" v-if="item.status === 1">待转订单</span>
                      <span class="" v-if="item.status === 2">已完成</span>
                  </td>
                  <td style="width: 12.5%;" class="operate">
                    <div v-if="item.status === 1">
                      <a class="Paybtn mt15 CarCurr" @click="qrOrder(item.id)">去提货</a>
                    </div>
                    <div v-if="item.status === 2">
                      <a class="Paybtn mt15 CarCurr">已完成</a>
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
          <pages :total="total" :show-total="showTotal" @change="changePage" :value="current_page" style="margin-top:20px;"></pages>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Navigation from '../../components/navigation'
import { auctionOrderList } from '../../api/auction'
import Cookies from 'js-cookie'
import { getCookies } from '../../config/storage'
import pagination from '../../components/pagination'
import config from '../../config/config'

export default {
  name: "userauction",
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
  data () {
    return {
      current_page: 1,
      page_size: 5,
      total: 0,
      datalist: [],
      formSearch: {
        planNo: '',
        skuNo: '',
        auctionId: '',
        status: ''
      }
    }
  },
  methods: {
    showTotal(total) {
      return `全部 ${total} 条`;
    },
    inLogin () {
      let userinfo = !getCookies('userinfor') ? '' : getCookies('userinfor')
      if (!userinfo) {
        this.$router.push('/login')
      }
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
      const res= await auctionOrderList(this, params)
      console.log('res',res)
      this.datalist = res.data.items
      this.total = res.data.total
    }
  },
  mounted(){
    // this.auctionOrderList()
  },
  created(){
    this.inLogin()
    this.getSourceData()
  },
  watch: {
    '$route' (to, from) {
        this.$router.go(0);
    }
  },
  destoryed () {
    // clearTimeout()
  },
}
</script>