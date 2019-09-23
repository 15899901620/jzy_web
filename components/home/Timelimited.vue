<template>
  <div class="Time-limited">
    <div class="Time_Banner pr" >
      <img src="../../static/img/Time_banner.png" />
      <div class="bidders_front" @click="biddersList"></div>
    </div>
    <div class="ovh pr"  id="parent" @mouseenter="mouseEnter" @mouseleave="mouseLeave">
      <div class="Time-limited_back position prve" id='prev' :style="{'display':display}" >
        <img src="../../static/img/back.png" />
      </div>
      <ul class="Time-limited_list" :style="{backgroundColor:bgColor,width:TLlength+'px'}"  id='TimeL-ul'>
        <li   ref="elememt" v-for="(items, index) in indexAuction" :key="index">
          <div class="endTime endTimebg" v-if="items.type===1">
             距开始时间 : {{countDownList[index].day}}天{{countDownList[index].hou}}时{{countDownList[index].min}}分{{countDownList[index].sec}}秒
          </div>
          <div class="endTime endTimebg" v-if="items.type===2">
            距结束时间 : {{countDownList[index].day}}天{{countDownList[index].hou}}时{{countDownList[index].min}}分{{countDownList[index].sec}}秒
           </div>
          <div class="endTime graybg" v-if="items.type===3">
            竞拍结束
          </div>
          <h3 class="fs16 fwb mt20">{{items.manufacturer}} {{items.skuName}} </h3>
          <div class="limitedPrice">
            <span class="fs14">起拍价 : </span><span class="fs18" style="color: #ff6600;">{{items.startPrice}}元/吨</span>
          </div>
          <div class="NumStore">
            <span>数量 : {{items.totalNum}}吨</span>
            <span>库区 : {{items.warehouseName}}</span>
          </div>
          <div class="Timebtn beginbg"  v-if="items.type===1" @click="acutionDetail(items.id)">即将开始</div>
          <div class="Timebtn orangebg"  v-if="items.type===2" @click="acutionDetail(items.id)">竞拍中</div>
          <div class="Timebtn endbg"  v-if="items.type===3" @click="acutionDetail(items.id)">竞拍结束</div>
        </li>
      </ul>
      <div class="Time-limited_next position prve" id='next'  :style="{'display':display}">
        <img src="../../static/img/next.png" />
      </div>
    </div>

  </div>
</template>

<script>
  import { auctionPage } from '../../api/auction'
  export default {
        name: "Timelimited",
      data() {
        return {
          display: "none",
          TLlength:'',
          bgColor:'#f5f5f5',
          indexAuction:{},
          actEndTimeList: [],
          countDownList: []
        }
      },
      created () {



      },
      methods:{
         //竞拍列表页
        biddersList(){
          this.$router.push({name:"bidders"})
        },
        //竞拍记录
        async AuctionRecord(){
          let params={
            current_page:'',
            page_size:'',
            isActive:''
          }
          let res = await auctionPage(this,params)
          console.log("**res**",res)
          this.indexAuction=res.data.items
          var arrayData=[]
          for (var i=0;i<this.indexAuction.length;i++){
             if(i<8){
               arrayData.push(this.indexAuction[i])
             }

          }
         var TimeArray= arrayData.map(function(v){

           if(v.type=== 1){
             return v.beginTime
           }
           if(v.type=== 2){
             return v.reservationEndTime
           }
           if(v.type=== 3){
             return v.reservationEndTime
           }

            });
          this.actEndTimeList =TimeArray
          this.countDown();

        },

        timeFormat(param) {
          return param < 10 ? '0' + param : param;
        },


        countDown(it) {

          // 获取当前时间，同时得到活动结束时间数组
          let newTime = new Date().getTime();
          let endTimeList = this.actEndTimeList;
          let countDownArr = [];
         // 对结束时间进行处理渲染到页面
          endTimeList.forEach(o => {
            let endTime = new Date(o).getTime();
            let obj = null;
            // 如果活动未结束，对时间进行处理
            if (endTime - newTime > 0) {
              let time = (endTime - newTime) / 1000;
              // 获取天、时、分、秒
              let day = parseInt(time / (60 * 60 * 24));
              let hou = parseInt(time % (60 * 60 * 24) / 3600);
              let min = parseInt(time % (60 * 60 * 24) % 3600 / 60);
              let sec = parseInt(time % (60 * 60 * 24) % 3600 % 60);
              obj = {
                day: this.timeFormat(day),
                hou: this.timeFormat(hou),
                min: this.timeFormat(min),
                sec: this.timeFormat(sec)
              };
            } else { // 活动已结束，全部设置为'00'
              obj = {
                day: '00',
                hou: '00',
                min: '00',
                sec: '00'
              };
            }
            countDownArr.push(obj);
          });
          this.countDownList = countDownArr;
          setTimeout(this.countDown, 1000);

        },

          //鼠标移入
        mouseEnter(){
          var ul=document.getElementById('TimeL-ul')
          var li=ul.getElementsByTagName('li')
          if(li.length>=5){
            this.display = "flex";
          }else{
            this.display = "none";
          }
        },
        //   鼠标移除
        mouseLeave(){
         this.display = "none";
        },

     //跳转详情页
        acutionDetail(id){
          this.$router.push({name:'Biders-BidersBegin', query:{id:id}})
        },








      },
      computed:{

      },
      mounted () {

        //竞拍列表
        this.AuctionRecord()



        // *****限时竞拍******
      setTimeout(function(){
        var chefElement = {
          minSpeed: 10,//每次移动的距离
          //获取页面元素
          prev:document.getElementById('prev'),
          next:document.getElementById('next'),
          parent:document.getElementById('parent'),
          ul:document.getElementById('TimeL-ul'),
          li:document.getElementById('TimeL-ul').getElementsByTagName('li'),
          liWidth:document.getElementById('TimeL-ul').getElementsByTagName('li')[0].offsetWidth,
          type:true,
          nextTimer:null,
          prevTimer:null,
          parent_n:null
        }

        chefElement.prev.onclick = function(){

          if(chefElement.type){
            clearInterval(chefElement.prevTimer);
            chefElement.ul.insertBefore(chefElement.li[chefElement.li.length-1],chefElement.li[0]);
            chefElement.liWidth = chefElement.li[0].offsetWidth;
            chefElement.ul.style.left = '-'+chefElement.liWidth+'px';
            chefElement.prevTimer = setInterval(pre,chefElement.animationSpeed);
            chefElement.type = false;
          }
        };
        next.onclick = function(){

          if(chefElement.type){
            chefElement.liWidth = 0;
            clearInterval(chefElement.nextTimer);
            chefElement.nextTimer = setInterval(nex,chefElement.animationSpeed);
            chefElement.type = false;
          }
        };
        //next动画函数
        function nex(){

          chefElement.ul.style.left = '-'+chefElement.liWidth+ 'px';
          chefElement.liWidth += chefElement.minSpeed ;
          if(chefElement.liWidth >= chefElement.li[0].offsetWidth){
            clearInterval(chefElement.nextTimer);
            chefElement.ul.appendChild(chefElement.li[0]);
            chefElement.ul.style.left = 0;
            chefElement.type = true;
          }
        }
        //prev动画函数
        function pre(){

          chefElement.ul.style.left = '-'+chefElement.liWidth+'px';
          chefElement.liWidth -= chefElement.minSpeed ;
          if(chefElement.liWidth <= -1){
            chefElement.ul.style.left = 0;
            clearInterval(chefElement.prevTimer);
            chefElement.type = true;
          }
        }

// *****限时竞拍******
        var that=this
        let TL=document.getElementsByClassName('Time-limited_list')[0].getElementsByTagName('li')
        console.log("TL:",TL)
        let TLWidth=TL[0].offsetWidth
        console.log("TLWidth:",TLWidth)
        that.TLlength=TL.length*TLWidth
      },2000)

      },
    destoryed () {
          clearTimeout()
    }
    }
</script>

<style scoped>
  /*限时抢拍*/
  .prve{  display: flex; align-items: center;justify-content: center; position: absolute; width: 23px;height: 70px;background-color: rgba(113,113,113,0.3); cursor: pointer;transition: opacity 1s; }
  .Time-limited{width: 1200px;margin: 0 auto; display: flex; margin-top: 20px; }
  .Time_Banner{width: 234px;height: 242px;}
    .Time-limited_list{display: flex; position: relative; width: 1920px}
  .Time-limited_list li{ margin-left: 1px; display: flex;flex-direction: column;justify-content: center; text-align: center; width: 241px;overflow: hidden; background-color: #fff; position: relative;}
  .Time-limited_list li .endTime{height: 26px; width: 90%;margin: 0 auto; border-bottom-left-radius: 28px; border-bottom-right-radius: 28px; line-height: 26px;}
  .Time-limited_list li .endTimebg{background-color: #e0effc;}
  .Time-limited_list li .limitedPrice{ width: 80%;  margin: 0 auto; padding: 10px 0;}
  .Time-limited_list li .NumStore{display: flex; flex-direction: column;  text-align: left;  padding: 10px 0px 10px 32px; font-size: 13px;
    border-bottom: 1px dashed #dedede; width: 70%;  margin: 0 auto;  border-top: 1px dashed #dedede;  box-sizing: border-box;}

  .bidders_front{width: 24px;height: 24px;position: absolute;   bottom: 34px; left: 21px; cursor: pointer;}

  .Time-limited_list li .Timebtn{width: 70%;margin: 17px auto;    padding: 7px 52px; box-sizing: border-box; color: #fff; border-radius:3px; cursor: pointer;}
  .Time-limited_list li .beginbg{background-color: #23aa36}.Time-limited_list li .endbg{background-color: #cfcfcf}

  .position{cursor: pointer; display: flex; justify-content: center; align-items: center; position: absolute;top: 92px;width: 24px;height: 40px;background: rgba(146,146,146,0.8);  z-index: 10;}

  .Time-limited_back{left: 0; border-bottom-right-radius: 5px; border-top-right-radius: 5px; }
  .Time-limited_next{right: 0; border-bottom-left-radius: 5px; border-top-left-radius: 5px; }
  .endBg{background-color: #cfcfcf;}
</style>
