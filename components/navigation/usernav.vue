<template>
  <div class="memberList whitebg mt20">
    <div class="theads">
      <Icon type="md-contact"/>
      <router-link to="/users/user">会员中心</router-link>
    </div>
    <ul class="mt25" v-for="(item, index) in nav" :key="index" style="margin-bottom:18px;">
      <h1>{{item.name}}</h1>
      <li v-for="(items,k) in item.children" :key="k" :class="[ item.url  == selected ? 'curr' : ' ']">
        <router-link :to="items.path">{{items.name}}</router-link>
      </li>
    </ul>
  </div>
</template>

<script>
	export default {
		name: "usernav",
		data() {
			return {
				nav: [
					{
						name: '合约管理',
						children: [
							{
								path: '/users/userPlanBill',
								name: '待办事项'
							},
							{
								path: '/users/spotPlan',
								name: '现货合约'
							},
							{
								path: '/users/auctionPlan',
								name: '竞拍合约'
							},
							{
							  path: '/users/advancePlan',
							  name: '预售合约'
              				},
							{
								path: '/users/userSpecmat',
								name: '年计划'
							},
							{
								path: '/users/monthadd',
								name: '可添加月计划'
							},
						]
					},
					{
						name: '订单列表',
						children: [
							{
								path: '/users/usertotalorder',
								name: '全部订单'
							},
						]
					},
					{
						name: '其它服务',
						children: [
							{
								path: '/users/userseek',
								name: '求购信息'
							},
							{
								path: '/users/userlog',
								name: '物流管理'
							},
						]
					},
					{
						name: '资金管理',
						children: [
							{
								path: '/users/usercapitalmanage',
								name: '我的资金'
							},
							{
								path: '/users/investCapital',
								name: '立即充值'
							},
							{
								path: '/users/ContractDeposit',
								name: '合约保证金'
							},
							{
								path: '/users/AutionDeposit',
								name: '竞拍保证金'
							},
							{
								path: '/users/memberDefaults',
								name: '违约单'
							},
						]
					},
					{
						name: '账号管理',
						children: [
							{
								path: '/users/usermodifyinfor',
								name: '完善信息'
							},
							{
								path: '/users/seal',
								name: '电子签章'
							},
							{
								path: '/users/userCodeManage',
								name: '密码管理'
							},
							{
								path: '/users/userAddress',
								name: '收货地址'
							},
							{
								path: '/users/usereditphone',
								name: '换绑手机号'
							},
							{
								path: '/users/bindBank',
								name: '绑定银行卡'
							}
						]
					}
				]
			}
		},
		computed: {
			selected() {
				return !this.$route.path ? '/' : this.$route.path
			}
		},
	}
</script>
