<template>
  <div class="whitebg mt20">
    <div class="notTitle">
      通知公告
    </div>
    <ul class="notlist">
          <li v-for="(item, index) in aclist" :key="index">
            <nuxt-link :to="{name:'notice-detail-id', params:{id:item.id}}">
              <span class="notlistTitle">{{item.title}}</span>
              <span class="fs12 mb10 gray">{{item.time}}</span>
            </nuxt-link>
          </li>
    </ul>
  </div>
</template>

<script>
import { sendCurl } from  '../../../api/common'
import server from '../../../config/api'
export default {
        name: "Notice",
        data(){
          return{
            aclist:{}
            
          }
         },
        methods:{
           async SourceData() {    
             let params={
                  catId:7
             }
            const res = await sendCurl(this,  server.api.information.infos,params,false)
            this.aclist = res.data.items
 
        },
        },
        mounted(){
          this.SourceData()
        }
        
    }
    
</script>

<style scoped>
  .notTitle{font-size: 16px;border-bottom: 1px solid #DEDEDE; padding: 20px 0; padding-left: 20px;}
  .notlist{margin: 0px 20px;}
  .notlist li{border-bottom: 1px dashed #e3ecf5; display: flex;flex-direction: column;}
  .notlist li:last-child{border-bottom: none;}
  .notlist li .notlistTitle{font-size: 14px;color: #333;margin-top: 15px;
    overflow: hidden; text-overflow: ellipsis; white-space: nowrap}
</style>
