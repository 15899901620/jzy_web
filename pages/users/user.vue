<template>
  <div class="clearfix  graybg">
    <div class="w1200 dflex " style="margin-bottom: 40px;">
      <usernav></usernav>
      <div class="memberInfor ml20  mt20">
        <!--个人信息-->
        <div class="whitebg bdccc">
          <div class="dflex">
            <div class="headInfor">
              <div class="head">
                <template v-if="Headavatar">
                  <img :src="Headavatar"   />
                </template>
                <template v-else>
                  <img :src="!$store.state.memberInfo.avatar?this.headImage:$store.state.memberInfo.avatar"   />
                </template>

                <div class="headClick"   >
<!--                  上传-->
                  <Upload
                        ref="upload"
                        :action="uploadUrl"
                        :show-upload-list="false"
                        :on-success="handleSuccess">
                  <Button  style="width: 86px;height: 25px; padding: 0 10px;line-height: 0;" >上传</Button>
                  </Upload>
                </div>
              </div>
              <span class="mt10">{{showtimeVal}}好，{{userinfor.phone}}</span>
              <span>欢迎来到巨正源科技官电商平台！</span>
              <div class="gray mt10 mb10 fs12">上次登录时间：{{$store.state.memberInfo.lastLoginTime}}</div>
            </div>
            <div class="pricebg">
              <div class="dflex"
                   style="width: 90%;margin: 0 auto;border-bottom: 1px dashed #eac6b8;justify-content: space-between;">
                <div class="Av_balance">
                  <span>可用余额：</span>
                  <span class="fs24 fwb orangeFont">{{available_amount_format}}</span>
                </div>
                <!-- <div class="priceOpera">
                    <a href="/users/usercapitalpaycheck" class="pricebtnbg brd1 orangeFont ml15">查看我的资金</a>
                </div> -->
              </div>
              <div class="" style="display: flex;width: 90%;margin: 35px auto 0;">
                <div class="dflexPrice">
                  <div class="account_icon "></div>
                  <div class="" style="display: flex; flex-direction: column; margin-left: 15px;">
                    <span>账户余额</span>
                    <span class="fs18 fwb">{{$store.state.member.capitalInfo.available_amount_format}}</span>
                  </div>
                </div>

                <div class="dflexPrice" @click='memberCurr'>
                  <div class="Frozen_icon"></div>
                  <div class="" style="display: flex; flex-direction: column; margin-left: 15px;">
                    <span>合约冻结金额</span>
                    <span class="fs18 fwb">{{$store.state.member.capitalInfo.freeze_amount_format}}</span>
                  </div>
                </div>

                <div class="dflexPrice" @click='auctionCurr'>
                  <div class="auction_icon" ></div>
                  <div class="" style="display: flex; flex-direction: column; margin-left: 15px;">
                    <span>竞拍冻结金额</span>
                    <span class="fs18 fwb">{{$store.state.member.capitalInfo.shop_freeze_amount_format}}</span>
                  </div>
                </div>

              </div>
            </div>

          </div>

          <ul class="orderlist" style="justify-content: centerw;">
            <li @click='payment()' style="cursor: pointer">
              <div class="listIcon01 mt20"></div>
              <div class="mt10">待付款</div>
            </li>
            <li @click='auction()' style="cursor: pointer">
              <div class="listIcon04 mt20"></div>
              <div class="mt10">竞拍管理</div>
            </li>
            <li @click='logistics()' style="cursor: pointer">
              <div class="listIcon05 mt20"></div>
              <div class="mt10">物流管理</div>
            </li>
            <li @click='account()' style="cursor: pointer">
              <div class="listIcon06 mt20"></div>
              <div class="mt10">账号完善</div>
            </li>
          </ul>
        </div>
        <!--广告图-->
        <div class="pr mt20 mb20"  >
          <img src="/img/member_index.png"/>
          <a   class="seeRight" href="/bidders">
            立即查看
          </a>
        </div>

        <!--订单表格-->
        <div class="whitebg bdccc">
          <div class="TableList">
            <div class="titleOrder mt25">
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
              <table v-for="(item, index) in hotorderinfo" :key="index" class="listT mt10" border="" cellspacing=""
                     cellpadding="">
                <tbody>
                <tr class="Ttitle graybg">
                  <td colspan="7">
                    <span class="ml10">订单编号：<span class="blue">{{item.orderNo}}</span></span>
                    <span class="ml15">订单类型：{{getOrderType(item.orderType)}}</span>
                    <span class="ml15">下单时间：<span class="gray">{{item.createTime}}</span></span>
                    <span class="fr mr15" v-show="item.status == 1"><span class="gray">最后付款：</span> <span class="gray">{{item.depositPayLastTime}}</span></span>
                  </td>
                </tr>
                <tr class="detailTable">
                  <td>{{item.skuName}}</td>
                  <td><span class="orangeFont">{{$utils.amountFormat(item.finalPrice)}}</span> <span style="color:#999">/吨</span></td>
                  <td>{{item.orderNum}}</td>
                  <td>{{item.warehouseName}}</td>
                  <td>{{$utils.amountFormat(item.totalAmount)}}</td>
                  <td>
                    <span v-if="item.status == 3" class="greenFont">{{getOrderState(item.status)}}</span>
                    <span v-else-if="item.status == 0" class="gray">{{getOrderState(item.status)}}</span>
                    <span v-else class="orangeFont">{{getOrderState(item.status)}}</span>
                  </td>
                  <td class="operate">
                    <div class="" v-if="item.status == 2">
                      <a class="Paybtn mt15" @click="paymentBut(item)">支付尾款</a>
                    </div>
                    <div class="" v-if="item.status == 4   && item.isAddDemand == 0 && item.isDelivery == 0">
                      <a class="greenFont mt15" @click="addLog(item)">我要找车</a>
                    </div>
                    <a :href="`/users/order/datail/${item.id}`" class="mt5 blackFont">查看详情</a>
                  </td>
                </tr>
                </tbody>
              </table>
            </template>
          </div>
        </div>
      </div>
    </div>
    <OrderPay :isShow='payLoading' :order_id='payOrderID' @unChange="unPayOrder"></OrderPay>
    <FreightAdd :isshow="addloading" @unChange="unaddChange" :datalist='addList'></FreightAdd>
  </div>
</template>

<script>
  import { manageEdit,getGainuserInfor,editAvatar } from  '../../api/users'
	import Navigation from '../../components/navigation'
  import Cookies from 'js-cookie'
  import {mapState, mapMutations, mapActions, mapGetters} from 'vuex';
  import {orderpage} from '../../api/order'
	import OrderPay from '../../components/paydeposit/orderPay'
  import {parse, stringify} from 'qs'
  import { getCookies } from '../../config/storage'
  import FreightAdd from '../../components/freight-add/freight-add'
  import config from '../../config/config'
  import appConfig from '../../config/app.config'


	export default {
		name: 'index',
		layout: 'membercenter',
		middleware: 'memberAuth',
		components: {
      usernav: Navigation.user,
      FreightAdd,
			OrderPay
		},
		fetch({store}) {
			return Promise.all([
				//获取顶部、中部、底部导航信息
				store.dispatch('common/getNavList'),
				//获取系统配置
				store.dispatch('common/getSysConfig'),
				//获取资金情况
				store.dispatch('member/getCapitalInfo'),
			])
		},
		data() {
			return {
				dataRow: {},
        payOrderID: 0,
        uploadUrl: '',
        addloading:false,
        payLoading: false,
        addList:{},
				total_amount_format: '',
				freeze_amount_format: '',
				available_amount_format: '',
				hotorderinfo: [],
				total_fund: '',
				showtimeVal: '',
        headImage:'/img/headImage.png',
        Headavatar:'',
        userinfor: !getCookies('userinfor') ? '' : getCookies('userinfor'),
			}
		},
		methods: {
      ...mapMutations('login', [
        'updateUserInfof'
      ]),
      //竞拍列表页
      biddersList(){
        this.$router.push({name:"bidders"})
      },
      getUploadURL(){
        if (process.env.NODE_ENV === 'development') {
          this.uploadUrl = appConfig.system.UPLOAD_URL.dev 
        } else if (process.env.NODE_ENV === 'testprod') {
          this.uploadUrl = appConfig.system.UPLOAD_URL.test
        } else {
          this.uploadUrl = appConfig.system.UPLOAD_URL.pro
        } 
      },
			//订单类型
			getOrderType(typeId) {

				if (!typeId) return
				return config.orderType[typeId]
      },
      unaddChange(row){
          this.addloading = row
      },
			payment() {
				this.$router.push({name: 'users-usertotalorder', query: {status: 2}})
			},
			auction() {
				this.$router.push({name: 'users-userauction'})
			},
			logistics() {
				this.$router.push({name: 'users-userlog'})
			},
			account() {
				this.$router.push({name: 'users-useraccountinfor'})
      },
      bidders(){
	        this.$router.push({name: 'bidders-page'})
      },
      addLog(row) {
				this.addList = {
					...row
				}
				this.addloading = true
			},
			//订单状态
			getOrderState(typeId) {
				if (!typeId) return
				return config.orderState[typeId]
			},
			paymentBut(row) {
				this.payLoading = true
				this.payOrderID = row.id
			},
			unPayOrder(row) {
				this.payLoading = row
			},
			showtime() {
				var now = new Date();
				var hours = now.getHours();
				var minutes = now.getMinutes();
				var seconds = now.getSeconds()
				var timeValue = "" + ((hours >= 12) ? "下午" : "上午")
				this.showtimeVal = timeValue
      },
      memberCurr(){
          this.$router.push({name: 'users-ContractDeposit', query: {status: 2}})
      },
      auctionCurr(){
          this.$router.push({name: 'users-AutionDeposit', query: {status: 1}})
      },
			async getOrderList() {
				let params = {
					current_page: 1,
					page_size: 2,
					sortBy: 'create_time',
					desc: true
				}
				const res = await orderpage(this, params)
				this.hotorderinfo = res.data.items
			},

      handleSuccess (res) {
        this.Headavatar= res.url
        console.log('222',res)
        this.editAvatar();
      },
      async editAvatar(){

         let data = {
          avatar:this.Headavatar
        }
        console.log(data)
         const res=await editAvatar(this, data)
          let expires = new Date((new Date()).getTime() + 5 * 60 * 60000);

          const res1 = await getGainuserInfor(this, {}) 
          if (res1.status === 200 && res1.data) {
            let auth = stringify(res1.data)
            Cookies.set('userinfor', auth, {expires: expires})
            Cookies.set('memberInfo', res1.data, {expires: expires})
            this.updateUserInfof(res1.data)
          }
      },
      async EditUserinfo(avatarImg){
        this.userinfor= getCookies('userinfor')
        let data = {
          phone: this.userinfor.phone,
          avatar:avatarImg,
          companyName: this.userinfor.username,
          business_license:  this.userinfor.business_license,
          authorization_elc:  this.userinfor.authorization_elc,
          taxId: this.userinfor.taxId,
          invBankName: this.userinfor.invBankName,
          invBankAccount: this.userinfor.invBankAccount,
          invAddress: this.userinfor.invAddress,
          invTelephone: this.userinfor.invTelephone,

        }
        const res=await manageEdit(this, data)
        if(res.data===true && res.status ===200){
          this.$Message.info({
            content: '修改成功',
            duration: 5,
            closable: true
          })
          let expires = new Date((new Date()).getTime() + 5 * 60 * 60000);

          const res = await getGainuserInfor(this, {})
          if (res.status === 200 && res.data) {
            let auth = stringify(res.data)
            Cookies.set('userinfor', auth, {expires: expires})
            Cookies.set('memberInfo', res.data, {expires: expires})
            this.updateUserInfof(res.data)
          }
        }
      },
		},
		mounted() {
      this.getUploadURL()
      this.showtime()
      this.getOrderList()
    }
	}
</script>
<style lang="less" scoped>
  .head{
    img{
      width: 100%;height: 100%;
    }
  }

</style>
