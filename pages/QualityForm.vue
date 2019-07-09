<template>
    <div class="clearfix">
      <div class="w1200  ovh"  style="margin-top: 20px;" >
        <div class="ListTitle whitebg  bb1">
          <div class="TitleName">质检单</div>
        </div>
       <!-- 批次号 查询-->
        <div class="whitebg ovh" style="padding: 20px 0" >
          <div class="dflex ml20" style="align-items: center">
          <span>批次号</span>  <input type="text" placeholder="输入订单号/产品名称查询"v-model="batchNo" class="orderInput ml10"  style="padding: 5px 0; padding-left: 10px;box-sizing: border-box"/>
            <div class="check ml10 cp" @click="qualityList">查看</div>
          </div>
        </div>
        <div class="qualityTitle">
          <span style="width: 10%">商品编号</span>
          <span style="width: 15%">商品名称</span>
          <span style="width: 30%">生产日期</span>
          <span style="width: 30%">批次号</span>
          <span style="width: 15%">操作</span>
        </div>
         <ul class="qualityList" v-if="qualitydataList">

             <li v-for="(items,index) in qualitydataList"  :key="index"  >
               <span style="width: 10%">{{items.skuNo}}</span>
               <span style="width: 15%">{{items.skuTitle}}</span>
               <span style="width: 30%">{{items.productionDate}}</span>
               <span style="width: 30%">{{items.batchNo}}</span>
               <span style="width: 15%">
                <div  class="qualitySeeDetail" @click="seedetail(items.skuNo)">查看</div>
             </span>
             </li>

         </ul>
        <div class="fs18 p10 whitebg" v-show="TipShow">{{qualityTip}}</div>
          <div class="whitebg" style="display: flex; align-items: center; justify-content: center; border-top:1px solid #f0f0f0; padding: 20px 0;">
            <Page :total="100" :current="current_page" show-elevator @on-change="currentPage" @on-page-size-change="PageSizeChange"/>
          </div>
      </div>
    </div>
</template>

<script>
  import { inspectionlistPage } from '../api/users'
    export default {
        name: "QualityForm",
      data(){
          return{
            qualitydataList:[],
            qualityTip:'',
            batchNo:'',
            TipShow:false,
            page_size:5,
            current_page:1
          }
      },
      methods:{
        // 跳转质检单详情页
        seedetail(skuNo){
           this.$router.push({name:'qualitydetail-qualitydetail',query:{skuNo:skuNo}})
        },
        //当前页
        currentPage(index){
          console.log('index',index)
          this.current_page=index
        },
        PageSizeChange(s){
          console.log('PageSize',s)
        },
        async qualityList(){
          let params={
            batchNo:this.batchNo,
            productionDate:this.$router.history.current.query.qualityForm.qualityDate,
            page_size:this.page_size,
            current_page:this.current_page
          }
          let res = await inspectionlistPage(this,params)
          console.log('res',res)
          if(res.data.items.length>0){
            this.qualitydataList=res.data.items
            this.batchNo=''
          }else {
            this.TipShow=true
            this.qualityTip='暂无此数据'
            this.batchNo=''
          }
        }

      },
      mounted(){
          this.qualityList()
          this.batchNo=this.$router.history.current.query.qualityForm.qualityNo
          console.log('this.$router',this.$router.history.current.query.qualityForm.qualityNo)
      }
    }
</script>

<style scoped>

</style>
