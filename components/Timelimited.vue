<template>
  <div class="Time-limited">
    <div class="Time_Banner pr">
      <img src="../assets/img/Time_banner.png" />
    </div>
    <div class="ovh pr" style="width: 966px" id="parent" @mouseenter="mouseEnter" @mouseleave="mouseLeave">
      <div class="Time-limited_back position prve" id='prev' :style="{'display':display}">
        <img src="../assets/img/back.png" />
      </div>
      <ul class="Time-limited_list" :style="{backgroundColor:bgColor,width:TLlength+'px'}"  id='TimeL-ul'>
        <li   ref="elememt">
          <div class="endTime">距结束时间 : 05-05 09 : 00</div>
          <h3 class="fs16 fwb mt20">巨正源 SGP PPCP</h3>
          <div class="limitedPrice">
            <span>起拍价 : </span><span class="fs18" style="color: #ff6600;">8801.00元/吨</span>
          </div>
          <div class="NumStore">
            <span>数量 : 100.000吨</span>
            <span>库区 : 东莞</span>
          </div>
          <div class="Timebtn orangebg">竞拍中</div>
        </li>

        <li>
          <div class="endTime">距结束时间 : 05-05 09 : 00</div>
          <h3 class="fs16 fwb mt20">巨正源 SGP PPCP</h3>
          <div class="limitedPrice">
            <span>起拍价 : </span><span class="fs18" style="color: #ff6600;">8802.00元/吨</span>
          </div>
          <div class="NumStore"  >
            <span>数量 : 100.000吨</span>
            <span>库区 : 东莞</span>
          </div>
          <div class="Timebtn orangebg">竞拍中</div>
        </li>

        <li>
          <div class="endTime">距结束时间 : 05-05 09 : 00</div>
          <h3 class="fs16 fwb mt20">巨正源 SGP PPCP</h3>
          <div class="limitedPrice">
            <span>起拍价 : </span><span class="fs18" style="color: #ff6600;">8803.00元/吨</span>
          </div>
          <div class="NumStore"  >
            <span>数量 : 100.000吨</span>
            <span>库区 : 东莞</span>
          </div>
          <div class="Timebtn orangebg">竞拍中</div>
        </li>

        <li>
          <div class="endTime">距结束时间 : 05-05 09 : 00</div>
          <h3 class="fs16 fwb mt20">巨正源 SGP PPCP</h3>
          <div class="limitedPrice">
            <span>起拍价 : </span><span class="fs18" style="color: #ff6600;">8804.00元/吨</span>
          </div>
          <div class="NumStore"  >
            <span>数量 : 100.000吨</span>
            <span>库区 : 东莞</span>
          </div>
          <div class="Timebtn orangebg">竞拍中</div>
        </li>

        <li>
          <div class="endTime">距结束时间 : 05-05 09 : 00</div>
          <h3 class="fs16 fwb mt20">巨正源 SGP PPCP</h3>
          <div class="limitedPrice">
            <span>起拍价 : </span><span class="fs18" style="color: #ff6600;">8804.00元/吨</span>
          </div>
          <div class="NumStore"  >
            <span>数量 : 100.000吨</span>
            <span>库区 : 东莞</span>
          </div>
          <div class="Timebtn orangebg">竞拍中</div>
        </li>



      </ul>
      <div class="Time-limited_next position prve" id='next'  :style="{'display':display}">
        <img src="../assets/img/next.png" />
      </div>
    </div>

  </div>
</template>

<script>
    export default {
        name: "Timelimited",
      data() {
        return {
          display: "none",
          TLlength:'',
          bgColor:'#f5f5f5'
        }
      },
      created () {



      },
      methods:{
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
        }



      },
      computed:{

      },
      mounted () {

        // *****限时竞拍******
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
        console.log('TL:',TL )
        let TLWidth=TL[0].offsetWidth
        that.TLlength=TL.length*TLWidth
      }
    }
</script>

<style scoped>
  /*限时抢拍*/
  .prve{  display: flex; align-items: center;justify-content: center; position: absolute; width: 23px;height: 70px;background-color: rgba(113,113,113,0.3); cursor: pointer;transition: opacity 1s; }
  .Time-limited{width: 1200px;margin: 0 auto; display: flex; margin-top: 20px; }
  .Time_Banner{width: 234px;height: 242px;}
    .Time-limited_list{display: flex; position: relative; width: 1500px}
  .Time-limited_list li{ margin-left: 1px; display: flex;flex-direction: column;justify-content: center; text-align: center; width: 241px;overflow: hidden; background-color: #fff; position: relative;}
  .Time-limited_list li .endTime{height: 26px; background-color: #e0effc;width: 90%;margin: 0 auto; border-bottom-left-radius: 28px; border-bottom-right-radius: 28px; line-height: 26px;}
  .Time-limited_list li .limitedPrice{ width: 80%;  margin: 0 auto; padding: 10px 0;}
  .Time-limited_list li .NumStore{display: flex; flex-direction: column;  text-align: left;  padding: 10px 0px 10px 32px;
    border-bottom: 1px dashed #dedede; width: 70%;  margin: 0 auto;  border-top: 1px dashed #dedede;  box-sizing: border-box;}
  .Timebtn{width: 70%;margin: 17px auto;    padding: 7px 52px; box-sizing: border-box; color: #fff; border-radius:3px;}

  .position{cursor: pointer; display: flex; justify-content: center; align-items: center; position: absolute;top: 92px;width: 24px;height: 40px;background: rgba(146,146,146,0.8);  z-index: 10;}

  .Time-limited_back{left: 0; border-bottom-right-radius: 5px; border-top-right-radius: 5px; }
  .Time-limited_next{right: 0; border-bottom-left-radius: 5px; border-top-left-radius: 5px; }
  .endBg{background-color: #cfcfcf;}
</style>
