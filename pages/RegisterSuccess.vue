<template>
    <div class="clearfix graybg ovh">
        <div class="w1200 whitebg ovh" style="margin-top: 20px; border-radius: 3px; overflow: hidden;">
          <!--注册进度-->
          <div class="dflexAlemJust" style="margin-top: 65px;">
            <div class="CarrierPro dflexAlem curr" style=" flex-direction: column;  ">
              <div class="CarrierPro_num ">1</div>
              <span>填写注册信息</span>
            </div>
            <div class="lineProgress"></div>
            <div class="CarrierPro dflexAlem curr" style=" flex-direction: column;  ">
              <div class="CarrierPro_num">2</div>
              <span>完善信息</span>
            </div>
            <div class="lineProgress"></div>
            <div class="CarrierPro dflexAlem curr" style=" flex-direction: column;  ">
              <div class="CarrierPro_num">3</div>
              <span>待审核</span>
            </div>
          </div>

          <!--审核成功-->
          <div class="dflexAlemJust" style="margin-top: 60px;">
            <img src="../assets/img/exam_icon.png" />
          </div>
          <div class="fs30 fwb greenFont tac mt10" >待审核！</div>
          <div class="tac mt25 fs16" style=" color: #666;">您的资料已提交，待巨正源工作人员与您确认并核对信息或</div>
          <div class="tac fs16 mt5" style="margin-bottom: 115px; color: #666;">联系工作人员：<span class="orangeFont">4000-000-000</span></div>

        </div>
    </div>
</template>

<script>
    export default {
        name: "RegisterSuccess",
      layout:'membercenter',
      data(){
          return{}
      },
      methods:{},
      mounted(){

      },
    }
</script>

<style scoped>

  .CarrierPro{position: relative;}
  .CarrierPro.curr .CarrierPro_num{background-color: #007de4; color: #fff;}
  .CarrierPro.curr span{color: #007de4;}
  .CarrierPro span{position: absolute;bottom: -25px;width: 90px;text-align: center; color: #666; font-size: 14px;}
  .lineProgress{border: 1px dashed #DEDEDE;width: 20%; margin: 0 5px;}
  .CarrierPro_num{ color: #666; width: 41px;height: 41px; line-height: 41px; text-align: center;font-size: 16px;border-radius: 50%;background-color: #f0f2f5;}
</style>
