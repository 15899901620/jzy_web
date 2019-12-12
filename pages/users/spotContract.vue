<template>
<div class="wrap">

    <div class="right">
        <div class="right-wrap" style="background: #ffffff">
			<div class="PrintArea" id="PrintArea" style="font-family:'宋体';margin:0 auto;width: 800px;border: 0px dashed #d3d3d3;padding: 5px;">
				<div style="margin: 0 auto;width: 690px;">
					<table  border="0" cellspacing="0" cellpadding="0" style="margin: 0 auto;width: 100%">
						<tbody>
						<tr>
							<td height="80">
								<div style="padding-bottom:5px;clear:both;position:relative;">
									<p class="ffw fl fs16p" style="width:20%;"> <a href="/">
											<img :src="$store.state.common.sysConfig.CONTRATLOGO" style="position: absolute;top: -30px;" alt="巨正源" >
									</a></p>
									<p class="ffw fs20p tac" style="width: 80%"><span style="border-bottom:2px solid #000; padding-bottom: 2px;font-size: 19px;margin-left: 100px;">{{title}}</span> <span class="red fs00p"></span></p>
                    <div style="position: absolute;right: 0px;top: 1px;">
                        <Button type="error" id='printBtn' class="printBtn"  @click="print_page()">打印</Button>
                    </div>

                    <div style="height: 40px;position: absolute;right:0px;top: 41px;display: flex;text-align: right;flex-direction: column;">
										<div style=" " class="bcTarget">合约编号:JZYKJHT-YX-XS-{{OrderList.planNo}}</div>
										<div style=" " class="bcTarget mt5p">合同签订地点：东莞市</div>
									</div>


								</div>
							</td>
						</tr>
						<tr><td height="40"></td></tr>
						<tr width="100%">
							<td>
								<table class="table-head" width="100%" border="0" cellspacing="0" cellpadding="0" >
									<tr v-if="this.type==4 || this.type==5">
										<td class="pb5p ">合同生效日期：{{OrderList.deliveryStart}}</td>
										<td class="pb5p tar">合同生效截止日期：{{OrderList.deliveryDeadline}}</td>
									</tr>
									<tr v-else>
										<td class="pb5p ">合同生效日期：{{OrderList.orderDate}}</td>
										<td class="pb5p tar">合同生效截止日期：{{OrderList.deliveryDeadline}}</td>
									</tr>
									<tr class="mt20" v-if="this.type==4 || this.type==5">
										<td class="pb5p ">提货起始日期：{{OrderList.deliveryStart}}</td>
										<td class="pb5p tar">提货截止日期：{{OrderList.deliveryDeadline}}</td>
									</tr>
									<tr class="mt20" v-else>
										<td class="pb5p ">提货起始日期：{{OrderList.deliveryStart}}</td>
										<td class="pb5p tar">提货截止日期：{{OrderList.deliveryDeadline}}</td>
									</tr>
								</table>
							</td>
						</tr>
						<tr><td class="pb5p">1·合同交易双方信息·</td></tr>
						<tr>
							<td>
								<table width="100%" border="1" cellspacing="0" cellpadding="0" >
									<tr><th style="padding:5px 0;width:100px;">供方名称：</th><th >{{OrderList.companyName}}</th><th style="padding:5px 0;width:100px;">需方名称：</th><th>{{OrderList.memberName}}</th></tr>
									<tr><th style="">供方地址：</th><th >{{OrderList.companyAddress}}</th><th >需方地址：</th><th>{{OrderList.memberAddress}}</th></tr>
									<tr><th style="">供方税号：</th><th >{{OrderList.companyTax}}</th><th >需方税号：</th><th>{{OrderList.memberTax}}</th></tr>
									<tr><th style="padding:5px 0;">供方法人：</th><th >{{OrderList.companyCorporation}}</th><th >需方法人：</th><th>{{OrderList.memberCorporation}}</th></tr>
									<tr><th style="padding:5px 0;">供方电话：</th><th >{{OrderList.companyTel}}</th><th >需方电话：</th><th>{{OrderList.memberTel}}</th></tr>
									<tr><th style="padding:5px 0;">供方开户行：</th><th >{{OrderList.companyBank}}</th><th >需方开户行：</th><th>{{OrderList.memberBank}}</th></tr>
									<tr><th style="padding:5px 0;">供方银行账号：</th><th >{{OrderList.companyBankAccount}}</th><th >需方银行账号：</th><th>{{OrderList.memberBankAccount}}</th></tr>
									<tr><th style="padding:5px 0;">经办人：</th><th >{{OrderList.companyOperator}}</th><th >联系人：</th><th>{{OrderList.memberOperator}}</th></tr>
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
<!--										<th>规格型号</th>-->
										<th>数量（吨）</th>
										<th>售价（元/吨）</th>
										<th>税率%</th>
									</tr>
									<tr>
										<th style="padding:5px 0;">{{OrderList.skuName}}</th>
										<th>{{OrderList.manufacturer}}</th>
<!--									<th>{{OrderList.skuType}}</th>-->
										<th>{{OrderList.orderNum}}</th>
										<th>{{OrderList.finalPrice}}</th>
										<th>{{OrderList.taxRate}}</th>
									</tr>
									<tr>
										<th style="padding:5px 0;">含税总金额（元）</th>
										<th>{{OrderList.totalAmount}}元</th>
										<th>总金额大写</th>
										<th colspan="3">{{$utils.moneyFormat(OrderList.totalAmount)}}</th>
									</tr>
								</table>
							</td>
						</tr>
						<tr><td class="pt5p pb5p">3·履约条数·</td></tr>
						<tr>
							<td>
								<table width="100%" border="1" cellspacing="0" cellpadding="0" >
									<tr>
									<th style="padding:5px 0;">履约保证金率</th>
									<th>{{OrderList.marginRatio}}%</th>
									<th>履约保证金金额</th>
									<th colspan="3">{{OrderList.depositAmount}}元</th>
									</tr>
								</table>
							</td>
						</tr>
						<tr><td class="pt5p pb5p">4·付款条款及结算方式·</td></tr>
						<tr>
							<td>
								<table width="100%" border="1" cellspacing="0" cellpadding="0" >
									<tr><th style="padding:5px 0;  width: 140px;">支付方式：</th><th style="    width: 205px;">电汇或银行承兑自贴息</th><th style="    width: 140px;">付款方式：</th><th>款到发货</th></tr>
									<tr><th style="padding:5px 0;">计价方式：</th><th>现货价</th><th>其他约定：</th><th>/</th></tr>
									<tr>
										<th style="padding:5px 0;">支付条款约定：</th>
										<th colspan="3">银行承兑自贴息指需方按照供方要求支付承兑贴息，银行范围及贴息利率按供方要求可接收银行清单范围收取，贴息率按供方当期公开贴息率执行。</th>
									</tr>
								</table>
							</td>
						</tr>
						<tr><td class="pt5p pb5p">5·包装及交提货方式·</td></tr>
						<tr>
							<td>
								<table width="100%" border="1" cellspacing="0" cellpadding="0" >
									<tr>
										<th style="padding:5px 0;width: 140px;">包装方式：</th>
										<th>
											<span>{{OrderList.packingModes}}</span>
										</th>
										<th>运输方式：</th>
										<th>在实际执行订单中确定·</th>
									</tr>
									<tr>
										<th style="padding:5px 0;">装运点：</th>
										<th v-if='OrderList.pointName'>{{OrderList.pointName}}</th>
										<th v-else>待定</th>
										<th>提货仓库：</th>
										<th v-if='OrderList.warehouseName'>{{OrderList.warehouseName}}</th>
										<th v-else>待定</th>
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
							<td style="border-bottom:2px solid #000;padding-bottom:5px; margin-top: 20px;overflow: hidden">7·本合同与后附《合同条款及规则》构成合同整体，一经双方签署，本合同后附《合同条款及规则》即同时生效。</td>
						</tr>
						</tbody>
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
				<div style="page-break-after: always;"></div>
			<div class="PrintArea"   style="font-family:'宋体';margin:0 auto;width: 800px;border: 0px dashed #d3d3d3;">
				<div style="clear:both;position:relative;">
					<div style="text-align: right;margin-right: 50px;" class="bcTarget">合约编号:JZYKJHT-YX-XS-{{OrderList.planNo}}</div>
				<p class="ffw fs20p tac" ><span style="padding-bottom: 2px;font-size: 18px;font-weight: bold;">《合同条款及规则》</span> <span class="red fs00p"></span></p>

				</div>
				<div style="margin: 0 auto;width: 730px;">
<pre style=" width: 100%; margin: 0 auto; overflow: hidden; white-space: pre-wrap;">
<span style="font-weight: bold;">第一条  产品交付：（需方接受供方对产品资源的配置并根据供方开具的提货单进行产品交接）：</span>
1.产品交付方式:
1）需方自行提货的，由需方自派运输工具到供方指定的地点提货，以产品交付需方运输工具为交付点。
2）供方送货的，供方将产品送至需方指定的地点，以产品送至需方指定地点为交付点。
2.在交付点之前产品的风险由供方承担，在交付点之后产品的风险由需方承担。
<span style="font-weight: bold;">第二条  计量及标准：</span>
产品交付数量以供方产品出厂的法定计量为准，如果计量结果超过规定的范围，需方应在24小时内通知供方，供方派人与需方共同计量，所用计量器具必须经过有资质的计量技术机构检定合格，并在有效期内。
<span style="font-weight: bold;">第三条  验收：</span>
1.供需双方共同指定供方产品生产企业质量及计量部门作为货物交货的检验部门。产品交付时，双方共同按规定提取产品样品，以备复检。
2.需方在接收供方产品同时对产品进行确认，如与合同约定不符，须在24小时内向供方提出异议，逾期不提出视为供方所交付的产品符合合同约定。特殊情况由双方协商后妥善解决。
3.在验收期内，如需方认为产品质量或数量不符合合同约定，供需双方共同指定具有国家认可资质的第三方检验机构作为检验方。该方对留样进行复检，复检结果是最终的，双方均受其约束。如检验结果符合合同约定标准，检验费及相关费用由需方承担。否则，检验费由供方承担。
<span style="font-weight: bold;">第四条  保密条款：</span>
供需双方对在履行本合同过程中所知悉的对方的商业秘密（包括但不限于各自提交给对方的合同、文件、资料、数据等或，其他使用对方处于有利竞争地位的信息）负有保密义务。任何一方不得将对方商业秘密披露给任何第三方或不当使用但经，对方书面同意或按法律规定除外。不论本合同是否变更、解除或终止，本合同保密条款将持续有效。
<span style="font-weight: bold;">第五条  保证条款：</span>
1.供方保证：
(1)销售的产品质量符合合同规定的指标要求。
(2)供方已授予其授权代表签署本合同的权利，从生效日开始，本合同的条款对其具有法律约束力。
2.需方保证：
(1)需方是依法定程序设立（自然人）、有效存续、且相关手续完备。
(2)需方已授予其授权代表签署本合同的权利，从生效日开始，本合同的条款对其具有法律约束力。
(3)需方履行相关义务，保证做到合法经营。
<span style="font-weight: bold;">第六条  健康、安全和环境保护：</span>
供需双方须确保在销售、运输、存储、加工、使用等过程中，遵守质量、安全、环境与健康等法律法规及装卸货地的管理规定，并承担质量、安全、环境与健康责任。
<span style="font-weight: bold;">第七条  合同变更与解除：</span>
1.合同双方当事人协商一致可变更或解除本合同。合同变更或解除须采取书面形式。
2.本合同的一方当事人因过错致使合同无法继续履行，无过错方有权解除合同，由此引起的后果由过错方承担。解除合同方在解除合同时，须履行通知对方义务。
<span style="font-weight: bold;">第八条  免责条款：</span>
1. 由于不可抗力，如火灾、地震、台风、洪水等自然灾害及其它不可预见、不可避免、不可克服的事件，或政府行为导致不能完全或部分履行本合同义务，受上述情形影响的一方或双方不承担违约责任但有义务采取措施将造成的损失降低到最低程度。
2.因供方非计划停产、减产、检修使供方产品不能及时交付的，供方不承担责任但应及时通知需方。
<span style="font-weight: bold;">第九条  违约责任：</span>
1.由于不可抗力或其他特殊原因导致供方未能及时履行合同，供方应及时通知需方。如果供方没有及时通知需方，应当承担需方因防止损失扩大而支付的合理费用。
2.需方未按照供需双方约定的日期或数量提货的，供方有权终止合同，同时需方应当承担由此对供方造成的损失。
3.发生其它违约情形，违约方应赔偿由此给对方造成的损失。如属双方过错，应各自承担相应责任。
<span style="font-weight: bold;">第十条  争议解决：</span>
因本合同发生争议，由合同双方当事人协商解决，协商不成的，向供方所在地人民法院提起诉讼。
<span style="font-weight: bold;">第十一条  效力及其它:</span>
1.本合同自双方签字并盖章之日起生效。
2.本合同未尽事宜，由双方当事人协商签订补充协议，补充协议是本合同组成部分，具有同等法律效力，补充协议与本合同内容不一致，以补充协议为准。
3.本合一式贰份，供方执壹份，需方执壹份。
</pre>
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
				/*store.dispatch('spot/getSpotPlanList', {
					current_page: query.page || 1,
					page_size: 6,
					plan_no: query.plan_no ? query.plan_no : ''
				})*/
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
				if(this.type == 1){
					const res = await sendHttp(this, true, server.api.spot.getContractInfo, params, 1)
					this.OrderList = res.data
				}else if(this.type == 2){
							const res = await sendHttp(this, true, server.api.Auction.getContractInfo, params, 1)
							this.OrderList = res.data
				}else if(this.type == 3){
					const res = await sendHttp(this, true, server.api.advance.getContractInfo, params, 1)
					this.OrderList = res.data
				}else if(this.type == 4){
					const res = await sendHttp(this, true, server.api.special.getContractInfo, params, 1)
					this.OrderList = res.data
					
				}else if(this.type == 5){
					const res = await sendHttp(this, true, server.api.special.monthContractInfo, params, 1)
					this.OrderList = res.data
					
				}
			},
			print_page() {
				document.getElementById('printBtn').style.display="none";
				if (!!window.ActiveXObject || "ActiveXObject" in window) {
					remove_ie_header_and_footer();
				}
				window.print();
			},

			remove_ie_header_and_footer() {
				var hkey_root, hkey_path, hkey_key;
				hkey_path = "HKEY_CURRENT_USER\\Software\\Microsoft\\Internet Explorer\\PageSetup\\";
				try {
					var RegWsh = new ActiveXObject("WScript.Shell");
					RegWsh.RegWrite(hkey_path + "header", "");
					RegWsh.RegWrite(hkey_path + "footer", "");
				} catch (e) {}
			}

    },
	mounted() {
		if(this.type==2){
			this.title='化工产品购销（竞拍）合同'
		}else if(this.type==4){
			this.title='化工产品购销（年计划）合同'
		}else if(this.type==5){
			this.title='化工产品购销（月计划）合同'
		}
		this.dataList();
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
	.printBtn{
		line-height: 11px;
		cursor: pointer;
	}
</style>
