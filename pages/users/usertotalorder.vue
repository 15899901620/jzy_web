<template>
    <div class="clearfix graybg">
        <div class="w1200 dflex " style="margin-bottom: 40px">
            <usernav></usernav>
            <div class="memberInfor ml20  whitebg bdccc  mt20">
                <!--个人信息-->
                <h1 class="fs16 ml25" style="margin-top:15px">全部订单</h1>
                <div class="TableList">
                    <div class="titleOrder mt15" >
                        <ul class="dflex">
                            <li v-for="(item,index) in orderTabs"  :class=" index === currTabs ? 'curr' : ''" :key="index" @click="setTabs(item.status)">{{item.name}}</li>
                            
                            <!-- <li>全部订单（2个）</li><li>已付款（0个）</li><li>待付款（2个）</li> -->
                        </ul>
                    </div>
                    <div class="order_operate">
                        <div class="dflex">
                            <input type="text" v-model="formSearch.orderNo" placeholder="输入订单号" name="" id="" value="" class="orderInput" style="width:140px;"/>
                            <input type="text" v-model="formSearch.skuName" placeholder="输入产品名称" name="" id="" value="" class="orderInput" style="width:140px; margin-left:5px;"/>
                            <div class="check" @click="onSearch">查询</div>
                        </div>
                        <!-- <div class="dflexAlem">
                        <span style="width: 90px;">起始日期</span><input type="text" class="layui-input" id="test6" placeholder="选择订单时间">
                        </div> -->
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
                    <template v-if="datalist.length > 0">
                        <table v-for="(item, index) in datalist" :key="index" class="listT mt10" border="" cellspacing="" cellpadding="">
                        <tbody>
                            <tr class="Ttitle graybg" >
                            <td colspan="7">
                                <span class="ml10">订单编号：<Tag color="success">{{getOrderType(item.orderType)}}</Tag>
                                    <router-link :to="{name:'users-order-datail-id', params:{id:item.id}}"  class="mt5 blackFont">
                                        <span class="blue">{{item.orderNo}}</span>
                                    </router-link>
                                </span>
                                <span class="ml15">下单时间：<span class="gray">{{item.createTime}}</span></span>
                                <span class="fr mr15" v-show="item.status == 2"><span class="red">最迟付款时间：</span> <span class="red">{{item.orderPayLastTime}}</span></span>
                            </td>
                            </tr>
                            <tr class="detailTable">

                            <td>{{item.skuNo}} {{item.skuName}}</td>
                            <td><span class="orangeFont">{{item.finalPriceFormat}}</span> <span style="color:#999">/吨</span></td>
                            <td>{{item.orderNum}}</td>
                            <td>{{item.warehouseName}}</td>
                            <td>
                                {{item.totalAmountFormat}}
                                <template v-if="item.depositId > 0"><br><Tag color="success">定</Tag>{{item.depositAmountFormat}}</template>
                            </td>
                            <td>
                                <span v-if="item.status == 3" class="greenFont" >{{getOrderState(item.status)}}</span>
                                <span v-else-if="item.status == 0" class="gray" >{{getOrderState(item.status)}}</span>
                                <span v-else class="orangeFont" >{{getOrderState(item.status)}}</span>
                            </td>
                            <td class="operate">
                                <div class="" v-if="item.status == 2">
                                    <a class="Paybtn mt15" @click="paymentBut(item)">去付款</a>
                                </div>
                                 <div class="" v-if="item.status == 3">
                                    <a class="greenFont mt15" @click="addLog(item)">添加货物需求</a>
                                </div>
                                <router-link :to="{name:'users-order-datail-id', params:{id:item.id}}"  class="mt5 blackFont">查看详情</router-link>
                            </td>
                            </tr>
                        </tbody>
                        </table>
                    </template>
                    <template v-else>
                        <p style="font-size:14px; text-align:center; width:100%;">暂无任何信息！</p>
                    </template>
                    <!--页码-->
                    <Page style="margin:20px auto; float:right;" :total="total" :current="current_page" @on-change="changePage" :page-size="page_size" @on-page-size-change="changePageSize" ></Page>
                </div>
            </div>
        </div>
        <payorder :isshow='payloading' :datalist='dataRow' @unChange="unPayOrder"></payorder>
           <address-dialog :isshow="addloading" @unChange="unaddChange" :datalist='addList'></address-dialog>
    </div>
</template>

<script>
import Navigation from '../../components/navigation'
import { orderpage } from '../../api/order'
import { getCookies } from '../../config/storage'
import pagination from '../../components/pagination'
import config from '../../config/config'
import paydeposit from '../../components/paydeposit'
import AddressDialog from '../../components/freight-add/freight-add'


export default {
    name: "usertotalorder",
    layout:'membercenter',
    components:{
        AddressDialog,
        usernav: Navigation.user,
        payorder: paydeposit.order
    },
    fetch({ store }) {
        return Promise.all([
            store.dispatch('system/getSystemCnf'),
            store.dispatch('menu/getMenuList')
        ])
    },
    data() {
        return {
            addloading:false,
            payloading: false,
            dataRow: {},
            addList:{},
            datalist: [],
            current_page: 1,
            page_size: 5,
            total: 0,
            orderTabs: [
                {value: 0, name:'全部订单', status: 1},
                {value: 0, name:'待付款', status: 2},
                {value: 0, name:'已付款', status: 3},
                {value: 0, name:'已取消', status: 0},
            ],
            currTabs: 0,
            formSearch: {
                orderType: '',
                status: '',
                orderNo: '',
                skuName: ''
            },
            userinfo: {}
        }
    },
    methods:{
        inLogin () {
            let userinfo = !getCookies('userinfor') ? '' : getCookies('userinfor')
            if (!userinfo) {
                this.$router.push('/login')
            }
            this.userinfo = userinfo
        },
        paymentBut(row){
            this.payloading = true
            this.dataRow = {
                ...row
            }
        },
        unPayOrder(row){
            this.payloading = row
            this.getSourceData()
        },
         addAddress(){
             
          this.addloading = true
        },
        unaddChange(res) {
        
            this.addloading = res
        },
        addLog(row){
            this.addList = {
                ...row
            }
            this.addloading = true
        },  
        setTabs(res){
            if(res == '1'){
                this.formSearch.status = ''
                this.currTabs = 0
            }else if(res == '2'){
                this.formSearch.status = 2
                this.currTabs = 1
            }else if(res == '3'){
                this.formSearch.status = 3
                this.currTabs = 2
            }else if(res == '0'){
                this.formSearch.status = '0'
                this.currTabs = 3
            }
            this.getSourceData()
        },
        //订单类型
        getOrderType(typeId) {
            if(!typeId) return
            return config.orderType[typeId].substring(0,1)
        },
        //订单状态
        getOrderState(typeId) {
            if(!typeId) return
            return config.orderState[typeId]
        },
        async getSourceData () {
            let params = {
                current_page: this.current_page,
                page_size: this.page_size,
                ...this.formSearch
            }
            const res= await orderpage(this, params)
            this.datalist = res.data.items
            this.total = res.data.total
        },
        onSearch () {
            this.current_page = 1
            this.page_size = 20
            this.getSourceData()
        },
        closeSearch () {
            this.current_page = 1
            this.page_size = 20
            this.getSourceData()
        },
        changePage (row) {
            this.current_page = row
            this.getSourceData()
        },
        changePageSize (row) {
            this.page_size = row
            this.getSourceData()
        }
    },
    created(){
        this.inLogin()
        this.getSourceData()
    },
    mounted(){
          var status=this.$route.query.status
          if(status==2){
              this.formSearch.status = 2
              this.currTabs = 1
          }
          
    },
    watch: {
        '$route' (to, from) {
            this.$router.go(0);
        }
    }
}
</script>