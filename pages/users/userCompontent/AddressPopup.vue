<template>
  <div class="Mask" style="display:flex" v-show="Isshowbd">
    <div class="Bond_Popup" style="width: 495px;border-radius: 4px; ">
      <div class="TopPopup">
        <div class="fs14">新增收货地址</div> <div class="PopupClose" @click="Hidden()"></div>
      </div>
      <form  class="layui-form" action="">
        <!--收  货  人-->
        <div class="qg_text clearfix" style="margin-top: 20px;">
          <span class="addrTitle">收  货  人：</span><input type="text" class="inputText" placeholder="请输入姓名"    name="username"    >
        </div>
        <!--身份证号-->
        <div class="qg_text clearfix"><span class="addrTitle">身份证号：</span><input type="text" class="inputText" placeholder="请输入身份证号"    name="username"    >
        </div>
        <!--手机号码-->
        <div class="qg_text clearfix"><span class="addrTitle">手机号码：</span><input type="text" class="inputText" placeholder="请输入手机号码"    name="username"   >
        </div>
        <!--选择地址-->
        <div class="qg_text clearfix"><span class="addrTitle">选择地址：</span>
          <div class="inputText" style="padding-left: 0px; border: none ;">
            <!--请选择省-->
<!--            <div class="layui-input-inline">-->
<!--              <select name="quiz1">-->
<!--                <option value="">请选择省</option>-->
<!--                <option value="浙江" selected="">浙江省</option>-->
<!--                <option value="你的工号">江西省</option>-->
<!--                <option value="你最喜欢的老师">福建省</option>-->
<!--              </select>-->
<!--            </div>-->
            <!--请选择市-->
<!--            <div class="layui-input-inline">-->
<!--              <select name="quiz2">-->
<!--                <option value="">请选择市</option>-->
<!--                <option value="杭州">杭州</option>-->
<!--                <option value="宁波">宁波</option>-->
<!--                <option value="温州">温州</option>-->
<!--                <option value="温州">台州</option>-->
<!--                <option value="温州">绍兴</option>-->
<!--              </select>-->
<!--            </div>-->
            <!-- 请选择县/区-->
<!--            <div class="layui-input-inline">-->
<!--              <select name="quiz3">-->
<!--                <option value="">请选择县/区</option>-->
<!--                <option value="西湖区">西湖区</option>-->
<!--                <option value="余杭区">余杭区</option>-->
<!--                <option value="拱墅区">临安市</option>-->
<!--              </select>-->
<!--            </div>-->

          </div>

        </div>
        <!--详细地址-->
        <div class="qg_text clearfix"><span class="addrTitle">详细地址：</span>
          <textarea name="" class="inputText" rows="" cols=""></textarea>
        </div>
        <div class="graybg mt20" style="display: flex; justify-content: center; align-items: center;">
          <a class="submitPrice">确定</a>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
    export default {
        name: "AddressPopup",
      data(){
        return{
          Isshowbd:''
        }
      },
      methods:{
        Hidden(){
          this.$emit('hidden')
        }
      }
    }
</script>

<style scoped>
  .Mask{display: flex; justify-content: center; align-items: center; position: fixed;z-index: 10; top: 0; width: 100%; height: 100%;background: rgba(0,0,0,0.5);}
  .Bond_Popup{ width: 415px; background-color: #fff; border-radius: 3px;}
  .Bond_Popup .TopPopup{display: flex; justify-content: space-between; align-items: center; padding: 10px 30px; color: #666;background-color: #f9f9f9;}
  .Bond_Popup .TopPopup .PopupClose{ width: 13px;height: 13px; background: url(../../../assets/img/icon.png)no-repeat 0px -135px;}
  .LowPrice{ margin-top: 25px;}
  .Bond_Popup_title{margin-left: 80px;color: #333;}
  .unit{position: absolute;right: 10px; line-height: 30px; color: #999; }
  .InputNum{padding-left: 10px;box-sizing: border-box;background-color: #f4f4f4;border: 1px solid #dddddd; line-height: 30px;border-radius: 3px;}
  .Bond_Popup .PricePopup{border-radius: 3px; border: 1px solid #ff7300;margin: 0 30px; background-color: #fffdee; margin-top: 20px;}
  .Bond_Popup .PricePopup .PricePopup_title{width: 120px;text-align: right;}
  .Bond_Popup .PricePopup .PricePopup_btn{ text-decoration: none; padding: 6px 15px;background-color: #ff7300; color: #fff; margin-left: 20px; border-radius: 3px;}


  .qg_text:first-child{margin-top: 10px;}
  .qg_text{width: 85%;margin: 10px auto; display: flex;align-items: center;}
  .addrTitle{width: 25%;text-align: right; font-size: 14px;}
  .inputText{ line-height: 32px;padding-left: 10px;box-sizing: border-box; width: 90%; border: 1px solid #dddddd;  border-radius: 3px;}

  .submitPrice{background-color: #007de4; padding: 10px 45px; color: #fff; border-radius: 3px;margin: 15px auto;}
</style>
