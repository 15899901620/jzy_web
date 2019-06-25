<template>
    <div class="clearfix graybg ovh">
      <div class="w1200 whitebg bdccc" style="margin-top: 20px; margin-bottom: 40px;">
        <!--公司信息-->
        <div class="mt30 fs16 ml15 fwb">公司信息</div>
        <div class="ml35 mt20 mb20 fs14">上海市信息科技有限公司</div>
        <div class="lineborder"></div>
        <!--交货方式-->
        <div class="mt30 fs16 ml15 fwb">交货方式</div>
        <div class="" style="display: flex; justify-content: space-between;align-items: center; margin-left: 35px;">
          <ul class="DeliveryMethod mb20">
            <li v-for="(item, index) in methodList" @click="addClass(index)" :class="{'curr':index===currentIndex}" :key="index"><div style="background-color: #fff;">{{item.methodName}}</div></li>

            <div class="gray">（您选择交货方式为配送，提交下单必须满足<span class="orangeFont">25</span>吨的倍数）</div>
          </ul>
          <div class="blueFont mr30 cp fs14" id="newAdd"  @click="AddAddress">新增收货地址</div>
        </div>
        <div class="AddList">

          <ul class="addListSelect ovh">
            <li>
              <div class="deliver_icon" ><i class="deliver_icon"></i>配送至</div>
              <div class="fl inform">
                <input type="radio" id="radio_1" name="radio" checked >
                <label for="radio_1"></label>
                <span>小时</span><span>18750963258</span><span>身份证：36541265123661421</span><span>安徽省 合肥市 瑶海区</span><span>总运费：100元</span>
              </div>
              <div class="AddOperat fr"><span>[默认地址]</span><span class="blueFont">修改</span><span class="blueFont">删除</span></div>
            </li>
            <li>
              <div class="deliver_icon" ><i class="deliver_icon"></i>配送至</div>
              <div class="fl inform">
                <input type="radio" id="radio_2" name="radio"  >
                <label for="radio_2"></label>
                <span>小时</span><span>18750963258</span><span>身份证：36541265123661421</span><span>安徽省 合肥市 瑶海区</span><span>总运费：100元</span></div>
              <div class="AddOperat fr"><span>[默认地址]</span><span class="blueFont">修改</span><span class="blueFont">删除</span></div>
            </li>
            <li>
              <div class="deliver_icon"><i class="deliver_icon"></i>配送至</div>
              <div class="fl inform">
                <input type="radio" id="radio_3" name="radio"  >
                <label for="radio_3"></label>
                <span>小时</span><span>18750963258</span><span>身份证：36541265123661421</span><span>安徽省 合肥市 瑶海区</span><span>总运费：100元</span></div>
              <div class="AddOperat fr"><span>[默认地址]</span><span class="blueFont">修改</span><span class="blueFont">删除</span></div>
            </li>

          </ul>


        </div>
        <div class="lineborder"></div>
        <div class="mt30 fs16 ml15 fwb">余额支付</div>
        <ul class="DeliveryMethod ml35">
          <li v-for="(item, index) in payList" @click="payaddClass(index)" :class="{'curr':index===payIndex}" :key="index">{{item.payName}}</li>
          <div class="ml10 fs14">可用余额：<span class="orangeFont">￥10425.00</span>元</div>
          <div  class="licz" @click="showPay()">立即充值</div>
        </ul>
        <div class="orderCzTip">
          * 提交订单后当天17：00前完成付款，逾期扣除保证金
        </div>
        <div class="lineborder"></div>
        <!--优选服务-->
        <div class="mt30 fs16 ml15 fwb" id="test1">优选服务</div>
        <div class="mt10"  >
          <div class="ml35 fs14 dflexAlem">
            <Checkbox :checked.sync="single">巨融易</Checkbox>
            <div class="ml5">
              <i-select :model.sync="timeDay" style="width:200px">
                <i-option v-for="item in TimeList" :value="item.value">{{ item.timeSelect }}</i-option>
              </i-select>
            </div>
            <div class="ml20 orangeFont">* 费率=天数*吨数*5元</div>

          </div>
          <div class="orderCzTip">
            * 选择巨融易产品，提交订单后在有效期内付款完成，逾期将扣除保证金（例：距融易5天，2019-05-08 11:00:00提交订单，须在2019-05-13 17:00:00前完成付款）
          </div>
          <div class="lineborder"></div>
          <div class="mt30 fs16 ml15" id="test1"><span class="fwb">商品信息</span> <span class="gray fs14">（ 距离最后全部提货完成时间剩<span class="orangeFont">02天05时30分</span>，逾期增加<span class="orangeFont">0.01%</span>的仓储费 ）</span></div>

          <ul class="orderPorList">
            <li><h2 style="width: 12%;">编号</h2><h2 style="width: 13%;">货物信息</h2><h2 style="width: 12%;">单价（元/吨）</h2><h2 style="width: 12%;">可提吨数</h2><h2 style="width: 12%;">已提吨数</h2><h2 style="width: 14%;">本次提货吨数</h2><h2 style="width: 12%;">交货地</h2><h2 style="width: 9%;">小计</h2></li>
            <li>
              <div  style="width: 12%;">SH00001</div>
              <div  style="width: 13%;">巨正源 T30</div>
              <div  style="width: 12%;">￥10,625.00</div>
              <div  style="width: 12%;">20.000</div>
              <div  style="width: 12%;">25.000</div>
              <div style="width: 14%;">
                <div class="NumReduice">
                  <span class="orangeFont" style="width: 25%;">-</span>
                  <input class="TextNum" type="text" name="" id="" value=""/>
                  <span class="orangeFont" style="width: 25%;">+</span>	        		</div>
              </div>
              <div  style="width: 12%;">东莞市</div>
              <div class="fwb orangeFont" style="width: 9%;">978,085.00</div>
            </li>
            <li>
              <div  style="width: 12%;">SH00001</div>
              <div  style="width: 13%;">巨正源 T30</div>
              <div  style="width: 12%;">￥10,625.00</div>
              <div  style="width: 12%;">20.000</div>
              <div  style="width: 12%;">25.000</div>
              <div style="width: 14%;">
                <div class="NumReduice">
                  <span class="orangeFont" style="width: 25%;">-</span>
                  <input class="TextNum" type="text" name="" id="" value=""/>
                  <span class="orangeFont" style="width: 25%;">+</span>
                </div>
              </div>
              <div  style="width: 12%;">东莞市</div>
              <div class="fwb orangeFont" style="width: 9%;">978,085.00</div>
            </li>
            <li>
              <div style="width: 12%;">SH00001</div>
              <div style="width: 13%;">巨正源 T30</div>
              <div style="width: 12%;">￥10,625.00</div>
              <div style="width: 12%;">20.000</div>
              <div style="width: 12%;">25.000</div>
              <div style="width: 14%;">
                <div class="NumReduice">
                  <span id="" style="width: 25%;">-</span><input class="TextNum" type="text" name="" id="" value="25.000"/><span id="" style="width: 25%;">+</span>
                </div>
              </div>
              <div style="width: 12%;">东莞市</div>
              <div class="fwb orangeFont" style="width: 9%;">978,085.00</div>
            </li>
          </ul>
          <div class="proInfor">
            <div  style="display: flex; flex-direction: column; width: 300px; " >
              <div class="mt20 tar mr20 dflex " style="align-items: center;">
                <span class="totalprice">应付总额：</span><span class="tar" style="width: 150px;">￥978,085.00</span>
              </div>
              <div class="mt20 mb20 tar mr20 dflexAlem">
                <span class="totalprice">待付金额：</span><span class="fs18 orangeFont tar fwb" style="width: 150px;">￥978,085.50</span>
              </div>
            </div>

          </div>


        </div>

      </div>
      <div class="w1200 whitebg dflexAlem" style="font-size: 14px; margin-top: 30px; margin-bottom:50px;justify-content:flex-end;">
        <div class="mr15">待付金额：<span class="orangeFont"><span class="fwb fs18">978,085.50</span> 元</span></div>
        <div class="submitOrder" @click="showOrder()">提交订单</div>

      </div>
     <order-popup @hidden="hiddenOrder"  v-show="showOrder_pop"></order-popup>
      <pay-popup @hidden="hiddenPay"  v-show="showPay_pop"></pay-popup>
      <AddressPopup @hidden="hiddenAdd"  v-show="showAdd_pop"></AddressPopup>
    </div>
</template>

<script>
  import OrderPopup from './BidersComponent/OrderPopup'
  import PayPopup from './BidersComponent/PayPopup'
  import AddressPopup from '../users/userCompontent/AddressPopup'
    export default {
      name: "BidersSubmit",
      layout:'SumbitOrderHeader',
      components:{
        OrderPopup,
        PayPopup,
        AddressPopup
      },
      data(){
          return{
            showOrder_pop:false,
            showPay_pop:false,
            showAdd_pop:false,
            timeDay:'',
            single: false,
            currentIndex:0,
            payIndex:0,
            methodList:[
              {methodName:'自提'},
              {methodName:'配送'}
            ],
            payList:[
              {payName:'支付全款'},
              {payName:'支付保证金'}
            ],
            TimeList:[
              {
                value:'5day',
                timeSelect:'5天'
              },
              {
                value:'3day',
                timeSelect:'3天'
              },
              {
                value:'1day',
                timeSelect:'1天'
              }
            ]
          }
      },
      methods:{
        addClass(index){
          this.currentIndex = index
        },
        // 选中支付
        payaddClass(index){
          this.payIndex = index
        },
        // 显示订单
        showOrder(){
          console.log('showOrder_pop')
          var  that=this
          that.showOrder_pop=true;
        },
        // 隐藏订单
        hiddenOrder(){
          var  that=this
          that.showOrder_pop=false;
        },
        // 显示支付弹窗
        showPay(){
          this.showPay_pop=true;
        },
        hiddenPay(){
          this.showPay_pop=false;
        },
        // 显示地址弹窗
        AddAddress(){
          this.showAdd_pop=true;
        },
        // 隐藏地址弹窗
        hiddenAdd(){
          this.showAdd_pop=false;
        }

      },


    }
</script>

<style >

  .DeliveryMethod{display: flex; margin-top:20px;   align-items: center;}
  .DeliveryMethod li{border: 1px solid #DDDDDD;padding: 5px 40px; cursor: pointer;box-sizing: border-box; font-size: 14px;}
  .DeliveryMethod li:nth-child(2){margin-left: 15px;}
  .DeliveryMethod li.curr{ color: #ff7300; border:1px solid #ff7300; box-sizing: border-box; background: url(../../assets/img/selected.png)no-repeat  right bottom;}

  .inform{position: relative;}
  .inform label {width: 15px; height: 15px; position: absolute; top: 9px; left: -1px;border: 2px solid #ff7300; border-radius: 50%;  background: #fffdf6;   cursor: pointer;}
  .inform input:checked + label:after {content:'';width:9px;height:9px;position:absolute;top:1px;left:1px;background:#ff7300;border-radius:50%;}
  .lineborder{height: 1px; background-color: #eeeeee;width: 97%;margin: 0 auto;}


  .AddList{width: 95%;margin: 0 auto;background-color: #fffdf6; margin-bottom: 20px;}
  .addListSelect li{line-height: 35px;overflow: hidden;border: 1px solid #fffdf6; font-size: 14px;}
  .addListSelect li:hover{border: 1px solid #ff7300; background-color: #fff3ed;}
  .inform span{margin: 0 5px;}
  .deliver_icon{ float: left; display: flex;align-items: center; margin-left: 16px; margin-right: 40px;}
  .deliver_icon i{background: url(../../assets/img/icon.png)no-repeat 0px -249px;width: 16px;height: 17px;margin-right: 10px;}
  .AddOperat span{margin: 0 10px; cursor: pointer;}

  .licz{background-color: #ff7300;  color: #fff;padding: 5px 15px;border-radius: 3px; margin-left: 15px;}
  .licz:hover{color: #fff;}

  .orderCzTip{color: #999; margin-left: 130px;margin-top: 15px;margin-bottom: 15px;}
  .totalprice{width: 150px;}
  .submitOrder{border-radius: 5px;padding: 10px 40px;background-color: #ff7300;font-size: 18px;display: flex;align-items: center;color: #fff; cursor: pointer;}
  .proInfor{width: 98%; margin: 20px auto;background-color: #f2f7ff;display: flex;justify-content: flex-end;}


  .ivu-checkbox-inner{display: inline-block;
    width: 16px;
    height: 16px;
    position: relative;
    top: 0;
    left: 0;
    border: 1px solid #dcdee2;
    border-radius: 2px;
    background-color: #fff;
    transition: border-color .2s ease-in-out,background-color .2s ease-in-out,box-shadow .2s ease-in-out;}
  .ivu-checkbox-checked .ivu-checkbox-inner{
    border-color: #ff7300;
    background-color: #ff7300;
  }
  .ivu-checkbox-checked .ivu-checkbox-inner:after{
    content: '';
    display: table;
    width: 4px;
    height: 8px;
    position: absolute;
    top: 1px;
    left: 4px;
    border: 2px solid #fff;
    border-top: 0;
    border-left: 0;
    transform: rotate(45deg) scale(1);
    transition: all .2s ease-in-out;
  }
  .ivu-checkbox-checked:hover .ivu-checkbox-inner{border-color: #ff7300;}

  /*商品信息*/
  .orderPorList{width: 98%;margin: 0 auto;margin-top: 10px;}
  .orderPorList li{display: flex; background-color: #fbfcff; border-bottom: 1px solid #fff; font-size: 14px;}
  .orderPorList li:first-child{background: none; border:none;}
  .orderPorList li h2{border-bottom: 2px solid #b2d1ff; text-align: center; margin: 0 3px; padding: 7px 0; font-size: 14px;}
  .orderPorList li>div{  margin: 15px 3px;text-align: center;      align-items: center;  display: flex;justify-content: center;}
  .NumReduice{  margin: 0 auto;  height: 30px; border: 1px solid #D2D2D2; background-color: #fff; width: 65%; display: flex;align-items: center;}
  .NumReduice>span{ cursor: pointer;  font-weight: bold;    height: 100%;  align-items: center; display: flex; justify-content: center;}
  .NumReduice .TextNum{width: 50%;border: none;height: 100%;text-align: center;}
  /*订单确认*/
  .ordercon{display: flex;flex-wrap: wrap; align-items: center; margin: 0 auto;width: 85%;}
  .ordercon li{width: 48%; margin-top:15px;}

  .proInfor{width: 98%; margin: 20px auto;background-color: #f2f7ff;display: flex;justify-content: flex-end; font-size: 14px;}

</style>
