<template>

    <div class="whitebg">
       <div class="mt20 mb40 fs14" v-html="dataList.content"></div>
       <div style="text-align: center;" v-if="dataList.statusName=='未投标'">
            <div style="display: inline-flex;margin-right: 20x;"> 
              <Upload
                      ref="upload"
                      :action="uploadUrl"
                      :on-success="handleFile"
                      :max-size="2048">
               <Button type="primary" size="large">上传技术文件</Button>             
             </Upload>
             </div>
              <div style="display: inline-flex;margin-left: 120px;"> 
              <Upload
                      ref="upload"
                      :action="uploadUrl"
                      :on-success="handleOtherFile"
                      :max-size="2048">
               <Button type="primary" size="large">上传商务文件</Button>             
             </Upload>
             </div>
             <div style="display: inline-flex;margin-left: 20px;">
               <Button type="primary" size="large" @click='fileUpdate' >提交</Button>
             </div>
             
            
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
                 technicalDoc:'',
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
          handleFile(res){
              this.formCustom.technicalDoc = res.url
          },
          async fileUpdate() {
              if(!this.formCustom.appendix){
                  this.$Notice.warning({
                    title: '请上传技术文件',
                    duration: 5
                });
                return
              }
              if(!this.formCustom.technicalDoc){
                  this.$Notice.warning({
                    title: '请上传商务文件',
                    duration: 5
                });
                return
              }
            
             let params = {
                supplierId:this.$store.state.supplierInfo.id,
                biddingId: this.id,
                technicalDoc:this.formCustom.technicalDoc,
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
