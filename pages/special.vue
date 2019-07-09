<template>
   <div>
     <div class="materials_banner">
       <img src="../assets/img/materials_banner.png" />
     </div>
     <div class="w1200" style="margin-top: 20px">
       <div class="ListTitle  whitebg bb1">
         <div class="TitleName" style="border-left: 3px solid #279eff;">产品列表</div>
       </div>

       <div  class="indexXhTitle   dflexAlem graybg">
         <span style="width: 7%;">合同</span>
         <span style="width: 8%;">编号</span>
         <span style="width: 8%;">商品名称</span>
         <span style="width: 8%;">厂商</span>
         <span style="width: 9%;">交货时间</span>
         <span style="width: 9%;">单价（元/吨）</span>
         <span style="width: 9%;">会同数量</span>
         <span style="width: 9%;">已提吨数</span>
         <span style="width: 9%;">可提吨数</span>
         <span style="width: 13%;">本次提货吨数</span>
         <span style="width: 9%;">操作</span>
       </div>

       <ul class="indexXhlist"  >
         <li v-for="(special,i) in items">
           <span class="dflexAlemJust" style="width: 7%;"><div class="contact contactblue">预</div></span>
           <span style="width: 8%;">{{special.skuNo}}</span>
           <span style="width: 8%;">{{special.skuName}}</span>
           <span style="width: 8%;">{{special.manufacturer}}</span>
           <span style="width: 9%;">4月中旬</span>
           <span     class="orangeFont"  style="width: 9%;">{{special.finalPrice}}/{{special.uomName}}</span>
           <span style="width: 9%;">{{special.availableNum}}</span>
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
           <span style="width: 11%;"><div class="ListBtn" @click="indent">下单</div></span>
         </li>
       </ul>
         <div class="whitebg ovh text-xs-center" style="padding: 30px 0">
             <Page :total="this.total"  @on-change="changePage" :page-size="page_size"  :current="current_page" show-total show-elevator   />
         </div>
     </div>

   </div>
</template>

<script>
  import Pagination from '../components/pagination/pagination'
  import { adposition,specialList } from '../api/special'
  export default {
        name: "special",
    components:{
      Pagination,
    },
      data () {
      return {
          current_page: !this.$route.query.page ? 1 : this.$route.query.page,
          total_page: (this.total/this.page_size) < 1 ? 1 : parseInt(this.total/this.page_size),
          page_size:10,
          total:0,
          items:[]
      }
  },
  methods:{
      async specialData(){
          let params = {
              current_page: this.current_page,
              page_size: this.page_size,
              status: 'CO'
          }
          const res = await specialList(this, params)

          this.items = res.data.items
          console.log(this.items)
          this.total = res.data.total
          console.log(this.items)

      },
      changePage (row) {
          this.$router.push({name:'special',query:{page:row}})
          this.current_page = row
          this.specialData()
      }
  },
  created () {

  },
  mounted() {
      this.specialData()
  }
  }
</script>

<style scoped>
    .ListBtn{background: #f3f8fe;border: 1px solid #007de4; color: #007de4;width: 100px;margin: 0 auto;cursor: pointer}
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
