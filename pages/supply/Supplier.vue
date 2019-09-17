<template>
    <div class="clearfix  graybg">
        <div class="w1200 dflex " style="margin-bottom: 40px;">
            <supplynav></supplynav>
            <div class="memberInfor ml20  mt20"  style="background: white;">
                <div style='font-size: 16px;margin: 20px 10px 10px 10px;'>
                    优质货源需求
                </div>
                <div class="bodbottom" style="width: 8%; height: 2px;"></div>
                 <div class="" style="width: 95%; margin: 0 auto;">
                    <div class="order_operate">
                    <div class="dflex">
                        <input type="text" placeholder="居正源一号仓" name="receiptFull"  v-model='dispatchFull' class="orderInput" />
                        <i data-v-394040b0="" class="ivu-icon ivu-icon-md-arrow-round-forward"  style="font-size: 32px;"></i>
                         <input type="text" placeholder="请选择到达地" name=""   v-model='receiptFull' class="orderInput" />
                        <div class="check" @click='check()'>确定</div>
                    </div>
                   
                    </div>
                    <div class="TableTitle graybg"  >
                    <span style="width: 25%;">出发地</span>
                    <span style="width: 20%;">货物名称  </span>
                    <span style="width: 15%;">货物重量</span>
                    <span style="width: 20%;">装货时间</span>
                    <span style="width: 20%;">操作</span>
                    </div>
                    <table class="listT mt10" border="" cellspacing="" cellpadding="">
                        <tbody>
                            <tr class="detailTable" v-for="(item, index) in dataList" :key="index">
                                <td  style="width: 25%;">{{item.dispatchFullAddress}}
                                     <i data-v-394040b0="" class="ivu-icon ivu-icon-md-arrow-round-forward" style="font-size: 32px;"></i>
                                     {{item.receiptFullAddress}}
                                </td>
                                <td>{{item.freightGoods}}</td>
                                <td><span>{{item.weight}}</span>吨</td>                          
                                <td>{{item.demandBeginDate}}至{{item.demandEndDate}}</td>
                                <td class="operate">
                                <div class="check mt5 blackFont" style="margin-left:50px" v-if='item.isQuote==1'>已报价</div>
                                <div class="check mt5 blackFont" style="margin-left:50px" v-else @click="oldtime(item)">立即出价</div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <!--页码-->
                    <pages :total="total" :show-total="showTotal" @change="changePage" :value="current_page" style="margin-top:20px;"></pages>
                </div>
            </div>    
        </div>
         <Modal
          v-model="modal1"
          title="立即出价"
          @on-ok="delay"
          @on-cancel="cancelDelay">
            <Row>
                <span>吨数</span>：
              <Input v-model="weight" disabled='true' placeholder="Enter something..." style="width: 150px" />
            </Row>
            <Row style="    margin-top: 10px;">
                <span>价格</span>：
              <Input v-model="price" placeholder="立即出价" style="width: 150px" />
            </Row>
      </Modal>
            <!-- <payorder :isshow='payloading' :datalist='dataRow' @unChange="unPayOrder"></payorder> -->
    </div>
</template>

<script>
import { capitalinfo } from '../../api/capital'
import Navigation from '../../components/navigation'
import { getCookies } from '../../config/storage'
import { orderpage } from '../../api/order'
import config from '../../config/config'
import paydeposit from '../../components/paydeposit'
import { sendHttp } from "../../api/common";
import server from "../../config/api";
import pagination from '../../components/pagination'
export default {
    name: "index",
    layout:'membercenter',
    components:{
        pages: pagination.pages,
        supplynav: Navigation.supply,
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
            id:'',
            dataList: {},
            price:'',
            modal1:false,
            payloading: false,
            total_amount_format:'',
            freeze_amount_format:'',
            available_amount_format:'',
            dispatchFull:'',
            receiptFull:'',
            hotorderinfo: [],
            total: 0,
            total_fund:'',
            showtimeVal: '',
            userinfo: {},
            current_page:1,
            weight:'',
            page_size:10
        }
    },
    methods:{
        oldtime(row){
            this.modal1=true
            this.id=row.id
            this.weight=row.weight
        },
        delay(){
            let params={
                demandId:this.id,
                price:this.price
            }
            sendHttp(this, true, server.api.freightOffer.save, params,2).then(response => {
                    this.loading = false
                    this.$Notice.warning({
                      title: '报价成功',
                    })
                    this.getOrderList();
                  }).catch(err=>{
                    this.$Notice.warning({
                      title: '警告',
                      desc: err.response.data.message
                    })
                    this.loading = false
          })
        },
        bidder(){

        },
        showTotal(total) {
            return `全部 ${total} 条`;
        },
        changePage (row) {
                this.$router.push({name:'supply-Supplier',query:{page:row}})
        },
        check(){
               this.getOrderList()
        },
        isLogin () {
            let userinfo = !getCookies('userinfor') ? '' : getCookies('userinfor')
            if (!userinfo) {
                return false
            }
            this.userinfo = userinfo
            return true
        },
        async getOrderList(){
            let params=[]
            if(this.dispatchFull){
                params.dispatchFullAddress=this.dispatchFull
            }
            if(this.receiptFull){
                params.receiptFullAddress=this.receiptFull
            }     
            params.current_page=this.current_page,
            params.page_size=this.page_size,
          
            console.log(params)
            const res = await sendHttp(this, true, server.api.freight.freightList,params,2)
            console.log(res)
            this.dataList=res.data.items;
            this.total=res.data.total
        },
    },
    created(){
        if(this.isLogin()){
            this.getOrderList()
        }else{
            window.location.href = '/login'
        }
    }
}
</script>