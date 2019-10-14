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
                        <li v-for="(item, index) in methodList" @click="chooseDelieryType(index)" :class="{'curr':index === currentIndex}" :key="index"><div style="background-color: #fff;">{{item.name}}</div></li>
                        <div class="gray">（您选择交货方式为配送，提交下单必须满足<span class="orangeFont">25</span>吨的倍数）</div>
                    </ul>
                    <div class="blueFont mr30 cp fs14" v-show="currentIndex" id="newAdd"  @click="addNewAddress">新增收货地址</div>
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
                <div class="mt30 fs16 ml15 fwb">余额支付</div>
                <ul class="DeliveryMethod ml35">
                    <li v-for="(item, index) in payList" :class="{'curr':index === payIndex}" :key="index">{{item.name}}</li>
                    <div class="ml10 fs14">可用余额：<span class="orangeFont">{{capitalinfo.available_amount_format}}</span>元</div>
                    <a  class="licz" href="/help/9" style="cursor: pointer" target="_blank">查看充值方式</a>
                </ul>
                <div class="orderCzTip">
                    * 提交订单后当天17：00前完成付款，逾期扣除保证金
                </div>
                <div class="lineborder"></div>
                <div class="mt30 fs16 ml15 fwb" v-if="this.orderinfo.isDelivery == 1">运费</div>
                <div class="ml35 fs14 mt10 dflexAlem" v-if="this.orderinfo.isDelivery == 1">
                    选择承运商
                    <div class="ml35" v-if="carrierList.length > 0">
                        <Select v-model="orderinfo.carrierId" size="default" style="width:300px">
                            <i-option v-for="(item, index) in carrierList" :value="item.id" :key="index" @click="setCarrier(item)">{{ item.name }}</i-option>
                        </Select>
                    </div>
                    <div class="ml20 orangeFont" v-else>* 此线路暂无货运承运商，请变更配送地址 或 货物选择自提</div>
                </div>
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
<!--                <ul class="DeliveryMethod ml35 mb20" v-if="this.orderinfo.isDelivery == 1">-->
<!--                    <template v-if="logisticsfreight.length > 0">-->
<!--                        <li v-for="(item, index) in logisticsfreight" @click="setFreight(index,item)" :class="{'curr':index === currfreight}" :key="index">-->
<!--                            {{item.transportationMode}}({{item.basePrice}}元)-->
<!--                        </li>-->
<!--                    </template>-->
<!--                    <template v-else>-->
<!--                        <p>暂无任何运费数据！</p>-->
<!--                    </template>-->
<!--                </ul>-->
                <div class="lineborder"></div>
                <!--优选服务-->
                <div class="mt30 fs16 ml15 fwb" id="test2">优选服务</div>
                <div class="ml35 fs14 mt10 dflexAlem">
                    <Checkbox v-model="orderinfo.isJryService">巨融易</Checkbox>
                    <div class="ml5">
                        <Select v-model="orderinfo.jryDays" size="small" style="width:100px">
                            <i-option v-for="(item, index) in ServiceTimeList" :value="item.value" :key="index">{{ item.timeSelect }}</i-option>
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
                    <span class="gray fs14">（ 最后全部提货完成时间<span class="orangeFont">{{specialDetail.endTime}}</span>，逾期增加<span class="orangeFont">0.01%</span>的仓储费 ）</span>
                </div>
                <ul class="orderPorList">
                    <li>
                        <span class="title" style="width: 12%;">编号</span>
                        <span class="title" style="width: 13%;">货物信息</span>
                        <span class="title" style="width: 12%;">单价（元/吨）</span>
                        <span class="title" style="width: 12%;">放料单可提吨数</span>
                        <span class="title" style="width: 12%;">周计划可提吨数</span>
                        <span class="title" style="width: 12%;">已提吨数</span>
                        <span class="title" style="width: 14%;">本次提货吨数</span>
                        <span class="title" style="width: 12%;">交货地</span>
                        <span class="title" style="width: 9%;">小计</span>
                    </li>
                    <li>
                        <div  style="width: 12%;">{{specialDetail.skuNo}}</div>
                        <div  style="width: 13%;">{{specialDetail.skuName}}</div>
                        <div  style="width: 12%;">{{specialDetail.finalPriceFormat}}</div>
                        <div  style="width: 12%;">{{specialDetail.availableNum}}</div>
                        <div  style="width: 12%;">{{specialDetail.weekCanDeliveryNum}}</div>
                        <div  style="width: 12%;">{{specialDetail.alreadyDeliveryNum}}</div>
                        <div  style="width: 14%;">
                            <input-special :min="currMin" :max="currMax" :step="currsetp" v-model="orderinfo.orderNum" @change="changeNum"></input-special>
                        </div>
                        <div  style="width: 12%;">{{specialDetail.warehouseName}}</div>
                        <div class="fwb orangeFont" style="width: 9%;">{{ this.totalAmountes }}</div>
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
import { specialDetail, getWeek, submitOrder, devDetail } from '../../../api/special'
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
                transportationMode: '',
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
            carrierList: [],
            carrierId:'',
            currfreight:"",
            WeekList: {},
            currfreightdata: {},
            defaultAdd:{},
            logisticsfreight: {},
            curraddress: 0,
            userinfo: !getCookies('userinfor') ? '' : getCookies('userinfor'),
            capitalinfo: {},
            specialDetail: {},
            addressList:[],
            currentIndex: 0,
            RegisterName: 'member',
            nowIndex: 0,
            index: 0,
            payIndex: 0,
            totalAmount: '0.00',
            specialId: !this.$route.params.id ? 0 : this.$route.params.id
        }
    },
    computed: {
        totalPrice: function () {
            return parseFloat(this.specialDetail.finalPrice) + parseFloat(this.orderinfo.freightFee) + parseFloat(this.orderinfo.jryCost)
        },
        totalPriceFormat: function () {
            return parseFloat(this.totalPrice).toFixed(2).replace(/\d{1,3}(?=(\d{3})+(\.\d*)?$)/g, '$&,')
        },
        totalAmountes: function () {
            return parseFloat(this.totalPrice) * parseInt(this.orderinfo.orderNum)
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

                this.orderinfo.transportationMode = row.transportation
                this.orderinfo.freightFee = row.freight_fee
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
            this.currMin = this.specialDetail.deliveryMin
            this.currsetp = this.specialDetail.deliveryMin
          } else {
            this.orderinfo.isDelivery = 0
            this.currMin = this.specialDetail.takeTheirMin
            this.currsetp = this.specialDetail.deliveryMin
          }
          if (this.currMin <= this.currMax) {
            this.orderinfo.orderNum = this.currMin
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
                id: this.specialId
            }
            const res = await specialDetail(this, params)
            this.specialDetail = res.data
            this.setCosting()
            this.getWeekDetail()
        },
        //获取周计划详情
        async getWeekDetail() {
            let data={
                skuId: this.specialDetail.skuId
            }
            const res = await getWeek(this, data)
            if(res){
                this.WeekList = res.data
            }
        },
        //创建订单
        async createOrder() {
            let params = {
                isDelivery: this.orderinfo.isDelivery,
                isPerDeposit: this.orderinfo.isPerDeposit,
                isJryService: this.orderinfo.isJryService == false ? 0 : 1,
                jryDays: this.orderinfo.jryDays,
                jryCost: this.orderinfo.jryCost,
                totalAmount: this.totalAmountes,
                depositAmount: this.orderinfo.depositAmount,
                orderType: this.orderinfo.orderType,
                sourceId: this.WeekList.id,
                feedingId: this.specialDetail.id,
                transportationMode: this.orderinfo.transportationMode,
                orderNum: this.orderinfo.orderNum,
                addressId: this.orderinfo.addressId,
                carrierId: this.carrierId
            }
            
            const res = await submitOrder(this, params)
            
            if (typeof res.data.errorcode == "undefined"){

                this.$router.push({name:'special-order-success', query:{id:res.data.id,orderNo:res.data.orderNo}})

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
        //获取物流费用
        async getFreight () {
            let data={
                countryId: this.defaultAdd.countryId,
                state: this.defaultAdd.state,
                city: this.defaultAdd.city,
                district: this.defaultAdd.district,
                warehouseId: this.specialDetail.warehouseId,
            }
            const res= await devDetail(this, data)
            if(res.data){
                
                this.carrierList = res.data.carriers

                 this.logisticsfreight = res.data.freightList

                this.currfreightdata = res.data[this.currfreight]
                if(this.currfreightdata){
                    this.orderinfo.transportationMode = this.currfreightdata.transportationMode
                    this.orderinfo.totalAmount = (this.specialDetail.finalPrice * this.orderinfo.orderNum) + this.currfreightdata.basePrice
                }else{
                    this.orderinfo.transportationMode = ''
                    this.orderinfo.totalAmount = this.specialDetail.finalPrice * this.orderinfo.orderNum
                }
            }
        },
        //计算费用
        setCosting () {
            if( this.orderinfo.isDelivery  === 1){
                //配送选择物流
                this.currMin = this.specialDetail.deliveryMin
                this.orderinfo.orderNum = this.specialDetail.deliveryMin
                this.currMax = this.specialDetail.maxCanDeliveryNum
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
                this.currMin = this.specialDetail.takeTheirMin
                this.currMax = this.specialDetail.maxCanDeliveryNum
                this.orderinfo.orderNum = this.specialDetail.takeTheirMin
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

    },
    created() {
        this.inLogin()
        this.getSourceData()
        this.getMyCapital()
        this.getMyAddress()
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
.ivu-checkbox-checked .ivu-checkbox-inner:after {font-size: 6px;}
.ivu-checkbox-wrapper {line-height: 17px;}
.ivu-radio-group-vertical .ivu-radio-wrapper {height: 32px;}
.ivu-radio {margin-bottom: 2px;}
</style>
