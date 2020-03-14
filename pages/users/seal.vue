<template>
  <div class="clearfix  graybg">
    <div class="w1200 dflex " style="margin-bottom: 40px;">
      <usernav></usernav>
      <div class="memberInfor ml20 whitebg bdccc mt20">
        <h1 class="fs16 ml25 mt25 pb10 pr" style="border-bottom: 2px solid #DEDEDE;width: 95%;" >电子签章
          <div class="bodbottom" style="width: 8%; height: 2px;"></div>
        </h1>

        <div class="" style="width: 95%; margin: 0 auto;">
          <template v-if="!sealInfo || sealInfo.fddMemberId == ''">
            <Button title="开通电子签章" @click='addRegister()' size="small">开通电子签章</Button>
          </template>
          <template v-else-if="sealInfo.status == 0">
            <Button title="实名认证" @click='verify(sealInfo.verifyUrl)' size="small">进行实名认证</Button>
          </template>
          <template v-else>
            <span>{{sealInfo.status}}</span>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
	import Navigation from '../../components/navigation'
  import {mapState} from 'vuex';
	import server from '../../config/api'

	export default {
		name: 'seal',
		layout: 'membercenter',
		middleware: 'memberAuth',
		components: {
      usernav: Navigation.user
		},
		fetch({store}) {
			return Promise.all([
				//获取顶部、中部、底部导航信息
				store.dispatch('common/getNavList'),
				//获取系统配置
				store.dispatch('common/getSysConfig'),
				//获取电子签章情况
				store.dispatch('member/getSealInfo'),
			])
		},
		computed:{
			...mapState({
				sealInfo: state => state.member.sealInfo,
			})
		},
		data() {
			return {
			}
		},
		methods: {
			async addRegister() {
				await this.$utils.sendCurl(this, server.api.seal.register, {}).then(response => {
          location.reload()
				})
			},
			async verify(url){
				if(url){
					window.open(url)
        }else{
					let res = await this.$utils.sendCurl(this, server.api.seal.getVerifyUrl, {})
					if(res.status === 200 && (res.data.errorcode || 0) == 0){
						window.open(res.data)
					}
        }
			}
		},
		mounted() {
    }
	}
</script>
<style lang="less" scoped>
  .head{
    img{
      width: 100%;height: 100%;
    }
  }

</style>
