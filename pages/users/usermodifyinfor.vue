<template>
  <div class="clearfix graybg">
    <div class="w1200 dflex " style="margin-bottom: 40px">
      <userright></userright>

      <div class="memberInfor ml20  whitebg bdccc  mt20">
        <h1 class="fs16 ml25 mt25 bb1 pb10" >完善信息</h1>
        <!--基本信息-->
        <ul class="inforList">
          <div class="inforTitle">基本信息</div>
          <li>
            <span class="titleInfor">企业名称</span><span class="blackFont fs14">上海塑创电子商务有限公司</span>
          </li>
          <li style="align-items: inherit;">
            <span class="titleInfor mt10" >营业执照</span>
            <div class="dflex" style="flex-direction: column;">
              <div class="pr dflex">
                <div class="inputUp" ></div>
                <div class="upBtn">上传</div>
                <input type="file" class="fileup" name="" id="" value="" />
              </div>

              <ul class="inforImg dflex mt20">
                <li> </li>
              </ul>
            </div>

          </li>
          <li>
            <span class="titleInfor" >企业授权书</span><span class="blackFont fs14">查看授权书.docx</span><a href="#.html" class="ml10 blueFont">删除</a>
          </li>
        </ul>
        <!--开票信息-->
        <ul class="inforList">
          <div class="inforTitle">开票信息</div>
          <li>
            <span class="titleInfor">公司名称</span><span class="blackFont fs14">上海塑创电子商务有限公司</span>
          </li>
          <li>
            <span class="titleInfor">纳税人识别号</span><span class="blackFont fs14">1222322522131212125</span>
          </li>
          <li>
            <span class="titleInfor">开户行</span><span class="blackFont fs14">中国工商银行</span>
          </li>
          <li>
            <span class="titleInfor">账号</span><span class="blackFont fs14">4421215411444</span>
          </li>
          <li>
            <span class="titleInfor">地址</span><span class="blackFont fs14">上海市浦东新区环桥路555弄</span>
          </li>
          <li>
            <span class="titleInfor">电话</span><span class="blackFont fs14">18238915263@qq.com</span>
          </li>
        </ul>
        <!--联系人信息-->
        <ul class="inforList mb30">
          <div class="inforTitle">联系人信息</div>
          <li>
            <span class="titleInfor">昵称</span> <span class="blackFont fs14">dveasd</span>
          </li>
          <li>
            <span class="titleInfor">联系人</span><span class="blackFont fs14">dveasd</span>
          </li>
          <li>
            <span class="titleInfor">电话</span><span>021-85632156</span>
          </li>
          <li>
            <span class="titleInfor">座机</span><span class="blackFont fs14">021-85632156</span>
          </li>
          <li>
            <span class="titleInfor">邮箱</span><span class="blackFont fs14">18238915263@qq.com</span>
          </li>

        </ul>
        <button class="saveInfor fs14">修改信息</button>
      </div>




    </div>
  </div>
</template>

<script>
  import userright from './userCompontent/userright'

  export default {
        name: "usermodifyinfor",
    layout:'membercenter',
    components:{
      userright
    }
    }
</script>

<style scoped>
  .memberInfor{width: 100%}

  .inforList{margin-left: 25px; margin-top: 30px;}
  .inforList li{margin-left: 35px;margin-top: 20px; display: flex;align-items: center;}
  .inforTitle{border-left: 2px solid #007de4;padding-left: 5px; font-weight: bold;color: #007de4;}
  .titleInfor{width: 85px;color:#999; margin-right: 25px; text-align: right; font-size: 14px; }
  .inforInput{width: 340px;height: 36px;border-radius: 3px;border: 1px solid #DEDEDE; padding-left: 10px;
    box-sizing: border-box;}
  .fileup{position: absolute;width: 90px;   height: 36px;right: 0;opacity: 0;}
  .upBtn{    width: 90px;   height: 36px; background-color: #007de4; line-height: 36px;
    text-align: center; color: #fff; border-top-right-radius: 3px;border-bottom-right-radius: 3px; }
  .inputUp{    border-bottom-right-radius: 0; border-top-right-radius: 0;box-sizing: border-box; width: 253px; height: 36px;border-radius: 3px;border: 1px solid #DEDEDE;}
  /*营业执照*/
  .inforImg li:first-child{margin-left: 0;}
  .inforImg li{margin-left: 10px; margin-top: 0;}

  .saveInfor{color: #fff;background-color: #007de4;border: none;    padding: 9px 40px;border-radius: 5px;margin-left: 173px;margin-bottom: 40px;}
</style>
