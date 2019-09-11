<template>
    <div class="whitebg">
       <div class="mt20 mb40 fs14" v-html="dataList.content"></div>
       <div style="text-align: center;">
              <Upload
                      ref="upload"
                      :action="uploadUrl"
                      :on-success="handleOtherFile"
                      :max-size="2048"
                      :format="['jpg','jpeg','png', 'gif']"
                      :on-format-error="handleFormatError"
                      :on-exceeded-size="handleMaxSize">  
               <Button type="primary" size="large">上传标书</Button>
             </Upload>
        </div>
    </div>
</template>

<script>

  import Header from "../../../components/header";
  import { sendHttp } from "../../../api/common";
  import server from "../../../config/api";     
const appConfig = require('../../../config/app.config')

  export default {
    name: "DetailsBidding",
    data() {
        return{
            id: !this.$route.params.id ? 1 :this.$route.params.id,
            dataList:{},
            uploadUrl: '',
            formCustom:{
                 appendix:'',
            }
           
            
        };
      },
       methods:{
          getUploadURL(){
            this.uploadUrl = process.env.NODE_ENV === 'development' ? appConfig.system.UPLOAD_URL.dev : appConfig.system.UPLOAD_URL.pro
          },
          handleOtherFile(res){
              this.formCustom.appendix = res.url
          },
          handleMaxSize (file) {
            this.$Notice.warning({
                title: '超出文件大小限制',
                desc: '文件 ' + file.name + ' 太大，不能超过 2M。'
          });
          },
          handleFormatError (file) {
            this.$Notice.warning({
              title: '文件格式不正确',
              desc: '文件 ' + file.name + ' 格式不正确，请上传 jpg 或 png 格式的图片。'
            });
          },

          async SourceData() {    
              let params = {
                id: this.id,
              };
              const res = await sendHttp(this, false, server.api.biddding.bidddingDetail,params)
              this.dataList = res.data
          },
          async BySupplier() {    
              let params = {
                biddingId: this.id,
              };
              const res = await sendHttp(this, false, server.api.biddding.BySupplier,params)
              this.dataList = res.data
          },

      },
      mounted() {
          this.SourceData()
          this.BySupplier()
      }
    }
</script>

<style scoped>

</style>
