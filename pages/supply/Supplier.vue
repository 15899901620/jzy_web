<template>
  <div class="clearfix  graybg">
    <div class="w1200 dflex " style="margin-bottom: 40px;">
      <supplynav></supplynav>
      <div class="memberInfor ml20  mt20" style="background: white;">
        <div style='font-size: 16px;margin: 20px 10px 10px 10px;'>
          询价中心
        </div>
        <div style="width: 100%; height: 2px; background-color: #f7f7f7;"></div>
        <div class="" style="width: 95%; margin: 0 auto;">
          <div class="order_operate">
            <div class="dflex">
              <input type="text" placeholder="巨正源一号仓" name="receiptFull" v-model='dispatchFull' class="orderInput"
                     style="width: 200px;"/>
              <i data-v-394040b0="" class="ivu-icon ivu-icon-md-arrow-round-forward"
                 style="font-size: 32px;     color: #007de4;"></i>
              <input type="text" placeholder="请选择到达地" name="" v-model='receiptFull' class="orderInput"
                     style="width: 200px;"/>
              <div class="check" @click='check()'>确定</div>
            </div>

          </div>
          <div class="TableTitle graybg">
			<span style="width: 10%;">询价日期</span>
			<span style="width: 10%;">出发地</span>
			<span style="width: 10%;">到达地</span>
			<span style="width: 10%;">货物名称</span>
            <span style="width: 10%;">货物重量</span>
            <span style="width: 10%;">装货时间</span>
            <span style="width: 10%;">询价倒计时</span>
			<span style="width: 10%;">是否含税</span>
			<span style="width: 10%;">报价状态</span>
			<span style="width: 10%;">操作</span>
          </div>
          <table class="listT mt10" border="" cellspacing="" cellpadding="">
            <tbody>
            <tr class="detailTable" v-for="(item, index) in dataList" :key="index">
				<td style="width: 10%;">{{item.createTime}}</td>
				<td style="width: 10%;">{{item.dispatchFullAddress}}</td>
				<td style="width: 10%;">{{item.receiptFullAddress}}</td>
				<td style="width: 10%;">{{item.freightGoods}}</td>
				<td style="width: 10%;">{{item.weight}}吨</td>
				<td style="width: 10%;">
					{{item.demandBeginDate}}
			   </td >
				<td style="width: 10%;"> <TimeDown :isshow="Timeloading" :timeStyleType='1' :endTime="item.inquiryEndTime" :onTimeOver="reloadPage" hoursShow></TimeDown></td>
				<td style="width: 10%;">
					<span v-if='item.isTax==0'>否</span>
              		<span v-else>是</span>
				</td>
			  <td class="operate" style="width: 10%;">
                <div class="check mt5 blackFont" style="margin-left:15px; background-color: #e9e7e7;" v-if='item.status==0 || $utils.dateCompare(item.inquiryEndTime,today)==false' >已失效</div>
				<div class="check mt5 blackFont" style="margin-left:15px; background-color: #25a96d;" v-else-if='item.status==1 && item.isQuote==0' >未报价</div>
				<div class="check mt5 blackFont" style="margin-left:15px; background-color: #ff6c00;" v-else-if='item.status==1 && item.isQuote== 1'>竞价中</div>
				<div class="check mt5 blackFont" style="margin-left:15px; background-color: #e9e7e7;" v-else-if='item.status==2 && item.isWin == 0'>未中标</div>
				<div class="check mt5 blackFont" style="margin-left:15px; background-color: #f13a39" v-else-if='item.status==2 &&  item.isWin == 0'>恭喜中标 </div>
              </td>
              <td class="operate" style="width: 10%;">
				  <div class="check mt5 blackFont"  v-if='item.status==1 && item.isQuote==0 && $utils.dateCompare(item.inquiryEndTime,today)==true' @click="oldtime(item)">我要报价</div>
                  <div class="check mt5 blackFont" v-else-if='item.status==0'   >查看详情</div>
				  <div class="check mt5 blackFont"   v-else @click="detailLog(item)">查看详情</div>

              </td>
            </tr>
            </tbody>
          </table>
          <!--页码-->
          <pages :total="total" :show-total="showTotal" @change="changePage" :value="current_page"
                 style="margin-top:20px; margin-bottom: 20px;"></pages>
        </div>
      </div>
    </div>
    <Modal
        v-model="modal1"
        title="我的报价"
        @on-ok="delay"
        @on-cancel="cancelDelay" :width='420'>
      <Row>
        <span class="titleoffer">起 点</span><span class="ml5 mr10">:</span>
        <Input v-model="dispatchFull" :disabled='true' placeholder="Enter something..." style="width: 230px;"/>
      </Row>
      <Row>
        <span class="titleoffer">终 点</span><span class="ml5 mr10">:</span><Input v-model="receiptFull" :disabled='true' placeholder="Enter something..."style="width: 230px;"/>
      </Row>
	   <Row>
        	<span class="titleoffer">是否含税</span><span class="ml5 mr10">:</span><span v-if='isTaxs==0' style="font-size: 15px">否</span><span v-else style="font-size: 15px">是</span>
       </Row>

      <Row>
        <span class="titleoffer">吨 数</span><span class="ml5 mr10">:</span><Input v-model="weight" :disabled='true' style="width: 230px;"/><span class="ml5">（吨）</span>
      </Row>
      <Row >
        <span class="titleoffer">单 价</span><span class="ml5 mr10">:</span><Input v-model="price" placeholder="立即出价"  style="width: 230px" /><span class="ml5">/ 每吨</span>
      </Row>
        <Row >
            <span class="titleoffer">备注</span><span class="ml5 mr10">:</span><Input v-model="remark"   placeholder=""  style="width: 230px" />
        </Row>

    </Modal>
	   <FreightDetail :isshow="detailloading" @unChange="undetailChange" :datalist='addList' :type='type'></FreightDetail>
  </div>
</template>

<script>
	import Navigation from '../../components/navigation'
	import paydeposit from '../../components/paydeposit'
	import FreightDetail from '../../components/freight-add/freght-supplier-detail'
	import {sendHttp} from "../../api/common";
	import server from "../../config/api";
	import pagination from '../../components/pagination'
	import TimeDown from '../../components/timeDown'

	export default {
		name: "index",
		middleware: 'carrierAuth',
		layout: 'supplercenter',
		components: {
			pages: pagination.pages,
			supplynav: Navigation.supply,
			FreightDetail,
			payorder: paydeposit.order,
			TimeDown
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
				totalnum:'',
				id: '',
				Timeloading: false,
				dataList: {},
				price: '',
				type:'2',
				modal1: false,
				payloading: false,
				detailloading: false,
				total_amount_format: '',
				freeze_amount_format: '',
				available_amount_format: '',
				dispatchFull: '',
				receiptFull: '',
				hotorderinfo: [],
				addList:{},
				total: 0,
				remark:'',
				isTaxs:0,
				total_fund: '',
				showtimeVal: '',
				today:this.$utils.dateFormat(new Date(), 'yyyy-MM-dd hh:mm:ss'),
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
				this.isTaxs = row.isTax
			},
			cancelDelay() {

			},
			gross(){
				this.totalnum=this.price*this.weight
			},
			delay() {
				let params = {
					demandId: this.id,
					price: this.price,
					remark:this.remark
				}
				sendHttp(this, true, server.api.freightOffer.save, params, 2).then(response => {
					this.loading = false
					this.dispatchFull=''
					this.receiptFull=''
					this.$Notice.warning({
						title: '报价成功',
					})
					this.getOrderList();
				}).catch(err => {
					this.$Notice.warning({
						title: '警告',
						desc: err.response.data.message
					})
					this.loading = false
				})
			},
			detailLog(row) {
				this.addList = {
					...row
				}
				this.detailloading = true
			},
			undetailChange(res) {
				this.detailloading = res
			},
			showTotal(total) {
				return `全部 ${total} 条`;
			},
			changePage(row) {
				this.current_page=row
				this.getOrderList();
			},
			check() {
				this.getOrderList()
			},
			reloadPage(data) {
				console.log(data)
			},
			async getOrderList() {
				let params = {
					'dispatchFullAddress' : this.dispatchFull,
					'receiptFullAddress' :  this.receiptFull,
					'current_page' : this.current_page,
					'page_size' : this.page_size,
					'sortBy' : 'create_time',
					'desc': 'true'
					}

				const res = await sendHttp(this, true, server.api.freight.getPageList, params, 2)
				this.dataList = res.data.items;
				this.total = res.data.total
			},
		},
		mounted(){
				this.getOrderList()
		}
	}
</script>
<style lang="less">
    .ivu-modal-wrap .ivu-modal-body{margin-bottom: 20px;}
    .ivu-modal-wrap .ivu-row{
        display: flex; align-items: center;margin-top: 20px;margin-left: 20px;
       .titleoffer{
           width: 60px;text-align-last: justify;    font-size: 15px;
           color: #333;
       }

	}
	.time{
		 color: rgb(235, 62, 61);
	}
</style>
