<template>
<div class="clearfix">
  <div class="w1200 whitebg ovh" style="margin-top: 20px">
        <div style="margin:40px;">
          <span class="fs18">批次号 : {{qualityText.batchNo}}</span>
          <table class="qualitytable" v-show="false">
            <tbody>
            <tr><td class="qualitytabletitle">牌号</td><td class="pl10">聚丙烯 PPH-E01</td><td class="qualitytabletitle">聚合类型</td><td class="pl10">均聚聚丙烯</td></tr>
            <tr><td class="qualitytabletitle">加工方式</td><td class="pl10">聚丙烯 PPH-E01</td><td class="qualitytabletitle">特性</td><td class="pl10">均聚聚丙烯</td></tr>
            <tr><td class="qualitytabletitle">用途</td><td class="pl10" colspan="3">聚丙烯 PPH-E01</td></tr>
            </tbody>
          </table>
          <div class="qualityImg">
            <img :scr="qualityText.inspectionElc" />
          </div>
        </div>
  </div>
</div>
</template>

<script>
  import { inspectionlistPage } from '../../api/users'
    export default {
        name: "qualitydetail",
      data(){
          return{
            qualityText:''
          }
      },
      methods:{
          async qualityd(){
            let params={
              skuNo:this.$router.history.current.query.skuNo
            }
            let res = await inspectionlistPage(this, params)
             this.qualityText=res.data.items[0]

          }
      },
      mounted() {
        this.qualityd()
        console.log('this.$router',this.$router.history.current.query.skuNo)
      }
    }
</script>

<style scoped>

</style>
