<template>
  <div :class="classes">
    <div class="TopPos" style="display: flex; position: relative;">
      <div class="slogens">您好，欢迎来到巨正源科技官方电商平台！ <span>|</span>
        <a href="/">首页</a>
      </div>
      <ul class="topnavlist" v-if="showNav">
        <template v-if="$store.state.memberToken">
          <li :key="98"><span style="color:#999">您好! </span>{{$store.state.memberInfo.phone}}【{{$store.state.memberInfo.username}}】 <span
              @click="logout">[ 退出 ]</span></li>
        </template>
        <template v-else>
          <li :key="99">
            <a href="/login">登录</a>
          </li>
          <li :key="97">
            <a href="/register">注册</a>
          </li>
        </template>
			<li>
		  <a href="/users/user">会员中心</a>
			</li>
        <li v-for="(item, index) in this.topNav" :key="index">
          <a :href="item.url">{{ item.name }}</a>
        </li>
      </ul>
      <div style="position: absolute; right: -107px; "><a style="display: flex; align-items: center;" href="https://gws.ejzy.cn/" target="_blank"><img src="../../static/img/english.png" height="15"/><span class="ml5">English</span> </a></div>
    </div>
  </div>
</template>
<script>
	const prefixCls = 'ant-shortcut'
	import utils from '~/utils/utils'

	export default {
		name: 'shortcut',
		props: {
			showNav: {
				type: Boolean,
				default: true
			},
			topNavProp: {
				type: Array
			}
		},
		computed: {
			classes() {
				return [
					`${prefixCls}`,
					{[`${prefixCls}-shortcut`]: this.vertical},
				];
			},
		},
		data() {
			return {
				topNav : this.topNavProp || this.$store.state.common.nav.topNav
			}
		},
		methods: {
			logout() {
				utils.setCoolies('userinfor', '')
				utils.setCoolies('supplierInfor', '')
				utils.setCoolies('memberInfo', '')
				utils.setCoolies('webtoken', '')
				utils.setCoolies('websuppliertoken', '')
				location.href = '/'
			}
		}
	}
</script>
