<template>
	<div class="body">
		<Header-small title="专料下单">
			<div slot="headerother">
				 <ul class="sp_cat_title_list">
                    <li class="curr"><i>1</i><p>编辑详细信息</p></li>
                    <li><i>2</i><p>提交订单成功</p></li>
                    <li><i>3</i><p>支付货款</p></li>
                    <li><i>4</i><p>支付完成</p></li>
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
                        <div class="gray">（您选择交货方式为配送，提交下单必须满足<span class="orangeFont">25</span>吨的倍数）</div>
                    </ul>
                    <div class="blueFont mr30 cp fs14" v-show="currentIndex" id="newAdd"  @click="Addaddress">新增收货地址</div>
                </div>
                <div class="AddList" v-if="this.orderinfo.isDelivery == 1">
                    <template v-if="addressList.length > 0">
                        <ul class="addListSelect ovh" >
                            <li v-for="(item,i) in addressList" :key="i" :class="item.defaultAddress == 1 ? 'curr' : ''">
                                <div class ='deliver_icon' v-if="item.defaultAddress == 1" >
                                    <i class ='deliver_icon'></i>
                                    配送至
                                </div>
                                <div v-else class="deliver_icon"> <span style="margin-left:79px;">&nbsp;</span></div>
                                <div  @click="Radio(i,item)">
                                    <RadioGroup v-model="vertical" >
                                        <Radio :label="item.id" >
                                            <span style="margin-left: 15px">{{item.name}}</span><span style="margin-left: 15px">{{item.phone}}</span><span style="margin-left: 15px">身份证：{{item.idNumber}}</span><span style="margin-left: 15px">{{item.stateName}} {{item.cityName}}{{item.districtName}}</span>
                                        </Radio>
                                    </RadioGroup>
                                </div>
                            </li>
                        </ul>
                    </template>
                    <template v-else><p>暂无任何收货地址，请您添加！</p></template>
                </div>
                <div class="lineborder"></div>
                <div class="mt30 fs16 ml15 fwb">余额支付</div>
                <ul class="DeliveryMethod ml35">
                    <li v-for="(item, index) in payList" :class="{'curr':index === payIndex}" :key="index">{{item.name}}</li>
                    <div class="ml10 fs14">可用余额：<span class="orangeFont">￥{{capitalinfo.remain_fund}}</span>元</div>
                    <a  class="licz" href="/help/9" style="cursor: pointer" target="_blank">查看充值方式</a>
                </ul>
                <div class="orderCzTip">
                    * 提交订单后当天17：00前完成付款，逾期扣除保证金
                </div>
                <div class="lineborder"></div>
                <div class="mt30 fs16 ml15 fwb" v-if="this.orderinfo.isDelivery == 1">运费</div>
                <ul class="DeliveryMethod ml35" v-if="this.orderinfo.isDelivery == 1">
                    <li v-for="(item, index) in extra" @click="Extra1(index,item)" :class="{'curr':index===extraIndex}" :key="index">
                        {{item.transportationMode}}({{item.basePrice}}元)
                    </li>
                </ul>
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
                    * 选择巨融易产品，提交订单后在有效期内付款完成，逾期将扣除保证金（例：距融易5天，2019-05-08 11:00:00提交订单，须在2019-05-13 17:00:00前完成付款）
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
                            <input-special :min="10" :max="1000" :step="10" v-model="orderinfo.orderNum" ></input-special>
                        </div>
                        <div  style="width: 12%;">东莞市</div>
                        <div class="fwb orangeFont" style="width: 9%;">{{this.totalAmount}}</div>
                    </li>
                </ul>

                <div class="proInfor">
                    <div  style="display: flex; flex-direction: column; width: 300px; " >
                        <div class="mt20 tar mr20 dflex " style="align-items: center;">
                            <span class="totalprice">应付总额：</span><span class="tar" style="width: 150px;">￥{{this.totalAmount}}</span>
                        </div>
                        <div class="mt20 mb20 tar mr20 dflexAlem">
                            <span class="totalprice">待付金额：</span><span class="fs18 orangeFont tar fwb" style="width: 150px;">￥{{this.totalAmount}}</span>
                        </div>
                    </div>
                </div>

                <div class="w1200 whitebg dflexAlem" style="font-size: 14px; margin: 30px; justify-content:flex-end; width:96.8%;">
                    <!-- <div class="mr15">待付金额：<span class="orangeFont"><span class="fwb fs18">{{this.totalAmount}}</span> 元</span></div> -->
                    <!-- <div class="submitOrder" style="background-color: #e0dede" v-if="Order==0">提交订单</div> -->
                    <div class="submitOrder">提交订单</div>
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
import { specialDetail, getWeek, submitOrder } from '../../../api/special'
import { capitalinfo } from '../../../api/capital'
import InputSpecial from '../../../components/input-special'
import { getCookies } from '../../../config/storage'
import { addressList, gainuserInfor } from '../../../api/users'
import { async } from 'q';

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
            store.dispatch('menu/getMenuList'),
            store.dispatch('system/getSystemCnf'),
        ])
    },
    
    data() {
        return {
            orderinfo: {
                isDelivery: 0,
                isPerDeposit: 0,
                isJryService: false,
                jryDays: 0,
                jryCost: '0.00',
                totalAmount: '0.00',
                depositAmount: '0.00',
                orderType: 4,
                sourceId: 0,
                feedingId: 0,
                transportationMode: '公路运输',
                orderNum: 10,
                addressId: 0
            },
            ServiceTimeList:[
                {
                    value:'5day',
                    timeSelect:'5天'
                },
                {
                    value:'3day',
                    timeSelect:'3天'
                },
                {
                    value:'1day',
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
    methods: {
        inLogin () {
            let userinfo = !getCookies('userinfor') ? '' : getCookies('userinfor')
            if (!userinfo) {
                this.$router.push('/login')
            }
        },
            //单选
        Radio(i,item){
            this.isactive= i;
            this.addrdetail= item;
            // this.Payextra();
        },
        Addaddress() {},
        chooseDelieryType (index) {
            this.currentIndex = index
            if(index==1){
                this.orderinfo.isDelivery = index
                // this.Payextra();
            }else{
                this.orderinfo.isDelivery = 0
                // this.methodName='自提'
                // this.amount=this.amount1
            }
        //    this.orderstatus()
        },
        async getMyCapital () {
            const res3=await capitalinfo(this, {})
            console.log('tag', '')
            if(res3){
                this.capitalinfo = res3.data
            }
        },
        async getSourceData() {
            let params = {
                id: this.specialId
            }
            const res = await specialDetail(this, params)
            this.specialDetail = res.data
            console.log(this.specialDetail)
        },
        //创建订单
        async createOrder() {
            let params = {
                ...this.orderinfo
            }
            const res = await submitOrder(this, params)
            if (res){
                //创建成功！
            }
        },
        //获取地址
        async getMyAddress () {
            const res=await addressList(this, {})
            console.log('res', res)
            if(res){
                this.addressList=res.data
            //     this.AddressNum=res.data.length
            //     this.addrdetail=res.data[0]
            //     if(this.addrdetail != ''){
            //         this.addr=1
            //     }else{
            //         this.addr=0
            //     }
            //     // this.Payextra();
            // }else{
            //     this.TipAddress='暂无收货地址，请新增收货地址'
            //     this.AddressNum=0
            }
        }

    },
    mounted() {  
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
.ivu-radio-group-vertical .ivu-radio-wrapper {
    height: 32px;
}
.ivu-radio {margin-bottom: 2px;}
</style>
