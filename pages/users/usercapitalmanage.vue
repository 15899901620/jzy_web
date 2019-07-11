<template>
  <div class="clearfix graybg">
    <div class="w1200 dflex " style="margin-bottom: 40px">
      <userright></userright>
      <div class="" style="width: 100%">
      <div class="memberInfor ml20  whitebg bdccc  mt20">
        <!--资金管理-->
        <div class="TableList">
          <h1 class="fs16 mt20 bb1 pb10" >资金管理</h1>
          <div class="dflexAlem" style="justify-content: space-between; margin: 25px auto; font-size: 14px ">
            <div>可用余额<span class="fs24 orangeFont fwb ml10">{{remain_fund}}</span></div>
            <div class="opePrice">
              <span class="orangesbg" @click="paycheck" >充 值</span>
              <span class="orangeFont CashAdvBg ml15" href="">申请提现</span>
            </div>
          </div>
          <ul class="balancebg mb30">
            <li><i class="pribg"></i>账户余额<span class="fs18 orangeFont fwb ml10">{{remain_fund+fozen_fund}}</span></li><li><i class="Frozenbg"></i>冻结金额<span class="fs18 orangeFont fwb ml10">{{fozen_fund}}</span></li>
          </ul>
        </div>

        </div>

      <div class="memberInfor  ml20  whitebg bdccc  mt20">
        <div class="TableList">
          <!--个人信息-->
          <h1 class="fs16 mt25 bb1 pb10" >交易明细</h1>
          <div class="order_operate">
            <div class="dflexAlem">
              <span style="width: 90px;">起始日期</span><input type="text" class="layui-input ml10" id="test6" placeholder="选择订单时间">
              <div class="check" style="width: 85px;line-height: 38px;">查看</div>
            </div>
            <div class="dflex" style="align-items: center;">
              一共<span class="orangeFont">15</span>条竞拍
            </div>
          </div>
          <ul class="tradeDetail">
            <div class="tradeDetail_title">
              <span>交易时间</span><span>备注</span><span>交易金额（元）</span><span>余额（元）</span><span>订单编号</span>
            </div>
            <li>
              <span>2019-02-12 12:00:00</span><span>充值</span>
              <span>+292,241.00</span><span>2,544,214.20</span>
              <span>-</span>
            </li>
            <li>
              <span>2019-02-12 12:00:00</span><span>充值</span>
              <span>+292,241.00</span><span>2,544,214.20</span>
              <span>-</span>
            </li>
            <li>
              <span>2019-02-12 12:00:00</span><span>充值</span>
              <span>+292,241.00</span><span>2,544,214.20</span>
              <span>-</span>
            </li>
            <li>
              <span>2019-02-12 12:00:00</span><span>充值</span>
              <span>+292,241.00</span><span>2,544,214.20</span>
              <span>-</span>
            </li>
          </ul>

          <!--页码-->
          <ul class="pagination">
            <li><a href="#">首页</a></li>
            <li><a href="#">上一页</a></li>
            <li><a href="#">1</a></li>
            <li><a class="active" href="#">2</a></li>
            <li><a href="#">3</a></li>
            <li><a href="#">4</a></li>
            <li><a href="#">5</a></li>
            <li><a href="#">6</a></li>
            <li><a href="#">7</a></li>
            <li><a href="#">下一页</a></li>
            <li><a href="#">尾页</a></li>
            <li class="ml10">共40页</li>
            <div class="ml30">转到第<input type="text" class="pageText bdccc" />页</div>
            <a class="PageNext graybg">Go</a>
          </ul>
        </div>

      </div>

      </div>



    </div>





  </div>
</template>

<script>
  import { capitalinfo } from '../../api/capital'
  import userright from './userCompontent/userright'

  export default {
      name: "usercapitalmanage",
      layout:'membercenter',
        components:{
        userright
      },
      data(){
        return{
          fozen_fund:'',
          remain_fund:'',
        }
      },
      methods:{
        async capital(){
       const res= await capitalinfo(this,{})
          this.fozen_fund=res.data.fozen_fund
          this.remain_fund=res.data.remain_fund
        },
        paycheck(){
          this.$router.push({name: "users-usercapitalpaycheck"})
        }
      },
      created(){
        console.log('created')
        this.capital()
      },
      mounted(){

      },

    }
</script>

<style scoped>
  .memberInfor{width: 83%;}

  .dflexAlem{display:flex;align-items: center;}

  .TableList{width: 95%;  margin: 0 auto;}
  .titleOrder{ display: flex; justify-content: space-between; align-items: center;  border-bottom: 2px solid #007de4; }
  .titleOrder li{padding: 8px 20px;}
  .titleOrder li.curr{background-color: #007de4; color: #fff;}

  .CashAdvBg{background-color: #fff8f1;}
  .opePrice span{ font-size: 16px; border-radius:5px; display: inline-block; width: 120px;height: 40px;line-height: 40px;text-align: center; cursor: pointer;}
  .balancebg{background-color: #fffef8;border: 1px solid #ffe19e; border-radius:2px;}

  .balancebg{display: flex;}
  .balancebg li{ font-size: 14px; display: flex;justify-content: center;align-items: center; width: 48%;border-right: 1px dashed #eac6b8;text-align: center;margin: 20px auto;}
  .balancebg li:last-child{border: none;}
  .pribg{width: 40px;height: 26px;background: url(../../assets/img/icon.png)no-repeat -761px -196px; margin-right: 10px;}
  .orangesbg{background-color: #ff6f17;
    color: #fff;}
  .Frozenbg{width: 40px;height: 26px;background: url(../../assets/img/icon.png)no-repeat -758px -159px; margin-right: 10px;   }

  .TableList{width: 95%;  margin: 0 auto;}
  .titleOrder{ display: flex; justify-content: space-between; align-items: center;  border-bottom: 2px solid #007de4; }
  .titleOrder li{padding: 8px 20px;}
  .titleOrder li.curr{background-color: #007de4; color: #fff;}

  .order_operate{display: flex;justify-content: space-between; align-items: center; margin: 20px auto;}
  .orderInput{width: 286px; border: 1px solid #DEDEDE; padding-left: 10px;box-sizing: border-box;}
  .check{ color: #fff; width: 60px;line-height: 32px; background-color: #007de4;text-align: center;margin-left: 5px;border-radius: 3px;}



  .tradeDetail{border: 1px solid #DEDEDE;}
  .tradeDetail_title{background-color: #f4f4f4;display: flex;align-items: center;}
  .tradeDetail_title>span{border-right: 1px solid #dddddd;margin: 15px 0;    width: 20%;text-align: center;}
  .tradeDetail_title>span:last-child{border: none;}
  .tradeDetail li{display: flex;align-items: center; color: #333;}
  .tradeDetail li:nth-child(even){background-color: #fcfcfc;}
  .tradeDetail li>span{margin: 15px 0; width: 20%;text-align: center; font-size: 14px;}

  /*页码*/
  ul.pagination {  display: inline-block;  padding: 0;   margin: 30px auto;display: flex;justify-content: center;}
  ul.pagination li{display: flex;align-items: center;}
  ul.pagination li a {background-color: #efefef;padding: 5px 11px;}
  ul.pagination li a{  color: #333;border: 1px solid #efefef; border-radius: 4px; padding: 8px 10px;
    text-decoration: none;transition: background-color .3s;  margin: 0 8px;}
  ul.pagination li a.active{background-color: #007de4; color: #fff;  border: 1px solid #007de4;}
  ul.pagination li a:hover:not(.active){background-color: #007de4; color: #fff;border: 1px solid #007de4;}
  ul.pagination .pageText{width: 40px;height: 35px; margin: 0 8px; border-radius:3px;    box-sizing: border-box; border: 1px solid #dededede;
    background-color: #fff;text-align: center;}
  ul.pagination .PageNext{border-radius: 2px; color: #666; width: 40px;height: 35px; line-height: 35px; margin: 0 15px; text-align: center;
    border: 1px solid #dededede;box-sizing: border-box;background-color: #efefef;}
</style>
