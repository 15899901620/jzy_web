<template>
  <div class="clearfix  graybg">
    <div class="w1200 dflex " style="margin-bottom: 40px;">
      <usernav></usernav>
      <div class="memberInfor ml20  mt20">
        <!--个人信息-->
        <div class="whitebg bdccc"  >
          <div class="dflex">
            <div class="headInfor">
              <div class="head">
                <img :src="!userinfo.avatar ? '~/assets/img/head.png': userinfo.avatar"/>
                
                <div class="headClick">上传</div>
              </div>
              <span>{{showtimeVal}}好，{{userinfo.phone}}</span>
              <span>欢迎来到巨正源化工交易网！</span>
              <div class="gray mt20 mb10 fs12">上次登录时间：2019年4月1日  09时07分</div>
            </div>
            <div class="pricebg">
              <div class="dflex" style="width: 85%;margin: 0 auto;border-bottom: 1px dashed #eac6b8;justify-content: space-between;">
                <div class="Av_balance">
                  <span>可用余额：</span>
                  <span class="fs24 fwb orangeFont">{{remain_fund}}</span>
                </div>
                <div class="priceOpera">
                  <a class="orangebg white" href="/users/usercapitalpaycheck">充 值</a><a href="/users/usercapitalpaycheck" class="pricebtnbg brd1 orangeFont ml15">申请提现</a>
                </div>
              </div>
              <div class="" style="display: flex;width: 85%;margin: 20px auto;">
                <div class="dflexPrice">

                  <div class="account_icon "></div>
                  <div class="" style="display: flex; flex-direction: column; margin-left: 15px;">
                    <span>账户余额</span>
                    <span class="fs18 fwb">{{remain_fund+fozen_fund}}</span>
                  </div>

                </div>
                <div class="dflexPrice">
                  <div class="Frozen_icon"></div>
                  <div class="" style="display: flex; flex-direction: column; margin-left: 15px;">
                    <span>冻结金额</span>
                    <span class="fs18 fwb">{{fozen_fund}}</span>
                  </div>
                </div>
              </div>
            </div>

          </div>

          <ul class="orderlist">
            <li>
              <div class="listIcon01 mt20"></div>
              <div class="mt10">待付款</div>
            </li>
            <li>
              <div class="listIcon02 mt20"></div>
              <div class="mt10">待传单</div>
            </li>
            <li>
              <div class="listIcon03 mt20"></div>
              <div class="mt10">待提货</div>
            </li>
            <li>
              <div class="listIcon04 mt20"></div>
              <div class="mt10">竞拍管理</div>
            </li>
            <li>
              <div class="listIcon05 mt20"></div>
              <div class="mt10">物流管理</div>
            </li>
            <li>
              <div class="listIcon06 mt20"></div>
              <div class="mt10">账号完善</div>
            </li>
          </ul>
        </div>
        <!--广告图-->
        <div class="pr mt20 mb20">
          <img src="../../assets/img/member_index.png" />
          <a href="#.html" class="seeRight">
            立即查看
          </a>
        </div>

        <!--订单表格-->
        <div class="whitebg bdccc">
          <div class="TableList">
            <div class="titleOrder mt25" >
              <ul class="dflex">
                <li class="curr">全部订单</li>
              </ul>
              <a href="/users/usertotalorder">查看全部订单 ></a>
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

            <template v-if="hotorderinfo.length > 0">
              <table v-for="(item, index) in hotorderinfo" :key="index" class="listT mt10" border="" cellspacing="" cellpadding="">
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
            
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { capitalinfo } from '../../api/capital'
import userright from './userCompontent/userright'
import Navigation from '../../components/navigation'
import { getCookies } from '../../config/storage'
import { orderlist } from '../../api/order'
import config from '../../config/config'


export default {
  name: "index",
  layout:'membercenter',
  components:{
    usernav: Navigation.user,
  },
  fetch({ store }) {
    return Promise.all([
      store.dispatch('system/getSystemCnf'),
      store.dispatch('menu/getMenuList')
    ])
  },
  data() {
    return {
      hotorderinfo: [],
      fozen_fund:'',
      remain_fund:'',
      showtimeVal: '',
      userinfo: getCookies('userinfor')
    }
  },
  methods:{
    inLogin () {
        let userinfo = !getCookies('userinfor') ? '' : getCookies('userinfor')
        console.log('2222222', userinfo)
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
    async capital(){
      const res= await capitalinfo(this,{})
      this.fozen_fund=res.data.fozen_fund
      this.remain_fund=res.data.remain_fund
    },
    showtime () {
      var now = new Date();
      var hours = now.getHours();
      var minutes = now.getMinutes();
      var seconds = now.getSeconds()
      var timeValue = "" +((hours >= 12) ? "下午" : "上午" )
      this.showtimeVal = timeValue
    },
    async getOrderList () {
      const res= await orderlist(this,{})
      this.hotorderinfo = res.data
      console.log('orderinfo', this.hotorderinfo)
    }
  },
  created(){
    
    this.capital()
    this.showtime()
  },
  mounted(){
    this.inLogin();
    this.getOrderList();
  },
}
</script>