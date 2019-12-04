<template>
	<div class="body">
		<Header></Header>


			<div class="container" title="" style="background-color: #ff6c00">
							<div class="w1200 ovh" >
								<ul class="planList">
									<li v-for="(items, index) in planArray" :key="index">
										<div class="Img">
											<img :src="items.img" height="312">
										</div>
										<div class="operatebtn">
											<div class="btn" style="font-size: 23px;font-weight: 600;" @click="planOrder(items.id)">{{items.planName}}</div>
										</div>
									</li>
								</ul>
							</div>
<!--			<div class="materials_banner" style="height: auto">-->
<!--				<Banner :bannerData="this.bannerinfo" :heightNum="this.heightNum"></Banner>-->
<!--			</div>-->
<!--			<div class="w1200" style="margin-top: 20px">-->
<!--				<div class="ListTitle  whitebg bb1">-->
<!--					<div class="TitleName" style="border-left: 3px solid #279eff;">专料列表</div>-->
<!--				</div>-->
<!--				<div class="indexXhTitle   dflexAlem graybg">-->
<!--					<span style="width: 8%;">合同类型</span>-->
<!--					<span style="width: 10%;">编号</span>-->
<!--					<span style="width: 10%;">商品名称</span>-->
<!--					<span style="width: 10%;">厂商</span>-->
<!--					<span style="width: 10%;">交货地</span>-->
<!--					<span style="width: 11%;">单价（元/吨）</span>-->
<!--					<span style="width: 10%;">合同数量</span>-->
<!--					<span style="width: 10%;">已提吨数</span>-->
<!--					<span style="width: 10%;">最大可提吨数</span>-->
<!--					<span style="width: 9%;">操作</span>-->
<!--				</div>-->
<!--				<ul class="indexXhlist">-->
<!--					<template v-if="!userinfo">-->
<!--						<li>-->
<!--							<p style="width:100%; text-align:center">查看专料信息，请先 [ <router-link to="/login"><span style="color:#017de4">登录</span>-->
<!--								</router-link> ] 或 [ <router-link to="/register"><span style="color:#017de4">注册</span></router-link> ] 会员</p>-->
<!--						</li>-->
<!--					</template>-->
<!--					<template v-else>-->
<!--						<template v-if="speciallist">-->
<!--							<li v-for="(items, index) in speciallist" :key="index">-->
<!--								<span class="dflexAlemJust" style="width: 8%;">-->
<!--                                    <Tag color="primary" v-if="items.feedingType === '放'">{{items.feedingType}}</Tag>-->
<!--                                    <Tag color="warning" v-else>{{items.feedingType}}</Tag>-->
<!--								</span>-->
<!--								<span style="width: 10%;">{{items.skuNo}}</span>-->
<!--								<span style="width: 10%;">{{items.skuName}}</span>-->
<!--								<span style="width: 10%;">{{items.manufacturer}}</span>-->
<!--								<span style="width: 10%;">{{items.warehouseName}}</span>-->
<!--								<span class="orangeFont" style="width:11%;">{{items.finalPriceFormat}}</span>-->
<!--								<span style="width: 10%;">{{items.availableNum}}</span>-->
<!--								<span style="width: 10%;">{{items.tokenNum}}</span>-->
<!--								<span style="width: 10%;">{{getIntput(items.maxCanDeliveryNum)}}</span>-->
<!--								<span style="width: 9%;">-->
<!--									<div class="ListBtn" @click="addOrder(items)">下单</div>-->
<!--								</span>-->
<!--							</li>-->
<!--						</template>-->
<!--						<template v-else>-->
<!--							<li>-->
<!--								<p style="width:100%; text-align:center">暂无任何专料信息！</p>-->
<!--							</li>-->
<!--						</template>-->
<!--					</template>-->
<!--				</ul>-->
<!--				<div class="whitebg ovh text-xs-center" style="padding: 30px 0" v-if="speciallist">-->
<!--					<pages :total="total" :show-total="showTotal" @change="changePage" :value="current_page"></pages>-->
<!--				</div>-->
<!--			</div>-->
		</div>
		<Footer size="default" title="底部"  style="margin-top: 50px;" ></Footer>
	</div>
</template>

<script>
import { mapState } from 'vuex'
import Header from '../../components/header'
import Footer from '../../components/footer'
import Banner from '../../components/banner'
import { getCookies } from '../../config/storage'
import pagination from '../../components/pagination'
import { specialList } from '../../api/special'

export default {
    name: "special",
    fetch({
        store,
        params,
        query
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
                store.dispatch('system/getBannerInfo', { positionId: 3 }),

         ])
    },
    components: {
        Header,
        Footer,
        Banner,
        pages: pagination.pages
    },
	mounted(){
    	console.log("bannerinfo:",this.bannerinfo)
	},
    computed: {
        ...mapState({
            bannerinfo: state => state.system.bannerinfo,
        })
    },
    data() {
        return {
            userinfo: {},
            heightNum: 390,
            current_page: 1,
            page_size: 10,
            speciallist: [],
            total: 0,
			planArray:[
				{
					id:3,
					img:'img/plan_01.png',
					planName:'BOPP膜料专场'
				},
				{
					id:'',
					img:'img/plan_02.png',
					planName:'无纺布专场'
				},
				{
					id:'',
					img:'img/plan_03.png',
					planName:'透明料专场'
				},
				{
					id:'',
					img:'img/plan_04.png',
					planName:'注塑料专场'
				},
				{
					id:'',
					img:'img/plan_05.png',
					planName:'改性塑料专场'
				},
				{
					id:'',
					img:'img/plan_06.png',
					planName:'拉丝料专场'
				},
				{
					id:'',
					img:'img/plan_07.png',
					planName:'纤维料专场'
				},
				{
					id:'',
					img:'img/plan_08.png',
					planName:'塑料助剂专场'
				},
			]
        }
    },
    methods: {
        getIntput(row) {
            return parseInt(row)
        },
        getUserInfo() {
            let data = getCookies('userinfor')
            this.userinfo = data
        },
        showTotal(total) {
            return `全部 ${total} 条`;
        },
        addOrder(row) {
            this.$router.push({
                name: 'special-order-id',
                params: {
                    id: row.id
                }
            })
        },
        changePage(row) {
            this.$router.push({
                name: 'special',
                query: {
                    page: row
                }
            })
        },
        async specialData() {
            let params = {
                current_page: this.current_page,
                page_size: this.page_size,
            }
            const res = await specialList(this, params)
            this.speciallist = res.data.items
            this.total = res.data.total
        },

		//计划下单
		planOrder(id){
        	console.log("name",name)
			this.$router.push({
				name: 'special-list-page',
				query:{id:id}
			})
		},
    },
    created() {

    },
    mounted() {
        this.getUserInfo();
        this.specialData();
    },
    watch: {
		$route(to, from) {
			console.log('to:',to);
			console.log('from',from);
		}
    }
}
</script>
<style lang="less" scoped>
.ivu-tag {
    padding: 0px 4px;
    font-size: 12px;
}
	.planList{
		display: flex;
		flex-direction: row;
		flex-wrap:wrap;
		margin-left: -20px;
		margin-top: 40px;
        margin-bottom: 60px;
		li{
			margin-top: 20px;
			margin-left: 20px;
			border-radius: 10px;
			overflow: hidden;
			.Img{font-size: 0; height: 312px;}
			.operatebtn{
				background-color: #FFFFFF;
				overflow: hidden;
				.btn{
					width: 199px;
					margin: 30px auto;
					font-size: 16px;
					color: #FFFFFF;
					background-color: #ff3e4e;
					text-align: center;
					padding: 8px 0;
					border-radius: 5px;
					cursor: pointer;
				}
			}
		}
	}
</style>
