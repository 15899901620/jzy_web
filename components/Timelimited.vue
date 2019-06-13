<template>
  <div class="Time-limited">
    <div class="Time_Banner pr">
      <img src="../assets/img/Time_banner.png" />
    </div>
    <div class="ovh pr" style="width: 966px">
      <div class="Time-limited_back position">
        <img src="../assets/img/back.png" />
      </div>
      <ul class="Time-limited_list" :style="{backgroundColor:bgColor,width:TLlength+'px'}"  >
        <li   ref="elememt">
          <div class="endTime">距结束时间 : 05-05 09 : 00</div>
          <h3 class="fs16 fwb mt20">巨正源 SGP PPCP</h3>
          <div class="limitedPrice">
            <span>起拍价 : </span><span class="fs18" style="color: #ff6600;">8800.00元/吨</span>
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
            <span>起拍价 : </span><span class="fs18" style="color: #ff6600;">8800.00元/吨</span>
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
            <span>起拍价 : </span><span class="fs18" style="color: #ff6600;">8800.00元/吨</span>
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
            <span>起拍价 : </span><span class="fs18" style="color: #ff6600;">8800.00元/吨</span>
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
            <span>起拍价 : </span><span class="fs18" style="color: #ff6600;">8800.00元/吨</span>
          </div>
          <div class="NumStore"  >
            <span>数量 : 100.000吨</span>
            <span>库区 : 东莞</span>
          </div>
          <div class="Timebtn orangebg">竞拍中</div>
        </li>

      </ul>
      <div class="Time-limited_next position">
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
          TLlength:'',
          bgColor:'#f5f5f5'
        }
      },
      created () {



      },
      methods:{
      },
      computed:{

      },
      mounted () {
        var that=this
        let TL=document.getElementsByClassName('Time-limited_list')[0].getElementsByTagName('li')
        let TLWidth=TL[0].offsetWidth
        that.TLlength=TL.length*TLWidth
      }
    }
</script>

<style scoped>
  /*限时抢拍*/
  .Time-limited{width: 1200px;margin: 0 auto; display: flex; margin-top: 20px; }
  .Time_Banner{width: 234px;height: 242px;}
  .Time-limited_list{display: flex; position: relative; width: 1500px}
  .Time-limited_list li{ margin-left: 1px; display: flex;flex-direction: column;justify-content: center; text-align: center; width: 241px;overflow: hidden; background-color: #fff; position: relative;}
  .Time-limited_list li .endTime{height: 26px; background-color: #e0effc;width: 90%;margin: 0 auto; border-bottom-left-radius: 28px; border-bottom-right-radius: 28px; line-height: 26px;}
  .Time-limited_list li .limitedPrice{ width: 80%;  margin: 0 auto; padding: 10px 0;}
  .Time-limited_list li .NumStore{display: flex; flex-direction: column;  text-align: left;  padding: 10px 0px 10px 32px;
    border-bottom: 1px dashed #dedede; width: 70%;  margin: 0 auto;  border-top: 1px dashed #dedede;  box-sizing: border-box;}
  .Timebtn{width: 70%;margin: 17px auto;    padding: 7px 52px; box-sizing: border-box; color: #fff; border-radius:3px;}

  .position{cursor: pointer; display: flex; justify-content: center; align-items: center; position: absolute;top: 92px;width: 24px;height: 40px;background: rgba(146,146,146,0.8); opacity: 0.5;z-index: 10;}

  .Time-limited_back{left: 0; border-bottom-right-radius: 5px; border-top-right-radius: 5px; }
  .Time-limited_next{right: 0; border-bottom-left-radius: 5px; border-top-left-radius: 5px; }
  .endBg{background-color: #cfcfcf;}
</style>
