<template>

    <div class="whitebg">
       <div class="mt20 mb40 fs14" v-html="dataList.content"></div>
       <div style="text-align: center;" v-if="dataList.statusName=='未投标'">
            <div style="display: inline-flex;"> 
              <Upload
                      ref="upload"
                      :action="uploadUrl"
                      :on-success="handleOtherFile"
                      :max-size="2048">
               <Button type="primary" size="large">上传标书</Button>             
             </Upload>
             </div>
             <Button type="primary" size="large" @click='fileUpdate'>提交</Button>
            
        </div>
    </div>

</template>

<script>

  import Header from "../../../components/header";
  import { sendHttp } from "../../../api/common";
  import server from "../../../config/api";
  import Cookies from "js-cookie";



  const appConfig = require('../../../config/app.config')
  export default {
    name: "DetailsBidding",
    data() {
        return{
            id: !this.$route.query.id ? 1 :this.$route.query.id,
            dataList:{},
            uploadUrl: '',
            formCustom:{
                 appendix:'',
            },


        };
      },
       methods:{
          getUploadURL(){
            if (process.env.NODE_ENV === 'development') {
              this.uploadUrl = appConfig.system.UPLOAD_URL.dev 
            } else if (process.env.NODE_ENV === 'testprod') {
              this.uploadUrl = appConfig.system.UPLOAD_URL.test
            } else {
              this.uploadUrl = appConfig.system.UPLOAD_URL.pro
            } 
          },
          handleOtherFile(res){
              this.formCustom.appendix = res.url
          },
          async fileUpdate() {
             let params = {
                supplierId:this.$store.state.supplierInfo.id,
                biddingId: this.id,
                appendix:this.formCustom.appendix,
                supplierName:this.$store.state.supplierInfo.username
              };
           
              const res = await sendHttp(this, true, server.api.biddding.save,params,2)
              if(res.data.errorcode=='501002'){
                this.$Notice.warning({
                    title: res.data.message,
                    duration: 5
                });
                return
              }else{
                this.$Message.info({
                    content: '投标成功',
                    duration: 5,
                    closable: true
                })
              }
              this.SourceData();

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
          this.getUploadURL()
          this.SourceData()
          // this.BySupplier()
      }
    }
</script>

<style scoped>

</style>
