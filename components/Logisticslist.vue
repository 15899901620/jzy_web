<template>
<!--    <div>-->
<!--      物流找车-->
      <div class="ovh pr" style="width: 900px" id="parent" @mouseenter="mouseEnter" @mouseleave="mouseLeave"  >
        <div class="Time-limited_back position prve" id='prev' :style="{'display':display}">
          <img src="../assets/img/back.png" />
        </div>
        <ul class="logisticList mt1" :style="{width:TLlength+'px'}"  id='log-ul'>
          <li>
            <div class="dflexAlem mt25" style="justify-content: center; flex-direction: column;">
              <p>广东省 东莞市</p>
              <p class="mt10 mb10"><img src="../assets/img/down.png"/></p>
              <p>广东省 东莞市</p>
            </div>
            <div class="logNumTime graybg"  >
              <p><span class="logNumTime_title">数       量 :</span> <span class="orangeFont">15,000吨</span></p>
              <p class="mt10"><span class="logNumTime_title">装货时间 :</span> 2019-5-20</p>
            </div>
          </li>
          <li>
            <div class="dflexAlem mt25" style="justify-content: center; flex-direction: column;">
              <p>广东省 东莞市</p>
              <p class="mt10 mb10"><img src="../assets/img/down.png"/></p>
              <p>广东省 东莞市</p>
            </div>
            <div class="logNumTime graybg"  >
              <p><span class="logNumTime_title">数       量 :</span> <span class="orangeFont">15,000吨</span></p>
              <p class="mt10"><span class="logNumTime_title">装货时间 :</span> 2019-5-20</p>
            </div>
          </li>
          <li>
            <div class="dflexAlem mt25" style="justify-content: center; flex-direction: column;">
              <p>广东省 东莞市</p>
              <p class="mt10 mb10"><img src="../assets/img/down.png"/></p>
              <p>广东省 东莞市</p>
            </div>
            <div class="logNumTime graybg "  >
              <p><span class="logNumTime_title">数       量 :</span> <span class="orangeFont">15,000吨</span></p>
              <p class="mt10"><span class="logNumTime_title">装货时间 :</span> 2019-5-20</p>
            </div>
          </li>
          <li>
            <div class="dflexAlem mt25" style="justify-content: center; flex-direction: column;">
              <p>广东省 东莞市</p>
              <p class="mt10 mb10"><img src="../assets/img/down.png"/></p>
              <p>广东省 东莞市</p>
            </div>
            <div class="logNumTime graybg "  >
              <p><span class="logNumTime_title">数       量 :</span> <span class="orangeFont">15,000吨</span></p>
              <p class="mt10"><span class="logNumTime_title">装货时间 :</span> 2019-5-20</p>
            </div>
          </li>
          <li>
            <div class="dflexAlem mt25" style="justify-content: center; flex-direction: column;">
              <p>广东省 东莞市</p>
              <p class="mt10 mb10"><img src="../assets/img/down.png"/></p>
              <p>广东省 东莞市</p>
            </div>
            <div class="logNumTime graybg "  >
              <p><span class="logNumTime_title">数       量 :</span> <span class="orangeFont">15,000吨</span></p>
              <p class="mt10"><span class="logNumTime_title">装货时间 :</span> 2019-5-20</p>
            </div>
          </li>
        </ul>

        <div class="Time-limited_next position prve" id='next'  :style="{'display':display}">
          <img src="../assets/img/next.png" />
        </div>
      </div>
<!--    </div>-->
</template>

<script>
    export default {
        name: "Logisticslist",
      data () {
          return {
          display: "flex",
          TLlength:'',
        }
      },
      methods:{
        //鼠标移入
        mouseEnter(){
          var ul=document.getElementById('log-ul')
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
        }
      },
      created() {

      },
      mounted() {

        // *****限时竞拍******
        var chefElement = {
          minSpeed: 10,//每次移动的距离
          //获取页面元素
          prev:document.getElementById('prev'),
          next:document.getElementById('next'),
          parent:document.getElementById('parent'),
          ul:document.getElementById('log-ul'),
          li:document.getElementById('log-ul').getElementsByTagName('li'),
          liWidth:document.getElementById('log-ul').getElementsByTagName('li')[0].offsetWidth,
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

        var  that=this
        let TL=document.getElementsByClassName('logisticList')[0].getElementsByTagName('li')
        let TLWidth=TL[0].offsetWidth
        that.TLlength=TL.length*TLWidth
      },
      updated() {

      },
    }
</script>

<style scoped>
  .logisticList{display: -webkit-box;  position: relative;  }
   .logisticList li{width: 224px;    margin-right: 1px;display: flex;flex-direction: column;justify-content: center;
    text-align: center;  overflow: hidden; background-color: #fff;  position: relative;font-size: 14px;}
  .logNumTime{width: 85%; margin: 30px auto 20px; padding: 15px 15px;  display: flex; flex-direction: column;   box-sizing: border-box;}
  .logNumTime p{display: flex;align-items: center;}
  .logNumTime_title{width: 70px;text-align-last: justify; margin-right: 5px;}

  .orangeFont{color: #ff9800;}
  .greenFont{color: #009900;}

  .position{cursor: pointer; display: flex; justify-content: center; align-items: center; position: absolute;top: 123px;width: 24px;height: 40px;background: rgba(146,146,146,0.8);  z-index: 10;}

  .Time-limited_back{left: 0; border-bottom-right-radius: 5px; border-top-right-radius: 5px; }
  .Time-limited_next{right: 0; border-bottom-left-radius: 5px; border-top-left-radius: 5px; }
</style>
