<template>

    <div class="whitebg">
       <div class="mt20 mb40 fs14" v-html="dataList.content"></div>
       <div style="text-align: center;">
              <Upload
                      ref="upload"
                      :action="uploadUrl"
                      :on-success="handleOtherFile"
                      :max-size="2048">  
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

          async SourceData() {    
              let params = {
                id: this.id,
              };
              const res = await sendHttp(this, false, server.api.biddding.bidddingDetail,params)
              this.dataList = res.data
          },
          // async BySupplier() {    
          //     let params = {
          //       biddingId: this.id,
          //     };
          //     const res = await sendHttp(this, false, server.api.biddding.BySupplier,params)
          //     this.dataList = res.data
          // },

      },
      mounted() {
          this.SourceData()
          // this.BySupplier()
      }
    }
</script>

<style scoped>

</style>
