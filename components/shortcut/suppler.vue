<template>
  <div :class="classes">
    <div class="TopPos" style="display: flex;">
      <div class="slogens">您好，欢迎来到巨正源科技官方交易平台！ <span>|</span>
        <a href="/">首页</a>
      </div>
      <ul class="topnavlist" v-if="showNav">
        <template v-if="$store.state.supplierInfo">
          <li :key="98"><span style="color:#999">您好! </span>{{$store.state.supplierInfo.phone}}【{{$store.state.supplierInfo.username}}】 <span
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
        <li v-for="(item, index) in $store.state.common.nav.topNav" :key="index">
          <a :href="item.url">{{ item.name }}</a>
        </li>
      </ul>
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
			}
		},
		methods: {
			logout() {
				utils.setCoolies('userinfor', '')
				utils.setCoolies('memberInfo', '')
				utils.setCoolies('webtoken', '')
				utils.setCoolies('websuppliertoken', '')
				location.href = '/'
			}
		}
	}
</script>
