<template>
   <div class="clearfix mt20 graybg ovh">
     <div class="w1200 whitebg ovh" style="margin-top: 30px;margin-bottom: 30px;">

       <div class="submit"></div>
       <h1 class="tac fs24 mt25 mb15">订单提交成功</h1>
       <div class="tac fs14">
         <span>订单号：<span>{{orderNo}}</span></span><a class="blueFont ml15">查看详情</a>
       </div>
       <div class="OrderTime" >
         请于<span class="orangeFont ml10 mr10">2019-06-01 17:00</span>前提货，逾期收取仓储费
       </div>
       <div class="OrderTime" style="display: none;">
         我们将按照您指定的地址帮您安排发货
       </div>
       <div class="tac gray">
         <p>如有疑问您可以通过一下联系方式与我们取得联系</p>
         <p>联系电话：4009-000-000</p>
       </div>
       <div class="orderbtn">
         <a class="submitBtn btnBg" @click="submitBtn()">继续采购</a><a class="submitBtn btnBorderBg ml30">我的订单</a>
       </div>
     </div>

   </div>
</template>

<script>
    export default {
        name: "BidersPayCost",
      layout:'SumbitOrderHeader',
      data(){
          return{
                data:{
                    id:'',
                    orderNo:'',
                }
          }
      },
      methods:{
          submitBtn(){
              this.$router.push({name:'special'})
          },
          async Datas(){
              this.orderNo=this.$route.query.orderNo
              this.id=this.$route.query.id
          }

      },
    created(){

    },
    mounted() {
        this.Datas();

    }
    }
</script>

<style scoped>
  /*竞拍--支付全款--页面*/
  .submit{ width: 74px;height: 74px; background: url(../../assets/img/icon.png)no-repeat -7px -519px; margin: 0 auto;margin-top: 70px;}
  .OrderTime{border-top: 1px solid #dedede; width: 30%;margin: 10px auto; padding: 5px; text-align: center; font-size: 14px;}
  .submitBtn{padding: 10px 40px; font-size: 16px;border-radius: 3px;}
  .orderbtn{margin: 40px auto 70px;display: flex;justify-content: center; align-items: center;}
  .btnBg{background-color: #1890ff; color: #fff;border: 1px solid #1890ff; box-sizing: border-box;}
  .btnBorderBg{background-color: #f0f9ff; color: #1890ff; border: 1px solid #1890ff; box-sizing: border-box;}

</style>
