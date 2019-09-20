<template>
  <div :class="classes">
    <div class="TopPos" style="display: flex;">
      <div class="slogens">您好，欢迎光临巨正源化工交易网！ <span>|</span>
        <nuxt-link to="/">巨正源首页</nuxt-link>
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
            <a href="/register">登录</a>
          </li>
        </template>
        <li v-for="(item, index) in topmenu" :key="index">
          <nuxt-link :to="item.url">{{ item.name }}</nuxt-link>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
	const prefixCls = 'ant-shortcut'
	import utils from '~/utils/utils'
	import {mapState} from 'vuex'

	export default {
		name: 'shortcut',
		props: {
			showNav: {
				type: Boolean,
				default: true
			}
		},
		computed: {
			...mapState({
				topmenu: state => state.menu.topMenu,
			}),
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
		},
    created() {
		},
		mounted() {
		}
	}
</script>
