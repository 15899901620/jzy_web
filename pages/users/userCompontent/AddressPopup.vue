<template>
  <div class="Mask" style="display:flex" v-show="Isshowbd">
    <div class="Bond_Popup" style="width: 495px;border-radius: 4px; ">
      <div class="TopPopup">
        <div class="fs14">新增收货地址</div> <div class="PopupClose" @click="Hidden()"></div>
      </div>
      <Form    ref="formValidate" :model="formAddress" :rules="ruleValidate" >
        <!--收  货  人-->
        <div class="qg_text clearfix" style="margin-top: 20px;">
          <span class="addrTitle">收  货  人：</span>
          <FormItem prop="name">
            <Input  type="text" class="inputText" v-model="formAddress.name" placeholder="请输入姓名"  />
          </FormItem>
        </div>
        <!--手机号码-->
        <div class="qg_text clearfix"><span class="addrTitle">手机号码：</span>
          <FormItem prop="phone">
            <Input type="text" class="inputText" v-model="formAddress.phone" placeholder="请输入手机号码"  />
          </FormItem>
        </div>
        <!--国家-->
        <div class="qg_text clearfix"><span class="addrTitle">国家：</span>
          <div class="inputText" style="padding-left: 0px; border: none ;">
            <!--请选择省-->
            <div class="layui-input-inline" style="width: 100%;">
              <Select v-model="formAddress.Country"  placeholder="请选择国家">
                <Option  >国家</Option>
              </Select>
            </div>
          </div>
        </div>
        <!--选择地址-->
        <div class="qg_text clearfix"><span class="addrTitle">选择地址：</span>
          <div class="inputText" style="padding-left: 0px; border: none ;">
            <!--请选择省-->
            <div class="layui-input-inline">
              <Select v-model="formAddress.state"  placeholder="请选择省">
                 <Option>省</Option>
              </Select>
            </div>
            <!--请选择市-->
           <div class="layui-input-inline">
              <Select v-model="formAddress.city"  placeholder="请选择市">
                 <Option>市</Option>
              </Select>
            </div>
            <!-- 请选择县/区-->
            <div class="layui-input-inline">
                <Select v-model="formAddress.district"  placeholder="请选择县/区">
                  <Option>县/区</Option>
                </Select>
             </div>

          </div>

        </div>
        <!--详细地址-->
        <div class="qg_text clearfix"><span class="addrTitle">详细地址：</span>
          <FormItem prop="address">
             <Input type="text" class="inputText"    v-model="formAddress.address"    />
          </FormItem>
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
          Isshowbd:'',
          formAddress:{
            province:'', //省
            city:'',     //市
            county:'',      //区县
            detailAddress:'',//详细地址
          },
          ruleValidate: {

          },


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
  .inputText{ line-height: 32px;padding-left: 10px;box-sizing: border-box; width: 90%;    border-radius: 3px;   display: flex; padding-left: 0px;}

  .submitPrice{background-color: #007de4; padding: 10px 45px; color: #fff; border-radius: 3px;margin: 15px auto;}


  .layui-input-inline{display: flex;margin-left: 5px; width: 33%;}
  .layui-input-inline:first-child{margin-left: 0px;}
</style>
