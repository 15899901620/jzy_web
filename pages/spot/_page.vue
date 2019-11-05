<template>
  <div class="body">
    <Header title=""></Header>
    <div class="container">
      <div class="w1200">
        <div class="breadcrumb">
          <breadcrumb>
              <breadcrumb-item><i type="home"></i><nuxt-link to="/">巨正源</nuxt-link></breadcrumb-item>
              <breadcrumb-item>现货超市</breadcrumb-item>
          </breadcrumb>
        </div>

        <div class="screenList">
          <!--原料分类-->
          <div class="screenibre">
            <dl class="fl filter_item">
              <dt class="scTitle">原料分类：</dt>
              <dd class="pro_brand_list" :class="categoryMore ? 'h50' : ''">
                <a v-for="(item, index) in $store.state.spot.condition.category" :key="index"
                   @click="categoryClick(item.id)">
                  {{item.name}}
                </a>
              </dd>
            </dl>
            <div class="fr pro_m_select" :class="categoryMore ? '' : 'arrow-up'" @click="categoryOpen">
              {{categoryMoreVal}}
            </div>
          </div>
          <!--加工级别-->
          <div class="screenibre">
            <dl class="fl filter_item">
              <dt class="scTitle">加工级别：</dt>
              <dd class="pro_brand_list" :class="processMore ? 'h50' : ''">
                <a  @click="processClick()">显示全部</a>
                <a v-for="(item, index) in $store.state.spot.condition.process" :key="index"
                   @click="processClick(item.id)">
                  {{item.name}}
                </a>
              </dd>
            </dl>
            <div class="fr pro_m_select" :class="processMore ? '' : 'arrow-up'" @click="processOpen">
              {{processMoreVal}}
            </div>
          </div>
          <div class="XHsearch" style="display: flex;">
            <span>厂商</span><input type="text" v-model="manufacturer" class="XHsearchInput" placeholder="请输入厂商"/>
            <span class="ml15">牌号</span><input type="text" v-model="skuName" class="XHsearchInput" placeholder="请输入牌号"/>
            <div v-if="$store.state.memberToken" class="ml20">
              <input type="text" v-model="minPrice" class="priceInput" placeholder="￥最低价"/>-
              <input type="text" v-model="maxPrice" class="priceInput" placeholder="￥最高价"/>
            </div>
            <div class="xhBtn" @click="spotData">搜索</div>
          </div>
        </div>
        <!--现货列表-->
        <div class="">
          <div class="XhlistTitle">
            <span style="width: 10%;">品种</span>
            <span style="width: 16%;">牌号</span>
            <span style="width: 16%;">厂商</span>
            <span style="width: 10%;">交货仓</span>
            <span style="width: 7%;">包装方式</span>
            <span style="width: 9%;">剩余数量（吨）</span>
            <span style="width: 11%;">单价（元/吨）</span>
            <span style="width: 8%;">距下架时间</span>
            <span style="width: 7%;">提货期限</span>
            <span style="width: 12%;">操作</span>
          </div>
          <ul class="Xhlist">
            <template v-if="$store.state.spot.spotList.length>0">

              <li v-for="(item, index) in $store.state.spot.spotList" :key="index">
                <span style="width: 10%;">{{item.category_name}}</span>
                <span style="width: 16%;">{{item.sku_name}}</span>
                <span
                    style="width: 16%;white-space:nowrap;text-overflow:ellipsis;word-break:keep-all;overflow: hidden;">{{item.manufacturer}}</span>
                <span :title="item.warehouse_name" style="width: 10%; overflow: hidden;text-overflow: ellipsis; white-space: nowrap; cursor: default;">{{item.warehouse_name}}</span>

                <span style="width: 7%;" v-if='item.packing_modes=="1"'>标准包装</span>
                <span style="width: 7%;" v-else>非标准包装</span>
                <span style="width: 9%; display: flex; justify-content: center; align-items: center; position: relative">
                  <span style="position: relative">{{item.available_num}}
                  <i :title="`限购${item.limit_num}`" v-if="item.available_num > 0 && item.limit_num > 0" style="width: 15px; height: 18px; position: absolute; top: -10px; right: -22px; background:url('/img/Xian_icon.png')no-repeat;"></i>
                  </span>
                </span>
                <span v-if="$store.state.memberToken" class="orangeFont"
                      style="width: 11%;position:relative;text-align:right;padding-right:18px;">
                     <span style="position: relative">
                       {{item.finalPriceFormat}}
                        <i v-if="item.is_jry"  style="width: 15px; height: 18px; position: absolute; top: -10px; right: -15px; background:url('/img/Yi_icon.png')no-repeat;"></i>
                     </span>
                </span>
                <span v-else class="orangeFont" style="width: 11%;" title="登录后查看">{{item.finalPriceFormat}}</span>
                <span style="width: 8%;">
                  <template v-if="item.available_num == 0">
                  已售罄
                  </template>
                  <template v-else-if="item.on_sale == 2 && item.available_num > 0">
                  已结束
                  </template>
                  <template v-else>
                    <TimeDown :endTime="item.price_valid_time" hoursShow endMsg="已结束" :onTimeOver="reloadPage"></TimeDown>
                  </template>
                </span>
                <span style="width: 7%;">{{item.delivery_deadline}}</span>
                <span style="width: 12%;">
                  <div
                      v-if="$store.state.memberToken && (item.available_num < item.min_order || item.on_sale != 1)"
                      style="color:#c3c3c3;background:#e7e7e7;cursor:pointer;width:50px;line-height:26px;margin:0 auto;border-radius:3px;">下单</div>
                  <div v-else-if="$store.state.memberToken && item.available_num > 0" class="ListBtn"
                       @click="addOrder(item.id)">下单</div>
                  <div v-else class="ListBtn" @click="toLogin">登录</div>
                </span>
              </li>
            </template>
            <template v-else>
              <li style="overflow:hidden; height: 235px;">
                <p style="width:100%; text-align:center">
                  <img src="../../static/img/Nothing.png"/>
                </p>
              </li>
            </template>
          </ul>
          <div class="whitebg ovh text-xs-center" style="padding: 30px 0" v-if="$store.state.spot.spotList.length > 0">
            <pages :total="$store.state.spot.total" :show-total="showTotal" :value="current_page"></pages>
          </div>
        </div>
      </div>
    </div>
    <Footer size="default" title="底部" style="margin-top:18px;"></Footer>
  </div>
</template>

<script>
	import Header from '../../components/header'
	import Footer from '../../components/footer'
	import pagination from '../../components/pagination'
	import TimeDown from '../../components/timeDown'

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
				store.dispatch('spot/getSpotList', {
						sku_name: query.keyword || '',
						current_page: query.page || 1,
						page_size: 6
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
				categoryId: this.$route.query.category_id || '',
				processId: this.$route.query.level_id || '',
				skuName: this.$route.query.keyword || '',
				manufacturer: '',
				minPrice: '',
				maxPrice: '',
				categoryMore: true,
				processMore: true,
				categoryMoreVal: '更多',
				processMoreVal: '更多',
			}
		},
		methods: {
			addOrder(id) {
				location.href = '/spot/order/' + id
			},
			categoryClick(id) {
				this.categoryId = id
				this.spotData()
			},
			processClick(id) {
				this.processId = id
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
					category_id: this.categoryId,
					level_id: this.processId,
					sku_name: this.skuName,
					manufacturer: this.manufacturer,
					min_price: this.minPrice,
					max_price: this.maxPrice,
					current_page: this.current_page,
					page_size: this.page_size
				};
				this.$store.dispatch('spot/getSpotList', params)
			},
			checkTypeCancel(){
				this.checkTypeShow = false
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

  .h50 {
    height: 50px;
  }

  .arrow-up {
    background: url(/img/icon.png) no-repeat 42px -147px;
  }
</style>
