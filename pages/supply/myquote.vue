<template>
  <div class="clearfix  graybg">
    <div class="w1200 dflex " style="margin-bottom: 40px;">
      <supplynav></supplynav>
      <div class="memberInfor ml20  mt20" style="background: white;">
        <div style='font-size: 16px;margin: 20px 10px 10px 10px;'>
          我的报价
        </div>
        <div class="TableList">
          <div class="titleOrder mt15">
            <ul class="dflex">
              <li v-for="(item,index) in orderTabs" :class=" index === currTabs ? 'curr' : ''" :key="index"
                  @click="setTabs(item.status)">{{item.name}}
              </li>
            </ul>
          </div>

          <div class="order_operate">
            <div class="dflex">
              <input type="text" placeholder="输入商品名称" name="" id="" value="" v-model='freightGoods' class="orderInput"/>
              <div class="check" @click='check()'>查看</div>
            </div>

          </div>
          <!--表格标题-->
          <div class="TableTitle graybg">
            <span style="width: 17%;">出发地</span>
            <i data-v-394040b0="" class="ivu-icon ivu-icon-md-arrow-round-forward"
               style="font-size:24px;     color: #007de4;"></i>
            <span style="width: 17%;">到达地</span>
            <span style="width: 15%;">货物名称</span>
            <span style="width: 13%;">单价</span>
            <span style="width: 12%;">会员名称</span>
            <span style="width: 12%;">电话</span>
            <span style="width: 12%;">订单状态</span>
          </div>

          <table class="listT mt10" border="" cellspacing="" cellpadding="">
            <tbody v-for="(item, index) in dataList" :key="index">
            <tr class=" graybg" style="height:40px;text-align: left;">
              <th colspan="3" style="padding-left: 10px;">发布时间 : {{item.createTime}}</th>
              <th colspan="3" style="padding-left: 10px;">运单编号 : <a @click="detailLog(item)">{{item.billNo}}</a></th>
            </tr>
            <tr class="detailTable">
              <td style="width: 40%;">{{item.dispatchFullAddress}}
                <i data-v-394040b0="" class="ivu-icon ivu-icon-md-arrow-round-forward"
                   style="font-size: 32px;     color: #007de4;"></i>
                {{item.receiptFullAddress}}
              </td>
              <td>{{item.freightGoods}}</td>
              <td><span>{{$utils.amountFormat(item.price)}}</span>/吨</td>
              <td>{{item.memberName}}</td>
              <td class="operate">
                {{item.memberPhone}}
              </td>
              <td class="operate">
                <div class="mt5 blackFont" style="width:100px;" v-if='item.status==2'>已中标</div>
                <div class="mt5 blackFont" style="width:100px;" v-else-if='item.status==1'>竞价中</div>
                <div class="mt5 blackFont" style="width:100px;" v-else>未中标</div>
              </td>
            </tr>
            </tbody>
          </table>


          <pages :total="total" :show-total="showTotal" @change="changePage" :value="current_page"
                 style="margin-top:20px;"></pages>


        </div>
      </div>
    </div>
    <FreightDetail :isshow="detailloading" @unChange="undetailChange" :datalist='addList'></FreightDetail>
    <!-- <payorder :isshow='payloading' :datalist='dataRow' @unChange="unPayOrder"></payorder> -->
  </div>
</template>

<script>
	import {capitalinfo} from '../../api/capital'
	import Navigation from '../../components/navigation'
	import {getCookies} from '../../config/storage'
	import {orderpage} from '../../api/order'
	import config from '../../config/config'
	import paydeposit from '../../components/paydeposit'
	import {sendHttp} from "../../api/common";
	import server from "../../config/api";
	import pagination from '../../components/pagination'
	import FreightDetail from '../../components/muquote/quote-detail'

	export default {
		name: "index",
		middleware: 'carrierAuth',
		layout: 'supplercenter',
		components: {
			FreightDetail,
			pages: pagination.pages,
			supplynav: Navigation.supply,
			payorder: paydeposit.order
		},
		fetch({store}) {
			return Promise.all([
				//获取顶部、中部、底部导航信息
				store.dispatch('common/getNavList'),
				//获取系统配置
				store.dispatch('common/getSysConfig'),
			])
		},
		data() {
			return {
				id: '',
				dataList: {},
				addList: {},
				price: '',
				modal1: false,
				freightGoods: '',
				detailloading: false,
				payloading: false,
				total_amount_format: '',
				freeze_amount_format: '',
				available_amount_format: '',
				dispatchFull: '',
				receiptFull: '',
				hotorderinfo: [],
				currTabs: 0,
				status: 0,
				total: 0,
				total_fund: '',
				showtimeVal: '',
				orderTabs: [
					{value: 0, name: '全部状态', status: 0},
					{value: 0, name: '已报价', status: 1},
					{value: 0, name: '已入选', status: 2},
					{value: 0, name: '未入选', status: 3},
				],
				userinfo: {},
				current_page: 1,
				weight: '',
				page_size: 10
			}
		},
		methods: {
			oldtime(row) {
				this.modal1 = true
				this.id = row.id
				this.weight = row.weight
				this.dispatchFull = row.dispatchFullAddress
				this.receiptFull = row.receiptFullAddress
			},

			bidder() {

			},
			showTotal(total) {
				return `全部 ${total} 条`;
			},
			changePage(row) {
				this.$router.push({name: 'supply-Supplier', query: {page: row}})
			},
			check() {
				this.getOrderList()
			},
			undetailChange(res) {
				this.detailloading = res
			},
			detailLog(row) {
				this.addList = {
					...row
				}
				this.detailloading = true
			},
			setTabs(res) {
				if (res == '0') {
					this.status = ''
					this.currTabs = 0
				} else if (res == '1') {
					this.status = 1
					this.currTabs = 1
				} else if (res == '2') {
					this.status = 2
					this.currTabs = 2
				} else if (res == '3') {
					this.status = 3
					this.currTabs = 3
				}
				this.getOrderList()
			},
			isLogin() {
				let userinfo = !getCookies('userinfor') ? '' : getCookies('userinfor')
				if (!userinfo) {
					return false
				}
				this.userinfo = userinfo
				return true
			},
			async getOrderList() {
				let params = []
				if (this.status) {
					params.status = this.status
				}
				if (this.freightGoods) {
					params.freightGoods = this.freightGoods
				}

				params.current_page = this.current_page
				params.page_size = this.page_size
				params.desc = true
				const res = await sendHttp(this, true, server.api.freightOffer.offerMyList, params, 2)
				this.dataList = res.data.items;
				this.total = res.data.total
			},
		},
		mounted() {
			this.getOrderList()
		}
	}
</script>
<style scoped>
  .memberInfor {
    width: 83%;
  }

  .TableList {
    width: 95%;
    margin: 0 auto;
  }

  .titleOrder {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 2px solid #007de4;
  }

  .titleOrder li {
    padding: 8px 20px;
    font-size: 14px;
  }

  .titleOrder li.curr {
    background-color: #007de4;
    color: #fff;
  }

  .order_operate {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 20px auto;
  }

  .orderInput {
    width: 286px;
    border: 1px solid #DEDEDE;
    padding-left: 10px;
    box-sizing: border-box;
  }

  .check {
    color: #fff;
    padding: 4px 9px;
    background-color: #007de4;
    text-align: center;
    margin-left: 5px;
    border-radius: 3px;
  }


  .TableTitle {
    margin: 10px auto;
    padding: 10px 0;
    display: flex;
  }

  .TableTitle span {
    text-align: center;
    font-size: 14px
  }

  .listT {
    width: 100%;
    border: none;
  }

  .listT:last-child {
    margin-bottom: 30px;
  }

  .listT .Ttitle td {
    padding: 10px 0;
  }

  .listT td {
    width: 15%;
  }

  .detailTable {
    height: 80px;
  }

  .detailTable td {
    text-align: center;
    overflow: hidden;
    padding: 10px 0;
  }

  .detailTable .operate .Paybtn {
    width: 64%;
    margin: 0 auto;
    padding: 4px 6px;
    color: #666;
    border-radius: 3px;
    display: inherit;
  }

  .detailTable .operate .PayCurr {
    background-color: #e93131;
    color: #fff;
  }

  .detailTable .operate .CarCurr {
    background-color: #007de4;
    color: #fff;
  }

  .logistics h2 {
    padding: 13px 10px;
    background-color: #f4f4f4;
    display: flex;
    justify-content: space-between;
    font-size: 14px;
  }

  .logistics li {
    border: 1px solid #e6e6e6;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    font-size: 14px;
  }

  .logistics li:hover {
    background-color: #fcfeff;
  }

  .logistics li > span {
    margin: 20px 4px;
    width: 18%;
    text-align: center;
  }

  .logBtn {
    padding: 4px 18px;
    color: #fff;
    border-radius: 3px;
  }

  .logistics li .priOpen {
    display: flex;
    align-items: center;
    width: 100%;
  }

  .logistics li .priOpen span {
    margin: 20px 4px;
    width: 18%;
    text-align: center;
  }

  .greenbg {
    background-color: #23aa36;
  }

  .pro_jmts ul {
    background-color: #fff;
    border: 1px solid #e6f1f7;
    width: 95%;
    margin: 0 auto;
    margin-bottom: 10px;
  }

  .pro_jmts li {
    border: none;
    border-bottom: 1px solid #e6f1f7;
    display: flex;
    flex-direction: row;
  }

  .pro_jmts li:last-child {
    border-bottom: none;
  }

  /*页码*/
  ul.pagination {
    display: inline-block;
    padding: 0;
    margin: 30px auto;
    display: flex;
    justify-content: center;
  }

  ul.pagination li {
    display: flex;
    align-items: center;
  }

  ul.pagination li a {
    background-color: #efefef;
    padding: 5px 11px;
  }

  ul.pagination li a {
    color: #333;
    border: 1px solid #efefef;
    border-radius: 4px;
    padding: 8px 10px;
    text-decoration: none;
    transition: background-color .3s;
    margin: 0 8px;
  }

  ul.pagination li a.active {
    background-color: #007de4;
    color: #fff;
    border: 1px solid #007de4;
  }

  ul.pagination li a:hover:not(.active) {
    background-color: #007de4;
    color: #fff;
    border: 1px solid #007de4;
  }

  ul.pagination .pageText {
    width: 40px;
    height: 35px;
    margin: 0 8px;
    border-radius: 3px;
    box-sizing: border-box;
    border: 1px solid #dededede;
    background-color: #fff;
    text-align: center;
  }

  ul.pagination .PageNext {
    border-radius: 2px;
    color: #666;
    width: 40px;
    height: 35px;
    line-height: 35px;
    margin: 0 15px;
    text-align: center;
    border: 1px solid #dededede;
    box-sizing: border-box;
    background-color: #efefef;
  }

</style>
