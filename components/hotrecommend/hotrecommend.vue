<template>
  <div :class="classes">
    <div class="dflex mt25" style="justify-content: center;" v-if="$store.state.memberToken">
      <div class="indexHead" @click="User" style="margin-left: 16px">
        <template v-if="$store.state.memberInfo.avatar">
          <img :src="$store.state.memberInfo.avatar"/>
        </template>
        <template v-else>
          <img src="../../static/img/index_head.png" />
        </template>
      </div>
      <div class="ml10" style="width: 66%;">
        <p class=" ">HI {{$store.state.memberInfo.phone}},上午好！</p>
        <p class="gray">欢迎来到巨正源科技交易平台!</p>
      </div>
    </div>
    <div class="dflex mt25" style="justify-content: center;" v-else>
      <div class="indexHead" @click="User" style="margin-left: 16px"><img src="../../static/img/index_head.png"/></div>
      <div class="ml10" style="width: 66%;" >
        <p class=" ">HI,上午好！</p>
        <p class="gray" style="width: 88%">
          欢迎来到巨正源科技交易平台!</p>
      </div>
    </div>
    <div class="loginReg mt10" v-if="!$store.state.memberToken">
      <a href="/login" class="loginbg">登 录</a>
      <a href="/register" class="registerbg ml10">注 册</a>
    </div>
    <div v-else class="loginReg mt10">
      <div @click="User" class="registerbg ml10"
           style="padding:2px 10px;cursor: default; border:1px solid #ddd;  border-radius:3px;">会员中心
      </div>
      <div @click="logout" class="registerbg ml10"
           style="padding:2px 10px;cursor: default; border:1px solid #ddd;  border-radius:3px;">退出登录
      </div>
    </div>
    <slot></slot>
  </div>
</template>
<script>
	const prefixCls = 'ant-hotrecommend'

	import utils from '~/utils/utils'

	export default {
		name: 'hotrecommend',
		data() {
			return {
			}
		},
		computed: {
			classes() {
				return [
					`${prefixCls}`,
					{[`${prefixCls}-hotrecommend`]: this.vertical},
				];
			},
		},
		methods: {
			User() {
				if (this.$store.state.memberToken) {
					location.href = '/users/user'
				} else {
					location.href = '/login'
				}
			},

			logout() {
				utils.memberLogout()
			}
		}
	}
</script>
