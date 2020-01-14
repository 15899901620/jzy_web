<template>
	<div class="body">
		<Header-small title="专料下单">
			<div slot="headerother">
				 <ul class="sp_cat_title_list">
                    <li class="curr"><i>1</i><p>编辑详细信息</p></li>
                    <li><i>2</i><p>提交订单成功</p></li>
                    <li><i>3</i><p>支付货款</p></li>
                    <li><i>4</i><p>下单完成</p></li>
                </ul>
			</div>
		</Header-small>
		<div class="container" title="">
            <div class="w1200 whitebg bdccc" style="margin-top: 20px; margin-bottom: 40px;">
                <!--公司信息-->
                <div class="mt30 fs16 ml15 fwb">公司信息</div>
                <div class="ml35 mt20 mb20 fs14">{{userinfo.username}}</div>
                <div class="lineborder"></div>
                <!--交货方式-->
                <div class="mt30 fs16 ml15 fwb">交货方式</div>
                <div class="" style="display: flex; justify-content: space-between;align-items: center; margin-left: 35px;">
                    <ul class="DeliveryMethod mb20">
                         <li @click="chooseDelieryType(0)" :class="{'curr':0 === currentIndex}" :key="0">
                            <div style="background-color: #fff;">自提</div>
                            </li>
                            <li @click="chooseDelieryType(1)" v-if="$store.state.common.sysConfig.IS_CAN_DELIVERY == 1" :class="{'curr':1 === currentIndex}" :key="1">
                            <div style="background-color: #fff;">配送</div>
                     </li>
                        <div class="gray">（您选择交货方式为配送，提交下单必须满足<span class="orangeFont">25</span>吨的倍数）</div>
                    </ul>
                    <div class="blueFont mr30 cp fs14" v-show="currentIndex" id="newAdd"  @click="addNewAddress">新增收货地址</div>
                </div>
                  <div class="ml35 fs14 mt10 dflexAlem" v-if="orderinfo.isDelivery == 0">
                    选择运输方式
                    <div class="ml5">
                        <Select v-model="orderinfo.transportationModeTake" style="width:200px">
                        <i-option v-for="(item, index) in takeTheirTrans" :value="item" :key="index">{{ item }}</i-option>
                        </Select>
                    </div>
                </div>
                <div class="AddList" v-if="this.orderinfo.isDelivery == 1">
                    <template v-if="addressList.length > 0">
                        <ul class="addListSelect ovh" >
                            <li v-for="(item,i) in addressList" :key="i" :class="item.id === orderinfo.addressId ? 'curr' : ''" @click="setAddress(i,item)">
                                <div class ='deliver_icon' v-if="item.id === orderinfo.addressId" >
                                    <i class ='deliver_icon'></i>
                                配送至
                                </div>
                                <div v-else class="deliver_icon"> <span style="margin-left:79px;">&nbsp;</span></div>
                                <RadioGroup v-model="orderinfo.addressId" >
                                    <Radio :label="item.id" >
                                        <span style="margin-left: 15px">{{item.name}}</span>
                                        <span style="margin-left: 15px">{{item.phone}}</span>
                                        <span style="margin-left: 15px">身份证：{{item.idNumber}}</span>
                                        <span style="margin-left: 15px">{{item.stateName}} {{item.cityName}}{{item.districtName}} {{item.address}}</span>
                                    </Radio>
                                </RadioGroup>
                            </li>
                        </ul>
                    </template>
                    <template v-else><p>暂无任何收货地址，请您添加！</p></template>
                </div>
                <div class="lineborder"></div>
                <div class="mt30 fs16 ml15 fwb" v-if="this.orderinfo.isDelivery == 1">运费</div>
                <div class="ml35 fs14 mt10 dflexAlem" v-if="this.orderinfo.isDelivery == 1">
                      <div class="ml35 fs14 mt10 dflexAlem" v-if="this.orderinfo.isDelivery == 1">
                        选择运输方式
                        <ul class="DeliveryMethod ml35 mb20">
                            <template v-if="logisticsfreight.length > 0">
                                <li v-for="(item, index) in logisticsfreight" @click="setFreight(index,item)"
                                    :class="{'curr':index === currfreight}" :key="index">
                                    {{item.transportation}}({{item.freight_fee}}元/吨)
                                </li>
                            </template>
                            <template v-else>
                                <p>此线路暂无任何运输方式数据，请变更配送地址 或 货物选择自提！</p>
                            </template>
                        </ul>
                    </div>
                </div>

                <div class="lineborder"></div>
                <!--优选服务-->
                <div class="mt30 fs16 ml15 fwb" id="test2">优选服务</div>
                <div class="ml35 fs14 mt10 dflexAlem">
                    巨融易
                    <div class="ml5">
                        <Select v-model="orderinfo.jryDays" clearable @on-change="setJry" size="small" style="width:100px">
                            <i-option v-for="(item, index) in jryDays" :value="item" :key="index">{{ item }}</i-option>
                        </Select>
                    </div>
                    <div class="ml20 orangeFont">* 费率=天数*吨数*5元</div>
                </div>
                <div class="orderCzTip">
                    * 选择巨融易服务，提交订单后在有效期内付款完成，逾期将扣除保证金（例：距融易5天，2019-05-08 11:00:00提交订单，须在2019-05-13 17:00:00前完成付款）
                </div>
                <div class="lineborder"></div>
                <!-- 商品信息 -->
                <div class="mt30 fs16 ml15" id="test1">
                    <span class="fwb">商品信息</span>
                    <span class="gray fs14">（ 最后全部提货完成时间<span class="orangeFont">{{this.specialDetail.endTime}}</span>，逾期增加<span class="orangeFont">0.01%</span>的仓储费 ）</span>
                </div>
                <ul class="orderPorList">
                    <li>
                        <span class="title" style="width: 13%;">货物信息</span>
                           <span class="title" style="width: 12%;">交货地</span>

                         <span class="title" style="width: 12%;">运费</span>

                         <span class="title" style="width: 12%;">巨融易</span>
                         <span class="title" style="width: 12%;">合计单价（元/吨）</span>
                        <span class="title" style="width: 12%;">放料单可提吨数</span>
                        <span class="title" style="width: 14%;">本次提货吨数</span>

                        <span class="title" style="width: 9%;">小计</span>
                    </li>
                    <li>
                        <div  style="width: 13%;">{{specialDetail.skuName}}</div>
                         <div  style="width: 12%;">{{feedingInfo.warehouseName}}</div>
                            <div style="width: 12%;">+ {{orderinfo.freightFee}}元/吨</div>
                         <div style="width: 12%;">+ {{orderinfo.jryCost}}元/吨</div>
                        <div  style="width: 12%;">{{$utils.amountFormat(feedingInfo.basePrice)}}</div>
                        <div  style="width: 12%;">{{specialDetail.availableNum}}</div>
                        <div  style="width: 14%;">
                            <input-special :min="currMin" :max="currMax" :step="currsetp" v-model="feedingInfo.availableNum" @change="changeNum"></input-special>
                        </div>

                        <div class="fwb orangeFont" style="width: 9%;">{{ this.totalAmountFormat }}</div>
                    </li>
                </ul>

                <div class="proInfor">
                    <div  style="display: flex; flex-direction: column; width: 300px; " >
                        <div class="mt20 tar mr20 dflex " style="align-items: center;">
                            <span class="totalprice">应付总额：</span><span class="tar" style="width: 150px;">￥{{this.totalAmountFormat}}</span>
                        </div>
                        <div class="mt20 mb20 tar mr20 dflexAlem">
                            <span class="totalprice">待付金额：</span><span class="fs18 orangeFont tar fwb" style="width: 150px;">￥{{this.payAmountFormat}}</span>
                        </div>
                    </div>
                </div>

                <div class="w1200 whitebg dflexAlem" style="font-size: 14px; margin: 30px; justify-content:flex-end; width:96.8%;">
                    <!-- <div class="submitOrder" style="background-color: #e0dede" v-if="Order==0">提交订单</div> -->
                    <div class="submitOrder" @click='createOrder'>提交订单</div>
                </div>
            </div>
		</div>
		<Footer size="small" title="底部" style="margin-top:18px;"></Footer>


    </div>
</template>

<script>
import Header from '../../../components/header'
import Footer from '../../../components/footer'
import { mapState} from 'vuex'
import { specialDetail, getWeek, submitOrder, devDetail ,monthspecialDetail} from '../../../api/special'
import { capitalinfo } from '../../../api/capital'
import InputSpecial from '../../../components/input-special'
import { getCookies } from '../../../config/storage'
import { addressList, gainuserInfor } from '../../../api/users'

export default {
    name: "special-order-id",
    components: {
        HeaderSmall: Header.small,
        Footer,
        InputSpecial
    },
    computed: {
        ...mapState({
        specialDetail: state => state.special.specialDetail,
        feedingInfo: state => state.special.feedingInfo,
      }),
    //   minPrice: function () {
    //     if(this.auctionInfo.myBidList.length > 0){
    //       return this.auctionInfo.myBidList[0].bidPrice
    //     }else{
    //       return this.auctionInfo.finalPrice
    //     }
    //   },
    //   minNum: function () {
    //     if(this.auctionInfo.myBidList.length > 0){
    //       return this.auctionInfo.myBidList[0].bidNum
    //     }else{
    //       return this.auctionInfo.minOrder
    //     }
    //   }
    },

    fetch({
        store,
        params
    }) {
        return Promise.all([
          //获取顶部、中部、底部导航信息
          store.dispatch('common/getNavList'),
          //获取系统配置
          store.dispatch('common/getSysConfig'),
          //获取友情链接
          store.dispatch('common/getFriendlyList'),
          //获取底部帮助分类
          store.dispatch('helper/getHelpCate', {
            catId: 0,
            indexShow: 1
          }),
        ])
    },

    data() {
        return {
            orderinfo: {
                isDelivery: 0,
                isPerDeposit: 0,
                isJryService: false,
                jryDays: '',
                jryCost: '0.00',
                totalAmount: '0.00',
                depositAmount: 0,
                orderType: 4,
                sourceId: 0,
                feedingId: 0,
                transportationModeTake: '公路运输',
                transportationMode:'',
                orderNum: 0,
                freightFee:0,
                addressId: 0
            },

            createInfo:false,
            currMin: 0,
            currMax: 0,
            currsetp: 1,
            ServiceTimeList:[
                {
                    value:'5',
                    timeSelect:'5天'
                },
                {
                    value:'3',
                    timeSelect:'3天'
                },
                {
                    value:'1',
                    timeSelect:'1天'
                }
            ],
            methodList:[
                {value:1, name:'自提'},
                {value:2, name:'配送'}
            ],
            payList:[
                {value:1, name:'支付全款'},
            ],
            takeTheirTrans:{},
            carrierList: [],
            carrierId:'',
            currfreight:"",
            WeekList: {},
            currfreightdata: {},
            defaultAdd:{},
            specialDetail:{},
             feedingInfo:{},
            logisticsfreight: {},
            curraddress: 0,
            userinfo: !getCookies('userinfor') ? '' : getCookies('userinfor'),
            capitalinfo: {},
            addressList:[],
            jryDays:{},
            currentIndex: 0,
            RegisterName: 'member',
            nowIndex: 0,
            index: 0,
            payIndex: 0,
            totalAmount: '0.00',
            specialId: !this.$route.params.id ? 0 : this.$route.params.id,
            planned_id: !this.$route.query.planned_id ? 0 : this.$route.query.planned_id
        }
    },
    computed: {
        totalPrice: function () {
            return parseFloat(this.feedingInfo.finalPrice) + parseFloat(this.orderinfo.freightFee) + parseFloat(this.orderinfo.jryCost)
        },
        totalPriceFormat: function () {
            return parseFloat(this.totalPrice).toFixed(2).replace(/\d{1,3}(?=(\d{3})+(\.\d*)?$)/g, '$&,')
        },
        totalAmountes: function () {
            return parseFloat(this.feedingInfo.finalPrice) * parseInt(this.feedingInfo.availableNum)
        },
        totalAmountFormat: function () {
            return parseFloat(this.totalAmountes).toFixed(2).replace(/\d{1,3}(?=(\d{3})+(\.\d*)?$)/g, '$&,')
        },
        payAmount: function () {
            if (this.orderinfo.payIndex == 1) {
                return parseFloat(this.totalAmountes) * parseInt(this.spotDetail.margin_ratio) / 100
            } else {
                return this.totalAmountes;
            }
        },
        payAmountFormat: function () {
            return parseFloat(this.payAmount).toFixed(2).replace(/\d{1,3}(?=(\d{3})+(\.\d*)?$)/g, '$&,')
        },
    },
    methods: {
        //判断是否登录，没有跳转登录
        inLogin () {
            let userinfo = !getCookies('userinfor') ? '' : getCookies('userinfor')
            if (!userinfo) {
                this.$router.push('/login')
            }
        },
        //添加新的地址
        addNewAddress () {

        },
        //选择运费
        setFreight(i, row){

            if(i == -1){
					this.orderinfo.transportationMode = ''
					this.orderinfo.freightFee = 0
					this.currfreight = -1
				}else{
					this.orderinfo.transportationMode = row.transportation
					this.orderinfo.freightFee = row.freight_fee
					this.currfreight = i
				}


        },
        //选择运费
        setFreights(i, row){
            // this.currfreight = i
            // if(row){
            //     this.currfreightdata =row
            //     this.orderinfo.transportationMode = this.currfreightdata.transportationMode
            //     this.orderinfo.totalAmount = this.specialDetail.finalPrice * this.orderinfo.orderNum +  parseInt(this.currfreightdata.basePrice)
            // }else{
            //     this.currfreightdata = {}
            //     this.orderinfo.transportationMode = ''
            //     this.orderinfo.totalAmount = this.specialDetail.finalPrice * this.orderinfo.orderNum
            // }
            //选择运费

                this.orderinfo.transportationMode = row
                this.currfreight = i

        },
        //单选
        setAddress(i,row){
            this.orderinfo.addressId = row.id
            this.defaultAdd = row
            this.getFreight();
        },
        //选择承运商
        setCarrier(item){
            this.carrierId=item.id
        },
        //选择提货或者配置
        chooseDelieryType (index) {
          this.currentIndex = index
          // if(index==1){
          //     this.orderinfo.isDelivery = index
          //     this.getFreight();
          // }else{
          //     this.orderinfo.isDelivery = 0
          // }
          // this.setCosting();

          if (index == 1) {
            this.orderinfo.isDelivery = index
            this.currsetp = this.specialDetail.deliveryMin
          } else {
            this.orderinfo.isDelivery = 0
            this.currsetp = this.currMin
          }
          if (this.currMin <= this.currMax) {

          } else {
            this.showWarning("剩余库存(" + this.currMax + ")不满足当前交货方式的起订量(" + this.currMin + ")要求，请重新下单！", function () {
              window.location.href = '/special'
            })
          }
        },
        //资金
        async getMyCapital () {
            const res3=await capitalinfo(this, {})
            if(res3){
                this.capitalinfo = res3.data
            }
        },
        //基础数据
        async getSourceData() {
            let params = {
                feeding_id: this.specialId,
                planned_id:this.planned_id,
            }


            let res = await monthspecialDetail(this, params)
            if(res.status==200){
                    this.specialDetail = res.data
                     this.feedingInfo= this.specialDetail.feedingInfo
                    // this.currMax = Math.min(this.specialDetail.availableNum,this.feedingInfo.availableNum)
                    this.currMax =this.limitNum
                    
                    this.takeTheirTrans=this.feedingInfo.takeTheirTransportations.split(","); //字符分割
                    this.jryDays=this.feedingInfo.jryDays.split(","); //字符分割
            }

            console.log('jryDays',this.takeTheirTrans)
            this.setCosting()
            // this.getWeekDetail()
        },
        //获取周计划详情
        // async getWeekDetail() {
        //     console.log('11111',this.specialDetail.skuId)
        //     let data={
        //         skuId: this.specialDetail.skuId
        //     }
        //     const res = await getWeek(this, data)
        //     console.log('11111',res)
        //     if(res){
        //         this.WeekList = res.data
        //     }

        // },
        //创建订单
        async createOrder() {

            if(this.orderinfo.transportationModeTake == ''){
                    this.$Modal.warning({
                    title: '提示',
                    content: '请选择运输方式'
                });
                return false
            }
            let params = {
                plan_id:this.planned_id,
                feeding_id	:this.specialId,
                is_delivery	:this.orderinfo.isDelivery,
                address_id: this.orderinfo.addressId,
                transportation_mode:this.orderinfo.transportationMode,
                jry_days	:this.orderinfo.jryDays,
                order_num   :this.feedingInfo.availableNum
            }
            if(params.is_delivery == 0){
                params.transportation_mode = this.orderinfo.transportationModeTake
            }


            const res = await submitOrder(this, params)
            if (typeof res.data.errorcode == "undefined"){

                this.$router.push({name:'special-order-success', query:{id:res.data.id,orderNo:res.data.order_no}})

            }else{

                this.$Modal.warning({
                    title: '提示',
                    content: res.data.message
                });
            }
        },
        //获取地址
        async getMyAddress () {
            const res=await addressList(this, {})
            if(res){
                this.addressList = res.data
                this.addressList.forEach(element => {
                    if(element.defaultAddress ===1) {
                        this.orderinfo.addressId = element.id
                        this.defaultAdd = element
                    }
                });
            }
        },
        setJry() {
                console.log(this.orderinfo.jryDays)
				if (this.orderinfo.jryDays > 0) {
					this.orderinfo.jryCost = this.$store.state.common.sysConfig.JRY_COST * this.orderinfo.jryDays
				} else {
					this.orderinfo.jryCost = 0
				}
			},
        //获取物流费用
        async getFreight () {
            let data={
                sku_no: this.feedingInfo.skuNo,

                warehouse_id: this.feedingInfo.warehouseId,
                country_id: this.defaultAdd.countryId,
                state_id: this.defaultAdd.state,
                  city_id: this.defaultAdd.city,

                district_id: this.defaultAdd.district,

            }
            const res= await devDetail(this, data)
            if(res.data){

                this.carrierList = res.data.carriers

                 this.logisticsfreight = res.data.freightList

                this.currfreightdata = res.data[this.currfreight]
                if(this.currfreightdata){
                    this.orderinfo.transportationMode = this.currfreightdata.transportationMode
                    this.orderinfo.totalAmount = (this.specialDetail.finalPrice * feedingInfo.availableNum) + this.currfreightdata.basePrice
                }else{
                    this.orderinfo.transportationMode = ''
                    this.orderinfo.totalAmount = this.specialDetail.finalPrice * feedingInfo.availableNum
                }
            }
        },
        //计算费用
        setCosting () {
            if( this.orderinfo.isDelivery  === 1){
                //配送选择物流
                this.orderinfo.orderNum = Math.min(this.specialDetail.availableNum,this.feedingInfo.availableNum)
                this.currMax = Math.min(this.specialDetail.availableNum,this.feedingInfo.availableNum)
                if(this.specialDetail.deliveryDoubly > 0) {
                    this.currsetp = this.specialDetail.deliveryMin
                }else{
                    this.currsetp =  1
                }
                if(this.currfreightdata){
                    this.orderinfo.totalAmount = this.specialDetail.finalPrice * this.orderinfo.orderNum +  parseInt(this.currfreightdata.basePrice)
                }else{
                    this.orderinfo.totalAmount = this.specialDetail.finalPrice * this.orderinfo.orderNum
                }
                this.orderinfo.transportationMode = this.currfreightdata.transportationMode
                this.totalAmount = this.specialDetail.finalPrice * this.orderinfo.orderNum
            }else{
                //自提
                this.currMax = Math.min(this.specialDetail.availableNum,this.feedingInfo.availableNum)
                this.orderinfo.orderNum = Math.min(this.specialDetail.availableNum,this.feedingInfo.availableNum)
                if(this.specialDetail.takeTheirDoubly > 0) {
                    this.currsetp = this.specialDetail.takeTheirMin
                }else{
                    this.currsetp = 1
                }
                this.orderinfo.transportationMode = ''
                this.orderinfo.totalAmount = this.specialDetail.finalPrice * this.orderinfo.orderNum
                this.totalAmount = this.specialDetail.finalPrice * this.orderinfo.orderNum
            }
        },
        //选择订单数量
        changeNum(row){
            this.orderinfo.orderNum = row
            if( this.orderinfo.isDelivery  === 1){
                //配送选择物流
                if(this.currfreightdata){
                    this.orderinfo.totalAmount = this.specialDetail.finalPrice * this.orderinfo.orderNum + parseInt(this.currfreightdata.basePrice)
                }else{
                    this.orderinfo.totalAmount = this.specialDetail.finalPrice * this.orderinfo.orderNum
                }
                this.totalAmount = this.specialDetail.finalPrice * this.orderinfo.orderNum
            }else{
                //自提
                this.orderinfo.totalAmount = this.specialDetail.finalPrice * this.orderinfo.orderNum
                this.totalAmount = this.specialDetail.finalPrice * this.orderinfo.orderNum
            }
        },
        showWarning(msg, okCallback) {
            if (okCallback) {
                this.$Modal.warning({
                    title: '提示',
                    content: msg,
                    onOk: okCallback
                })
            } else {
                this.$Modal.warning({
                    title: '提示',
                    content: msg,
                })
            }

        }
    },
    mounted() {

        // this.$store.dispatch('special/monthspecialDetail', {feeding_id: this.specialId, planned_id:this.planned_id,})
        // console.log(this.$store.special.mapState.specialDetail)
        this.inLogin()
        this.getSourceData()
        this.getMyCapital()
        this.getMyAddress()



    },
    created() {

    },
    head() {
        return {
            title: '会员注册-巨正源',
            page: 10,
            meta: [{
                    name: 'viewport',
                    content: 'width=device-width, initial-scale=1'
                },
                {
                    name: 'keywords',
                    content: '化工, 交易, 会员注册'
                },
                {
                    hid: 'description',
                    name: 'description',
                    content: '会员注册巨正源-化工交易平台，提供丙烷脱氢,石化产品贸易、仓储服务、成品油运输服务'
                }
            ]
        }
    }
}
</script>
<style lang="css" scoped>
    body{overflow: auto;}
.ivu-checkbox-checked .ivu-checkbox-inner:after {font-size: 6px;}
.ivu-checkbox-wrapper {line-height: 17px;}
.ivu-radio-group-vertical .ivu-radio-wrapper {height: 32px;}
.ivu-radio {margin-bottom: 2px;}
</style>
