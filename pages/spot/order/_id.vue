<template>
	<div class="body">
		<Header-small title="现货超市">
			<div slot="headerother">
				 <ul class="sp_cat_title_list">
                    <li class="curr"><i>1</i><p>编辑详细信息</p></li>
                    <li><i>2</i><p>提交订单成功</p></li>
                    <li><i>3</i><p>支付货款</p></li>
                    <li><i>4</i><p>下单完成</p></li>
                </ul>
			</div>
		</Header-small>
		<div class="container" title="内容区块">
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
                        <div class="gray">
                            <template v-if="this.orderinfo.isDelivery == 1">
                                （您选择交货方式为配送，配送起订量为<span class="orangeFont">{{spotDetail.delivery_min}}</span>吨<template v-if="spotDetail.delivery_doubly == 1">，且下单数量必须为<span class="orangeFont">{{spotDetail.delivery_min}}吨的倍数</span></template>）
                            </template>
                            <template v-else>
                                （您选择交货方式为自提，自提起订量为<span class="orangeFont">{{spotDetail.take_their_min}}</span>吨<template v-if="spotDetail.take_their_doubly == 1">，且下单数量必须为<span class="orangeFont">{{spotDetail.take_their_min}}吨的倍数</span></template>）
                            </template>
                        </div>
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
                <div class="mt30 fs16 ml15 fwb" v-if="this.orderinfo.isDelivery == 1">运费</div>
                <div class="ml35 fs14 mt10 dflexAlem" v-if="this.orderinfo.isDelivery == 1">
                    选择承运商
                    <div class="ml35" v-if="carrierList.length > 0">
                        <Select v-model="orderinfo.carrierId" size="default" style="width:300px">
                            <i-option v-for="(item, index) in carrierList" :value="item.id" :key="index">{{ item.name }}</i-option>
                        </Select>
                    </div>
                    <div class="ml20 orangeFont" v-else>* 此线路暂无货运承运商，请变更配送地址 或 货物选择自提</div>
                </div>
                <div class="ml35 fs14 mt10 dflexAlem" v-if="this.orderinfo.isDelivery == 1">
                    选择运输方式
                    <ul class="DeliveryMethod ml35 mb20">
                        <template v-if="logisticsfreight.length > 0">
                            <li v-for="(item, index) in logisticsfreight" @click="setFreight(index,item)" :class="{'curr':index === currfreight}" :key="index">
                                {{item.transportation}}({{item.freight_fee}}元/吨)
                            </li>
                        </template>
                        <template v-else>
                            <p>此线路暂无任何运输方式数据，请变更配送地址 或 货物选择自提！</p>
                        </template>
                    </ul>
                </div>

                <div class="lineborder"></div>
                <div class="mt30 fs16 ml15 fwb">余额支付</div>
                <ul class="DeliveryMethod ml35">
                    <li v-for="(item, index) in payList" @click="choosePayType(index)" :class="{'curr':index === orderinfo.payIndex}" :key="index">{{item.name}}</li>
                    <div class="ml10 fs14">可用余额：<span class="orangeFont">{{capitalinfo.available_amount_format}}</span></div>
                    <a class="licz" href="/help/9" style="cursor: pointer" target="_blank">查看充值方式</a>
                </ul>
                <div class="orderCzTip" v-if="this.orderinfo.payIndex == 1">
                    <template v-if="systeminfo.SPOT_PAYMENT_TIME == 1">* 如仅支付保证金，在提交订单后当天{{systeminfo.CLOSED_TIME}}前完成付款，逾期将扣除保证金</template>
                    <template v-if="systeminfo.SPOT_PAYMENT_TIME == 2">* 如仅支付保证金，在提交订单后30分钟内完成付款，逾期扣除保证金</template>
                    <template v-if="systeminfo.SPOT_PAYMENT_TIME == 3">* 如仅支付保证金，在提交订单后60分钟内完成付款，逾期扣除保证金</template>
                </div>

                <!--优选服务-->
                <div class="mt30 fs16 ml15 fwb" id="test2" v-if="orderinfo.payIndex==1">优选服务</div>
                <div class="ml35 fs14 mt10 dflexAlem" v-if="orderinfo.payIndex==1">
                    巨融易
                    <div class="ml5">
                        <Select v-model="orderinfo.jryDays" clearable @on-change="setJry" style="width:200px" placeholder="需要请选择">
                            <i-option v-for="(item, index) in ServiceTimeList" :value="item.value" :key="index">{{ item.timeSelect }}</i-option>
                        </Select>
                    </div>
                    <div class="ml20 orangeFont">* 费率=天数*吨数*{{systeminfo.JRY_COST}}元</div>
                </div>
                <div class="orderCzTip" v-if="orderinfo.payIndex==1">
                    * 选择巨融易产品，提交订单后必须在有效期内支付尾款完成，逾期将扣除保证金。<br/>
                    （例：选择使用巨融易 5 天，在2019-05-08 11:00:00提交订单，必须在2019-05-13 {{systeminfo.CLOSED_TIME}}:00前完成尾款付款）
                </div>
                <div class="lineborder" v-if="orderinfo.payIndex==1"></div>
                <!-- 商品信息 -->
                <div class="mt30 fs16 ml15" id="test1">
                    <span class="fwb">商品信息</span>
                </div>
                <ul class="orderPorList">
                    <li>
                        <span class="title" style="width: 13%;">货物信息</span>
                        <span class="title" style="width: 12%;">交货仓</span>
                        <span class="title" style="width: 12%;">单价（元/吨）</span>
                        <span class="title" style="width: 12%;">运费</span>
                        <span class="title" style="width: 12%;">巨融易</span>
                        <span class="title" style="width: 12%;">合计单价（元/吨）</span>
                        <span class="title" style="width: 14%;">数量（吨）</span>
                        <span class="title" style="width: 9%;">小计</span>
                    </li>
                    <li>
                        <div style="width: 13%;">{{spotDetail.sku_name}}</div>
                        <div  style="width: 12%;">{{spotDetail.warehouse_name}}</div>
                        <div style="width: 12%;">{{spotDetail.finalPriceFormat}}</div>
                        <div style="width: 12%;">+ {{this.orderinfo.freightFee}}元/吨</div>
                        <div style="width: 12%;">+ {{this.orderinfo.jryCost}}元/吨</div>
                        <div style="width: 12%;"> ￥{{this.totalPriceFormat}}</div>
                        <div style="width: 14%;">
                            <input-special :min="currMin" :max="currMax" :step="currsetp" v-model="orderinfo.orderNum" @change="changeNum"></input-special>
                        </div>
                        <div class="fwb orangeFont" style="width: 9%;">￥{{ this.totalAmountFormat }}</div>
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
                    <div class="submitOrder" @click='beginCreateOrder'>提交订单</div>
                </div>
            </div>
		</div>
		<Footer size="small" title="底部" style="margin-top:18px;"></Footer>
        <address-dialog :isshow="addAddressLoading" @unChange="unaddAddressChange"></address-dialog>
        <payorder :isshow='payModalShow' :datalist='payData' :title="payModalTitle" @unChange="unPayOrder" @payedChange="PayedOrder"></payorder>
	</div>
</template>

<script>
import { mapState } from 'vuex'
import Header from '../../../components/header'
import Footer from '../../../components/footer'
import { spotDetail, submitOrder, getFreightList } from '../../../api/spot'
import { capitalinfo } from '../../../api/capital'
import InputSpecial from '../../../components/input-special'
import { getCookies } from '../../../config/storage'
import { addressList, gainuserInfor } from '../../../api/users'
import AddressDialog from '../../../components/address-dialog'
import paydeposit from '../../../components/paydeposit'

export default {
    name: "spot-order-id",
    components: {
        HeaderSmall: Header.small,
        Footer,
        InputSpecial,
        AddressDialog,
        payorder: paydeposit.order
    },
    fetch({
        store,
        params
    }) {
        return Promise.all([
            store.dispatch('menu/getMenuList'),
            store.dispatch('system/getSystemCnf'),
        ])
    },
    computed: {
        ...mapState({
            systeminfo: state => state.system.systeminfo,
        }),
        totalPrice: function(){
            return parseFloat(this.spotDetail.final_price) + parseFloat(this.orderinfo.freightFee) + parseFloat(this.orderinfo.jryCost)
        },
        totalPriceFormat: function(){
            return parseFloat(this.totalPrice).toFixed(2).replace(/\d{1,3}(?=(\d{3})+(\.\d*)?$)/g,'$&,')
        },
        totalAmount: function(){
            return parseFloat(this.totalPrice) * parseInt(this.orderinfo.orderNum)
        },
        totalAmountFormat: function(){
            return parseFloat(this.totalAmount).toFixed(2).replace(/\d{1,3}(?=(\d{3})+(\.\d*)?$)/g,'$&,')
        },
        payAmount: function(){
            if(this.orderinfo.payIndex == 1){
                return parseFloat(this.totalAmount) * parseInt(this.spotDetail.margin_ratio) / 100
            }else{
                return this.totalAmount;
            }
        },
        payAmountFormat: function(){
            return parseFloat(this.payAmount).toFixed(2).replace(/\d{1,3}(?=(\d{3})+(\.\d*)?$)/g,'$&,')
        },
    },
    
    data() {
        return {
            addAddressLoading: false,
            payModalShow: false,
            payModalTitle: '支付全款',
            payData: {

            },
            orderinfo: {
                spot_id : 0,
                isDelivery: 0,
                addressId: 0,
                carrierId: 0,
                transportationMode: '',
                payIndex: 0,
                jryDays: 0,
                orderNum: 0,

                freightFee: 0,
                jryCost: '0.00',
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
                {value:2, name:'支付保证金'},
            ],
            carrierList:[],
            carrierListDesc: '',
            currentIndex: 0,
            currfreight: -1,
            currfreightdata: {},
            defaultAdd:{},
            logisticsfreight: {},
            curraddress: 0,
            userinfo: !getCookies('userinfor') ? '' : getCookies('userinfor'),
            capitalinfo: {},
            spotDetail: {},
            addressList:[],

            RegisterName: 'member',
            nowIndex: 0,
            index: 0,

            spotId: !this.$route.params.id ? 0 : this.$route.params.id
        }
    },
    methods: {
        //判断是否登录，没有跳转登录
        inLogin () {
            let userinfo = !getCookies('userinfor') ? '' : getCookies('userinfor')
            if (!userinfo) {
                this.$router.push('/login')
            }
        },
        //基础数据
        async getSpotData() {
            let params = {
                id: this.spotId
            }
            const res = await spotDetail(this, params)
            if(res.data == ''){
                //记录异常
                window.location.href = '/spot'
            }
            this.spotDetail = res.data
            this.orderinfo.spot_id = this.spotDetail.id,

            this.currMin = this.spotDetail.take_their_min
            this.currMax = this.spotDetail.available_num
            this.currsetp = this.spotDetail.take_their_doubly == 1 ? this.spotDetail.take_their_min : 1
            if(this.currMin < this.currMax){
                this.orderinfo.orderNum = this.currMin
            }

        },
        //资金
        async getMyCapital () {
            const res3=await capitalinfo(this, {})
            if(res3){
                this.capitalinfo = res3.data
            }
        },
        //选择提货或者配置
        chooseDelieryType (index) {
            this.currentIndex = index
            if(index==1){
                this.orderinfo.isDelivery = index
                this.currMin = this.spotDetail.delivery_min
                this.currsetp = this.spotDetail.delivery_doubly == 1 ? this.spotDetail.delivery_min : 1
                if(this.currMin < this.currMax){
                    this.orderinfo.orderNum = this.currMin
                }
            }else{
                this.orderinfo.isDelivery = 0
                this.currMin = this.spotDetail.take_their_min
                this.currsetp = this.spotDetail.take_their_doubly == 1 ? this.spotDetail.take_their_min : 1
                if(this.currMin < this.currMax){
                    this.orderinfo.orderNum = this.currMin
                }
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
                        this.setAddress(0, element)
                    }
                });
            }
        },
        //添加新的地址
        addNewAddress () {
            this.addAddressLoading = true
        },
        unaddAddressChange(res) {
            this.addAddressLoading = res
            this.getMyAddress()
        },
        //单选
        setAddress(i,row){
            this.orderinfo.addressId = row.id
            this.defaultAdd = row
            this.getFreight();
        },
        //获取物流费用
        async getFreight () {
            let data = {
                sku_id: this.spotDetail.sku_id,
                warehouse_id: this.spotDetail.warehouse_id,
                country_id: this.defaultAdd.countryId,
                state_id: this.defaultAdd.state,
                city_id: this.defaultAdd.city,
                district_id: this.defaultAdd.district,
            }
            const res=await getFreightList(this, data)
            if(res.data){
                this.carrierList = res.data.carriers

                this.logisticsfreight = res.data.freightList
                this.orderinfo.transportationMode = 0
                this.orderinfo.freightFee = 0
            }
        },
        //选择运费
        setFreight(i, row){
            this.orderinfo.transportationMode = row.transportation
            this.orderinfo.freightFee = row.freight_fee
            this.currfreight = i
        },
        choosePayType(index){
            this.orderinfo.payIndex = index
        },
        //选择巨融易
        setJry(value){
            if(this.orderinfo.jryDays > 0){
                this.orderinfo.jryCost = this.systeminfo.JRY_COST * this.orderinfo.jryDays

            }else{
                this.orderinfo.jryCost = 0
            }
        },
        //选择订单数量
        changeNum(value){
            this.orderinfo.orderNum = value
        },
        //开始订单
        beginCreateOrder(value){
            let params = {
                spot_id : this.orderinfo.spot_id ,
                isDelivery : this.orderinfo.isDelivery ,
                addressId : this.orderinfo.addressId ,
                carrierId : this.orderinfo.carrierId ,
                transportationMode : this.orderinfo.transportationMode ,
                payIndex : this.orderinfo.payIndex ,
                jryDays : this.orderinfo.jryDays ,
                orderNum : this.orderinfo.orderNum
            }
            if(params.isDelivery == 1 && params.addressId == 0){
                this.showWarning('配送请维护选择收货地址！');
                return ;
            }
            if(params.isDelivery == 1 && params.carrierId == 0){
                this.showWarning('配送承运商不能为空！');
                return ;
            }
            if(params.isDelivery == 1 && params.transportationMode == 0){
                this.showWarning('配送运输方式不能为空！');
                return ;
            }
            if(params.orderNum <= 0){
                this.showWarning('下单数量不能为0！');
                return ;
            }
            this.payData = {
                skuNo: this.spotDetail.sku_no,
                skuName: this.spotDetail.sku_name,
                orderNum: params.orderNum,
                totalAmount: this.payAmount,
            }
            if(params.payIndex == 1){
                this.payModalTitle = '支付保证金'
            }else{
                this.payModalTitle = '支付全款'
            }

            this.showPayment()
        },
        showPayment(row){
            this.payModalShow = true

        },
        unPayOrder(row){
            this.payModalShow = row
        },
        PayedOrder(){
            this.payModalShow = false
            this.createOrder()
        },
        //提交订单
        async createOrder() {
            let params = {
                spot_id : this.orderinfo.spot_id ,
                is_delivery : this.orderinfo.isDelivery ,
                address_id : this.orderinfo.addressId ,
                carrier_id : this.orderinfo.carrierId ,
                transportation_mode : this.orderinfo.transportationMode ,
                is_pay_deposit : this.orderinfo.payIndex ,
                jry_days : this.orderinfo.jryDays ,
                order_num : this.orderinfo.orderNum
            }
            const res = await submitOrder(this, params)
            if (typeof res.data.errorcode == "undefined"){
                this.$router.push({name:'spot-order-success', query:{id:res.data.id,orderNo:res.data.orderNo}})
            }else{
                this.$Modal.warning({
                    title: '提示',
                    content: res.data.message
                });
            }
        },
        showWarning(msg){
            this.$Modal.warning({
                title: '提示',
                content: msg
            });
        }
    },
    mounted() {  
     
    },
    created() {
        this.inLogin()
        this.getSpotData()
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
.ivu-radio-group-vertical .ivu-radio-wrapper {
    height: 32px;
}
.ivu-radio {margin-bottom: 2px;}
</style>
