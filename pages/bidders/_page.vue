<template>
<div class="body">
    <Header title="头部"></Header>
    <div class="container" title="内容区块">
        <div class="materials_banner">
            <img src="/img/auctionBanner.png" />
        </div>
        <div class="w1200" style="margin-top: 20px">
            <div class="AuctionTime mt35">
                <ul>
                    <li v-for="(items,index) in AuctionTab" @click="AuctionList(items.status,index)" :class="{curr:CurrSelect == index}"  :key="index">
                        <div class="fs20">
                        {{items.AuctionName}}
                        </div>
                    </li>
                </ul>
            </div>
            <div class="acution" v-show="CurrSelect==0">
                <ul class="acuList" v-if="biddersbeingData.length >0">
                    <li v-for="(items,index) in biddersbeingData" :key="index">
                        <div class="acuProduct">
                            <h1 class=" fs18">{{items.skuNo}}-{{items.skuName}}</h1>
                            <div class="mt10 fs14">起拍价：<span class="orangeFont fwb fs16">{{items.finalPriceFormat}}</span></div>
                            <div class="mt10 fs14">数  量：{{items.totalNum}}{{items.uomName}}</div>
                            <div class="mt30 fs14">开始时间：{{items.beginTime}}</div>
                        </div>
                        <div class="acuOpear">
                            <div style="display: flex; flex-direction: column; justify-content: flex-end">
                                <span class="mt10 ">城市：{{items.warehouseName}}</span>
                                <span class="mt5">竞拍厂商：{{items.manufacturer}}</span>
                            </div>
                            <template v-if="items.type === 2">
                                <div class="btnStart startauction" @click="BidersDetail(items.id)">参与竞拍</div>
                            </template>
                            <template v-if="items.type === 1">
                                <div class="btnStart vcauction" @click="BidersDetail(items.id)">即将开始</div>
                            </template>
                            <template v-if="items.type === 3">
                                <div class="btnStart endauction" @click="BidersDetail(items.id)" >竞拍结束</div>
                            </template>
                        </div>
                    </li>
                </ul>
                <p v-else style="background: none; font-size: 20px;text-align: center; margin:80px auto;">
                    暂无任何信息！
                </p>
            </div>
            <div class="acution" v-show="CurrSelect==1" style="display:none">
                <ul class="acuList" v-if="bidderssoonData.length >0">
                    <li v-for="(items,index) in bidderssoonData" :key="index">
                        <div class="acuProduct">
                            <h1 class=" fs18">{{items.skuNo}}-{{items.skuName}}</h1>
                            <div class="mt10 fs14">起拍价：<span class="orangeFont fwb fs16">{{items.finalPriceFormat}}</span></div>
                            <div class="mt10 fs14">数  量：{{items.totalNum}}{{items.uomName}}</div>
                            <div class="mt30 fs14">开始时间：{{items.beginTime}}</div>
                        </div>
                        <div class="acuOpear">
                            <div style="display: flex; flex-direction: column; justify-content: flex-end">
                                <span class="mt10 ">城市：{{items.warehouseName}}</span>
                                <span class="mt5">竞拍厂商：{{items.manufacturer}}</span>
                            </div>
                            <template v-if="items.type === 2">
                                <div class="btnStart startauction" @click="BidersDetail(items.id)">参与竞拍</div>
                            </template>
                            <template v-if="items.type === 1">
                                <div class="btnStart vcauction" @click="BidersDetail(items.id)">即将开始</div>
                            </template>
                            <template v-if="items.type === 3">
                                <div class="btnStart endauction" @click="BidersDetail(items.id)" >竞拍结束</div>
                            </template>
                        </div>
                    </li>
                </ul>
                <p v-else style="background: none; font-size: 20px;text-align: center; margin:80px auto;">
                    暂无任何信息！
                </p>
            </div>
            <div class="acution" v-show="CurrSelect==2" style="display:none">
                <ul class="acuList" v-if="biddersendData.length >0">
                    <li v-for="(items,index) in biddersendData" :key="index">
                        <div class="acuProduct">
                            <h1 class=" fs18">{{items.skuNo}}-{{items.skuName}}</h1>
                            <div class="mt10 fs14">起拍价：<span class="orangeFont fwb fs16">{{items.finalPriceFormat}}</span></div>
                            <div class="mt10 fs14">数  量：{{items.totalNum}}{{items.uomName}}</div>
                            <div class="mt30 fs14">开始时间：{{items.beginTime}}</div>
                        </div>
                        <div class="acuOpear">
                            <div style="display: flex; flex-direction: column; justify-content: flex-end">
                                <span class="mt10 ">城市：{{items.warehouseName}}</span>
                                <span class="mt5">竞拍厂商：{{items.manufacturer}}</span>
                            </div>
                            <template v-if="items.type === 2">
                                <div  class="btnStart startauction"  @click="BidersDetail(items.id)">参与竞拍</div>
                            </template>
                            <template v-if="items.type === 1">
                                <div class="btnStart vcauction" @click="BidersDetail(items.id)">即将开始</div>
                            </template>
                            <template v-if="items.type === 3">
                                <div class="btnStart endauction" @click="BidersDetail(items.id)" >竞拍结束</div>
                            </template>
                        </div>
                    </li>
                </ul>
                <p v-else style="background: none; font-size: 20px;text-align: center; margin:80px auto;">
                    暂无任何信息！
                </p>
            </div>
        </div>

    <Modal
        v-model="loginInfo"
        title="提示"
        width='380px'
        @on-cancel="MoreCancel"
        :mask-closable="false"
        :styles="{top:'280px'}">
        <p slot="header" style="color:#333;text-align:left;font-size:16px">
            <Icon type="ios-information-circle"></Icon>
            <span>提示</span>
        </p>
        <p style="font-size:16px; line-height:32px; text-align:center; color:#666; ">您尚未登录巨正源，请你登录后在进行竞拍！</p>
        <div slot="footer" style="text-align:center;">
            <!-- <Button type="primary" size="large" @click="gotIt" >知道了</Button> -->
            <Button type="default" size="large" @click="goLogin" >去登录</Button>
        </div>
    </Modal>
        
    </div>
    <Footer size="default" title="底部" style="margin-top:18px;"></Footer>
</div>
</template>

<script>
import { mapState } from 'vuex'
import Header from '../../components/header'
import Footer from '../../components/footer'
import pagination from '../../components/pagination'
import {auctionPage} from '../../api/auction'
import Cookies from 'js-cookie'

export default {
    name: 'bidders',
    data() {
        return {
            loginInfo: false,
            CurrSelect:0,
            current_page:'',
            page_size:'',
            NowTime:'',
            Auctionlist:'',
            AuctionTip:'暂无竞拍活动',
            tabMain: ['1', '2', '3'],
            status: 2,
            index:0,
            AuctionTab:[
              {AuctionName:'正在竞拍', status:2},
              {AuctionName:'即将开始', status:1},
              {AuctionName:'竞拍结束', status:3},
            ]
        }
    },
    
    fetch({ store, params, query }) {
        return Promise.all([
            store.dispatch('menu/getMenuList'),
            store.dispatch('system/getSystemCnf'),
            store.dispatch('helper/getHelpCate', {parentId: 0,indexShow: 1}),
            store.dispatch('system/getLinksInfo'),
            store.dispatch('bidders/getBiddersList', {current_page:1,page_size:60})
        ])
    },
    components:{
        Header,
        Footer,
        pages: pagination.pages
    },
    computed:{
        ...mapState({
            biddersbeingData: state => state.bidders.biddersbeingData,
            bidderssoonData: state => state.bidders.bidderssoonData,
            biddersendData: state => state.bidders.biddersendData
        })
        
    },
    methods:{
        //竞拍列表
       
        async AuctionList(status,index){

            if(status){
                this.status = status
            }
            if(index){
                this.CurrSelect=index
            }else{
                this.CurrSelect=this.index
            }
        },
        MoreCancel () {
            this.loginInfo = false
        },
        gotIt () {
            this.loginInfo = false
        },
        goLogin () {
            this.loginInfo = false
            this.$router.push({name:'login'});
        },
        //跳转详情页
        BidersDetail(id){
            if(Cookies.get('userinfor') && Cookies.get('webtoken')){
                this.$router.push({name:'bidders-detail-id', params:{id:id}})
            }else {
                this.loginInfo = true
                // this.$Modal.confirm({
                //     title: '提示',
                //     content: '<p>您的登录已超时，请重新登录</p>',
                //     okText:'去登录',
                //     onOk: () => {
                //     this.$router.push({name:'login'});
                //     },

                // });
            }

        },
    },
    mounted(){
        this.AuctionList()
    },
    watch: {
        '$route' (to, from) {
            this.$router.go(0);
        }
    }
}
</script>

<style>
.ivu-modal-footer {
    border: 0px;
}
</style>
