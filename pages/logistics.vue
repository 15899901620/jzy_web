<template>
	<div class="body">
		<Header title="头部"></Header>
		<div class="container" title="">
			<div class="tac">
				<img src="/img/logisticsBanner.png" />
			</div>
			<!--询价找车-->
			<div class="inquirybg">
				<div class="inquiryCar">
					<h2>询价找车</h2>
					<ul class="inquiryList">
						<li>
							<div class="inquiryTitle iconbg01">发货仓</div>
                            <Select v-model="searchForm.warehouse_id" style="width:170px">
                                <i-option v-for="(item, index) in warehouseList" :value="item.id" :key="index">{{ item.wName }}</i-option>
                            </Select>
						</li>
						<li>
							<div class="inquiryTitle iconbg02">卸货点</div>
                            <Cascader v-model="searchForm.to_region_id" :data="registList" :load-data="loadRegionData" style="width:170px"></Cascader>
						</li>
						<li>
							<div class="inquiryTitle iconbg03">类&nbsp;&nbsp;&nbsp;目</div>
                            <Select v-model="searchForm.category_code" style="width:170px">
                                <i-option v-for="(item, index) in categoryList" :value="item.code" :key="index">{{ item.name }}</i-option>
                            </Select>
						</li>
						<li>
							<div class="inquiryTitle iconbg04">吨&nbsp;&nbsp;&nbsp;位</div><input type="text" class="inquiryText" name=""
								id="" value="" />
						</li>
					</ul>
					<div class="inquiryFree" @click='searchFreight'>查询运价</div>
				</div>
			</div>
			<div class="w1200">
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
						<ul class="RealTime whitebg">
							<li v-for="(items, index) in reaList" :key="index">
								<div class="dflexAlem" style="justify-content: space-between;">
									<span class="fwb">上海春万实业有限公司</span><span class="gray">{{items.createTime}}</span></div>
								<div class="dflexAlem mt5" style="justify-content: space-between;">
									<span class="gray">{{items.dispatchStateName}}-{{items.dispatchDistrictName}} <span class="orangeFont">{{items.weight}}吨</span></span>
									<span  class="greenFont" v-if='items.status==2'>已选择</span>
								</div>
							</li>				
						</ul>


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
	import { sendHttp } from "../api/common";
	import server from "../config/api";
	export default {
		name: "logistics",
		components: {
			Header,
			Footer,
			Logisticslist
		},
        data() {
            return {
                self: this,
                warehouseList: [],
                categoryList: [],
                registList: [],
                searchForm: {
                    warehouse_id: 0,
                    category_code: '',
                    country_id: 1,
                    to_region_id: []
				},
				reaList:{},
                searchModalShow: false,
                searchData: [],
                searchColumns: [
                    { title: '运输方式', key: 'transportation' },
                    { title: '费用', key: 'freight_fee'}
                ],
            }
        },
        methods: {
			async offerList(){
				  let params={
					  current_page:1,
					  page_size:3,
					  status:2
					}
				const res = await sendHttp(this, true, server.api.freight.freightList,params,1)
		
				this.reaList=res.data.items;
				this.total=res.data.total
        		console.log(this.reaList)
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
                let params = {
                    warehouse_id: this.searchForm.warehouse_id,
                    category_code: this.searchForm.category_code,
                    country_id: this.searchForm.country_id,
                    to_region_id: this.searchForm.to_region_id.join(",")
                }
                const res = await searchFreightFee(this, params)
                if(res.data.lenght == 0){
                    this.showWarning('后台暂无此运输线路，无法给出参考运费！')
                }else{
                    this.searchData = res.data
                    this.searchModalShow = true
                }
            },
            searchModalCancel(){
                this.searchModalShow = false
            },
            showWarning(msg){
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
				store.dispatch('menu/getMenuList'),
				store.dispatch('system/getSystemCnf'),
				store.dispatch('helper/getHelpCate', {
					parentId: 0,
					indexShow: 1
				}),
				store.dispatch('system/getLinksInfo'),

			])
		},
	}

</script>

<style scoped>
	/*询价找车*/
	.logNumTime {
		width: 83%;
		padding: 15px 20px;
		margin-bottom: 20px;
	}

	.inquirybg {
		width: 1200px;
		margin: 0 auto;
		position: relative;
	}

	.inquirybg .inquiryCar {
		width: 300px;
		background-color: #fff;
		position: absolute;
		top: -380px;
		left: 0;
	}

	.inquirybg .inquiryCar h2 {
		border-bottom: 1px solid #DEDEDE;
		padding: 15px 0;
		padding-left: 20px;
		font-size: 16px;
		box-sizing: border-box;
	}

	.inquiryList {
		margin-top: 20px;
		margin-left: 20px;
	}

	.inquiryList li {
		display: flex;
		align-items: center;
		margin-top: 15px;
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
		width: 85%;
		margin: 10px auto 30px;
		padding: 10px 0;
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
