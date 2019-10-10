<template>
  <div class="body">
    <Header title="头部"></Header>
    <div class="container" title="">
      <div class="breadcrumb">
        <breadcrumb>
          <breadcrumb-item><a href="/">巨正源</a></breadcrumb-item>
          <breadcrumb-item><a href="/bidders">限时竞拍</a></breadcrumb-item>
          <breadcrumb-item> {{this.auctionInfo.skuName}}</breadcrumb-item>
        </breadcrumb>
      </div>
      <div class="status_product">
        <div class="statusTime">
          <template v-if="auctionInfo.statusType == '1'">
            <div class="status statusIngbg">正在竞拍</div>
          </template>
          <template v-else-if="auctionInfo.statusType == '2'">
            <div class="status statusVcbg">即将开始</div>
          </template>
          <template v-else-if="auctionInfo.statusType == '3'">
            <div class="status statusEndbg">竞拍结束</div>
          </template>
          <div class="cutTime cutTimeIngbg">
            <div class="cutDown_time ml35"><img src="/img/cutDown_icon.png"/></div>
            <div class="ml10 dflex">
              <template v-if="auctionInfo.statusType == '1'">
                <span class="fs16">距离结束：</span>
                <span class="fs16">
                  <TimeDown :timeStyleType="2" :endTime="auctionInfo.realEndTime" hoursShow endMsg="已结束"
                            :onTimeOver="reloadPage"></TimeDown>
                </span>
              </template>
              <template v-else-if="auctionInfo.statusType == '2'">
                <span class="fs16">距离开始：</span>
                <span class="fs16">
                  <TimeDown :timeStyleType="2" :endTime="auctionInfo.beginTime" hoursShow endMsg="已开始"
                            :onTimeOver="reloadPage"></TimeDown>
                </span>
              </template>
              <template v-else>
                <span class="fs16">已结束</span>
              </template>
            </div>
          </div>
        </div>
        <div class="birdtable">
          <div class="birdtabletitle">{{auctionInfo.manufacturer}} {{auctionInfo.warehouseName}}
            {{auctionInfo.skuName}} {{auctionInfo.totalNum}}{{auctionInfo.uomName}}
          </div>
          <div class="kailong">
            <div class="tranfont">{{auctionInfo.warehouseProvince}}</div>
          </div>
          <table class="table">
            <tbody>
            <tr class="tableTitle">
              <td>竞拍编号</td>
              <td>品种</td>
              <td>牌号</td>
              <td>厂商</td>
              <td>数量({{auctionInfo.uomName}})</td>
              <td>提货仓库</td>
              <td>包装方式</td>
              <td>开始提货日期</td>
              <td>截至提货日期</td>
            </tr>
            <tr>
              <td>{{auctionInfo.billNo}}</td>
              <td>{{auctionInfo.skuCategoryName1}}</td>
              <td>{{auctionInfo.skuName}}</td>
              <td>{{auctionInfo.manufacturer}}</td>
              <td>{{auctionInfo.totalNum}}</td>
              <td>{{auctionInfo.warehouseName}}</td>
              <td>
                <template v-if="auctionInfo.packingModes===1">标准包装</template>
                <template v-if="auctionInfo.packingModes===2">非标准包装</template>
              </td>
              <td>{{auctionInfo.deliveryStart}}</td>
              <td>{{auctionInfo.lastDeliveryTime}}</td>
            </tr>
            </tbody>
          </table>
        </div>

      </div>
      <!--竞拍记录-我的出价-->
      <div class="whitebg " style="width: 1200px; margin: 0 auto; display: flex">
        <div class="recodelist">
          <div class="recordTitle">竞拍记录</div>
          <table class="Bidders_record_title">
            <tbody>
            <tr>
              <th>当前状态</th>
              <th>竞拍人</th>
              <th>出价金额</th>
              <th>数量（吨）</th>
              <th style="width: 160px">出价时间</th>
            </tr>
            </tbody>
          </table>
          <!--表格-->
          <div class="Bidders_record_list" style="text-align: center;">
            <!--暂无记录-->
            <table v-if="auctionInfo.bidList.length > 0">
              <tbody>
              <tr class="Bidders_record_tr " v-for="(item,index) in auctionInfo.bidList" :key="index"
                  :class="{orangeFont:item.outStatus===1 || item.outStatus===2}">
                <td>
                  <span class="Bidders_record_curr" v-if="item.outStatus===1">领先</span>
                  <span class="Bidders_record_curr" v-if="item.outStatus===2">入围</span>
                  <span class="tac gray" v-if="item.outStatus===3">出局</span>
                </td>
                <td><span>{{item.nickName}}</span></td>
                <td><span>{{$utils.amountFormat(item.bidPrice)}}</span></td>
                <td><span>{{item.bidNum}}</span></td>
                <td style="width: 120px"><span>{{ $utils.dateStrFormat(item.createTime, 'hh:mm:ss')}}</span></td>
              </tr>
              </tbody>
            </table>
            <span v-else class="Bidders_record_zwjl" style="line-height:100px; color:#999">暂无任何竞拍记录!</span>
          </div>
        </div>

        <div class="recodelist">
          <div class="recordTitle">我的出价</div>
          <table class="Bidders_record_title">
            <tbody>
            <tr>
              <th>当前状态</th>
              <th>出价金额</th>
              <th>竞拍数量（吨）</th>
              <th>入围数量（吨）</th>
              <th style="width: 160px">出价时间</th>
            </tr>
            </tbody>
          </table>
          <!--表格-->
          <div class="Bidders_record_list" style="text-align: center;">
            <!--暂无记录-->
            <table v-if="auctionInfo.myBidList.length > 0">
              <tbody>
              <tr class="Bidders_record_tr" v-for="(items,index) in auctionInfo.myBidList" :key="index"
                  :class="{orangeFont:items.outStatus===1 || items.outStatus===2}">
                <td>
                  <template v-if="items.isActive === 1">
                    <span class="Bidders_record_curr" v-if="items.outStatus===1">领先</span>
                    <span class="Bidders_record_curr" v-else-if="items.outStatus===2">入围</span>
                    <span class="tac gray" v-else-if="items.outStatus===3">出局</span>
                  </template>
                  <template v-else>
                    <span class="tac gray">失效</span>
                  </template>
                </td>
                <td><span>{{$utils.amountFormat(items.bidPrice)}}</span></td>
                <td><span>{{items.bidNum}}</span></td>
                <td><span>{{items.selectedNum}}</span></td>
                <td style="width: 120px"><span>{{ $utils.dateStrFormat(items.createTime, 'hh:mm:ss')}}</span></td>
              </tr>
              </tbody>
            </table>
            <span v-else class="Bidders_record_zwjl" style="line-height:100px; color:#999">暂无您的出价记录!</span>
          </div>
        </div>
      </div>

      <div class="biddersRecord" style="display: flex; flex-direction: column">
        <table class="paipin_table">
          <tbody>
          <tr>
            <th>竞拍底价</th>
            <th>保证金比例</th>
            <th>当前入局最低报价</th>
            <th>当前入局最高报价</th>
            <th>未出价数量({{auctionInfo.uomName}})</th>
            <th>竞拍类型</th>
          </tr>
          <tr>
            <td>{{$utils.amountFormat(auctionInfo.finalPrice)}}</td>
            <td>{{auctionInfo.marginRatio}}%</td>
            <td>{{$utils.amountFormat(auctionInfo.maxBidPrice)}}</td>
            <td>{{$utils.amountFormat(auctionInfo.lowBidPrice)}}</td>
            <td>
              <template v-if="auctionInfo.totalNum > auctionInfo.totalBidNum">{{auctionInfo.totalNum -
                auctionInfo.totalBidNum}}
              </template>
              <template v-else>0</template>
            </td>
            <td>
              <template v-if="auctionInfo.isAll == 1">整单竞拍</template>
              <template v-else>自由竞拍</template>
            </td>
          </tr>
          </tbody>
        </table>
        <!-- 竞拍出价***竞拍数量 -->
        <div>
          <!-- 竞拍出价-->
          <div class="ml30 dflex mt30" style="align-items: center;">
            <span class="inputTitle">竞拍出价</span>
            <input-special :min="minPrice" :max="99999" :step="auctionInfo.bidIncrement" v-model="auctionOffer"
                           ></input-special>
            <span class="ml10 gray fs14">加价幅度：{{auctionInfo.bidIncrement}}元</span>
          </div>
          <!--竞拍数量-->
          <div class="ml30 dflex mt25" style="align-items: center;">
            <span class="inputTitle">竞拍数量</span>
            <input-special :min="minNum" :max="auctionInfo.depositNum" :step="1" v-model="auctionNum"></input-special>
            <span class="ml10 gray fs14">最小起拍量：{{auctionInfo.minOrder}}{{auctionInfo.uomName}}</span>
            <span class="ml10 gray fs14">当前您最大可拍：{{auctionInfo.depositNum}}{{auctionInfo.uomName}}</span>
          </div>
          <div class="MustSee"><a href="/help/17" target="_blank">竞拍必看</a></div>
          <div class="acuBtn" v-if="auctionInfo.statusType == '1'">
            <a class="oncebg" @click="addauctionPrice">立即出价</a>
            <a class="Paybg ml15" @click="PayCost">追加保证金</a>
          </div>
          <div class="acuBtn" v-if="auctionInfo.statusType == '2'">
            <a class="startbg">即将开始</a>
            <a class="Paybg ml15" @click="PayCost">缴纳保证金</a>
          </div>
        </div>
        <!--竞拍结果-->
        <div class="biderResult" v-if="auctionInfo.statusType == '3'">
          <div class="WinBid orangeFont WinBidbg">恭喜中标</div>
          <div class="orangeFont fs20 tac">恭喜您竞拍中得 T03 现货 60吨</div>
          <div class="orangeFont fs14 tac mt5">剩余付款时间：05时20分，逾期将扣除保证金</div>
          <div class="dflex fs18" style="justify-content: center; margin: 25px auto">
            <div class="Winbtn orangebg whiteFont">提 货</div>
            <div class="Winbtn whitebg ml15 orangeFont">查看详情</div>
          </div>
          <div class="winbider"></div>


          <div class="WinBid gray failWinBidbg">未中标</div>
          <div
              style="display: flex;justify-content: center; flex-direction: column;margin-left: 458px; font-size: 18px; color: #a2a2a2; position: relative; margin-bottom: 20px">
            <div class="dflex mt5"><span class="titleWin">最高中标价</span>: <span class="orangeFont ml5 mr5">¥1060.00</span>
              / 吨
            </div>
            <div class="dflex mt5"><span class="titleWin">最低中标价</span>: <span class="orangeFont ml5 mr5">¥1060.00</span>
              / 吨
            </div>
            <div class="dflex mt5"><span class="titleWin">一共拍出</span>: <span class="orangeFont ml5 mr5">¥1060.00</span>
              / 吨
            </div>
            <div class="dflex mt5"><span class="titleWin">中 标 人 数</span>: <span class="orangeFont ml5 mr5">3</span>人
            </div>
            <div class="failwinbider"></div>
          </div>
        </div>
      </div>
      <!--  正在参与-->
      <div class="biddersRecord">
        <h1 class="paipinacu fs20">正在参与</h1>
        <table class="parttable">
          <tbody>
          <tr class="tableTitle">
            <td>品种</td>
            <td>牌号</td>
            <td>厂商</td>
            <td>起拍价</td>
            <td>竞拍总量</td>
            <td>距离结束</td>
            <td>我的排名</td>
            <td>我的出价</td>
            <td>出价数量</td>
            <td>入局数量</td>
            <td>当前状态</td>
            <td>我的状态</td>
            <td>操作</td>
          </tr>
          <tr>
            <td>PP</td>
            <td class="blue">L5E89</td>
            <td>巨正源</td>
            <td>巨正源</td>
            <td>100吨</td>
            <td>00天23时12分36秒</td>
            <td class="orangeFont">3</td>
            <td>2019-09-27</td>
            <td>2019-09-27</td>
            <td>东莞市</td>
            <td>散货带托</td>
            <td>2019-09-27</td>
            <td>
              <div class="seeTable">查看</div>
            </td>
          </tr>
          </tbody>
        </table>

      </div>
      <!--  我的关注-->
      <div class="biddersRecord">
        <h1 class="paipinacu fs20">我的关注</h1>
        <table class="parttable">
          <tbody>
          <tr class="tableTitle">
            <td>竞拍编号</td>
            <td>开始时间</td>
            <td>竞拍时长</td>
            <td>竞拍状态</td>
            <td>品种</td>
            <td>牌号</td>
            <td>厂商</td>
            <td>城市</td>
            <td>起拍价</td>
            <td>竞拍总量</td>
            <td>提货仓库</td>
            <td>操作</td>
          </tr>
          <tr>
            <td>PP</td>
            <td class="blue">L5E89</td>
            <td>巨正源</td>
            <td>巨正源</td>
            <td>100吨</td>
            <td>00天23时12分36秒</td>
            <td class="orangeFont">3</td>
            <td>2019-09-27</td>
            <td>2019-09-27</td>
            <td>东莞市</td>
            <td>散货带托</td>
            <td>
              <div class="seeTable">查看</div>
            </td>
          </tr>
          </tbody>
        </table>
        <div style="display: flex; justify-content: center">
          <div class="addbiders" @click="addFollow">添加其他竞拍</div>
        </div>
      </div>


      <div class="biddersRecord">
        <!--拍品信息-->
        <div class="">
          <h1 class="paipinacu fs20">拍品信息</h1>
          <table class="paipin_table">
            <tbody>
            <tr>
              <th>品种</th>
              <th>牌号</th>
              <th>厂商</th>
              <th>竞拍总量</th>
              <th>起拍价</th>
              <th>提货仓库</th>
              <th>最迟提货时间</th>
            </tr>
            <tr>
              <td>{{auctionInfo.skuCategoryName1}}</td>
              <td>{{auctionInfo.skuName}}</td>
              <td>{{auctionInfo.manufacturer}}</td>
              <td>{{auctionInfo.totalNum}}{{auctionInfo.uomName}}</td>
              <td>{{$utils.amountFormat(auctionInfo.finalPrice)}}</td>
              <td>{{auctionInfo.warehouseName}}</td>
              <td>{{auctionInfo.lastDeliveryTime}}</td>
            </tr>
            </tbody>
          </table>
        </div>
        <!--竞拍流程-->
        <div class=" mt30">
          <h1 class="paipinacu fs20">竞拍流程</h1>
          <img src="/img/flow.png" class="mt20 ml30"/>
        </div>
        <!--交易信息-->
        <div class=" mt30">
          <h1 class="paipinacu fs20">交易信息</h1>
          <table class="paipin_table">
            <tbody>
            <tr>
              <th>交货方式</th>
              <th>提货仓库</th>
              <th>详细地址</th>
              <th>提货时间</th>
            </tr>
            <tr>
              <td>自提/配送</td>
              <td>{{auctionInfo.warehouseName}}</td>
              <td>{{auctionInfo.warehouseAddress}}</td>
              <td>{{auctionInfo.deliveryStart}} ~ {{auctionInfo.lastDeliveryTime}}</td>
            </tr>
            </tbody>
          </table>
        </div>
        <!--竞拍规则-->
        <div class=" mt30">
          <h1 class="paipinacu fs20">竞拍规则</h1>
          <table class="paipin_table">
            <tbody>
            <tr>
              <th>竞拍方式</th>
              <th>竞拍开始时间</th>
              <th>竞拍结束时间</th>
              <th>允许延时</th>
              <th>延时规则</th>
              <th>延时时长</th>
              <th>成交价格判定</th>
            </tr>
            <tr>
              <td>公开竞拍</td>
              <td>{{auctionInfo.beginTime}}</td>
              <td>{{auctionInfo.realEndTime}}</td>
              <td>是</td>
              <td style="line-height: 20px;padding: 10px;">
                在拍卖结束时间前{{auctionInfo.delayLastTime}}分钟内如有竞买人出价，最后结束时间延长{{auctionInfo.delayTime}}分钟；延长时间内再有人出价，则继续延长{{auctionInfo.delayTime}}分钟，直到没人出价为止，竞拍结束。
              </td>
              <td>{{auctionInfo.delayTime}}分钟</td>
              <td>按自报价</td>
            </tr>
            </tbody>
          </table>
        </div>
        <!--备注信息-->
        <div class=" mt30">
          <h1 class="paipinacu fs20">备注信息</h1>
          <p class="mt10 fs14" style="color: #666; width: 97%;">不可抗力是一项免责条款，是指买卖合同签订后，不是由于合同当事人的过失或疏忽，
            而是由于发生了合同当事人无法预见、无法预防、无法避免和无法控制的事件，以致不能履行或不能
            如期履行合同， 发生意外事件的一方可以免除履行合同的责任或者推迟履行合同，在我国《民法通则》上是指“不能预见、 不能避免和不能克服的客观情况”。</p>
        </div>
        <!--真货保障-->
        <div class=" mt30">
          <h1 class="paipinacu fs20">真货保障</h1>
          <p class="mt10" style="color: #666; width: 97%;">巨正源自上线以来，一直努力为会员提供优质的塑料在线交易服务。
            为了更好的服务巨正源会员，推出了竞拍活动，巨正源竞拍活动的货品来自全国生产商和大贸易商， 质量值得信赖，
            目前我们正与其他供应商洽谈合作，加大货物品类及范围。</p>
          <img src="/img/serve.png" class="mt30"/>
        </div>
        <!--合同模板-->
        <div class=" mt30">
          <h1 class="paipinacu fs20">合同模板</h1>
          <div class="dflex ml10 mt10">
            <span class="contract">提</span><a :href="systeminfo.CARRYCONTRAT" target="_blank">自提合同模板</a>
            <span class="contract ml15">送</span><a :href="systeminfo.DELIVERYCONTRAT" target="_blank">配送合同模板</a>
          </div>
        </div>
        <!--联系方式-->
        <div class=" mt30 mb40">
          <h1 class="paipinacu fs20">联系方式</h1>
          <table class="paipin_table">
            <tbody>
            <tr>
              <th>工作时间</th>
              <th>QQ咨询</th>
              <th>客服热线</th>
            </tr>
            <tr>
              <td>
                <div style="display: flex;justify-content: center; margin: 10px auto;">
                  <div class="contactTime contactTable1"></div>
                  工作日（{{systeminfo.OPENING_TIME}}-{{systeminfo.CLOSED_TIME}}）
                </div>
              </td>
              <td>
                <div style="display: flex;justify-content: center; margin: 10px auto;">
                  <div class="contactTime contactTable2"></div>
                  {{systeminfo.ONLINESERVICE}}
                </div>
              </td>
              <td>
                <div style="display: flex;justify-content: center; margin: 10px auto;">
                  <div class="contactTime contactTable3"></div>
                  {{systeminfo.SERVICEHOTLINE}}
                </div>
              </td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!--出价提示-->
    <Modal
        title="出价提示"
        v-model="bidersloading"
        ok-text="确认出价"
        @on-ok="addBidding"
        class-name="vertical-center-modal">
      <p slot="header" style="color:#666; text-align:left; font-size:14px;">
        <Icon type="md-chatboxes" style="font-size:18px;"/>
        <span>出价提示</span>
      </p>
      <div>
        <p style="font-size:14px; line-height:28px;"><span style="color:#666;">您出价商品：</span>{{auctionInfo.manufacturer}}
          {{this.auctionInfo.skuName}}</p>
        <p style="font-size:14px; line-height:28px;"><span style="color:#666;">出价数量为：</span>{{this.auctionNum}} <span
            style="color:#999;">(吨)</span></p>
        <p style="font-size:14px; line-height:28px;"><span style="color:#666;">出价价格为：</span>{{$utils.amountFormat(this.auctionOffer)}}</p>
      </div>
    </Modal>

    <!-- 添加其他竞拍关注-->
    <Modal
        v-model="addfollow"
        title="Title"
        width="80"
    >
      <div slot="header">添加其他竞拍关注</div>
      <Table border ref="selection" :columns="columns4" :data="data1"></Table>
      <div slot="footer">
        <div class="addbtn">添加竞拍关注</div>
      </div>
    </Modal>

    <paydeposit :isshow="DepositShow" :datalist='DepositData' @unChange="unDepositShow"></paydeposit>
    <Footer size="default" title="底部" style="margin-top:18px;"></Footer>
  </div>
</template>

<script>
	import {mapState} from 'vuex'
	import Header from '../../../components/header'
	import Footer from '../../../components/footer'
	import {
		newprice,
		auctionRecord,
		AddauctionPrice,
		gainauctionrecord,
		WinningBid
	} from '../../../api/auction'
	import paydeposit from '../../../components/paydeposit'
	import TimeDown from '../../../components/timeDown'
	import InputSpecial from '../../../components/input-special'
	import {bidfollowColumns} from './bidfollow'

	export default {
		name: "bidders-detail-id",
		middleware: 'memberAuth',
		fetch({store, params, query}) {
			return Promise.all([
				//获取顶部、中部、底部导航信息
				store.dispatch('common/getNavList'),
				//获取系统配置
				store.dispatch('common/getSysConfig'),
				//获取友情链接
				store.dispatch('common/getFriendlyList'),
				//获取底部帮助分类
				store.dispatch('helper/getHelpCate', {catId: 0, indexShow: 1}),
				//获取竞拍信息
				store.dispatch('bidders/getAuctionInfo', {id: params.id || 0}),
			])
		},
		components: {
			Header,
			Footer,
			paydeposit,
			TimeDown,
			InputSpecial
		},
		computed: {
			...mapState({
				auctionInfo: state => state.bidders.auctionInfo,
				systeminfo: state => state.common.sysConfig,
			}),
			minPrice: function () {
				if(this.auctionInfo.myBidList.length > 0){
					return this.auctionInfo.myBidList[0].bidPrice
				}else{
					return this.auctionInfo.finalPrice
				}
			},
			minNum: function () {
				if(this.auctionInfo.myBidList.length > 0){
					return this.auctionInfo.myBidList[0].bidNum
				}else{
					return this.auctionInfo.minOrder
				}
			}
		},
		data() {
			return {
				auctionId: !this.$route.params.id ? 0 : this.$route.params.id,
				columns4: bidfollowColumns,

				auctionOffer: 0,  //竞拍出价
				auctionNum: 0,  //竞拍数量

				data1: [],
				WinBidShow: false,
				NotWinBidShow: false,
				WinBid: {},
				auctionNumShow: false,
				auctionNumTip: '',   //竞拍价提示

				auctionWin: 0,     //中标人数
				auctionTotal: 0,  //竞拍结束—竞拍总数量
				OfferRecordTip: '',   //出价记录提示
				addfollow: false,    //添加竞拍关注
				DepositData: {
					auctionId: '',
					basePrice: 0,
					depositNum: 0,
					Bond: 0,   //保证金比例
				},
				DepositShow: false,
				DatabridTip: '',

				bidersloading: false,
			}
		},
		methods: {
			reloadPage() {
				location.reload()
			},
			//显示添加竞拍框
			addFollow() {
				this.addfollow = true
			},
			//查看详情_跳转会员-我的竞拍页
			acuDetailmember() {
				this.$router.push({name: 'users-userauction'})
			},
			//提货_跳转到下单页
			auctionOrder() {
				this.$router.push({name: "bidders-order-id", params: {id: this.WinBid.id}})
			},
			// 竞拍出价
			cutsOffer() {
				if (this.auctionOffer > this.auctionInfo.finalPrice) {
					this.auctionOffer = Number(this.auctionOffer) - Number(this.auc.bidIncrement)
				} else {
					this.auctionOffer = this.auctionInfo.finalPrice
				}
			},
			addOffer() {
				this.auctionOffer = Number(this.auctionOffer) + Number(this.auctionInfo.bidIncrement)
			},
			// 竞拍数量
			cutsNum() {
				if (this.auctionNum > this.auctionInfo.minOrder) {
					this.auctionNumShow = false
					this.auctionNum--
				} else {
					this.auctionNumShow = true
					this.auctionNumTip = '不得小于' + this.auctionInfo.minOrder
				}
			},
			addNum() {
				this.auctionNumShow = false
				this.auctionNum++
			},

			//显示追加保证金的弹窗
			PayCost() {
				this.DepositShow = true
				this.DepositData.auctionId = this.auctionInfo.id
				this.DepositData.basePrice = this.auctionInfo.finalPrice
				this.DepositData.addNum = this.auctionInfo.minOrder
				this.DepositData.depositNum = this.auctionInfo.depositNum
				this.DepositData.Bond = this.auctionInfo.marginRatio
			},
			unDepositShow(row) {
				this.DepositShow = row
        location.reload()
			},
			//所有竞拍记录
			async getAuctionRecord() {
				let params = {
					current_page: '1',
					page_size: '50',
					isActive: 1,
					auctionId: this.auctionId
				}
				let res = await auctionRecord(this, params)
				if (res) {
					this.auctionRd = res.data.items
				}
			},
			//中标信息
			async getwinningbid() {
				let params = {
					auctionId: this.auctionId
				}
				let res = await WinningBid(this, params)
				if (res.data && res.status === 200) {
					this.WinBidShow = true
					this.WinBid = res.data
				} else {
					this.NotWinBidShow = true
				}
			},
			//提交出价
			async addBidding() {
				if (!this.auctionOffer) {
					this.$Modal.warning({
						title: '提示',
						content: '价格不能为空！',
						duration: 5,
						styles: 'top:300px'
					})
				}

				let params = {
					auctionId: this.auctionId,
					bidNum: this.auctionNum,
					bidPrice: this.auctionOffer
				}
				let res = await AddauctionPrice(this, params)
				if (res.data.data === null && res.status === 200) {
					this.$Modal.warning({
						title: '提示',
						content: res.data.message + '!!! ',
						duration: 5,
						styles: 'top:300px'
					});
				} else {
					this.$Modal.success({
						title: '提示',
						content: '出价成功！',
						duration: 5
					})
					location.reload()
				}
			},
			addauctionPrice() {
				this.bidersloading = true
			},
		},
		head() {
			return {
				title: this.auctionInfo.skuName + '限时竞拍-巨正源',
				meta: [
					{hid: 'keywords', name: 'keywords', content: '物性表,巨正源'},
					{hid: 'description', name: 'description', content: '物性表-巨正源'}
				]
			}
		},
		created() {
		},
		mounted() {
			let reloadActionInfo = () =>{
				//获取竞拍信息
				this.$store.dispatch('bidders/getAuctionInfo', {id: this.auctionId})

				setTimeout(function () {
					reloadActionInfo();
				}, 15000)
      }
			setTimeout(function () {
				reloadActionInfo();
			}, 15000)

			this.auctionNum = this.minNum
      this.auctionOffer = this.minPrice
		},
		watch: {
			'$route'(to, from) {
				this.$router.go(0);
			},
		}
	}
</script>
<style lang="less">
  .vertical-center-modal {
    display: flex;
    align-items: center;
    justify-content: center;

    .ivu-modal {
      top: 0;

      .ivu-modal-content {
        .ivu-modal-header {
          border-top-left-radius: 6px;
          border-top-right-radius: 6px;
          background-color: #f9f9f9;
        }

        .ivu-modal-body {
          display: flex;
          justify-content: space-between;
          //     // p {
          //     //     text-align: left;
          //     //     font-size: 14px;
          //     // }

        }
      }
    }

    .status_product {
      width: 1200px;
      margin: 20px auto;

      .statusTime {
        display: flex;

        .status {
          width: 5%;
          font-size: 18px;
          padding: 0 12px;
          color: #fff;
        }

        .cutTime {
          color: #fff;
          width: 95%;
          display: flex;
          align-items: center;

          .cutDown_time {
            width: 22px;
            height: 22px;

            img {
              width: 100%;
              height: 100%;
            }
          }
        }

        .cutTimeVcbg {
          background: url("/img/vc_bg.png");
        }

        .cutTimeIngbg {
          background: url("/img/ingBg.png");
        }

        .cutTimeEndbg {
          background: url("/img/EndBg.png");
        }

        .statusVcbg {
          background-color: #1b962c;
        }

        .statusIngbg {
          background-color: #ed5400;
        }

        .statusEndbg {
          background-color: #797979;
        }
      }

      .birdtable {
        background-color: #fff;
        position: relative;
        overflow: hidden;

        .kailong {
          width: 0;
          height: 0;
          position: absolute;
          top: 0;
          right: 0;
          border-top: 0px solid transparent;
          border-bottom: 53px solid transparent;
          border-right: 50px solid #a3cf3c;

          .tranfont {
            transform: rotate(47deg);
            width: 35px;
            color: #fff;
            position: absolute;
            top: 10px;
            left: 18px;
            font-weight: bold;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
        }

        .table {
          width: 97%;
          margin: 20px auto;

          tr td {
            border: 1px solid #e6e6e6;
            padding: 10px 0;
            text-align: center;
          }

          .tableTitle {

            background-color: #f5f5f5;
            color: #999999;
          }
        }

        .birdtabletitle {
          font-size: 20px;
          margin-top: 25px;
          margin-left: 20px;
        }
      }
    }
  }

  .status_product {
    width: 1200px;
    margin: 20px auto;

    .statusTime {
      display: flex;

      .status {
        width: 5%;
        font-size: 18px;
        padding: 0 12px;
        color: #fff;
      }

      .cutTime {
        color: #fff;
        width: 95%;
        display: flex;
        align-items: center;

        .cutDown_time {
          width: 22px;
          height: 22px;

          img {
            width: 100%;
            height: 100%;
          }
        }
      }

      .cutTimeVcbg {
        background: url("/img/vc_bg.png");
      }

      .cutTimeIngbg {
        background: url("/img/ingBg.png");
      }

      .cutTimeEndbg {
        background: url("/img/EndBg.png");
      }

      .statusVcbg {
        background-color: #1b962c;
      }

      .statusIngbg {
        background-color: #ed5400;
      }

      .statusEndbg {
        background-color: #797979;
      }
    }

    .birdtable {
      background-color: #fff;
      position: relative;
      overflow: hidden;

      .kailong {
        width: 0;
        height: 0;
        position: absolute;
        top: 0;
        right: 0;
        border-top: 0px solid transparent;
        border-bottom: 53px solid transparent;
        border-right: 50px solid #a3cf3c;

        .tranfont {
          transform: rotate(47deg);
          width: 35px;
          color: #fff;
          position: absolute;
          top: 10px;
          left: 18px;
          font-weight: bold;
        }
      }

      .table {
        width: 97%;
        margin: 20px auto;

        tr td {
          border: 1px solid #e6e6e6;
          padding: 10px 0;
          text-align: center;
        }

        .tableTitle {

          background-color: #f5f5f5;
          color: #999999;
        }
      }

      .birdtabletitle {
        font-size: 20px;
        margin-top: 25px;
        margin-left: 20px;
      }
    }
  }

  .biderResult {
    position: relative;
    background-color: #f3f3f3;

    .WinBid {
      font-size: 28px;
      text-align: center;
    }

    .winbider {
      width: 110px;
      height: 110px;
      position: absolute;
      top: 63px;
      right: 317px;
      background: url("/img/winbidTipbg.png") no-repeat;
    }

    .failwinbider {
      width: 110px;
      height: 110px;
      position: absolute;
      top: 6px;
      right: 386px;
      background: url("/img/fail.png") no-repeat;
    }

    .WinBidbg {
      width: 175px;
      margin: 25px auto 0;
      background: url("/img/winbid.png") no-repeat 2px 10px;
    }

    .titleWin {
      color: #a2a2a2;
      width: 95px;
      text-align-last: justify;
      margin-right: 3px
    }

    .failWinBidbg {
      width: 175px;
      margin: 25px auto 0;
      background: url("/img/failwinbid.png") no-repeat 12px 10px;
    }

    .Winbtn {
      width: 165px;
      text-align: center;
      line-height: 42px;
      border-radius: 3px;
    }

  }

  .addbtn {
    width: 160px;
    text-align: center;
    background-color: #ff7300;
    color: #fff;
    border-radius: 3px;
    font-size: 16px;
    padding: 10px;
    margin: 0 auto;
  }

  .addbiders {
    padding: 10px 30px;
    background-color: #ff7300;
    color: #fff;
    border-radius: 3px;
    margin-top: 15px;
    cursor: pointer;
  }

  .parttable {
    width: 100%;
    margin: 5px auto;

    .seeTable {
      width: 65px;
      margin: 0 auto;
      background-color: #007de4;
      border-radius: 3px;
      color: #ffffff;
      cursor: pointer;
    }

    tr td {
      border: 1px solid #e6e6e6;
      padding: 10px 0;
      text-align: center;
    }

    .tableTitle {

      background-color: #f5f5f5;
      color: #999999;
    }
  }

  .birdtabletitle {
    font-size: 20px;
    margin-top: 25px;
    margin-left: 20px;
  }

  .recodelist {
    width: 50%;
    border: 1px solid #dfdfdf;
  }

  .recordTitle {
    font-size: 16px;
    text-align: center;
    padding: 10px 0;

  }

  .Bidders_record_title {
    line-height: 40px;
    border-top: 1px solid #dfdfdf;
    border-bottom: 1px solid #dfdfdf;
  }
</style>
