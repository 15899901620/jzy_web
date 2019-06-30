<template>
    <div class="whitebg">
      <!--头部-logo/搜索/电话-->
      <div class="w1200"  style="display: flex; justify-content: space-between;">

        <div class="dflexAlem"  >
          <!--logo-->
          <div class="mt20 mb20" style="border-right: 1px solid #D2D2D2; padding-right: 30px;" @click="Index">
            <img src="../../assets/img/logo.png"/>
          </div>
          <div class="fs20 pl25 gray">{{CurreentTitle}} </div>
        </div>
        <!--电话-->
        <div class="dflexAlem  NavTel"  v-if="NavTel">
          <i class="telicon"></i><span>4009-000-000</span>
        </div>
        <!--操作-->
        <div class="dflexAlem gray fs14" style="color: #666;" v-else>
          <span class="bbright pr10 blackFont" >已有账号？</span>
          <nuxt-link  class="blueFont pl10" :to="{name:'login'}">直接登录</nuxt-link>
        </div>


      </div>
    </div>
</template>

<script>
    export default {
        name: "headerlogo",
      props:{
        PageTitle:String
      },
      data(){
          return{
            Title:'',
            CurreentTitle:'',
            ToTitle:'',
            NavTel:false
          }
      },
      methods:{

        Index(){
          let toindex='user.vue'
          this.$emit('Toindex',toindex)
          this.$router.push({name:'help.vue',params:{to:'user.vue'}})
        },
        NavRight(){
          var that=this
          if(that.$router.history.current.name == 'register'){
            this.CurreentTitle='注册'
          }
          if(that.$router.history.current.name == 'users-user'){
            this.CurreentTitle='会员中心'
          }
          if(that.$router.history.current.name == 'users-useradvsale'){
            this.CurreentTitle='我的预售'
          }
          if(that.$router.history.current.name == 'users-usertotalorder'){
            this.CurreentTitle='全部订单'
          }
          if(this.$router.history.current.name == 'tendering' || this.$router.history.current.name == 'register'){
             this.NavTel=false
          } else {
             this.NavTel=true
          }
        },

      },
      created() {

       },
      mounted() {
        window.addEventListener('hashchange', () => {
        })
        this.NavRight()
      },
      watch: {

        PageTitle: function(newVal, oldVal){
          if( newVal =='Tendering'){
            this.CurreentTitle='招标'
          }
        }
      }
    }
</script>

<style scoped>
   .blackFont{color: #666;}
  .blueFont{}

   /*电话*/
   .NavTel{font-size: 20px;font-weight: bold;color: #ff7300;}
   .telicon{ height: 30px;width: 30px; background: url(../../assets/img/icon.png)no-repeat -3px -33px; margin-right: 10px}
</style>
