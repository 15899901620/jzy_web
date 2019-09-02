<template>
    <div class="ovh pr" style="width: 966px" id="parent" @mouseenter="mouseEnter" @mouseleave="mouseLeave">
        <div class="Time-limited_back position prve" id='prev' :style="{'display':display}" >
            <img src="../../static/img/back.png" />
        </div>
        <template v-if="indexAuction.length > 0">
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
                <h3 class="fs16 fwb mt20">{{items.manufacturer}} {{items.skuName}}</h3>
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
        </template>
        <template v-else>
          <ul>
            <li>暂无任何信息！</li>
          </ul>
        </template>
        <div class="Time-limited_next position prve" id='next'  :style="{'display':display}">
            <img src="../../static/img/next.png" />
        </div>
    </div>
</template>

<script>
import { auctionPage } from '../../api/auction'
const prefixCls = 'ant-hotbidding'
import { mapState } from 'vuex'

export default {
    name: 'hotbidding',
    data() {
        return {
            display: "none",
            TLlength:'',
            bgColor:'#fff',
            indexAuction:{},
            actEndTimeList: [],
            countDownList: []
        }
    },
    computed: {
        ...mapState({
        }),
        classes() {
            return [
                `${prefixCls}`,
                { [`${prefixCls}-hotbidding`]: this.vertical },
            ];
        },
    },
    methods:{
        async AuctionRecord(){
          let params={
            current_page:'1',
            page_size:'12',
            isActive:''
          }
          let res = await auctionPage(this,params)
          if(res.status === 200){
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
          }
        },
        timeFormat (param) {
          return param < 10 ? '0' + param : param;
        },
        countDown (it) {
          let newTime = new Date().getTime();
          let endTimeList = this.actEndTimeList;
          let countDownArr = [];
          endTimeList.forEach(o => {
            let endTime = new Date(o).getTime();
            let obj = null;
            if (endTime - newTime > 0) {
              let time = (endTime - newTime) / 1000;
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
            } else {
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
        mouseEnter(){
          var ul=document.getElementById('TimeL-ul')
          var li=ul.getElementsByTagName('li')
          if(li.length>=5){
            this.display = "flex";
          }else{
            this.display = "none";
          }
        },
        mouseLeave(){
         this.display = "none";
        },
        acutionDetail(id){
          this.$router.push({name:'bidders-detail-id', params:{id:id}})
        }
    },
    mounted () {
      this.AuctionRecord();
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
        let TLWidth=TL[0].offsetWidth
        that.TLlength=TL.length*TLWidth
      },2000)
    },
    destoryed () {
        clearTimeout()
    }
}
</script>

<style>

</style>
