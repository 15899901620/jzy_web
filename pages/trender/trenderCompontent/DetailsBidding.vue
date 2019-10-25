<template>

    <div class="whitebg">
       <div class="mt20 mb40 fs14" v-html="dataList.content"></div>
       <div style="text-align: center;" v-if="dataList.statusName=='未投标'">
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
            SupplierInfor:{},


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
              this.fileUpdate();
              this.SourceData();
          },
          async fileUpdate() {

             let params = {
                supplierId:this.SupplierInfor.id,
                biddingId: this.id,
                appendix:this.formCustom.appendix,
                supplierName:this.SupplierInfor.username
              };
              const res = await sendHttp(this, true, server.api.biddding.save,params,2)

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
          this.SupplierInfor = Cookies.get("supplierInfor");
         this.getUploadURL()
          this.SourceData()
          // this.BySupplier()
      }
    }
</script>

<style scoped>

</style>
