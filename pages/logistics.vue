<template>
	<div class="body">
		<Header  name="头部"  shortType = 'suppler' type='1'></Header>
		<div class="container" title="">
			<div class="tac">
				<img src="/img/logisticsBanner.jpg" style="width: 100%" />
			</div>
			<div class="w1200">
				<!--询价找车-->
				<div class="inquirybg">
					<h2>查运费</h2>
					<ul class="inquiryList">
						<Form :model="searchForm" :label-width="65">
							<li>
								<FormItem label="发货仓">
									<Select  v-model="searchForm.warehouse_id" >
										<Option   v-for="(item, index) in warehouseList" :value="item.id" :key="index">{{ item.wName }}</Option>
									</Select>
								</FormItem>
							</li>
							<li>
								<FormItem label="收货地">
									<Cascader v-model="searchForm.to_region_id" :data="registList" :load-data="loadRegionData" style="width:229px"></Cascader>
								</FormItem>
							</li>
							<li>
								<FormItem label="商品">
								<Select  placeholder="请输入关键字"    prefix="ios-search"
									  		filterable
											clearable
											remote
											@on-change="onChange"
											:remote-method="searchData1"
											:loading="loading">
										<Option v-for="(item, index) in productData" :value="item.id" :key="index">{{ item.title }}</Option>

									</Select>
								</FormItem>
							</li>

							<FormItem :label-width="18" >
								<Button  class="inquiryFree" type="primary" @click="searchFreight()">查询运费</Button>
							</FormItem>
						</Form>
					</ul>
				</div>
				<!--物流找车/实时数据-->
				<div class="dflex">
					<!--物流找车-->
					<div class="" style="width: 75%;">
						<div class="ListTitle  whitebg mt20">
							<div class="TitleName">物流找车</div>
						</div>
						<Logisticslist></Logisticslist>
					</div>
					<div class="ml20" style="width: 24%;">
						<div class="ListTitle  whitebg mt20">
							<div class="TitleName">实时数据</div>
						</div>

						<template v-if="reaList.length>0">
							<ul class="RealTime whitebg">
								<li v-for="(items, index) in reaList" :key="index">
									<div class="dflexAlem" style="justify-content: space-between;">
										<span class="fwb">{{items.memberName}}</span></div>
									<div class="dflexAlem mt5" style="justify-content: space-between;">
										<span class="orangeFont">{{items.weight}}吨</span><span class="greenFont">￥{{items.offerPrice}}/吨</span><span class="gray">{{items.demandBeginDate}}</span>

									</div>
								</li>
							</ul>
						</template>
						<template v-else>
							<div class="RealTime whitebg" style="text-align: center; height: 300px">
								<sapn>暂无数据</sapn>
							</div>
						</template>

					</div>

				</div>

				<div class="">
					<div class="ListTitle  whitebg mt20">
						<div class="TitleName">产品与服务</div>
					</div>
					<ul class="ServicePro">
						<li>
							<div class="serivceImg"><img src="/img/service_01.png" /></div>
							<div class="tac fs16 fwb">平台支撑</div>
							<div class='lineService'></div>
							<div class="tac mb30 gray fs14">拥有专业的团队</div>
						</li>
						<li>
							<div class="serivceImg"><img src="/img/service_02.png" /></div>
							<div class="tac fs16 fwb">利益保障</div>
							<div class='lineService'></div>
							<div class="tac mb30 gray fs14">降低运输成本</div>
						</li>
						<li>
							<div class="serivceImg"><img src="/img/service_03.png" /></div>
							<div class="tac fs16 fwb">快捷省时</div>
							<div class='lineService'></div>
							<div class="tac mb30 gray fs14">下单方便省时省心</div>
						</li>

						<li>
							<div class="serivceImg"><img src="/img/service_04.png" /></div>
							<div class="tac fs16 fwb">提升效率</div>
							<div class='lineService'></div>
							<div class="tac mb30 gray fs14">实时物流资源在线</div>
						</li>
						<li>
							<div class="serivceImg"><img src="/img/service_05.png" /></div>
							<div class="tac fs16 fwb">客服验证</div>
							<div class='lineService'></div>
							<div class="tac mb30 gray fs14">巨正源实名认证车队</div>
						</li>
					</ul>

				</div>

			</div>
		    <div class="co-brands">
				<cobrands :isDelivery='1'></cobrands>
			</div>
		</div>
		<Footer size="default" title="底部" style="margin-top:18px;"></Footer>
        <Modal
            title="查询结果"
            v-model="searchModalShow"
            @on-cancel="searchModalCancel"
            :width='700'
            class-name="vertical-center-modal">
            <div class="">
                <Table size="small" border stripe highlight-row :columns="searchColumns"   :data="searchData" :content="self" >
                </Table>
            </div>
            <div slot="footer">
              <Button type="primary" @click="searchModalCancel">确定</Button>
            </div>
        </Modal>
	</div>
</template>

<script>
	// Logisticslist
	import Logisticslist from '../components/logistics-list/logistics-list'
  import { getWarehouseList, getERPCategoryList, searchFreightFee } from '../api/logistics'
  import { provinceData, cityregionData } from '../api/users'
	import {
		mapState
	} from 'vuex'
	import Header from '../components/header'
	import Footer from '../components/footer'
	import cobrands from '../components/logisticsBrands'
	import { sendHttp } from "../api/common";
	import server from "../config/api";
	let Base64 = require('js-base64').Base64
	export default {
		name: "logistics",
		components: {
			Header:Header.small,
			Footer,
			cobrands,
			Logisticslist
		},
    data() {
        return {
            self: this,
            warehouseList: [],
            categoryList: [],
			registList: [],
			productData:[],
			loading:false,
            searchForm: {
                warehouse_id: 0,
                sku_no: '',
                country_id: 1,
                to_region_id: []
    },
    reaList:{},
            searchModalShow: false,
            searchData: [],
            searchColumns: [
                { title: '运输方式', key: 'transportation' },
                { title: '费用(元/吨)', key: 'freight_fee'}
            ],
        }
    },
    methods: {
 			async offerList(){
				  let params={
					  current_page:1,
					  page_size:4,
					  status:2
					}
				const res = await sendHttp(this, false, server.api.freight.freightList,params)

				this.reaList=res.data.items;
				this.total=res.data.total

			},
			async  searchData1 (query) {
					let params= {
						current_page: 1,
						page_size: 10,
						enable: 1,
						title: query
					}
					this.loading = true
					const res = await sendHttp(this, false, server.api.product.productgoods,params)
						this.loading = false
						if (res.status === 200) {
						this.productData = res.data.items
					}
			},
            async initData(){
                const res = await getWarehouseList(this, {})
                this.warehouseList = res.data
                const res2 = await getERPCategoryList(this, {})
                this.categoryList = res2.data
                const res3 = await provinceData(this, {countryId:1})
                res3.data.forEach((item, index, arr) => {
                    let tem = {
                        value: item.regionId,
                        label: item.regionName,
                        children: [],
                        loading: false
                    }
                    this.registList.push(tem)
                })
            },
            async loadRegionData (item, callback) {
                item.loading = true
                let children = []
                const res = await cityregionData(this, {parentId: item.value})
                res.data.forEach((item, index, arr) => {
                    let tem = []
                    if(item.regionLevel == 3){
                        tem = {
                            value: item.regionId,
                            label: item.regionName,
                        }
                    }else{
                        tem = {
                            value: item.regionId,
                            label: item.regionName,
                            children: [],
                            loading: false
                        }
                    }
                    children.push(tem)
                })
                item.children = children
                item.loading = false
                callback()
            },
            async searchFreight(){
                if(this.searchForm.warehouse_id == 0){
                    this.showWarning('请选择发货仓')
                    return
                }
                if(this.searchForm.to_region_id.length == 0){
                    this.showWarning('请选择卸货点')
                    return
                }
                if(this.searchForm.category_code == ''){
                    this.showWarning('请选择配送物品类目')
                    return
				}
				let to_region_id= this.searchForm.to_region_id.join(",")
				// to_region_id=encodeURIComponent(to_region_id)
				let params = {
                    warehouse_id: this.searchForm.warehouse_id,
                    sku_no: this.searchForm.sku_no,
                    to_region_id: to_region_id
				}
				const res = await searchFreightFee(this, params)



				if(res.data==''){
					this.showWarning('后台暂无此运输线路，无法给出参考运费！')
				}else{
					this.searchData = res.data
                    this.searchModalShow = true
				}

			},
			onChange (id) {
				 this.productData.forEach((item) => {
					if(item.id === id){
						this.searchForm.sku_no=item.skuNo
					}
				})
			},
            searchModalCancel(){
                this.searchModalShow = false
            },
            showWarning(msg) {
				this.$Modal.warning({
					title: '提示',
					content: msg
				});
			}
        },
        created() {
			this.initData()
			this.offerList();
        },

		fetch({
			store,
			params
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
				})
			])
		},
	}
</script>
<style scoped>
	.ivu-form{display: flex;}
	.ivu-form >>> .ivu-select-selection{
		width: 229px;
		border: none;
		background-color: #f0f2f5;}
	.ivu-form-item{margin: 2px 0;}
	.ivu-form-item >>> .ivu-form-item-content{margin-left: 0px;}
	.ivu-form >>> .ivu-select-dropdown-list li{
		width: 165px;
		background-color: #ffffff;
	}
	.ivu-form >>> .ivu-input{
		border: none;
		background-color: #f0f2f5;
	}
 	/*询价找车*/
	.logNumTime {
		width: 83%;
		padding: 15px 20px;
		margin-bottom: 20px;
	}

	.inquirybg {
		width: 1200px;
		height: 130px;
		margin: 20px auto 0;
		position: relative;
		background-color: #fff;

	}

	.inquirybg  h2 {
		padding: 15px 0;
		padding-left: 20px;
		font-size: 16px;
		box-sizing: border-box;
	}

	.inquiryList {
		margin-left: 20px;
		margin-bottom: 30px;
		display: flex;
	}
	.inquiryList li {
		width: 295px;
		display: flex;
		align-items: center;
		background-color: #f0f2f5;margin-left: 20px;
	}

	.inquiryTitle {
		padding-left: 30px;
		margin-right: 15px;
	}

	.iconbg01 {
		background: url(/img/car_icon.png)no-repeat 0px 0px;
	}

	.iconbg02 {
		background: url(/img/car_icon.png)no-repeat 0px -21px;
	}

	.iconbg03 {
		background: url(/img/car_icon.png)no-repeat 0px -43px;
	}

	.iconbg04 {
		background: url(/img/car_icon.png)no-repeat 0px -67px;
	}

	.inquiryText {
		border-radius: 3px;
		border: 1px solid #DEDEDE;
		height: 30px;
		width: 170px;
	}

	.inquiryFree {
		background-color: #007de4;
		border-radius: 3px;

		padding: 10px 75px;
		text-align: center;
		color: #fff;
	}

	.logisticList li {
		width: 240.8px;
		margin-right: 1px;
		background-color: #fff;
		font-size: 14px;
	}

	.logNumTime {
		width: 85%;
		margin: 30px auto 20px;
		padding: 15px 15px;
		display: flex;
		flex-direction: column;
		box-sizing: border-box;
	}

	.logNumTime p {
		display: flex;
		align-items: center;
	}

	.logNumTime_title {
		width: 70px;
		text-align-last: justify;
		margin-right: 5px;
	}

	.orangeFont {
		color: #ff9800;
	}

	.greenFont {
		color: #009900;
	}

	/*实时数据*/
	.RealTime {
		border-top: 1px solid #DEDEDE;
	}

	.RealTime li {
		border-bottom: 1px solid #DEDEDE;
		padding: 17px 15px;
		font-size: 14px;
	}

	.RealTime li:last-child {
		border-bottom: none;
	}

	/*产品与服务*/
	.ServicePro {
		display: flex;
		border-top: 1px solid #DEDEDE;
		background-color: #fff;
	}

	.ServicePro li {
		border-right: 1px solid #DEDEDE;
		box-sizing: border-box;
	}

	.ServicePro li:last-child {
		border-right: none;
	}

	.ServicePro li .serivceImg {
		margin: 15px;
	}

	.lineService {
		margin: 8px auto;
		width: 26px;
		height: 2px;
		border-radius: 25px;
		background-color: #007de4;
	}

</style>
