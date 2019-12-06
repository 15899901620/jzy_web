<template>
    <div class="body">
        <Header title=""></Header>
        <div class="container">
            <div class="w1200">
                <div class="breadcrumb">
                    <breadcrumb>
                        <breadcrumb-item><i type="home"></i><nuxt-link to="/">巨正源</nuxt-link></breadcrumb-item>
                        <breadcrumb-item><nuxt-link :to="{name:'special-page'}">专场专料</nuxt-link></breadcrumb-item><breadcrumb-item>{{$route.query.name}}</breadcrumb-item>
                    </breadcrumb>
                </div>

<!--                <div class="screenList">-->
<!--                    &lt;!&ndash;原料分类&ndash;&gt;-->
<!--                    <div class="screenibre">-->
<!--                        <dl class="fl filter_item">-->
<!--                            <dt class="scTitle">原料分类：</dt>-->
<!--                            <dd class="pro_brand_list" :class="categoryMore ? 'h50' : ''">-->
<!--                                <a  @click="categoryClick()" :class="CateCurr === 'select'?'lightfont':''">显示全部</a>-->
<!--                                <a v-for="(item, index) in $store.state.spot.condition.category" :key="index" :class="IndexCurr === item.id?'lightfont':''"-->
<!--                                   @click="categoryClick(item.id,index)" >-->
<!--                                    {{item.name}}-->
<!--                                </a>-->
<!--                            </dd>-->
<!--                        </dl>-->
<!--                        <div class="fr pro_m_select" :class="categoryMore ? '' : 'arrow-up'" @click="categoryOpen">-->
<!--                            {{categoryMoreVal}}-->
<!--                        </div>-->
<!--                    </div>-->
<!--                    &lt;!&ndash;加工级别&ndash;&gt;-->
<!--                    <div class="screenibre">-->
<!--                        <dl class="fl filter_item">-->
<!--                            <dt class="scTitle">加工级别：</dt>-->
<!--                            <dd class="pro_brand_list" :class="processMore ? 'h50' : ''">-->
<!--                                <a  @click="processClick()" :class="TotalCurr === 'select'?'lightfont':''">显示全部</a>-->
<!--                                <a v-for="(item, index) in $store.state.spot.condition.process" :key="index" :class="processCurr === item.id ?'lightfont':''"-->
<!--                                   @click="processClick(item.id,index)">-->
<!--                                    {{item.name}}-->
<!--                                </a>-->
<!--                            </dd>-->
<!--                        </dl>-->
<!--                        <div class="fr pro_m_select" :class="processMore ? '' : 'arrow-up'" @click="processOpen">-->
<!--                            {{processMoreVal}}-->
<!--                        </div>-->
<!--                    </div>-->
<!--                    <div class="XHsearch" style="display: flex;">-->
<!--                        <span>厂商</span><input type="text" v-model="manufacturer" class="XHsearchInput" placeholder="请输入厂商"/>-->
<!--                        <span class="ml15">牌号</span><input type="text" v-model="skuName" class="XHsearchInput" placeholder="请输入牌号"/>-->
<!--                        <div v-if="$store.state.memberToken" class="ml20">-->
<!--                            <input type="text" v-model="minPrice" class="priceInput" placeholder="￥最低价"/>- -->
<!--                            <input type="text" v-model="maxPrice" class="priceInput" placeholder="￥最高价"/>-->
<!--                        </div>-->
<!--                        <div class="xhBtn" @click="spotData">搜索</div>-->
<!--                    </div>-->
<!--                </div>-->
                <!--现货列表-->
                <div class="mt20">
                    <div class="XhlistTitle">
                        <span style="width:  16%;">牌号</span>
                        <span style="width:  12%;">厂商</span>
                        <span style="width:  10%;">交货仓</span>
                        <span style="width:  7%;">包装方式</span>
                        <span style="width:  9%;">剩余数量（吨）</span>
                        <span style="width:  11%;">单价（元/吨）</span>
                        <span style="width:  18%;">合约完成量</span>
                        <span style="width:  9%;">距下架时间</span>
                        <span style="width:  8%;">操作</span>
                    </div>
                    <ul class="Xhlist">
                        <template v-if="$store.state.special.spotList.length>0 &&  this.$route.query.id !=''">

                            <li v-for="(item, index) in $store.state.special.spotList"  :key="index"  >

                    <span style="width: 16%;">{{item.skuName}}</span>
                    <span style="width: 12%;white-space:nowrap;text-overflow:ellipsis;word-break:keep-all;overflow: hidden;">{{item.manufacturer}}</span>
                    <span :title="item.warehouseName" style="width: 10%; overflow: hidden;text-overflow: ellipsis; white-space: nowrap; cursor: default;">{{item.warehouseName}}</span>

                    <span style="width: 7%;" v-if='item.packing_modes=="1"'>标准包装</span>
                    <span style="width: 7%;" v-else>非标准包装</span>
                    <span style="width: 9%; display: flex; justify-content: center; align-items: center; position: relative">
                  <span style="position: relative">{{item.availableNum}}</span>
                </span>
                <span class="orangeFont"  style="width: 11%;position:relative;padding-right:18px;">
                     <span style="position: relative">
                         {{$utils.amountFormat(item.finalPrice)}}
                         <i v-if="item.isJry"  style="width: 15px; height: 18px; position: absolute; top: -10px; right: -15px; background:url('/img/Yi_icon.png')no-repeat;"></i>
                     </span>
                </span>
                 <span style="width: 18%;" :title="`合约量：${item.plan_total_num}，待转单：${item.plan_available_num}`">
                    <template v-if="item.plan_total_num==0 && item.plan_available_num==0 " >
                             <Progress :percent="0" :stroke-width="20"/>
                    </template>
                     <template v-else>
                            <Progress :percent="((item.plan_total_num - item.plan_available_num)*100/item.plan_total_num).toFixed(2)" :stroke-width="20"/>
                    </template>
                
                </span>                
                <span style="width: 9%;">
                  <TimeDown :endTime="item.validTime" endMsg="已结束" :onTimeOver="reloadPage"></TimeDown>
                </span>
                <span style="width: 8%;">
                   <div v-if="$store.state.memberToken &&  item.onSale != 1"
                      style="color:#c3c3c3;background:#e7e7e7;cursor:default;width:50px;line-height:26px;margin:0 auto;border-radius:3px;">下单</div>
                  <div v-else-if="$store.state.memberToken && item.availableNum > 0" class="ListBtn"
                       @click="addOrder(item.id,item.planned_id)">下单</div>
                  <div v-else class="ListBtn" @click="toLogin">登录</div>
                </span>
                            </li>
                        </template>
                        <template v-else>
                            <li style="overflow:hidden; height: 235px;">
                                <p style="width:100%; text-align:center">
                                    <img src="../../../static/img/Nothing.png"/>
                                </p>
                            </li>
                        </template>
                    </ul>
                    <div class="whitebg ovh text-xs-center" style="padding: 30px 0" v-if="$store.state.spot.spotList.length > 0">
                        <pages :total="$store.state.spot.total" :pageSize="page_size" :show-total="showTotal" :value="current_page"
                               :otherParams="`id=${this.$route.query.id}`" ></pages>
                    </div>
                </div>
            </div>
        </div>
        <Modal
            title="选择放料"
            v-model="selectFeedingModalShow"
            @on-cancel="selectFeedingModalCancel"
            :width='700'
            class-name="vertical-center-modal">
          <div class="">
            <Table size="small" border stripe highlight-row :columns="selectFeedingColumns" :data="selectFeedingData" :content="self" >
              <template slot-scope="{ row, index }" slot="action">
                <Button type="primary" size="small" v-if="row.availableNum>0" @click="toCreateOrder(row.id, curr_plan_id)">下单</Button>
                <Button type="primary" size="small" v-else  disabled>下单</Button>
              </template>
            </Table>
          </div>
          <div slot="footer">
          </div>
        </Modal>
        <Footer size="default" title="底部" style="margin-top:18px;"></Footer>
    </div>
</template>

<script>
    import Header from '../../../components/header'
    import Footer from '../../../components/footer'
    import pagination from '../../../components/pagination'
    import TimeDown from '../../../components/timeDown'
    import server from "../../../config/api"
    import {sendHttp} from "../../../api/common"
    export default {
        name: "spot",
        fetch({store, params, query}) {
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
                //获取筛选条件
                store.dispatch('spot/getFilterConditonData'),
                //获取报价
                store.dispatch('special/getSpotList', {
                        current_page: query.page || 1,
                        page_size: 6,
                        catId: query.id || 0,

                    }
                ),
            ])
        },
        components: {
            Header,
            Footer,
            pages: pagination.pages,
            TimeDown
        },
        data() {
            return {
                selectRecordID: 0,
                checkTypeShow: false,
                current_page: parseInt(this.$route.query.page) || 1,
                page_size: 6,
                id: this.$route.query.id || '',
                processId: this.$route.query.level_id || '',
                skuName: this.$route.query.keyword || '',
                manufacturer: '',
                minPrice: '',
                maxPrice: '',
                categoryMore: true,
                selectFeedingModalShow:false,
                processMore: true,
                categoryMoreVal: '更多',
                processMoreVal: '更多',
                IndexCurr: Number(this.$route.query.category_id) || '',  //列表当前高亮
                CateCurr: Number(this.$route.query.category_id) || 'select',
                categoryindex:'',
                processCurr: Number(this.$route.query.level_id) || '',
                TotalCurr:Number(this.$route.query.level_id) || 'select',
                specialList:[
                ],
                 selectFeedingColumns: [
                    { title: '商品名称', key: 'skuName' },
                    { title: '放料编号', key: 'feedingNo'},
                    {title: '仓库', key: 'warehouseName'},
                    { title: '放料单剩余数量', key: 'availableNum'},
                    { title: '会员可下单数量', key: 'member_available_num'},
                    {title: '操作',slot: 'action',
                        key: 'action'
                    }
			    ],
                sopdata:[],
            }
        },
        computed: {
        },
        methods: {
        async addOrder(id,planned_id){
            this.curr_plan_id = planned_id
			let params = {
				planned_id: planned_id
			}
            let res = await this.$utils.sendCurl(this, server.api.special.saleListByPlan, params)
            console.log(res)
                if(res.status === 200 && res.data){
                    if(res.data.length == 0){
                                this.$utils.showWarning(this, '放料信息已改变，请刷新再操作！', function(){
                                    location.reload(true)
                    })
                    return
                }
				if(res.data.length >= 1){
					//显示放料选择窗口
					this.selectFeedingData = res.data
                    this.selectFeedingModalShow = true
                    console.log(this.selectFeedingModalShow)
                    return
				}
			}
        },
        toCreateOrder(feeding_id, planned_id){
             this.$router.push({name:'special-order-id',params:{id:feeding_id,planned_id:planned_id}})
		},
            categoryClick(id,index) {
                this.categoryId=id
                this.IndexCurr=id
                if(id === undefined){
                    this.CateCurr = 'select'
                }else{
                    this.CateCurr = id
                }
                this.spotData()
            },
            processClick(id,index) {
                this.processId = id
                this.processCurr = id
                if(id === undefined){
                    this.TotalCurr = 'select'
                }else{
                    this.TotalCurr = id
                }
                this.spotData()
            },
            categoryOpen() {
                this.categoryMore = !this.categoryMore;
                if (this.categoryMore) {
                    this.categoryMoreVal = "更多"
                } else {
                    this.categoryMoreVal = "收回"
                }
            },
            processOpen() {
                this.processMore = !this.processMore
                if (this.processMore) {
                    this.processMoreVal = "更多"
                } else {
                    this.processMoreVal = "收回"
                }
            },
            showTotal(total) {
                return `全部 ${total} 条`;
            },
            reloadPage() {
                location.reload()
            },
            async spotData() {
                let params = {
                    catId: this.id,
                    current_page: this.current_page,
                    page_size: this.page_size
                };
                this.$store.dispatch('spot/getSpotList', params)
            },
            checkTypeCancel(){
                this.checkTypeShow = false
            },
			toCreateOrder(feeding_id, planned_id){
		    	this.$router.push({name:'special-order-id',params:{id:feeding_id,planned_id:planned_id}})
			},
            toLogin(){
                location.href = '/login'
            }
        },
        created() {
        },
        mounted() {

        },
        watch: {

            '$route'(to, from) {
                this.$router.go(0);
            }
        },
        head() {
            return {
                title: '巨正源-化工交易平台',
                page: 10,
                meta: [
                    {name: 'viewport', content: 'width=device-width, initial-scale=1'},
                    {name: 'keywords', content: '化工, 交易, 丙烷脱氢'},
                    {hid: 'description', name: 'description', content: '巨正源-化工交易平台，提供丙烷脱氢,石化产品贸易、仓储服务、成品油运输服务'}
                ]
            }
        }
    }
</script>
<style scoped>
    .Xhlist li {
        height: 55px;
        display: flex;
        align-items: center;
        margin-bottom: 1px;
        background-color: #fff;
    }
    .Xhlist li:hover{
        background-color: rgba(217,232,249,0.5);
    }
    .h50 {
        height: 50px;
    }
    .lightfont{color: #2d8cf0;}
    .colorB{color:#666;}
    .arrow-up {
        background: url(/img/icon.png) no-repeat 42px -147px;
    }
    .newClass{
        width:19px; height:15px;
        position: absolute; top: -7px;  left: 84px;background: url(/img/new_icon.gif)no-repeat;background-size: cover;
    }
</style>
