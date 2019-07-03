<template>
  <div class="clearfix  graybg">
    <div class="w1200 dflex " style="margin-bottom: 40px;">
      <userright></userright>
    <div class="memberInfor ml20  mt20">
      <!--个人信息-->
      <div class="whitebg bdccc"  >
        <div class="dflex">
          <div class="headInfor">

            <div class="head">
              <img src="../../assets/img/head.png" />
              <div class="headClick">上传</div>
            </div>
            <span>下午好，JD12288！</span>
            <span>欢迎来到巨正源化工交易网！</span>
            <div class="gray mt20 mb10 fs12">上次登录时间：2019年4月1日  09时07分</div>
          </div>
          <div class="pricebg">
            <div class="dflex" style="width: 85%;margin: 0 auto;border-bottom: 1px dashed #eac6b8;justify-content: space-between;">
              <div class="Av_balance">
                <span>可用余额：</span>
                <span class="fs24 fwb orangeFont">{{remain_fund}}</span>
              </div>
              <div class="priceOpera">
                <a class="orangebg white">充 值</a><a class="pricebtnbg brd1 orangeFont ml15">申请提现</a>
              </div>
            </div>
            <div class="" style="display: flex;width: 85%;margin: 20px auto;">
              <div class="dflexPrice">

                <div class="account_icon "></div>
                <div class=""style="display: flex; flex-direction: column; margin-left: 15px;">
                  <span>账户余额</span>
                  <span class="fs18 fwb">{{remain_fund+fozen_fund}}</span>
                </div>

              </div>
              <div class="dflexPrice">
                <div class="Frozen_icon"></div>
                <div class=""style="display: flex; flex-direction: column; margin-left: 15px;">
                  <span>冻结金额</span>
                  <span class="fs18 fwb">{{fozen_fund}}</span>
                </div>
              </div>
            </div>
          </div>

        </div>

        <ul class="orderlist">
          <li>
            <div class="listIcon01 mt20"></div>
            <div class="mt10">待付款</div>
          </li>
          <li>
            <div class="listIcon02 mt20"></div>
            <div class="mt10">待付款</div>
          </li>
          <li>
            <div class="listIcon03 mt20"></div>
            <div class="mt10">待付款</div>
          </li>
          <li>
            <div class="listIcon04 mt20"></div>
            <div class="mt10">待付款</div>
          </li>
          <li>
            <div class="listIcon05 mt20"></div>
            <div class="mt10">待付款</div>
          </li>
          <li>
            <div class="listIcon06 mt20"></div>
            <div class="mt10">待付款</div>
          </li>
        </ul>
      </div>
      <!--广告图-->
      <div class="pr mt20 mb20">
        <img src="../../assets/img/member_index.png" />
        <a href="#.html" class="seeRight">
          立即查看
        </a>
      </div>

      <!--订单表格-->
      <div class="whitebg bdccc">
        <div class="TableList">
          <div class="titleOrder mt25" >
            <ul class="dflex">
              <li class="curr">全部订单</li><li>全部订单（2个）</li><li>已付款（0个）</li><li>待付款（2个）</li>
            </ul>
            <a>查看全部订单 ></a>
          </div>
          <div class="TableTitle graybg">
            <span style="width: 15%;">商品信息</span>
            <span style="width: 15%;">单价(元)</span>
            <span style="width: 15%;">数量(吨)</span>
            <span style="width: 15%;">库区</span>
            <span style="width: 15%;">订单总金额(元)</span>
            <span style="width: 15%;">订单状态</span>
            <span style="width: 15%;">订单操作</span>
          </div>
          <table class="listT mt10" border="" cellspacing="" cellpadding="">
            <tbody>
            <tr class="Ttitle graybg" >
              <td colspan="7">
                <span class="ml10">订单编号：<span class="gray">120002132</span></span>
                <span class="ml15">订单类型：现货</span>
                <span class="ml15">下单时间：<span class="gray">2019-04-02  12:00:00</span></span>
                <span class="fr mr15"><span class="gray">距离最后付款时间还剩：</span>02小时30分25秒</span>
              </td>
            </tr>
            <tr class="detailTable">
              <td>PP F08 现货</td>
              <td><span class="orangeFont">￥1055.00</span>/吨</td>
              <td>102.000</td>
              <td>东莞市</td>
              <td>1,076.10</td>
              <td><span class="redFont">待付款</span></td>
              <td class="operate">
                <div class="">
                  <a class="Paybtn mt15">去付款</a>
                </div>
                <a class="mt5 blackFont">查看详情</a>
              </td>
            </tr>
            </tbody>
          </table>

          <table class="listT mt10" border="" cellspacing="" cellpadding="">
            <tbody>
            <tr class="Ttitle graybg" >
              <td colspan="7">
                <span class="ml10">订单编号：<span class="gray">120002132</span></span>
                <span class="ml15">订单类型：现货</span>
                <span class="ml15">下单时间：<span class="gray">2019-04-02  12:00:00</span></span>
                <span class="fr mr15"><span class="gray">距离最后付款时间还剩：</span>02小时30分25秒</span>
              </td>
            </tr>
            <tr class="detailTable">
              <td>PP F08 <span class="blueFont">现货</span></td>
              <td><span class="orangeFont">￥1055.00</span>/吨</td>
              <td>102.000</td>
              <td>东莞市</td>
              <td>1,076.10</td>
              <td><span class="greenFont">已完成</span></td>
              <td class="operate">
                <div class="">
                  <a class="mt15 blackFont">查看详情</a>
                </div>
                <a class="mt5 blueFont">查看发票</a>
              </td>
            </tr>
            </tbody>
          </table>

        </div>





      </div>

      <!--订单表格-->

    </div>

    </div>
  </div>
</template>

<script>
  import { capitalinfo } from '../../api/capital'
  import userright from './userCompontent/userright'
    export default {
      name: "index",
      layout:'membercenter',
       components:{
         userright,
      },
      data() {
        return {
          fozen_fund:'',
          remain_fund:'',
        }
      },
      methods:{
        async capital(){
          const res= await capitalinfo(this,{})
          this.fozen_fund=res.data.fozen_fund
          this.remain_fund=res.data.remain_fund
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
  .memberInfor{width: 970px;}

  /*头像个人信息*/
  .headInfor{display: flex;align-items: center;flex-direction: column; text-align: center;margin-left: 65px;font-size: 14px;margin-top: 30px;}
  .head{width: 95px; height: 95px;position: relative;border-radius: 50%;overflow: hidden;border: 1px solid #DEDEDE; box-sizing: border-box;}
  .headClick{position: absolute;bottom: 0;text-align: center;width: 100%;background: rgba(0,0,0,0.5);color: #fff;}
  .pricebg{ width: 600px; background: url(../../assets/img/pricebg.png)no-repeat;margin-left: 60px; margin-top: 25px; font-size: 14px;}
  /*可用余额*/
  .Av_balance{margin-top: 25px; margin-bottom:10px;  display: flex;flex-direction: column; text-align: left;justify-content:flex-start}
  .priceOpera{display: flex;align-items: center;}
  .priceOpera a{ font-size: 16px; width: 120px;height: 36px;text-align: center;line-height: 36px;box-sizing: border-box;border-radius: 3px;}
  .brd1{border: 1px solid #ff7300;}
  .priceOpera .pricebtnbg{background-color: #fff9f4;}

  /*账户余额---冻结金额*/
  .dflexPrice{display: flex;align-items: center;width: 50%;border-right: 1px dashed #eac6b8;}
  .dflexPrice:last-child{border-right: none;}
  .account_icon{ width: 32px;height: 32px;background: url(../../assets/img/icon.png)no-repeat -764px -83px;}
  .Frozen_icon{ margin-left: 50px; width: 44px;height: 44px; background: url(../../assets/img/icon.png)no-repeat -754px -38px;}
  /*订单操作列表*/
  .orderlist{display: flex;    justify-content: center; margin: 20px auto;}
  .orderlist li{ font-size: 14px; width: 141px;height: 110px; border: 1px solid #DEDEDE; border-radius: 5px;text-align: center; display: flex;flex-direction: column;    align-items: center;    margin: 5.5px;    box-shadow: 0px 0px 3px #dedede;}
  .listIcon01{width: 30px;  height: 30px;  background: url(../../assets/img/member_icon.png)no-repeat -4px -3px; }
  .listIcon02{width: 30px;  height: 30px;  background: url(../../assets/img/member_icon.png)no-repeat  -44px -3px; }
  .listIcon03{width: 32px;  height: 30px;  background: url(../../assets/img/member_icon.png)no-repeat -82px -3px; }
  .listIcon04{width: 32px;  height: 32px;  background: url(../../assets/img/member_icon.png)no-repeat -122px -3px; }
  .listIcon05{width: 37px;  height: 30px;  background: url(../../assets/img/member_icon.png)no-repeat -158px -3px; }
  .listIcon06{width: 38px;  height: 34px;  background: url(../../assets/img/member_icon.png)no-repeat -196px -1px; }


  .seeRight{ opacity: 0; position: absolute;right: 42px;top: 22px; border: 1px solid #DEDEDE; font-size: 16px;  padding: 9px 47px; border-radius: 25px;}


  .TableList{width: 95%;  margin: 0 auto; font-size: 14px;}
  .titleOrder{ display: flex; justify-content: space-between; align-items: center;  border-bottom: 2px solid #007de4; }
  .titleOrder li{padding: 8px 20px;}
  .titleOrder li.curr{background-color: #007de4; color: #fff;}

  .TableTitle{margin: 10px auto; padding: 10px 0; display: flex;}
  .TableTitle span{text-align: center;}
  .listT{width: 100%;border: none; }
  .listT:last-child{margin-bottom: 30px;}
  .listT .Ttitle td{padding: 10px 0;}
  .listT td{width: 15%; }
  .detailTable{height: 80px;}
  .detailTable td{text-align: center;overflow: hidden; padding: 10px 0;}
  .detailTable .operate .Paybtn{ width: 64%; margin: 0 auto;  padding: 2px 6px; color: #ffff; border-radius: 3px;display: inherit; background-color: #e93131;}
  .detailTable .operate .PayCurr{background-color: #e93131; color: #fff;}
  .detailTable .operate .CarCurr{background-color: #007de4; color: #fff;}

  .blueFont{color: #2b85e4}
</style>
