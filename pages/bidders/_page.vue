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
            <div class="acution" v-for="(m,index) in tabMain" v-show="CurrSelect==index" :key="index">
                <ul class="acuList" v-if="Auctionlist.length >0">
                    <li v-for="(items,index) in Auctionlist" :key="index">
                        <div class="acuProduct">
                            <h1>{{items.skuName}}</h1>
                            <div class="mt10 fs14 ">起拍价：<span class="orangeFont fwb fs16">{{items.minOrder}}{{items.basePrice}}</span></div>
                            <div class="mt10 fs14">数    量：{{items.totalNum}}{{items.uomName}}</div>
                            <div class="mt30 fs18">
                                开始时间：{{items.beginTime}}
                            </div>
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
                <ul class="acuList" v-else>
                    <li style="background: none; font-size: 20px;">{{AuctionTip}}</li>
                </ul>
            </div>
        </div>
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
            CurrSelect:0,
            current_page:'',
            page_size:'',
            NowTime:'',
            Auctionlist:'',
            AuctionTip:'暂无竞拍活动',
            tabMain: ['', '', ''],
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
        ])
    },
    components:{
        Header,
        Footer,
        pages: pagination.pages
    },
    computed:{
        ...mapState({
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

            let params={
                current_page:1,
                page_size:6,
                type: this.status
            }

            let res=await auctionPage(this,params)
      
            if(res.data.items){
                this.Auctionlist=res.data.items
            }else{
                this.AuctionTip='暂无竞拍活动'
            }

        },
        //跳转详情页
        BidersDetail(id){
            if(Cookies.get('userinfor') && Cookies.get('webtoken')){
                this.$router.push({name:'bidders-detail-id', params:{id:id}})
            }else {
            this.$Modal.confirm({
                title: '提示',
                content: '<p>您的登录已超时，请重新登录</p>',
                okText:'去登录',
                onOk: () => {
                this.$router.push({name:'login'});
                },

            });
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

</style>
