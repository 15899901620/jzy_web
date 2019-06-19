<template>
    <div>
      <div class="clearfix tac fs14 ovh" v-bind:style="{backgroundColor:Colorbg,color:trendcolor}">
        <p class="mt30">© 2014-2018东莞巨正源科技有限公司 版权所有 </p>
        <p class="mt5 mb30">经营许可证编号为：粤B2-20150157 备案许可证编号为：沪ICP备14023491号  沪公网安备 31011502005575号</p>
      </div>
    </div>
</template>

<script>
    export default {
        name: "siderfooter",
      data() {
        return{
          Colorbg:'',
          trendcolor:''
        };
      },
      methods:{

      },
      mounted(){
        let bgColor=this.$router.history.current.name
        if(bgColor == 'tendering' || bgColor =='trender-WineBid'){
          this.Colorbg='#6b6b6b',
            this.trendcolor='#fff'
        }else{
          this.Colorbg='#fff',
            this.trendcolor='#aaa'
        }
      }
    }
</script>

<style scoped>

</style>
