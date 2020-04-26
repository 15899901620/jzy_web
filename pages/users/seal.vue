<template>
  <div class="clearfix graybg"  >
    <div class="w1200 dflex" style="margin-bottom: 40px;">
      <usernav></usernav>
      <div class="memberInfor ml20 whitebg bdccc mt20">
        <h1 class="fs16 ml25 mt25 pb10 pr" style="border-bottom: 2px solid #DEDEDE;width: 95%;">
          电子签章
          <div class="bodbottom" style="width: 8%; height: 2px;"></div>
        </h1>

        <div class style="width: 95%; margin: 20px auto;"> 
            <div class="Steps">
              <template>
                <Steps :current="step" >
                    <Step title="开通电子签章" content=''></Step>
                    <Step title="实名认证"  content=''></Step>
                    <Step title="上传印章"  content=''></Step>
                    <Step title="成功开通"  content=''></Step>
                </Steps>   
              </template> 
            </div>   
          <div style="margin-top: 20px;">  
            <template v-if="step == 0">
              <div style=" display:flex;justify-content:center">
                <Button type="primary" title="开通电子签章" @click="addRegister()" size="large">开通电子签章</Button>
              </div> 
            </template>
            <template v-else-if="step == 1">
              <div style=" display:flex;justify-content:center">
                <Button v-if="this.sealInfo.status == 3" type="primary" title="实名认证" @click="verify(sealInfo.verifyUrl)" size="large">资料已提交,待审核</Button>
                <Button v-else-if="this.sealInfo.status == 5" type="primary" :title="this.sealInfo.auditFaile" @click="verify(sealInfo.verifyUrl)" size="large">实名不通过,重新实名</Button>
                <Button v-else-if="this.sealInfo.status == 6" type="primary" title="实名认证" @click="verify(sealInfo.verifyUrl)" size="large">审核已通过,填写收款金额</Button>
                <Button v-else type="primary" title="实名认证" @click="verify(sealInfo.verifyUrl)" size="large">进行实名认证</Button>
              </div> 
            </template>
            <template v-else-if="step == 2">
              <div style="text-align: center;"><span style="font-size: 20px;">上传印章二选一</span></div>
              
              <div class="demo-split">
                <Split>
                  <div slot="left" class="demo-split-seal">
                    <div style="padding-left: 40px;font-weight: bold;color: red;">请制作上传实际印章大小的(直径约4cm)、背景透明的png格式图片</div>
                    <div style="display: flex;align-items: flex-end;">
                      <Upload
                        ref="upload"
                        action="/api/upload/image"
                        :on-success="handleUpdateSourceFile"
                        accept=".png"
                        :format="['png']"
                        :on-format-error="handleFormatError"
                        :max-size="2048">
                        <template v-if="signatureImg">
                          <img class='uploadImg' style="padding:0" :src="signatureImg"  width="166" height="166"/>
                        </template>
                        <template v-else>
                          <div class='uploadImg'><Icon type="ios-add" color='#ccc'  size='60'/>上传</div> 
                        </template>
                      </Upload>
                      <Button type="primary" title="上传印章" @click="updateSignature(1)" size="large" style="width:30%; height:40px; margin-left:27px">提交</Button>
                    </div>
                  </div>
                  <div slot="right" style="height: 100%;">
                    <div style="padding-left: 40px;font-weight: bold;color: red;">在线生成的电子印章有同等法律效应</div>
                    <div class="demo-split-pane">
                      <Input v-model="signatureValue" placeholder="请输入印章内容" disabled style="width:60%;"/>
                      <Button class='mt20' type="primary" title="在线生成印章" @click="updateSignature(2)" size="large">在线生成印章</Button>
                    </div>
                  </div>
                </Split>
              </div>
            </template>
            <template v-else>
              <p class='tac pt20'>您已成功开通电子签章，可以在各合约列表中，对未签合同的合约，提交合同的签署</p> 
              <div class='tac bb1' style="padding-top:40px;padding-bottom:40px;color:#666"><img :src="this.sealInfo.signatureImg" /></div>
              <p class='pt20 pb20' style="color:#666;font-size: 20px;">印章维护二选一</p>
              <div class="demo-split">
                <Split>
                  <div slot="left" class="demo-split-seal">
                    <div style="padding-left: 40px;font-weight: bold;color: red;">请制作上传实际印章大小的(直径约4cm)、背景透明的png格式图片</div>
                    <div style="display: flex;align-items: flex-end;"> 
                      <Upload
                        ref="upload"
                        action="/api/upload/image"
                        :on-success="handleUpdateSourceFile"
                        accept=".png"
                        :format="['png']"
                        :on-format-error="handleFormatError"
                        :show-upload-list="false" 
                        :max-size="2048">
                        <template v-if="signatureImg">
                          <img class='uploadImg' style="padding:0" :src="signatureImg"  width="166" height="166"/>
                        </template>
                        <template v-else>
                            <div class='uploadImg'><Icon type="ios-add"  color='#ccc' size='60'/>上传</div> 
                        </template>
                      </Upload>  
                      <Button type="primary" title="上传印章" @click="updateSignature(1)" size="large" style="width:30%; height:40px; margin-left:27px">提交</Button>
                    </div>
                  </div>
                  <div slot="right" style="height: 100%;">
                    <div style="padding-left: 40px;font-weight: bold;color: red;">在线生成的电子印章有同等法律效应</div>
                    <div class="demo-split-pane">
                      <Input v-model="signatureValue" placeholder="请输入印章内容" disabled style="width:60%;"/>
                      <Button class='mt20' type="primary" title="在线生成印章" @click="updateSignature(2)" size="large">在线生成印章</Button>
                    </div>
                  </div>
                </Split>
              </div>
            </template>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Navigation from "../../components/navigation"
import { mapState } from "vuex"
import server from "../../config/api"
let Base64 = require('js-base64').Base64

export default {
  name: "seal",
  layout: "membercenter",
  middleware: "memberAuth",
  components: {
    usernav: Navigation.user
  },
  fetch({ store }) {
    return Promise.all([
      //获取顶部、中部、底部导航信息
      store.dispatch("common/getNavList"),
      //获取系统配置
      store.dispatch("common/getSysConfig"),
      //获取电子签章情况
      store.dispatch("member/getSealInfo")
    ]);
  },
  computed: {
    ...mapState({
      sealInfo: state => state.member.sealInfo
    }),
    step: function () {
      if(!this.sealInfo || this.sealInfo.fddMemberId == ''){
        return 0
      }
      if(this.sealInfo.status == 0 || this.sealInfo.status == 1 || this.sealInfo.status == 2 || this.sealInfo.status == 3 || this.sealInfo.status == 5 || this.sealInfo.status == 6){
        return 1
      }
      if(this.sealInfo.status == 4 && (this.sealInfo.signatureImg||'') == ''){
        return 2
      }
      if(this.sealInfo.status == 4 && this.sealInfo.signatureImg.length > 0){
        return 3
      }
      return 0
    }
  },
  data() {
    return { 
      signatureImg: '',
      signatureValue: this.$store.state.memberInfo.username,
    }
  },
  methods: {
    async addRegister() {
      await this.$utils
        .sendCurl(this, server.api.seal.register, {})
        .then(response => {
          location.reload()
        });
    },
    async verify(url) {
      if (url) {
        window.open(url);
      } else {
        let res = await this.$utils.sendCurl(this,server.api.seal.getVerifyUrl,{});
        if (res.status === 200 && (res.data.errorcode || 0) == 0) {
          window.open(res.data);
        }
      }
    },
    handleFormatError (file) {
			this.$Notice.warning({
				title: '文件格式错误',
				desc: '选择文件（' + file.name + '） 不正确,请选择png格式图片上传'
			});
    },
    handleUpdateSourceFile(res) {
 			if ((res.errorcode || 0) == 0) {
				this.signatureImg = res.url
			}else{
				alert(res.message)
			}
    }, 
    async updateSignature(type){
      if(type === 1){
        //上传印章
        if((this.signatureImg||'') == ''){
          alert('请上传印章图片')
          return
        }
        let res = await this.$utils.sendCurl(this,server.api.seal.addSignature,{'img_url': this.signatureImg})
        if (res.status === 200 && (res.data.errorcode || 0) == 0) {
          location.reload()
        }
      } else {
        //生成印章
        if((this.signatureValue||'') == ''){
          alert('请填写印章内容')
          return
        }
        let res = await this.$utils.sendCurl(this,server.api.seal.makeSignature,{'content': this.signatureValue})
        if (res.status === 200 && (res.data.errorcode || 0) == 0) {
          location.reload()
        }
      }
		}
  },
  mounted() {}
}
</script>
<style lang="less" scoped>
 .head {
  img {
    width: 100%;
    height: 100%;
  }
}
.demo-split{
    height: 200px;
    border: 1px solid #dcdee2;
}
.demo-split-seal{
  display: flex; 
  flex-direction: column;
}
.demo-split-pane{
    padding: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    height: 100%;
} 
.Steps{
    display: flex;
    justify-content: center;
    background-color: #fbfbfb;
    padding: 30px 10px;
}
.uploadImg{
  width: 145px;
  height: 145px;
  border: 1px dashed #ccc;
  padding: 10px 28px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #666;
}
.demo-split .demo-split-seal .ivu-upload{margin-left: 65px;margin-top: 20px;width: 145px;  height: 145px;}
.demo-split .demo-split-seal .ivu-split-pane{display: flex; align-items: center;}
.demo-split-pane .ivu-input-wrapper .ivu-input{height: 40px;}
.demo-split .demo-split-pane .ivu-upload-select{display: flex; justify-content: center;  }
</style>
