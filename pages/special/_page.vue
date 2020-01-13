<template>
	<div class="body">
		<Header></Header>
			<div class="container" title="" style="background-color: #ff6c00">
				<div class="w1200 ovh" >
					<ul class="planList">
						<li v-for="(items, index) in speciallist" :key="index">
							<div class="Img">
								<img :src="items.image" height="312">
							</div>
							<div class="operatebtn">
								<div class="btn" style="font-size: 23px;font-weight: 600;" v-if="items.is_can_click==1" @click="planOrder(items.id)">{{items.name}}</div>
								<div class="btn" style="font-size: 23px;font-weight: 600;background-color: gainsboro;" v-else >{{items.name}}</div>
							</div>
						</li>
					</ul>
				</div>
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
	middleware: 'memberAuth',
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
					id:'',
					img:'img/plan_04.png',
					planName:'注塑料专场'
				},
				{
					id:'',
					img:'img/plan_02.png',
					planName:'无纺布专场'
				},
				{
					id:'',
					img:'img/plan_06.png',
					planName:'拉丝料专场'
				},
				{
					id:3,
					img:'img/plan_01.png',
					planName:'BOPP膜料专场'
				},		
				{
					id:'',
					img:'img/plan_05.png',
					planName:'薄塑料专场'
				},
				{
					id:'',
					img:'img/plan_03.png',
					planName:'透明料专场'
				},				
				{
					id:'',
					img:'img/plan_07.png',
					planName:'卫材专场'
				},
				{
					id:'',
					img:'img/plan_08.png',
					planName:'塑料制品'
				},
				{
					id:'',
					img:'img/plan_09.jpg',
					planName:'化工原料'
				},
				{
					id:'',
					img:'img/plan_10.jpg',
					planName:'副产品'
				},
				{
					id:'',
					img:'img/plan_11.jpg',
					planName:'助剂专场'
				},
				{
					id:'',
					img:'img/plan_12.jpg',
					planName:'改性塑料专场'
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
            this.speciallist = res.data
            this.total = res.data.total
        },

		//计划下单
		planOrder(id){
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
