<template>
  <div class="clearfix graybg ovh">
    <div class="w1200 whitebg ovh" style="margin-top: 20px; margin-bottom: 10px;">

      <!--进度-->
      <div class="dflexAlem" style="justify-content: center; margin-top: 40px; font-size: 14px;">
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
        <div class="CarrierPro dflexAlem " style=" flex-direction: column;  ">
          <div class="CarrierPro_num">3</div>
          <span>待审核</span>
        </div>

      </div>

      <div class="carrierInfor_title">开票信息</div>
      <Form ref="formUserInfor" :model="formUserInfor" :rules="ruleCustom">
        <ul class="dflexAlem Carinput" style=" margin-top: 23px; flex-direction: column;justify-content: center;">
          <li>
            <FormItem  prop="username">
              <span class="CarrierTitle" style="margin-left: -29px;"><i class="orangeFont mr5">*</i>公司名称</span>
            <input type="text" v-model="formUserInfor.username" class="CarrierIput" name="" id="" value="" placeholder="请输入公司名称" />
            </FormItem>
          </li>
          <li>
            <FormItem  prop="username">
            <span class="CarrierTitle" style="margin-left: -55px;"><i class="orangeFont mr5">*</i>纳税人识别号</span>
              <input type="text" class="CarrierIput" v-model="formUserInfor.username"  name="" id="" value="" placeholder="请输入纳税人识别号" />
            </FormItem>
          </li>
          <li>
            <FormItem  prop="username">
            <span class="CarrierTitle" style="margin-left: -14px;"><i class="orangeFont mr5">*</i>开户行</span>
            <input type="text" class="CarrierIput" v-model="formUserInfor.username" name="" id="" value=""  placeholder="请输入开户行" />
            </FormItem>
          </li>
          <li>
            <FormItem  prop="username">
            <span class="CarrierTitle"><i class="orangeFont mr5">*</i>账号</span>
            <input type="text" class="CarrierIput" v-model="formUserInfor.username" name="" id="" value="" placeholder="请输入账号" />
            </FormItem>
          </li>
          <li>
            <FormItem  prop="username">
            <span class="CarrierTitle"><i class="orangeFont mr5">*</i>地址</span>
            <input type="text" class="CarrierIput" v-model="formUserInfor.username"  name="" id="" value="" placeholder="请输入详细地址" />
            </FormItem>
          </li>
          <li>
            <FormItem  prop="username">
            <span class="CarrierTitle"><i class="orangeFont mr5">*</i>电话</span>
            <input type="text" class="CarrierIput"  v-model="formUserInfor.username" name="" id="" value=""  placeholder="请输入联系电话" />
            </FormItem>
          </li>
        </ul>
        <div class="carrierInfor_title">基本信息</div>
        <ul class="dflexAlem Carinput" style=" margin-top: 23px; flex-direction: column;justify-content: center;">
          <li>
            <FormItem  prop="username">
            <span class="CarrierTitle" style="margin-left: -14px;"><i class="orangeFont mr5">*</i>联系人</span>
              <input type="text" v-model="formUserInfor.username" class="CarrierIput" name="" id="" value="" placeholder="请输入公司名称" />
            </FormItem>
          </li>
          <li>
            <span class="CarrierTitle" style="margin-left: -66px;"><i class="orangeFont mr5">*</i>营业执照</span>
            <div style="width: 370px; display: flex">
              <FormItem>
                <Upload
                  ref="upload"
                  action="//192.168.40.31:28082/image"
                  :on-success="imageSuccess">
                  <Button icon="ios-cloud-upload-outline">上  传</Button>
                </Upload>
              </FormItem>
              <div class="uploadimg" v-if="formItem.image"><img :src="formItem.image"></div>
            </div>
          </li>
          <li>

            <span class="CarrierTitle" style="margin-left: -64px;"><i class="orangeFont mr5">*</i>授权书</span>

              <div style="width: 370px;">
                <Row>
                  <FormItem>
                  <Col span="12">
                    <Upload action="//jsonplaceholder.typicode.com/posts/">
                      <Button icon="ios-cloud-upload-outline"  >上  传</Button>
                    </Upload>

                  </Col>
                  </FormItem>
                </Row>
              </div>


          </li>
        </ul>
        <div class="dflexAlem mt15" style="justify-content: center;">
          <Button class="CarrierRegister" @click="memberReset('formCustom')">提  交</Button>
        </div>

      </Form>


    </div>

  </div>
</template>

<script>
    export default {
      name: "userPerInfor",
      layout:'membercenter',
      data(){
        const validatePass = (rule, value, callback) => {
          if (value === '') {
            callback(new Error('Please enter your password'));
          } else {
            if (this.formCustom.passwdCheck !== '') {
              // 对第二个密码框单独验证
              this.$refs.formCustom.validateField('passwdCheck');
            }
            callback();
          }
        };
          return{
            formItem:{
              image:[]
            },
            formUserInfor: {
              username: '',
              passwdCheck: '',
              age: ''
            },
            ruleCustom: {
              username: [
                { validator: validatePass, trigger: 'blur' }
              ],
              passwdCheck: [
                { validator: validatePass, trigger: 'blur' }
              ],

            }
          }
      },
      methods:{
        imageSuccess(res){
          console.log('ImgRes', res)
          this.formItem.image.push(res.url)
        },
        // 会员注册提交
        memberReset(data){
          console.log('register')
          this.$router.push({path:'./RegisterSuccess'})
        },

      },
      mounted() {
        console.log('$router',this.$router)
      }
    }
</script>

<style scoped>
  /*注册进度*/
  .CarrierPro{position: relative;}
  .CarrierPro.curr .CarrierPro_num{background-color: #007de4; color: #fff;}
  .CarrierPro.curr span{color: #007de4;}
  .CarrierPro span{position: absolute;bottom: -25px;width: 90px;text-align: center; color: #666;}
  .lineProgress{border: 1px dashed #DEDEDE;width: 20%; margin: 0 5px;}
  .CarrierPro_num{ color: #666; width: 41px;height: 41px; line-height: 41px; text-align: center;font-size: 16px;border-radius: 50%;background-color: #f0f2f5;}

  .carrierInfor_title{display: block; line-height: 50px; font-size: 16px;  padding-left: 125px; margin: 0 90px;height: 50px;background-color: #f8f8f8; margin-top: 80px;}
  .Carinput li{display: flex;align-items: center;margin-top: 20px;}
  .Carinput li .CarrierIput{font-size: 14px;padding-left: 10px;box-sizing: border-box; width: 375px;border-radius: 3px;border: 1px solid #dddddd; height: 42px;line-height: 42px;}
  .Carinput li .codeCarrier{margin-left: 20px;width: 90px; height: 42px; border-radius: 5px; display: flex; align-items: center;}
  .CarrierRegister{margin-top: 30px;margin-bottom: 60px;margin-left: 55px; border-radius:3px;  cursor: pointer;width: 375px;height: 42px;border: none; background-color: #007de4; color: #fff;}

  .CarrierTitle{width: 100px;text-align: right; color: #333; margin-right: 10px; font-size: 14px;}

  .ivu-form-item{margin-bottom: 0px;  }
  .ivu-upload{height: 33px;}
</style>
