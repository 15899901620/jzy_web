<template>
   <div>
     <div class="materials_banner">
       <img src="../assets/img/materials_banner.png" />
     </div>
     <div class="w1200" style="margin-top: 20px">
       <div class="ListTitle  whitebg bb1">
         <div class="TitleName" style="border-left: 3px solid #279eff;">产品列表</div>
       </div>

       <div class="indexXhTitle   dflexAlem graybg">
         <span style="width: 7%;">合同</span>
         <span style="width: 7%;">品种</span>
         <span style="width: 7%;">牌号</span>
         <span style="width: 8%;">厂商</span>
         <span style="width: 9%;">交货地</span>
         <span style="width: 9%;">交货时间</span>
         <span style="width: 9%;">单价（元/吨）</span>
         <span style="width: 9%;">会同数量</span>
         <span style="width: 9%;">已提吨数</span>
         <span style="width: 9%;">可提吨数</span>
         <span style="width: 13%;">本次提货吨数</span>
         <span style="width: 11%;">操作</span>
       </div>

       <ul class="indexXhlist">

         <li>
           <span class="dflexAlemJust" style="width: 7%;"><div class="contact contactblue">预</div></span>
           <span style="width: 7%;">PP</span>
           <span style="width: 7%;">F08</span>
           <span style="width: 8%;">巨正源</span>
           <span style="width: 9%;">东莞</span>
           <span style="width: 9%;">4月中旬</span>
           <span class="orangeFont" style="width: 9%;">¥10550</span>
           <span style="width: 9%;">100.000</span>
           <span style="width: 9%;">20.000</span>
           <span style="width: 9%;">50.000</span>
           <span  class="dflex" style="width: 13%; align-items: center;">
							<div class="NumReduice" style="margin: 0; width: 55%; margin-left: 25px;">
			        			<span class="gray" style="width: 25%;">-</span>
			        			<input class="TextNum" type="text" name="" id="" value="">
			        			<span class="gray"  style="width: 25%;">+</span>
		        			</div>
		        			<div class="Numtip"></div>
						</span>
           <span style="width: 11%;"><div class="ListBtn">下单</div></span>
         </li>
         <li>
           <span class="dflexAlemJust" style="width: 7%;"><div class="contact contactblue">预</div></span>
           <span style="width: 7%;">PP</span>
           <span style="width: 7%;">F08</span>
           <span style="width: 8%;">巨正源</span>
           <span style="width: 9%;">东莞</span>
           <span style="width: 9%;">4月中旬</span>
           <span class="orangeFont" style="width: 9%;">¥10550</span>
           <span style="width: 9%;">100.000</span>
           <span style="width: 9%;">20.000</span>
           <span style="width: 9%;">50.000</span>
           <span  class="dflex" style="width: 13%; align-items: center;">
							<div class="NumReduice" style="margin: 0; width: 55%; margin-left: 25px;">
			        			<span class="gray" style="width: 25%;">-</span>
			        			<input class="TextNum" type="text" name="" id="" value="">
			        			<span class="gray"  style="width: 25%;">+</span>
		        			</div>
		        			<div class="Numtip"></div>
						</span>
           <span style="width: 11%;"><div class="ListBtn">下单</div></span>
         </li>
         <li>
           <span class="dflexAlemJust" style="width: 7%;"><div class="contact contactblue">预</div></span>
           <span style="width: 7%;">PP</span>
           <span style="width: 7%;">F08</span>
           <span style="width: 8%;">巨正源</span>
           <span style="width: 9%;">东莞</span>
           <span style="width: 9%;">4月中旬</span>
           <span class="orangeFont" style="width: 9%;">¥10550</span>
           <span style="width: 9%;">100.000</span>
           <span style="width: 9%;">20.000</span>
           <span style="width: 9%;">50.000</span>
           <span  class="dflex" style="width: 13%; align-items: center;">
							<div class="NumReduice" style="margin: 0; width: 55%; margin-left: 25px;">
			        			<span class="gray" style="width: 25%;">-</span>
			        			<input class="TextNum" type="text" name="" id="" value="">
			        			<span class="gray"  style="width: 25%;">+</span>
		        			</div>
		        			<div class="Numtip"></div>
						</span>
           <span style="width: 11%;"><div class="ListBtn">下单</div></span>
         </li>
       </ul>
       <div class="whitebg ovh">
         <Pagination></Pagination>
       </div>
     </div>

   </div>
</template>

<script>
  import Pagination from '../components/pagination/pagination'
  export default {
        name: "special",
    components:{
      Pagination,

    }
    }
</script>

<style scoped>
  .materials_banner{font-size: 0;}
  .indexXhTitle span{text-align: center;margin: 23px 0; font-size: 14px;}
  .indexXhlist li{height: 55px; display: flex; align-items: center; margin-bottom: 1px;background-color: #fff;}
  .indexXhlist li span{text-align: center; font-size: 14px;}
  .orangeFont{color: #ff9800;}

  .NumReduice{  margin: 0 auto;  height: 30px; border: 1px solid #D2D2D2; background-color: #fff; width: 65%; display: flex;align-items: center;}
  .NumReduice>span{ cursor: pointer;  font-weight: bold;    height: 100%;  align-items: center; display: flex; justify-content: center;}
  .NumReduice .TextNum{width: 50%;border: none;height: 100%;text-align: center;}
  .Numtip{background: url(../assets/img/icon.png)no-repeat 0px -212px;width: 20px;height: 18px; margin-left: 10px; cursor: pointer;}
</style>
