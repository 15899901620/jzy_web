<template>
  <div>
    <!--banner-->
    <div class="tac">
      <img src="../assets/img/auctionBanner.png" />
    </div>
    <div class="w1200">
      <!--竞拍时间-->
      <div class="AuctionTime mt35">

        <ul>
          <li v-for="(items,index) in AuctionTab" @click="AuctionList(items.status,index)" :class="{curr:CurrSelect == index}"   >
            <div class="fs20">
              {{items.AuctionName}}
            </div>
<!--            <div class="AtP">-->
<!--              {{items.AuctionState}}-->
<!--            </div>-->
          </li>


        </ul>
      </div>


      <!--竞拍列表-->

      <div class="acution" v-for="(m,index) in tabMain" v-show="CurrSelect==index" >

        <ul class="acuList" v-if="Auctionlist.length >0">

            <li v-for="(items,index) in Auctionlist" :key="index">
              <div class="acuProduct">
                <h1>{{items.skuName}}</h1>
                <div class="mt10 fs14 ">起拍价：<span class="orangeFont fwb fs16">{{items.minOrder}}{{items.basePrice}}</span></div>
                <div class="mt10 fs14">数    量：{{items.totalNum}}{{items.uomName}}</div>
                <div class="mt30 fs18">
                  开始时间：{{items.beginTime}}
                </div>
              </div>
              <div class="acuOpear">
                <div style="display: flex; flex-direction: column; justify-content: flex-end">
                  <span class="mt10 ">城市：{{items.warehouseName}}</span>
                  <span class="mt5">竞拍厂商：{{items.manufacturer}}</span>
                </div>

                <template v-if="items.type === 2">
                  <div class="btnStart startauction" @click="BidersDetail(items.id)">参与竞拍</div>
                </template>
                <template v-if="items.type === 1">
                  <div class="btnStart vcauction" @click="BidersDetail(items.id)">即将开始</div>
                </template>
                <template v-if="items.type === 3">
                  <div class="btnStart endauction" @click="BidersDetail(items.id)" >竞拍结束</div>
                </template>

              </div>
            </li>

        </ul>
        <ul class="acuList" v-else>
          <li style="background: none; font-size: 20px;">{{AuctionTip}}</li>
        </ul>
              <div class="w1200">
                <ul class="pagination">
                  <li><a href="#">首页</a></li>
                  <li><a href="#">上一页</a></li>
                  <li><a class="active">1</a></li>
                  <li><a >2</a></li>
                  <li><a href="#">3</a></li>
                  <li><a href="#">4</a></li>
                  <li><a href="#">5</a></li>
                  <li><a href="#">6</a></li>
                  <li><a href="#">7</a></li>
                  <li><a href="#">下一页</a></li>
                  <li><a href="#">尾页</a></li>
                  <li class="ml10">共40页</li>
                  <div class="ml30">转到第<input type="text" class="pageText" />页</div>
                  <a class="PageNext">Go</a>
                </ul>
              </div>
      </div>
    </div>

  </div>
</template>

<script>
  import {auctionPage} from '../api/auction'
  import Cookies from 'js-cookie'
    export default {
        name: "bidders",
      components: {
      },
      data(){
          return{
            CurrSelect:0,
            current_page:'',
            page_size:'',
            NowTime:'',
            Auctionlist:'',
            AuctionTip:'暂无竞拍活动',
            tabMain: ['', '', ''],
            status:1,
            index:0,
            AuctionTab:[
              // {AuctionName:'5月16日 10:30 场', AuctionState:'正在竞拍',},
              // {AuctionName:'5月17日 14:00 场', AuctionState:'即将开始'},
              // {AuctionName:'5月16日 10:30 场', AuctionState:'竞拍结束'},
              {AuctionName:'正在竞拍', status:2},
              {AuctionName:'即将开始', status:1},
              {AuctionName:'竞拍结束', status:3},
            ]
          }
      },
      methods:{
         //竞拍列表

         async AuctionList(status,index){
           console.log('status',status)
           if(status){
             this.status=status
           }

           console.log('index',index)
           if(index){
             this.CurrSelect=index
           }else{
             this.CurrSelect=this.index
           }


           console.log('this.status', this.status)
           let params={
             current_page:1,
             page_size:6,
             type:this.status
           }
           let res=await auctionPage(this,params)
           console.log('res',res)
           console.log('items', res.data.items.length)
            if(res.data.items){
              this.Auctionlist=res.data.items
            }else{
              this.AuctionTip='暂无竞拍活动'
            }

         },
        //跳转详情页
        BidersDetail(id){
          if(Cookies.get('userinfor') && Cookies.get('webtoken')){
             this.$router.push({name:'Biders-BidersBegin', query:{id:id}})
           }else {
            this.$Modal.confirm({
              title: '提示',
              content: '<p>您的登录已超时，请重新登录</p>',
              okText:'去登录',
              onOk: () => {
                this.$router.push({name:'login'});
              },

            });
           }

        },
      },
      mounted(){
          this.AuctionList()
      },
    }
</script>

<style scoped>
  .paipinacu{color: #333;}
  .AuctionTime ul{display: flex;}
  .AuctionTime li{background-color: #fff;width: 33.3%; text-align: center;padding: 10px 0;cursor: pointer;}
  .AuctionTime li.curr{color: #fff;background-color: #ff6c00; box-shadow: 6px 0px 3px 1px #ff6c00;z-index: 10;position: relative;}
  .AuctionTime li.curr .AtP{border:none;}
  .AtP{margin: 4px auto 0;display: -webkit-flex;display: flex;-webkit-justify-content: center;justify-content: center;-webkit-align-items: center;
    align-items: center;border: 1px solid #ccc;border-radius: 25px;width: 23%;padding: 2px 0;font-size: 14px;}

  .acution{display: flex; flex-direction: column;}
  .acuList{display: flex;    flex-wrap: wrap;}
  .acuList li{background-color: #fff;width: 49%; margin-top: 15px; display: flex;}
  .acuList li:nth-child(even){margin-left: 2%;}
  .acuList li .acuProduct{width: 300px; border-right: 1px solid #ccc; margin: 35px 0; margin-left: 45px;}
  .acuList li .acuOpear{font-size: 18px; width: 245px; margin-top: 35px;display: flex; flex-direction: column; align-items: center;}
  .acuList li .acuOpear .btnStart{ color: #fff; padding: 10px 50px; border-radius:5px;margin-top:20px; cursor: pointer;}
  .acuList li .acuOpear .startauction{background-color: #f17b24; color: #fff;}
  .acuList li .acuOpear .vcauction{background-color: #26a96d; color: #fff; cursor: default}
  .acuList li .acuOpear .endauction{background-color: #dbdcde; color: #999;}
  .acuList li .acuProduct h1{margin-top: 5px; font-weight: bold; font-size: 16px;}



  .w1200 ul.pagination {  display: inline-block;  padding: 0;   margin: 30px auto;display: flex;justify-content: center;}
  .w1200 ul.pagination li{display: flex;align-items: center; }
  .w1200 ul.pagination li a {background-color: #fff;padding: 5px 11px;}
  .w1200 ul.pagination li a{  color: #333;border: 1px solid #efefef; border-radius: 4px; padding: 8px 15px;
    text-decoration: none;transition: background-color .3s;  margin: 0 8px;}
  .w1200 ul.pagination li a.active{background-color: #007de4; color: #fff;  border: 1px solid #007de4;}
  .w1200 ul.pagination li a:hover:not(.active){background-color: #007de4; color: #fff;border: 1px solid #007de4;}
  .w1200 ul.pagination .pageText{width: 40px;height: 35px; margin: 0 8px; border-radius:3px;    box-sizing: border-box; border: 1px solid #dededede;
    background-color: #fff;text-align: center;}
  .w1200 ul.pagination .PageNext{border-radius: 2px; color: #666; width: 40px;height: 35px; line-height: 35px; margin: 0 15px; text-align: center;
    border: 1px solid #dededede;box-sizing: border-box;background-color: #efefef;}

</style>
