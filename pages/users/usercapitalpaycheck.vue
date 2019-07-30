<template>
  <div class="clearfix graybg">
    <div class="w1200 dflex " style="margin-bottom: 40px">
      <userright></userright>
      <div class="" style="width: 100%">
        <div class="memberInfor ml20  whitebg bdccc  mt20">

          <!--资金管理-->
          <div class="TableList">
            <h1 class="fs16 mt20 bb1 pb10">余额充值</h1>
          </div>

          <div class="TableList">
            <div class="mt30 fs14">请汇款至以下账户</div>
            <div style="background-color: #fefdee;    margin: 20px auto;  border: 1px solid #f8e5bb;">
              <ul class="SpotGoods">
                <li>品种：<span>PP</span></li>
                <li>牌号：<span>F08</span></li>
                <li>厂商：<span>巨正源</span></li>
                <li>单价：<span>￥10550.00</span>元</li>
                <li>购买数量：<span>102.098</span>吨</li>
              </ul>
              <div class="ml20 mt10 mb20 fs12">
                注意：请务必在汇款银行单据的备注中注明以下字样： “付巨正源平台交易-充值余额”
              </div>
            </div>
          </div>

          <div class="TableList">
            <h1 class="fs16 mt20 bb1 pb10">汇款凭证</h1>
          </div>
          <div class="dflexAlem ml20 mt25">
            <span>上传凭证</span>

            <div class="dflexAlem pr ml15">
              <div class="upBorder"></div>
              <div class="addbtn">添加附件</div>
              <input type="file"  class="upImg" />
              <ul class="listIMG"  >
                <li><img src="img/fileImg.png"/></li><li><img src="img/fileImg.png"/></li><li><img src="img/fileImg.png"/></li>
              </ul>
            </div>

          </div>

          <div style="margin-left: 90px;" >
            <p class="mt5 fs12">注:请上传JPG,PNG等图片格式，大小10M以内</p>
            <div class="submitImg">提交</div>
          </div>



        </div>
      </div>





    </div>

    </div>
</template>

<script>
  import userright from './userCompontent/userright'
    export default {
        name: "usercapitalpaycheck",
      layout:'membercenter',
      components:{
        userright
      },
    }
</script>

<style scoped>
  .TableList {
    width: 95%;
    margin: 0 auto;
  }
  .memberInfor {width: 970px; height: 100%;}
  .SpotGoods {display: flex;margin-left: 25px;margin-top: 25px; font-size: 14px;}
  .SpotGoods li {margin-left: 20px;}
  .SpotGoods li:first-child {margin-left: 0;}
  .SpotGoods li span {color: #ff7300;}
  .upBorder {border: 1px solid #DEDEDE;width: 228px;height: 34px;line-height: 34px;box-sizing: border-box;}
  .addbtn {text-align: center;line-height: 35px;color: #fff;width: 85px;height: 34px;background-color: #ff7300;border-top-right-radius: 3px;border-bottom-right-radius: 3px;}
  .listIMG {display: flex;align-items: center;}
  .listIMG li {width: 54px;height: 34px;margin-left: 15px;}
  .upImg {width: 85px;line-height: 34px;position: absolute;right: 0;opacity: 0;}
  .submitImg {cursor: pointer;margin-top: 20px;display: inline-block;color: #fff;background-color: #007de4;padding: 5px 24px;border-radius: 3px;}
</style>
