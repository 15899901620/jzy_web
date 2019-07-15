<template>
    <div class="clearfix">

      <div class="w1200">
        <div class="mt10 fs14">
          <nuxt-link to="index" class="blackFont">巨正源首页</nuxt-link>><span>限时竞拍</span>
        </div>

        <div class="whitebg mt15 ovh dflex" >
          <div>
            <div class="Bidders_record">
              <ul class="Bidders_record_tab">
                <li v-for="(item,index) in aucTab"  :class="{curr:istrue==index}"  @click="istrue=index">{{item.name}}</li>
              </ul>
              <ul class="news_items">
                <!--竞拍记录-->
                <li v-show="istrue===0">
                  <table class="Bidders_record_title">
                    <tbody>
                    <tr>
                      <th >当前状态</th>
                      <th>竞拍人</th>
                      <th>出价金额</th>
                      <th>数量（吨）</th>
                      <th style="width: 190px">出价时间</th>
                    </tr>
                    </tbody>
                  </table>
                  <!--表格-->
                  <div  class="Bidders_record_list">
                    <!--暂无记录-->

                    <table v-if="auctionRd">
                      <tbody>
                      <tr class="Bidders_record_tr " :class="{orangeFont:item.outStatus===1 || item.outStatus===2}" v-for="(item,index) in auctionRd" :key="index">
                        <td>
                          <span class="Bidders_record_curr" v-if="item.outStatus===1">领先</span>
                          <span class="Bidders_record_curr" v-if="item.outStatus===2">入围</span>
                          <span class="tac gray" v-if="item.outStatus===3">出局</span></td>
                        <td><span>{{item.nickName}}</span></td>
                        <td><span>{{item.bidPrice}}</span></td>
                        <td><span>{{item.bidNum}}</span></td>
                        <td style="width: 160px"><span>{{item.createTime}}</span></td>
                      </tr>
                      </tbody>
                    </table>
                    <span class="Bidders_record_zwjl" v-else>暂无记录</span>
                  </div>
                </li>
                <!--我的出价-->
                <li v-show="istrue===1">
                  <table class="Bidders_record_title">
                    <tbody>
                    <tr>
                      <th>当前状态</th>
                      <th>竞拍人</th>
                      <th>出价金额</th>
                      <th>数量（吨）</th>
                      <th style="width: 190px">出价时间</th>
                    </tr>
                    </tbody>
                  </table>
                  <!--表格-->
                  <div  class="Bidders_record_list">
                    <!--暂无记录-->
                    <table v-if="MineOfferRecord">
                      <tbody>
                      <tr class="Bidders_record_tr" :class="{orangeFont:items.outStatus===1 || items.outStatus===2}" v-for="(items,index) in MineOfferRecord" :key="index">
                        <td>
                          <span class="Bidders_record_curr" v-if="items.outStatus===1">领先</span>
                          <span class="Bidders_record_curr" v-if="items.outStatus===2">入围</span>
                          <span class="tac gray" v-if="items.outStatus===3">出局</span>
                        </td>
                        <td><span>{{items.nickName}}</span></td>
                        <td><span>{{items.bidPrice}}</span></td>
                        <td><span>{{items.bidNum}}</span></td>
                        <td style="width: 160px"><span>{{items.createTime}}</span></td>
                      </tr>
                      </tbody>
                    </table>
                    <span class="Bidders_record_zwjl" v-else>暂无记录</span>
                  </div>
                </li>
              </ul>

            </div>
            <!--起拍单价价-->
            <div class="Bidders_record_detail">
              <ul class="Bidders_record_con">
                <li><span class="orangeFont">竞拍编号：</span><span>{{detailDatabrid.billNo}}</span></li>
                <li><span class="orangeFont">品种：</span><span>{{detailDatabrid.skuCategoryName3}}</span></li>
                <li><span class="orangeFont">牌号：</span><span>{{detailDatabrid.skuName}}</span></li>
                <li><span class="orangeFont">竞拍数量：</span><span>{{detailDatabrid.totalNum}}{{detailDatabrid.uomName}}</span></li>
                <li><span class="orangeFont">厂商：</span><span>{{detailDatabrid.manufacturer}}</span></li>
                <li><span class="orangeFont">仓库：</span><span>{{detailDatabrid.warehouseName}}</span></li>
              </ul>
            </div>
          </div>
          <!--内容-->
          <div class="Bidders_record_result"  v-if="detailDatabrid">
            <div class="pr">
            <h1><span class="fwb">{{detailDatabrid.manufacturer}}</span> {{detailDatabrid.warehouseName}} {{detailDatabrid.skuName}} {{detailDatabrid.totalNum}}{{detailDatabrid.uom_name}}</h1>
            <div class="Bidders_record_Time">
              <div class="Bidders_record_result_over " :class="{Bidders_record_result_overbluebg:detailDatabrid.type===1,Bidders_record_result_overorangebg:detailDatabrid.type===2}">
               <span v-if="detailDatabrid.type === 1">即将开始</span>
                <span v-if="detailDatabrid.type === 2">正在竞拍</span>
              </div>
              <span class="ml10">
                 <span v-if="detailDatabrid.type === 1">距离开始</span>
                <span v-if="detailDatabrid.type === 2">距离结束</span>

              </span>
              <span class="fs16 ml15" v-if="detailDatabrid.type === 1 || detailDatabrid.type === 2">{{`${day}天 ${hr}小时 ${min}分钟 ${sec}秒`}}</span>
              </div>
              <div class="Bidders_record_Time fs14" v-if="detailDatabrid.type === 3">
                <span  class="ml10 gray">中标价</span> <span class="fs16 ml15"><span class="orangeFont">￥<span class="fs20 fwb">{{auctionHighPrice}}</span></span> 元/吨</span>
              </div>
              <div class="Bidders_record_Time dflex mt20 fs14" v-if="detailDatabrid.type === 3">
                <span class="ml10 gray">结束时间</span>
                <span class="fs16 ml15">{{detailDatabrid.reservationEndTime}}</span>
              </div>
            <div class="Bidders_record_result_icon"  v-if="detailDatabrid.type === 3"></div>
            </div>

            <div class="Bidders_record_result_list orangebg  mt10" v-show="WinBidShow">
              <!--恭喜中标-->
              <span class="gxzb">恭喜中标</span>
              <div class="tac whiteFont fs24 mt20">恭喜您中得<span class="ml10 mr10">{{WinBid.skuName}}</span><span class="ml10 mr10">{{WinBid.totalNum}}</span>吨</div>
              <span class="db tac whiteFont">剩余付款时间：{{`${hr}小时 ${min}分钟 ${sec}秒`}}，逾期将扣除保证金</span>
              <div class="dflex mb20">
                <div class="zb_btn whitebg orangeFont" @click="auctionOrder">提 货</div>
                <div class="zb_btn whitebg orangeFont" @click="acuDetailmember">查看详情</div>
              </div>
            </div>

        <!-- 竞拍结束&#45;&#45;未中标 -->
            <div class="Bidders_record_result_list graybg  mt25" v-show="NotWinBidShow && detailDatabrid.type === 3">
              <div class="fontScalend fontScalendbg">
                <span>未中标</span>
              </div>
              <div class="dflex" style="flex-direction: column;margin: 39px 0;">
                <div class="LoserList"><span class="failureTitle">最高中标价：</span><span class="fs20 ml15 orangeFont fwb mr5">￥{{auctionHighPrice}}</span>元/吨</div>
                <div class="LoserList"><span class="failureTitle">最低中标价：</span><span class="fs20 ml15 orangeFont fwb mr5">￥{{auctionLowPrice}}</span>元/吨</div>
                <div class="LoserList"><span class="failureTitle">一共拍出：</span><span class="fs20 ml15 orangeFont fwb mr5">{{auctionTotal}}</span>吨</div>
                <div class="LoserList"><span class="failureTitle">中标人数：</span><span class="fs20 ml15 orangeFont fwb mr5">{{auctionWin}}</span>人</div>
              </div>
            </div>


            <ul class="Bidders_record_con graybg" style="margin-top: 17px; width: 546px;" v-show="detailDatabrid.type === 3">
              <li><span class="orangeFont">起拍单价：</span><span>￥{{MinPrice}}元/吨</span></li>
              <li><span class="orangeFont">保证金比例：</span><span>{{detailDatabrid.marginRatio}}%</span></li>
              <li><span class="orangeFont">加价幅度：</span><span>{{detailDatabrid.bidIncrement}} {{detailDatabrid.base_price}}/{{detailDatabrid.uomName}}</span></li>
              <li><span class="orangeFont">竞拍数量：</span><span>{{detailDatabrid.totalNum}}{{detailDatabrid.uomName}}</span></li>
              <li><span class="orangeFont">数量幅度：</span><span>1吨起</span></li>
            </ul>

        <!--正在竞拍-->
            <div class="Bidders_record_result_list graybg  mt25" v-show="detailDatabrid.type === 2">
              <div class="fontScale fontScalebg">
                <span>东莞</span>
              </div>
              <div class="ml30 mt40 dflex" style="align-items: center" >
                <template v-if="bidePrice">
                  <span class="inputTitle">当前价</span><span class="fs18 fwb orangeFont">￥{{bidePrice}} </span>元/吨
                </template>
                <template v-else>
                  <span class="inputTitle">起拍价</span><span class="fs18 fwb orangeFont">￥{{MinPrice}} </span>元/吨
                </template>


              </div>
              <!--竞拍出价-->
              <div class="ml30 dflex mt30" style="align-items: center;">
                <span class="inputTitle">竞拍出价</span>
                <span class="bodeRed cp" @click="cutsOffer()">-</span>
                <input type="text" v-model="auctionOffer" class="textInput" style="" />
                <span class="bodeRed orangeFont fwb whitebg cp" @click="addOffer()">+</span>
                <span class="ml10 gray fs14">加价幅度：{{detailDatabrid.bidIncrement}} {{detailDatabrid.base_price}}/{{detailDatabrid.uomName}}</span>
              </div>
              <!--竞拍数量-->
              <div class="ml30 dflex mt25" style="align-items: center;">
                <span class="inputTitle">竞拍数量</span>
                <div class="dflexAlem pr">
                  <span class="bodeRed cp"  @click="cutsNum()">-</span>
                  <input type="text" v-model="auctionNum" class="textInput" style="" />
                  <span class="bodeRed orangeFont fwb whitebg cp" @click="addNum()">+</span>
                  <span class="ml10 gray fs14">{{detailDatabrid.minOrder}}吨起</span>
                  <i class="redFont" style="position: absolute;bottom: -20px" v-show="auctionNumShow">{{auctionNumTip}}</i>
                </div>

              </div>
              <!--保证金比例-->
              <div class="ml30 dflex mt20" style="align-items: center;">
                <span class="inputTitle">保证金比例</span>
                <span class="">{{detailDatabrid.marginRatio}}% </span>
              </div>
              <!--竞拍必看-->
              <div class="MustSee">竞拍必看</div>
              <div class="acuBtn" v-if="detailDatabrid.type === 2">
                <a class="oncebg" @click="AddauctionPrice()">立即出价</a>
                <a class="Paybg ml15" @click="PayCost()">追加保证金</a>
              </div>
              <div class="acuBtn" v-if="detailDatabrid.type === 1">
                <a class="startbg" @click="StartOrder()">即将开始</a>
                <a class="Paybg ml15" @click="PayCost">缴纳保证金</a>
              </div>

            </div>

          </div>

          <div v-else class="mt30 ml25 fs20">
            {{DatabridTip}}
          </div>

        </div>


<!--        <div class="whitebg mt30 ovh">-->
<!--          &lt;!&ndash;正在参与&ndash;&gt;-->
<!--          <div class="mt25 ml25 mb20">-->
<!--            <h1 class="paipinacu fs20">正在参与</h1>-->
<!--            <table class="paipin_table">-->
<!--              <tbody><tr><th>品种</th><th>牌号</th><th>厂商</th><th>竞拍总量</th><th>市场价</th><th>交易地点</th><th>交货时间</th> </tr>-->
<!--              <tr><td>{{detailDatabrid.skuCategoryName3}}</td><td>{{detailDatabrid.skuName}}</td><td>{{detailDatabrid.manufacturer}}</td><td>{{detailDatabrid.totalNum}}{{detailDatabrid.uomName}}</td><td>￥10400.00/吨</td><td>自提</td><td>常州市</td> </tr>-->
<!--              </tbody>-->
<!--            </table>-->
<!--          </div>-->
<!--        </div>-->

        <!--拍品信息-->
        <div class="whitebg mt30 ovh">
          <!--拍品信息-->
          <div class="mt25 ml25">
            <h1 class="paipinacu fs20">拍品信息</h1>
            <table class="paipin_table">
              <tbody>
              <tr><th>品种</th><th>牌号</th><th>厂商</th><th>竞拍总量</th><th>起拍价</th><th>发货仓库</th></tr>
              <tr><td>{{detailDatabrid.skuCategoryName3}}</td><td>{{detailDatabrid.skuName}}</td><td>{{detailDatabrid.manufacturer}}</td><td>{{detailDatabrid.totalNum}}{{detailDatabrid.uomName}}</td><td>{{MinPrice}}</td><td>{{detailDatabrid.warehouseName}}</td>  </tr>
              </tbody>
            </table>
          </div>

          <!--竞拍流程-->
          <div class="ml25 mt30">
            <h1 class="paipinacu fs20">竞拍流程</h1>
            <img src="../../assets/img/flow.png"  class="mt20 ml30"/>
          </div>
          <!--交易信息-->
          <div class="ml25 mt30">
            <h1 class="paipinacu fs20">交易信息</h1>
            <table class="paipin_table">
              <tbody>
              <tr><th>交货方式</th><th>交货地</th><th>详细地址</th><th>交货时间</th></tr>
              <tr><td>仓库</td><td>{{detailDatabrid.warehouseName}}</td><td>{{detailDatabrid.warehouseAddress}}</td><td>现货</td></tr>
              </tbody>
            </table>
          </div>
          <!--竞拍规则-->
          <div class="ml25 mt30">
            <h1 class="paipinacu fs20">竞拍规则</h1>
            <table class="paipin_table">
              <tbody>
              <tr><th>竞拍方式</th><th>竞拍开始时间</th><th>竞拍结束时间</th><th>允许延时</th><th>延时规则</th><th>延时时长</th><th>成交价格判定</th></tr>
              <tr><td>公开竞拍</td><td>{{detailDatabrid.beginTime}}</td><td>{{detailDatabrid.reservationEndTime}}</td><td>是</td>
                <td style="line-height: 20px;padding: 10px;">在拍卖结束时间前2分钟内如有竞买人出价，最后结束时间延长2分钟；延长时间内再有人出价，则继续延长2分钟，直到没人出价为止，竞拍结束。</td>
                <td>2分钟</td><td>按自报价</td>
              </tr>
              </tbody>
            </table>
          </div>
          <!--备注信息-->
          <div class="ml25 mt30">
            <h1 class="paipinacu fs20">备注信息</h1>
            <p class="mt10 fs14" style="color: #666; width: 97%;">不可抗力是一项免责条款，是指买卖合同签订后，不是由于合同当事人的过失或疏忽， 而是由于发生了合同当事人无法预见、无法预防、无法避免和无法控制的事件，以致不能履行或不能
              如期履行合同， 发生意外事件的一方可以免除履行合同的责任或者推迟履行合同，在我国《民法通则》上是指“不能预见、 不能避免和不能克服的客观情况”。</p>
          </div>
          <!--真货保障-->
          <div class="ml25 mt30">
            <h1 class="paipinacu fs20">真货保障</h1>
            <p class="mt10" style="color: #666; width: 97%;">巨正源自上线以来，一直努力为会员提供优质的塑料在线交易服务。 为了更好的服务巨正源会员，推出了竞拍活动，巨正源竞拍活动的货品来自全国生产商和大贸易商， 质量值得信赖，
              目前我们正与其他供应商洽谈合作，加大货物品类及范围。</p>
            <img src="../../assets/img/serve.png"  class="mt30"/>
          </div>
          <!--合同模板-->
          <div class="ml25 mt30">
            <h1 class="paipinacu fs20">合同模板</h1>
            <div class="dflex ml10 mt10">
              <span class="contract">提</span><a>自提合同模板</a>
              <span class="contract ml15">送</span><a>配送合同模板</a>
            </div>
          </div>
          <!--联系方式-->
          <div class="ml25 mt30 mb40">
            <h1 class="paipinacu fs20">联系方式</h1>
            <table class="paipin_table"  >
              <tbody>
              <tr><th>工作时间</th><th>QQ咨询</th><th>客服热线</th></tr>
              <tr><td>
                <div style="display: flex;justify-content: center; margin: 10px auto;">
                  <div class="contactTime contactTable1"></div>工作日（9:00-18:00）
                </div>

              </td>
                <td>
                  <div style="display: flex;justify-content: center; margin: 10px auto;">
                    <div class="contactTime contactTable2"></div>3225462455
                  </div>
                </td>
                <td>
                  <div style="display: flex;justify-content: center; margin: 10px auto;">
                    <div class="contactTime contactTable3"></div>4009-000-000
                  </div>

                </td>
              </tr>
              </tbody>
            </table>
          </div>

        </div>

      </div>
    <!-- 缴纳保证金 -->
    <PayDeposit v-show="DepositShow"  @HiddenDep="hiddenDepositShow"  :DepositeData="DepositData"></PayDeposit>

    </div>
</template>

<script>
  import PayDeposit from './BidersComponent/PayDeposit'
  import { auctionInfor, priceListInfo, NewPrice, auctionRecord, auctionMineRecord, AddauctionPrice, GainauctionRecord, WinningBid } from '../../api/auction'
  import Cookies from 'js-cookie'
    export default {
      name: "BidersBegin",
      components:{
        PayDeposit
      },
      data(){
          return{
            aucTab:[
              {name:'竞拍记录'},
              {name:'我的出价'}
            ],
            istrue: 0,
            MineOfferRecord:{
              type:Object
            },
            MineOfferacr:{
              type:Object
            },
            WinBidShow:false,
            NotWinBidShow:false,
            WinBid:{
              type:Object
            },
            auctionNumShow:false,
            auctionNumTip:'',   //竞拍价提示
            auctionOffer:'',  //竞拍出价
            auctionNum:'',  //竞拍数量
            auctionHighPrice:0,//最高中标价
            auctionLowPrice:0,//最低中标价
            auctionWin:0,     //中标人数
            auctionTotal:0,  //竞拍结束—竞拍总数量
            auctionBond:'',   //保证金比例
            auctionRd:{       //竞拍记录
              type:Object
            },
            DepositData:{
              auctionId:'',
              MinePrice:0,
              aucteNum:0,
              Bond:0,   //保证金比例
            },
            DepositShow:false,
            id:'',
            detailDatabrid:'',
            DatabridTip:'',
            countTime:'',    //倒计时
            MinPrice:'',     //最小起拍价
            bidePrice:'',     //当前价
            day: 0, hr: 0, min: 0, sec: 0
          }
      },
      methods:{
        //查看详情_跳转会员-我的竞拍页
        acuDetailmember(){
          this.$router.push({name:'users-userauction'})
        },
        //提货_跳转到下单页
        auctionOrder(){
          this.$router.push({name:"Biders-BidersSubmit",query:{id:this.WinBid.id}})
        },
        // 竞拍出价
        cutsOffer(){
          console.log('bidIncrement',this.detailDatabrid.bidIncrement)
          if(this.auctionOffer>this.MinPrice){
             this.auctionOffer=Number(this.auctionOffer)-Number(this.detailDatabrid.bidIncrement)
          }else {
             this.auctionOffer=this.MinPrice
          }
          console.log('auctionOffer',this.auctionOffer)
        },
        addOffer(){
          console.log('bidIncrement',this.detailDatabrid.bidIncrement)
          this.auctionOffer=Number(this.auctionOffer)+Number(this.detailDatabrid.bidIncrement)
          console.log('auctionOffer',this.auctionOffer)
        },
        // 竞拍数量
        cutsNum(){
          if(this.auctionNum>this.detailDatabrid.minOrder){
            this.auctionNumShow=false
            this.auctionNum--
          }else{
            this.auctionNumShow=true
           this.auctionNumTip='不得小于'+this.detailDatabrid.minOrder
          }
        },
        addNum(){
          this.auctionNumShow=false
          this.auctionNum++

        },

        //显示追加保证金的弹窗
        PayCost(){
          this.DepositShow=true
          this.DepositData.auctionId= this.detailDatabrid.id
          this.DepositData.MinePrice= this.MinPrice
          this.DepositData.aucteNum = this.auctionNum
          this.DepositData.Bond = this.auctionBond
          console.log('DepositData', this.DepositData)
         },
         //竞拍记录
        async AuctionRecord(){
          console.log('auctionRd', this.auctionRd)
          let params={
            current_page:'',
            page_size:'',
            isActive:''
          }
          let res = await auctionRecord(this,params)
          console.log('竞拍记录res', res)
          if(res ){
            this.auctionRd=res.data.items
            console.log('***auctionRd***', this.auctionRd)
            console.log('***this.detailDatabrid.type***', this.detailDatabrid.type)
            if(this.detailDatabrid.type===3){
            var newArr = this.auctionRd.filter(item=>{return item.outStatus ===1 || item.outStatus ===2})
            var totalnum=newArr.map(function(v){
                return v.bidNum
              });
            console.log('totalnum', totalnum)
            var HighPrice=newArr.map(function(v){
              return v.bidPrice
            });
           //最高中标价
            HighPrice.sort(this.sortFun)
            HighPrice.reverse();
            console.log('HighPrice',HighPrice)
            this.auctionHighPrice=HighPrice[HighPrice.length-1]
            this.auctionLowPrice=HighPrice[0],//最低中标价
            this.auctionWin=HighPrice.length,     //中标人数
            this.auctionTotal=totalnum.reduce(function(prev, curr){ return prev + curr; })
             console.log('auctionTotal', this.auctionTotal)
            }
          }

         // console.log('auctionRd', this.auctionRd)

        },
        //数组排序
        sortFun(a,b){
          return b-a;
        },
        //中标信息
        async WinningBid(id){
          let params={
            auctionId:id
          }
          let res =await WinningBid(this,params)
          console.log('WinningBidres', res)
          if(res.data && res.status === 200){
            this.WinBidShow=true
            this.WinBid=res.data
            this.countTime = Date.parse(new Date(this.WinBid.lastDeliveryTime))
          }else{
            this.NotWinBidShow=true
          }

        },
        //我的出价
        async auctionMineRecord(){
          if(Cookies.get('userinfor')){
            let id=JSON.parse(Cookies.get('userinfor')).id
            let params={
              memberId:id,
              isActive:'',
            }
            let res = await auctionMineRecord(this,params)
            console.log('我的出价res',res)
            if(res){
              this.MineOfferacr=res.data
           //   console.log('MineOfferacr:', this.MineOfferacr)
            }
          }
        },

        //获取我的出价记录
        async GainauctionRecord(id){
          console.log('出价记录id',id)
          let params={
            auctionId:id
          }
          let res =await GainauctionRecord(this,params)
          console.log('获取我的出价记录:',res)
          if(res){
            this.MineOfferRecord=res.data
          }
        },
        // 竞拍详情
        async AuctionDetail(id){
          let params={
            id:id
          }
        let res =await auctionInfor(this,params)
          console.log('竞拍详情res', res)
          if(!res.data.errorcode && res.status === 200){
            this.detailDatabrid=res.data
            console.log('detailDatabrid', this.detailDatabrid)
          }else {
              this.DatabridTip='暂无数据'
          }
          this.auctionNum=this.detailDatabrid.minOrder
          this.auctionBond=this.detailDatabrid.marginRatio
          if(this.detailDatabrid.type===1){    //即将开始
            this.countTime = Date.parse(new Date(this.detailDatabrid.beginTime))
          }
          if(this.detailDatabrid.type===2){    //正在竞拍
            this.countTime = Date.parse(new Date(this.detailDatabrid.reservationEndTime))
          }
          if(this.detailDatabrid.type===3){
            this.WinningBid(this.detailDatabrid.id)
          }
          this.countdown()
          this.priceInfo(this.detailDatabrid.skuId)
          this.NewPrice(this.detailDatabrid.id)
          this.GainauctionRecord(this.detailDatabrid.id)  //获取我的出价记录
          this.AuctionRecord()   //竞拍记录
          this.auctionMineRecord()  //我的出价
        },

        //最小起拍价
        async priceInfo(id){
          console.log('最小起拍价id:', id)
          let params={
            skuId:id
          }
          console.log('最小起拍价params:', params)
          let res =await priceListInfo(this,params)
          console.log('最小起拍价res',res)
          if(res)
          {
            this.MinPrice=res.data.minSellingPrice
            this.auctionOffer=this.MinPrice
           }
        },
        //添加竞拍出价记录
        async AddChuJia(){
          let params={
            auctionId:this.detailDatabrid.id,
            bidNum:this.auctionNum,
            bidPrice:this.auctionOffer,
          }
          let res =await AddauctionPrice(this,params)
          console.log('立即出价', res)
          if(res.data.data===null && res.status === 200){
            this.$Notice.warning({
              title: res.data.message+'!!! '+'请联系客服。',
              duration: 5
            })
          }else{
            this.$Message.info('出价成功！！！')
            this.GainauctionRecord()
            this.AuctionRecord()
            this.auctionMineRecord()
          }
        },

         AddauctionPrice(){

          if(Cookies.get('userinfor')){

            this.$Modal.confirm({
              title: '立即出价',
              content: '<h1 style="font-size: 20px">'+'<span class="fwb">'+this.detailDatabrid.manufacturer+'</span>'+this.detailDatabrid.warehouseName+this.detailDatabrid.skuName+this.detailDatabrid.totalNum+this.detailDatabrid.uomName+'</h1>'
            +'<p style="font-size: 16px; margin-top: 10px">'+'<span>竞拍数量:</span>'+'<span class="orangeFont">'+this.auctionNum+'</span>'+'</p>'+'<p style="font-size: 16px">'+'<span>竞拍出价:</span>'+'<span class="orangeFont">'+this.auctionOffer+'</span>'+'</p>',
              okText:'去出价',
              styles:'top:30px;',
              onOk: () => {
                this.AddChuJia()
              },

            });

          }else{
            this.$Modal.confirm({
              title: '提示',
              content: '<p>您尚未登录，请先登录</p>',
              okText:'去登录',
              onOk: () => {
                this.$router.push({name:'login'});
              },

            });
          }

        },
        StartOrder(){
          this.$router.push({path:'./BidersSubmit'})
        },

        //获取最新的竞拍价
        async NewPrice(id){
          let params={
            auctionId:id
          }
          let res=await NewPrice(this,params)
          console.log('获取最新的竞拍价',res)
          if(res.data){
            this.bidePrice=res.data.bidPrice
          }else{

          }


        },
        //倒计时
       countdown() {
         const end=Date.parse(new Date(this.countTime))
         const now = Date.parse(new Date())
         if(end>now){
           const msec = end - now
          let day = parseInt(msec / 1000 / 60 / 60 / 24)
          let hr = parseInt(msec / 1000 / 60 / 60 % 24)
          let min = parseInt(msec / 1000 / 60 % 60)
          let sec = parseInt(msec / 1000 % 60)
          this.day = day
          this.hr = hr > 9 ? hr : '0' + hr
          this.min = min > 9 ? min : '0' + min
          this.sec = sec > 9 ? sec : '0' + sec
          const that = this
          setTimeout(function () {
            that.countdown()
          }, 1000)
         }
       },

        //隐藏缴纳定金弹窗
        hiddenDepositShow(){
          this.DepositShow=false
        }
      },
      mounted() {
      //  console.log('this.$router',this.$router)
        this.id=this.$router.history.current.query.id
        this.AuctionDetail(this.id)





      }
    }
</script>

<style scoped>

  .Bidders_record{margin-top: 30px; margin-left: 20px;  width: 575px;  border: 1px solid #DEDEDE;}
  .Bidders_record .Bidders_record_title { line-height: 50px;}
  .Bidders_record_title th {width: 144px;text-align: center; font-size: 14px}
  .Bidders_record_tab{ display: flex; border-bottom: 1px solid #DDDDDD;}
  .Bidders_record_tab li{width: 50%; text-align: center; padding: 15px 0; font-size: 14px; cursor: pointer;}
  .Bidders_record_tab li.curr{background-color: #ff7300; color: #fff;  }
  .Bidders_record .Bidders_record_list {overflow-y: auto; height: 285px;   border: 2px solid #ff7701;  box-sizing: border-box;}
  .Bidders_record_list table {width: 100%;}
  .Bidders_record_list tr {height: 40px;}
  .Bidders_record_list tr td {width: 114px;text-align: center; font-size: 14px;}
  .Bidders_record_list tr:nth-child(odd) {background: #f7f7f7;}
  .Bidders_record span {display: inline-block;}
  .Bidders_record_curr {padding:1px 10px;  text-align: center; background: #fe7601;color: #fff; border-radius: 15px;}

  /*起拍单价*/
  .Bidders_record_detail { overflow: hidden;   margin-top: 20px; margin-left: 20px; margin-bottom: 30px; width: 575px;   margin-top: 15px;}
  .Bidders_record_table{width: 100%; }
  .Bidders_record_table tr td{border: 1px solid #DEDEDE; font-size: 12px; line-height: 30px; padding-left: 10px; box-sizing: border-box;}
  .Bidders_record_table .Bidderstitle{  background: #f5f5f5; width: 20%;    font-size: 14px;}
  .Bidders_record_con{display: flex;flex-wrap: wrap; background: #f5f5f5;    padding: 10px 20px;}
  .Bidders_record_con li{width: 33%;   font-size: 14px;     line-height: 25px;  overflow: hidden;
    -ms-text-overflow: ellipsis; white-space:nowrap;
    text-overflow: ellipsis;}
  .news_items{height: 335px;overflow: hidden;}
  /*内容*/
  .Bidders_record_result{overflow: hidden;margin-left: 30px; margin-top: 25px;}
  .Bidders_record_result h1{font-size: 20px;}
  .Bidders_record_result_overbluebg { background: url(../../assets/img/Bidders_icon02.png)no-repeat center;}
  .Bidders_record_result_overorangebg{background: url(../../assets/img/Bidders_icon03.png)no-repeat center;}
  .Bidders_record_result_over {  width: 70px; line-height: 25px; text-align: center; color: #fff; font-size: 12px;}
  .Bidders_record_Time{display: flex;align-items: center;margin-top: 8px;}
  .Bidders_record_result_list{width: 546px;position: relative; overflow: hidden;}
  .fontScalebg{border-color:transparent transparent transparent #a3cf3c;}
  .fontScaleTipbg{border-color:transparent transparent transparent #dddddd;}

  .fontScale{font-size: 16px;color: #fff; font-weight: bold;width:0;height:0; border-width:0 0 55px 55px;
    border-style:solid; position:absolute; top: 0;left: 0; display: flex;}
  .fontScale>span{transform: rotate(-45deg);
    -moz-transform: rotate(-45deg);/* Firefox 旋转属性，参数表示角度(deg表示角度)，负数逆时针，正数顺时针 */
    -webkit-transform: rotate(-45deg);/* Safari和Chrome */
    -ms-transform: rotate(-45deg);/* IE 9 */
    -o-transform: rotate(-45deg);/* Opera */
    margin-left: -60px; margin-top: 10px;}
  .inputTitle{width: 80px;display: flex; align-items: center; margin-right:20px; font-size: 14px;}
  .bodeRed{font-size:16px;box-sizing: border-box;width: 28px;height: 40px; border: 1px solid #dddddd; display: flex;align-items: center;justify-content: center;}
  .textInput{height: 40px; box-sizing: border-box; border:none;border-bottom: 1px solid #DDDDDD;border-top: 1px solid #DDDDDD;text-align: center; background-color: #fff;}
  .MustSee{ background: url(../../assets/img/icon.png)no-repeat -65px -1px; width: 150px; margin-left: 130px;margin-top: 10px; padding-left: 25px;position: relative;}
  .acuBtn{ margin-top: 30px; margin-bottom: 50px; margin-left: 130px;display:flex;}
  .acuBtn a{ border-radius: 3px; color: #fff; width: 165px;height: 40px;text-align: center; line-height: 40px; font-size: 18px;}
  .acuBtn .startbg{background-color: #23aa36;}
  .acuBtn .oncebg{background-color: #ff7300;}
  .acuBtn .Paybg{background-color: #007de4;}
  .HandIn{background-color: #007de4; color: #fff; padding: 3px 15px; border-radius:3px ;}

  /*首页-竞拍时间*/
  .paipinacu{color: #333;}
  .AuctionTime ul{display: flex;}
  .AuctionTime li{background-color: #fff;width: 33.3%; text-align: center;padding: 10px 0;}
  .AuctionTime li.curr{color: #fff;background-color: #ff6c00; box-shadow: 6px 0px 3px 1px #ff6c00;z-index: 10;position: relative;}
  .AtP{margin-top: 3px;display: flex; justify-content: center; align-items: center;}
  .Atborder{ text-align: center; padding: 0px 10px;  border-radius: 15px; border: 1px solid #CCCCCC;  color: #CCCCCC; font-size: 14px; overflow: hidden;}


  .gxzb { display: block; font-size: 28px; line-height: 50px;  text-align: center;     color: #fff; margin-top: 30px;}
  .dflex a{text-decoration: none;}
  .zb_btn { border-radius: 3px; display: block; width: 180px;  margin: 30px auto;  line-height: 43px;  text-align: center;  font-size: 18px; cursor: pointer}

  .paipin_table {width: 97%;  margin-top: 10px;  border-left: 1px solid #D5D5D5;  border-top: 1px solid #D5D5D5;}
  .paipin_table tr { line-height: 40px; font-size: 14px;}
  .paipin_table tr th { color: #999999;  background: #f5f5f5;  width: 137px;  border-right: 1px solid #D5D5D5;  border-bottom: 1px solid #D5D5D5;}
  .paipin_table tr td { color: #666; text-align: center;  border-right: 1px solid #D5D5D5;  border-bottom: 1px solid #D5D5D5;}

  /*合同模板*/
  .dflex>a{ text-decoration:underline;  }
  .dflex .contract{background-color: #ff7300; color: #fff; padding: 0 3px;border-radius: 3px; box-sizing: border-box; margin-right: 5px;}




  /*未中标*/

  .fontScalendbg{border-color:transparent transparent transparent #E2E2E2;}
  .fontScalendTipbg{border-color:transparent transparent transparent #dddddd;}

  .fontScalend{font-size: 16px;color: #fff; font-weight: bold;width:0;height:0; border-width:0 0 70px 72px;
    border-style:solid; position:absolute; top: 0;left: 0; display: flex;}
  .fontScalend>span{transform: rotate(-46deg);
    -moz-transform: rotate(-46deg);/* Firefox 旋转属性，参数表示角度(deg表示角度)，负数逆时针，正数顺时针 */
    -webkit-transform: rotate(-46deg);/* Safari和Chrome */
    -ms-transform: rotate(-46deg);/* IE 9 */
    -o-transform: rotate(-46deg);/* Opera */
    margin-left: -78px; margin-top: 16px;}


  .filurbg{ width: 90px; height: 90px; background: url('../../assets/img/Tipbg.png')no-repeat; }
  .LoserList{text-align: center; font-size: 16px;margin-top: 15px;display: flex;align-items: center;color: #333;}
  .LoserList .failureTitle{width: 110px;text-align: right; margin-left: 110px;}
  .Bidders_record_result_icon { position: absolute;  right: 80px; bottom: 0px; width: 136px;  height: 100%; background: url('../../assets/img/Acution_icon.png')no-repeat center;  background-size: contain;}


</style>
