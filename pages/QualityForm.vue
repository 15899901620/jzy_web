<template>
    <div class="clearfix">
      <div class="w1200  ovh"  style="margin-top: 20px;" >
        <div class="ListTitle whitebg  bb1">
          <div class="TitleName">质检单</div>
        </div>
       <!-- 批次号 查询-->
        <div class="whitebg ovh" style="padding: 20px 0" >
          <div class="dflex ml20" style="align-items: center">
          <span>批次号</span>  <input type="text" placeholder="输入订单号/产品名称查询" name="" id="" value="" class="orderInput ml10"  style="padding: 5px 0; padding-left: 10px;box-sizing: border-box"/>
            <div class="check ml10">查看</div>
          </div>
        </div>
        <div class="qualityTitle">
          <span style="width: 10%">品种</span><span style="width: 15%">牌号</span><span style="width: 30%">日期</span><span style="width: 30%">批次号</span><span style="width: 15%">操作</span>
        </div>
         <ul class="qualityList">
           <li> <span style="width: 10%">HDPE</span>
             <span style="width: 15%">M60075</span>
             <span style="width: 30%">2018-06-27  12 : 00 : 00</span>
             <span style="width: 30%">6952657300252</span>
             <span style="width: 15%">
                <div  class="qualitySeeDetail" @click="seedetail">查看</div>
             </span>
           </li>
           <li> <span style="width: 10%">HDPE</span>
             <span style="width: 15%">M60075</span>
             <span style="width: 30%">2018-06-27  12 : 00 : 00</span>
             <span style="width: 30%">6952657300252</span>
             <span style="width: 15%">
                <div  class="qualitySeeDetail" @click="seedetail">查看</div>
             </span>
           </li>
           <li> <span style="width: 10%">HDPE</span>
             <span style="width: 15%">M60075</span>
             <span style="width: 30%">2018-06-27  12 : 00 : 00</span>
             <span style="width: 30%">6952657300252</span>
             <span style="width: 15%">
                <div  class="qualitySeeDetail" @click="seedetail">查看</div>
             </span>
           </li>
         </ul>
          <div class="whitebg" style="display: flex; align-items: center; justify-content: center; border-top:1px solid #f0f0f0; padding: 20px 0;">
            <Page :total="100" show-elevator @on-change="currentPage" @on-page-size-change="PageSizeChange"/>
          </div>
      </div>
    </div>
</template>

<script>
    export default {
        name: "QualityForm",
      methods:{
        // 跳转质检单详情页
        seedetail(){
          this.$router.push({
            name:'qualitydetail-qualitydetail'
          })
        },
        //当前页
        currentPage(index){
          console.log('index',index)
        },
        PageSizeChange(s){
          console.log('PageSize',s)
        }
      }
    }
</script>

<style scoped>

</style>
