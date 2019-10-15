<template>
<div class="wrap">
    <div class="right">
        <div class="right-wrap" style="background: #ffffff">
			<div class="PrintArea" id="PrintArea" style="font-family:'宋体';margin:0 auto;width: 800px;border: 1px dashed #d3d3d3;padding: 5px;">
				<div style="margin: 0 auto;width: 690px;">
					<table  border="0" cellspacing="0" cellpadding="0" style="margin: 0 auto;width: 100%">
						<tr>
							<td height="80">
								<div style="padding-bottom:5px;clear:both;position:relative;">
									<p class="ffw fl fs16p" style="width:20%;"> <a href="/">
											<img src="~/static/img/logo.png" alt="巨正源">
									</a></p>
									<p class="ffw fs20p tac" style="width: 80%"><span style="border-bottom:2px solid #000; padding-bottom: 2px;">{{title}}</span> <span class="red fs00p"></span></p>
									<div style="height: 40px;position: absolute;right:0px;top: 41px;display: flex;text-align: right;flex-direction: column;">
										<div style=" " class="bcTarget">合约编号:{{OrderList.planNo}}</div>
										<div style=" " class="bcTarget mt5p">合同签订地点：东莞市</div>
									</div>
								</div>
							</td>
						</tr>
						<tr><td height="20"></td></tr>
						<tr width="100%">
							<td>
								<table class="table-head" width="100%" border="0" cellspacing="0" cellpadding="0" >
									<tr>
										<td class="pb5p ">合同生效日期：{{OrderList.orderDate}}</td>
										<td class="pb5p ">提货起始日期：{{OrderList.deliveryDeadline}}</td>
										<td class="pb5p ">提货截止日期：{{OrderList.orderDate}}</td>
									</tr>
								</table>
							</td>
						</tr>
						<tr><td class="pb5p">1·合同交易双方信息·</td></tr>
						<tr>
							<td>
								<table width="100%" border="1" cellspacing="0" cellpadding="0" >
									<tr><th style="padding:5px 0;">供方名称：</th><th >{{OrderList.companyName}}</th><th >需方名称</th><th>{{OrderList.memberName}}</th></tr>
									<tr><th style="padding:5px 0;">供方地址：</th><th >{{OrderList.companyAddress}}</th><th >需方地址</th><th>{{OrderList.memberAddress}}</th></tr>
									<tr><th style="padding:5px 0;">供方税号：</th><th >{{OrderList.companyTax}}</th><th >需方税号</th><th>{{OrderList.memberTax}}</th></tr>
									<tr><th style="padding:5px 0;">供方法人：</th><th >{{OrderList.companyCorporation}}</th><th >需方法人</th><th>{{OrderList.memberCorporation}}</th></tr>
									<tr><th style="padding:5px 0;">供方电话：</th><th >{{OrderList.companyTel}}</th><th >需方电话</th><th>{{OrderList.memberTel}}</th></tr>
									<tr><th style="padding:5px 0;">供方开户行：</th><th >{{OrderList.companyBank}}</th><th >需方开户行</th><th>{{OrderList.memberBank}}</th></tr>
									<tr><th style="padding:5px 0;">供方银行账号：</th><th >{{OrderList.companyBankAccount}}</th><th >需方银行账号</th><th>{{OrderList.memberBankAccount}}</th></tr>
									<tr><th style="padding:5px 0;">经办人：</th><th >{{OrderList.companyOperator}}</th><th >联系人</th><th>{{OrderList.memberOperator}}</th></tr>
								</table>
							</td>
						</tr>
						<tr><td class=" pt5p pb5p">2·产品名称·型号·数量·金额·</td></tr>
						<tr>
							<td>
								<table width="100%" border="1" cellspacing="0" cellpadding="0" >
									<tr>
										<th style="padding:5px 0;">产品名称</th>
										<th>生产工厂</th>
										<th>规格型号</th>
										<th>数量（吨）</th>
										<th>售价（元/吨）</th>
										<th>税率%</th>
									</tr>
									<tr>
										<th style="padding:5px 0;">{{OrderList.skuName}}</th>
										<th>{{OrderList.manufacturer}}</th>
										<th>{{OrderList.skuType}}</th>
										<th>{{OrderList.orderNum}}</th>
										<th>{{OrderList.finalPrice}}</th>
										<th>{{OrderList.taxRate}}</th>
									</tr>
									<tr>
										<th style="padding:5px 0;">含税总金额</th>
										<th>{{OrderList.totalAmount}}</th>
										<th>总金额大写</th>
										<th colspan="3">{{$utils.moneyFormat(OrderList.totalAmount)}}</th>
									</tr>
								</table>
							</td>
						</tr>
						<tr><td class="pt5p pb5p">2·履约条数·</td></tr>
						<tr>
							<td>
								<table width="100%" border="1" cellspacing="0" cellpadding="0" >
									<tr>
									<th style="padding:5px 0;">履约保证金率</th>
									<th>{{OrderList.marginRatio}}%</th>
									<th>履约保证金金额</th>
									<th colspan="3">¥{{OrderList.depositAmount}}</th>
									</tr>
								</table>
							</td>
						</tr>
						<tr><td class="pt5p pb5p">2·付款条款及结算方式·</td></tr>
						<tr>
							<td>
								<table width="100%" border="1" cellspacing="0" cellpadding="0" >
									<tr><th style="padding:5px 0;">支付方式：</th><th>电汇或银行承兑自贴息</th><th>付款方式：</th><th>款到发货</th></tr>
									<tr><th style="padding:5px 0;">计价方式：</th><th>现货价</th><th>其他约定：</th><th>/</th></tr>
									<tr>
										<th style="padding:5px 0;">支付条款约定：</th>
										<th colspan="3">支付条款约定支付条款约定支付条款约定支付条款约定支付条款约定支付条款约定支付条款约定支付条款约定支付条款约定</th>
									</tr>
								</table>
							</td>
						</tr>
						<tr><td class="pt5p pb5p">2·包装及交提货方式·</td></tr>
						<tr>
							<td>
								<table width="100%" border="1" cellspacing="0" cellpadding="0" >
									<tr>
										<th style="padding:5px 0;">包装方式：</th>
										<th><span v-if="OrderList.packingModes==1">标准包装</span><span v-else>非标准包装</span></th>
										<th>运输方式：</th>
										<th>在实际执行订单中确定·</th>
									</tr>
									<tr>
										<th style="padding:5px 0;">装运点：</th>
										<th>{{OrderList.pointName}}</th>
										<th>提货仓库：</th>
										<th>{{OrderList.warehouseName}}</th>
									</tr>
									<tr>
										<th style="padding:5px 0;">交/提货方式：</th>
										<th>待定</th>
										<th>承运商：</th>
										<th>在实际执行订单中确定·</th>
									</tr>
									<tr>
										<th style="padding:5px 0;">送货详细地址：</th>
										<th colspan="3">待定</th>
									</tr>
								</table>
							</td>
						</tr>
						<tr><td class="pt5p">6·质量标准：执行供方产品出厂质量标准·</td></tr>
						<tr style="margin-top: 10px;display: block" >
							<td style="border-bottom:2px solid #000;padding-bottom:5px; margin-top: 20px;overflow: hidden">7·本合同作为双方已签订的化工产品年度销量合同（编号为2019）的附件，双方的化工产品销售行为受本合同和年度销量合同的法律效力约束，本合同规定与年度销量合同不一致的，以本合同为主·</td>
						</tr>
					</table>
					<div class="supplyname">
						<div class="listsupply"><span>供方名称:</span><span class="ml5p">{{OrderList.companyName}}</span></div>
						<div><span>需方名称:</span><span class="ml5p">{{OrderList.memberName}}</span></div>
					</div>
					<div class="supplyname">
						<div class="listsupply"><span>法人/委托代理人签字:</span><span class="ml5p"></span></div>
						<div><span>法人/委托代理人签字:</span><span class="ml5p"></span></div>
					</div>
					<div class="supplyname" style="margin-top: 40px;border-bottom: 2px solid #333; padding-bottom: 10px">
						<div class="listsupply"><span>签名及盖章</span><span class="ml40p"><span>日期</span></span></div>
						<div><span>签名及盖章</span><span class="ml40p"><span>日期</span></span></div>
					</div>
				</div>
			</div>
        </div>
    </div>
</div>
</template>
<script>
    import server from "../../config/api";
    import {sendHttp} from "../../api/common";
   	import utils from '../../plugins/common'
	export default {
		name: "spotContract",
		middleware: 'memberAuth',
		components: {
		},
		fetch({store, query}) {
			return Promise.all([
				//获取系统配置
				store.dispatch('common/getSysConfig'),
				//获取会员合约列表
				store.dispatch('spot/getSpotPlanList', {
					current_page: query.page || 1,
					page_size: 6,
					plan_no: query.plan_no ? query.plan_no : ''
				})
			])
		},
		data() {
			return {
                id: this.$route.query.id ? parseInt(this.$route.query.id) : 1,
                type: this.$route.query.type ? parseInt(this.$route.query.type) : 1,
                OrderList:{},
                title:'化工产品购销（现货）合同'
			}
		},
		methods: {
	        async dataList() {
				let params = {
					id: this.id,
				}
				const res = await sendHttp(this, true, server.api.spot.getContractInfo, params, 1)
				this.OrderList = res.data

			},
		
        },
        mounted() {
            if(this.type==2){
                this.title='化工产品购销（竞拍）合同'
            }
            this.dataList();
		},
		created() {
		},
	}
</script>
<style scoped>
         body{font-family:'Microsoft Yahei';}
	    .fwb{font-weight:bold;}
		.fwn{font-weight:normal;}

		.cell1{height: 20px;font-size: 18px;margin-top: 5px;margin-bottom: 5px;}
		/*合同相关样式*/
		.contract{border:0px solid #dcdcdc;margin-top:0px;padding:0px;}
		.contract-tab tr th{border:1px solid ;font-weight:bold;padding:5px;}
		.contract-tab tr td{border:1px solid ;padding:5px;text-align:center;}
		.contract-tab tr td.tal{text-align: left;}
		.contract-tab-company{border:0px solid #000000;width:100%;}
		.contract-tab-company tr td{padding:0px;border:2px solid #000000;}
		.contract-tab-company tr td p{padding:0px 0;}
		.contract-tab-company-table tr td{border: 0; margin: 0px;padding: 0px;  }
		.bs0{border-collapse:collapse;border-spacing:0;}

		/*提单相关样式*/
		.print_tabs tr td{padding:2px 5px;}
		.bbx_t{border-bottom:1px solid #ccc;}
		.wrap_oul li{overflow: hidden;clear:both;}
		.table-head{border-bottom:2px solid #000;margin-bottom:10px}
		.supplyname{display: flex;
			margin: 10px auto;
		}
		.listsupply{width: 50%;display: flex;align-items: center;}
</style>