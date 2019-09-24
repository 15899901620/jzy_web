<template>
	<div class="body">
		<Header title="头部"></Header>
		<div class="container" title="">
			<div class="materials_banner">
				<Banner :bannerData="this.bannerinfo" :heightNum="this.heightNum"></Banner>
			</div>
			<div class="w1200" style="margin-top: 20px">
				<div class="ListTitle  whitebg bb1">
					<div class="TitleName" style="border-left: 3px solid #279eff;">专料列表</div>
				</div>
				<div class="indexXhTitle   dflexAlem graybg">
					<span style="width: 8%;">合同类型</span>
					<span style="width: 10%;">编号</span>
					<span style="width: 10%;">商品名称</span>
					<span style="width: 10%;">厂商</span>
					<span style="width: 10%;">交货地</span>
					<span style="width: 11%;">单价（元/吨）</span>
					<span style="width: 10%;">合同数量</span>
					<span style="width: 10%;">已提吨数</span>
					<span style="width: 10%;">最大可提吨数</span>
					<span style="width: 9%;">操作</span>
				</div>
				<ul class="indexXhlist">
					<template v-if="!userinfo">
						<li>
							<p style="width:100%; text-align:center">查看专料信息，请先 [ <router-link to="/login">登录
								</router-link> ] 或 [ <router-link to="/register">注册</router-link> ] 会员</p>
						</li>
					</template>
					<template v-else>
						<template v-if="speciallist">
							<li v-for="(items, index) in speciallist" :key="index">
								<span class="dflexAlemJust" style="width: 8%;">
                                    <Tag color="primary" v-if="items.feedingType === '放'">{{items.feedingType}}</Tag>
                                    <Tag color="warning" v-else>{{items.feedingType}}</Tag>
								</span>
								<span style="width: 10%;">{{items.skuNo}}</span>
								<span style="width: 10%;">{{items.skuName}}</span>
								<span style="width: 10%;">{{items.manufacturer}}</span>
								<span style="width: 10%;">{{items.warehouseName}}</span>
								<span class="orangeFont" style="width:11%;">{{items.finalPriceFormat}}</span>
								<span style="width: 10%;">{{items.availableNum}}</span>
								<span style="width: 10%;">{{items.tokenNum}}</span>
								<span style="width: 10%;">{{getIntput(items.maxCanDeliveryNum)}}</span>
								<span style="width: 9%;">
									<div class="ListBtn" @click="addOrder(items)">下单</div>
								</span>
							</li>
						</template>
						<template v-else>
							<li>
								<p style="width:100%; text-align:center">暂无任何专料信息！</p>
							</li>
						</template>
					</template>
				</ul>
				<div class="whitebg ovh text-xs-center" style="padding: 30px 0" v-if="speciallist">
					<pages :total="total" :show-total="showTotal" @change="changePage" :value="current_page"></pages>
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
            store.dispatch('menu/getMenuList'),
            store.dispatch('system/getSystemCnf'),
            store.dispatch('helper/getHelpCate', {
                parentId: 0,
                indexShow: 1
            }),
            store.dispatch('system/getLinksInfo'),
            store.dispatch('system/getBannerInfo', {
                positionId: 2
            }),
        ])
    },
    components: {
        Header,
        Footer,
        Banner,
        pages: pagination.pages
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
                status: 'CO'
            }
            const res = await specialList(this, params)
            this.speciallist = res.data.items
            this.total = res.data.total
        }
    },
    created() {

    },
    mounted() {
        this.getUserInfo();
        this.specialData();
    },
    watch: {
        '$route'(to, from) {
            this.$router.go(0);
        }
    }
}
</script>
<style lang="less" scoped>
.ivu-tag {
    padding: 0px 4px;
    font-size: 12px;
}
</style>
