<template>
	<div class="body">
		<Header title="头部"></Header>
		<div class="container" title="内容区块">
			<div class="tac">
				<img src="../static/img/logisticsBanner.png" />
			</div>
			<!--询价找车-->
			<div class="inquirybg">
				<div class="inquiryCar">
					<h2>询价找车</h2>
					<ul class="inquiryList">
						<li>
							<div class="inquiryTitle iconbg01">装点</div>
						</li>
						<li>
							<div class="inquiryTitle iconbg02">卸点</div>
						</li>
						<li>
							<div class="inquiryTitle iconbg03">货物</div>
						</li>
						<li>
							<div class="inquiryTitle iconbg04">吨位</div><input type="text" class="inquiryText" name=""
								id="" value="" />
						</li>
					</ul>
					<p class="tac mt40">一键委托，一对一保姆式服务</p>
					<div class="inquiryFree">查询运价</div>
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
							<li>
								<div class="dflexAlem" style="justify-content: space-between;">
									<span class="fwb">上海春万实业有限公司</span><span class="gray">03-27 16:53</span></div>
								<div class="dflexAlem mt5" style="justify-content: space-between;">
									<span class="gray">上海市-宁波市 <span class="orangeFont">50.15吨</span></span><span
										class="greenFont">已接单</span>
								</div>
							</li>
							<li>
								<div class="dflexAlem" style="justify-content: space-between;"><span
										class="fwb">上海春万实业有限公司</span><span class="gray">03-27 16:53</span></div>
								<div class="dflexAlem mt5" style="justify-content: space-between;">
									<span class="gray">上海市-宁波市 <span class="orangeFont">50.15吨</span></span><span
										class="greenFont">已接单</span>
								</div>
							</li>
							<li>
								<div class="dflexAlem" style="justify-content: space-between;">
									<span class="fwb">上海春万实业有限公司</span><span class="gray">03-27 16:53</span></div>
								<div class="dflexAlem mt5" style="justify-content: space-between;">
									<span class="gray">上海市-宁波市 <span class="orangeFont">50.15吨</span></span><span
										class="greenFont">已接单</span>
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
							<div class="serivceImg"><img src="../static/img/service_01.png" /></div>
							<div class="tac fs16 fwb">平台支撑</div>
							<div class='lineService'></div>
							<div class="tac mb30 gray fs14">拥有专业的团队</div>
						</li>
						<li>
							<div class="serivceImg"><img src="../static/img/service_02.png" /></div>
							<div class="tac fs16 fwb">利益保障</div>
							<div class='lineService'></div>
							<div class="tac mb30 gray fs14">降低运输成本</div>
						</li>
						<li>
							<div class="serivceImg"><img src="../static/img/service_03.png" /></div>
							<div class="tac fs16 fwb">快捷省时</div>
							<div class='lineService'></div>
							<div class="tac mb30 gray fs14">下单方便省时省心</div>
						</li>

						<li>
							<div class="serivceImg"><img src="../static/img/service_04.png" /></div>
							<div class="tac fs16 fwb">提升效率</div>
							<div class='lineService'></div>
							<div class="tac mb30 gray fs14">实时物流资源在线</div>
						</li>
						<li>
							<div class="serivceImg"><img src="../static/img/service_05.png" /></div>
							<div class="tac fs16 fwb">客服验证</div>
							<div class='lineService'></div>
							<div class="tac mb30 gray fs14">巨正源实名认证车队</div>
						</li>
					</ul>

				</div>


			</div>

		</div>
		<Footer size="default" title="底部" style="margin-top:18px;"></Footer>
	</div>
</template>

<script>
	// Logisticslist
	import Logisticslist from '../components/logistics-list/logistics-list'
	import {
		mapState
	} from 'vuex'
	import Header from '../components/header'
	import Footer from '../components/footer'
	export default {
		name: "logistics",
		components: {
			Header,
			Footer,
			Logisticslist
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
		background: url(../static/img/car_icon.png)no-repeat 0px 0px;
	}

	.iconbg02 {
		background: url(../static/img/car_icon.png)no-repeat 0px -21px;
	}

	.iconbg03 {
		background: url(../static/img/car_icon.png)no-repeat 0px -43px;
	}

	.iconbg04 {
		background: url(../static/img/car_icon.png)no-repeat 0px -67px;
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
