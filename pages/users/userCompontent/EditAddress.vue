<template>
  <div class="Mask" style="display:flex" v-show="Isshowbdedit">
    <div class="Bond_Popup" style="width: 495px;border-radius: 4px; ">
      <div class="TopPopup">
        <div class="fs14">编辑收货地址</div> <div class="PopupClose" @click="Hidden()"></div>
      </div>
      <Form ref="formValidate" :model="formAddress"   >
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
            <Input type="text" class="inputText" v-model="formAddress.phone" placeholder="请输入手机号码"  @on-blur="addressphoneValid"   />
          </FormItem>
        </div>
        <!--手机号码-->
        <div class="qg_text clearfix"><span class="addrTitle">身份证：</span>
          <FormItem prop="idNumber">
            <Input type="text" class="inputText" v-model="formAddress.idNumber" placeholder="请输入身份证"  />
          </FormItem>
        </div>
        <!--国家-->
        <div class="qg_text clearfix"><span class="addrTitle">国家：</span>
          <div class="inputText" style="padding-left: 0px; border: none ;">

            <!--请选择省-->
            <div class="layui-input-inline" style="width: 100%;">
              <Select v-model="formAddress.countryId"  placeholder="请选择国家" @change="countrySelectEdit">
                <Option v-for="(item, index) in countryList"  :value="item.id"  :key="index"  >{{item.name}}</Option>
              </Select>
            </div>

          </div>
        </div>
        <!--选择地址-->
        <div class="qg_text clearfix"><span class="addrTitle">选择地址：</span>
          <div class="inputText" style="padding-left: 0px; border: none ;">
            <!--请选择省-->
            <div class="layui-input-inline">
              <Select v-model="formAddress.state"  placeholder="请选择省"   @on-change="provinceSelect" >
                <Option v-for="(item, index) in provinceList"  :value="item.state"  :key="index">{{item.stateName}}</Option>
              </Select>
            </div>
            <!--请选择市-->
            <div class="layui-input-inline">
              <Select v-model="formAddress.city"  placeholder="请选择市" @on-change="citySelect">
                <Option  v-for="(item, index) in cityList"   :value="item.city"  :key="index" >{{item.cityName}}</Option>
              </Select>
            </div>
            <!-- 请选择县/区-->
            <div class="layui-input-inline">
              <Select v-model="formAddress.district"  placeholder="请选择县/区">
                <Option v-for="(item, index) in distinceList"   :value="item.district"  :key="index"  >{{item.districtName}}</Option>
              </Select>
            </div>
          </div>

        </div>
        <!--详细地址-->
        <div class="qg_text clearfix"><span class="addrTitle">详细地址：</span>
          <FormItem prop="address">
            <Input type="text"  class="inputText"  v-model="formAddress.address"    />
          </FormItem>
        </div>
        <!--详细地址-->
        <div class="qg_text clearfix"><span class="addrTitle">别名：</span>
          <FormItem  >
            <Input type="text" class="inputText"    v-model="formAddress.alias"    />
          </FormItem>
        </div>
        <!--默认地址-->
        <div class="qg_text clearfix"><span class="addrTitle">默认地址：</span>
          <FormItem>
            <i-switch @on-change="defaultchange" />
          </FormItem>
        </div>


        <div class="graybg mt20" style="display: flex; justify-content: center; align-items: center;">
          <div class="submitPrice" @click="submitEditAddress" >确定 </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
  import { countryData, provinceData, cityregionData  } from '../../../api/users'
    export default {
        name: "EditAddress",
        props: ['formAddress'],
      data(){
        // // 收货人姓名
        const validatename = (rule, value, callback) => {
          if (value === '') {
            callback(new Error('收货人姓名不能为空'));
          } else {
            callback();
          }
        };
        //收货人电话
        const validatephone = (rule, value, callback) => {
          if (value === '') {
            callback(new Error('收货人电话不能为空'));
          } else {
            callback();
          }
        };
        //国家
        const validatecountryId=(rule, value, callback) => {
          if (value === '') {
            callback(new Error('国家不能为空'));
          } else {
            callback();
          }
        };
        //身份证号
        const validateidNumber=(rule, value, callback) => {
          if (value === '') {
            callback(new Error('身份证号不能为空'));
          } else {
            callback();
          }
        };
        const validateaddress=(rule, value, callback) => {
          if (value === '') {
            callback(new Error('详细地址不能为空'));
          } else {
            callback();
          }
        };
        return{
          PhoneCheck:false,   //校验手机号
          countryList:'',
          provinceList:'',
          cityList:'',
          distinceList:'',
          Isshowbdedit:'',
          regionId:'',
          formEditAddress:{
            memberId: '',
            name: '',        //收货人姓名
            phone: '',      //收货人电话
            idNumber:'',    //身份证
            countryId:'',   //国家
            state: '',      //省
            stateName:'',
            city: '',       //市
            district: '',   //区县
            address: '',    //详细地址
            defaultAddress: 0,    //设置默认地址
            alias:''             //别名
          },

          ruleValidate: {
            name: [
              { validator: validatename, trigger: 'blur' }
            ],
            phone:[
              { validator: validatephone, trigger: 'blur' }
            ],
            countryId:[
              { validator: validatecountryId, trigger: 'blur' }
            ],
            idNumber:[
              { validator: validateidNumber, trigger: 'blur' }
            ],
            address:[
              { validator: validateaddress, trigger: 'blur' }
            ],
          },


        }
      },
      methods:{
        Hidden(){
          this.$emit('hidden')
        },

        //手机号码
        addressphoneValid(){
          var myreg = /^0?(13[0-9]|14[5-9]|15[012356789]|166|17[0-8]|18[0-9]|19[8-9])[0-9]{8}$/;
          if(!myreg.test(this.formAddress.phone)){
            this.$Notice.warning({
              title: '手机号码格式不正确',
              duration: 5,
              closable: true
            });
            this.formAddress.phone=''
            return
          }
        },

        async countryData(){
          const res = await countryData(this, {})
          console.log('国家_res', res)
          if(res.data){
            this.countryList=res.data
          }
        },

        // 获取省份
        async countrySelectEdit(id){
          console.log('country', id)
          if(id){
            let params={
              countryId:id
            }
            const res = await provinceData(this, params)
            console.log('res', res)
            if(res.data){
              this.provinceList=res.data
            }

          }
        },

        //获取市
        async provinceSelect(id){
          console.log('provinceSelect', id)
          if(id){
            let params={
              parentId:id
            }
            const res = await cityregionData(this, params)
            console.log('res', res)
            if(res.data){
              this.cityList=res.data
            }
            console.log('res', this.formAddress.state)
          }
        },
        //获取区
        async citySelect(id) {
          console.log('citySelect_id', id)
          if (id) {
            let params = {
              parentId: id
            }
            const res = await cityregionData(this, params)
            // console.log('res', res)
            if (res.data) {
              this.distinceList = res.data
            }
          }else{
            this.formAddress.district=''
          }
        },

        // 默认地址
        defaultchange (status) {
          if(status === true){
            this.formAddress.defaultAddress= 1
            this.$Notice.warning({
              title: '设为默认地址',
              duration: 5,
              closable: true
            });
          }else {
            this.formAddress.defaultAddress=0
            this.$Notice.warning({
              title: '取消默认地址',
              duration: 5,
              closable: true
            });
          }
        },
//提交地址
        submitEditAddress(){




          this.$emit('hidden')
        }
      },
      mounted(){
        this.countryData()
        this.provinceSelect(1)
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
  .qg_text{width: 85%;margin: 20px auto 0; display: flex;align-items: center;}
  .addrTitle{width: 25%;text-align: right; font-size: 14px;}
  .inputText{ line-height: 40px;padding-left: 10px;box-sizing: border-box; width: 100%;    border-radius: 3px;   display: flex; padding-left: 0px;}

  .submitPrice{background-color: #007de4; padding: 10px 45px; color: #fff; border-radius: 3px;margin: 15px auto; cursor: pointer;}

  .qg_text .ivu-form-item{width: 100%; margin-bottom: 0;}
  .layui-input-inline{display: flex;margin-left: 5px; width: 33%;}
  .layui-input-inline:first-child{margin-left: 0px;}

  .ivu-input{height: 40px;}
  .ivu-select-single .ivu-select-selection{height: 40px;}
  .ivu-select-single .ivu-select-selection .ivu-select-placeholder, .ivu-select-single .ivu-select-selection .ivu-select-selected-value{height: 40px; line-height: 40px;}

</style>
