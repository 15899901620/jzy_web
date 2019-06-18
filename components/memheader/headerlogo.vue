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
        <div class="  dflexAlem  NavTel" v-if="NavRight">
          <i class="telicon"></i><span>4009-000-000</span>
        </div>
        <!--操作-->
        <div class="dflexAlem gray fs14" style="color: #666;" v-else>
          <span class="bbright pr10 blackFont">东莞市聚福有限公司</span> <a href="#.html" class="blueFont pl10">退出</a>
        </div>


      </div>
    </div>
</template>

<script>
  import Bus from '../Bus'
    export default {
        name: "headerlogo",
      props:{
        PageTitle:String
      },
      data(){

          return{
            Title:'',
           CurreentTitle:'',
            ToTitle:''
          }
      },
      methods:{

        Index(){
          let toindex='user.vue'
          this.$emit('Toindex',toindex)
          this.$router.push({name:'index',params:{to:'user.vue'}})
        },
        NavRight(){
           if(this.$router.history.current.name == 'tendering'){
            return true
          }
        },

      },
      created() {

       },
      mounted() {
      },
      watch: {
        PageTitle: function(newVal, oldVal){
          console.log('newVal', newVal)
          if( newVal =='Tendering'){
            this.CurreentTitle='招标'
          }
          console.log('oldVal', oldVal)
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
