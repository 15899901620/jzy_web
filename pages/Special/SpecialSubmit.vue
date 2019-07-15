<template>
    <div class="clearfix graybg ovh">
      <div class="w1200 whitebg bdccc" style="margin-top: 20px; margin-bottom: 40px;">
        <!--公司信息-->
        <div class="mt30 fs16 ml15 fwb">公司信息</div>
        <div class="ml35 mt20 mb20 fs14">{{companyName}}</div>
        <div class="lineborder"></div>
        <!--交货方式-->
        <div class="mt30 fs16 ml15 fwb">交货方式</div>
        <div class="" style="display: flex; justify-content: space-between;align-items: center; margin-left: 35px;">
          <ul class="DeliveryMethod mb20">
            <li v-for="(item, index) in methodList" @click="addClass(index)" :class="{'curr':index===currentIndex}" :key="index" v-model="methodName"><div style="background-color: #fff;">{{item.methodName}}</div></li>

            <div class="gray">（您选择交货方式为配送，提交下单必须满足<span class="orangeFont">25</span>吨的倍数）</div>
          </ul>
          <div class="blueFont mr30 cp fs14" id="newAdd"  @click="AddAddress">新增收货地址</div>
        </div>
        <div class="AddList" v-if="methodName=='配送'">

          <ul class="addListSelect ovh">
            <li v-for="(item,i) in addressList">
              <div  class ='deliver_icon' ><i class ='deliver_icon'   v-if="isactive  == i"></i><div  style="float: left; display: flex;align-items: center;margin-left: 16px;margin-right: 25px;" v-else></div>配送至</div>
                <div  @click="Radio(i,item)">
                <RadioGroup v-model="vertical" vertical >
                    <Radio :label="i" >
                         <span style="margin-left: 15px">{{item.phone}}</span><span style="margin-left: 15px">身份证：{{item.idNumber}}</span><span style="margin-left: 15px">{{item.stateName}} {{item.cityName}}{{item.districtName}}</span>
                    </Radio>
                </RadioGroup>
                </div>
            </li>
          </ul>
        </div>

        <div class="lineborder"></div>
        <div class="mt30 fs16 ml15 fwb">余额支付</div>
        <ul class="DeliveryMethod ml35">
          <li v-for="(item, index) in payList" @click="payaddClass(index)" :class="{'curr':index===payIndex}" :key="index">{{item.payName}}</li>
          <div class="ml10 fs14">可用余额：<span class="orangeFont">￥{{capitalinfo.remain_fund}}</span>元</div>
          <div  class="licz" @click="showPay()" style="cursor: pointer">立即充值</div>
        </ul>
        <div class="orderCzTip">
          * 提交订单后当天17：00前完成付款，逾期扣除保证金
        </div>
          <div class="lineborder"></div>
          <div class="mt30 fs16 ml15 fwb" v-if="methodName=='配送'">运费</div>
          <ul class="DeliveryMethod ml35" v-if="methodName=='配送'">
              <li v-for="(item, index) in extra" @click="Extra1(index,item)" :class="{'curr':index===extraIndex}" :key="index">
                  {{item.transportationMode}}({{item.basePrice}}元)
              </li>
          </ul>

        <div class="lineborder"></div>
        <!--优选服务-->
        <div class="mt30 fs16 ml15 fwb" id="test2">优选服务</div>
        <div class="mt10"  >
          <div class="ml35 fs14 dflexAlem">
            <Checkbox v-model="single"  @click.prevent.native="single1">巨融易</Checkbox>
            <div class="ml5">
              <i-select :model.sync="timeDay" style="width:200px">
                <i-option v-for="(item, index) in TimeList" :value="item.value" :key="index">{{ item.timeSelect }}</i-option>
              </i-select>
            </div>
            <div class="ml20 orangeFont">* 费率=天数*吨数*5元</div>

          </div>
          <div class="orderCzTip">
            * 选择巨融易产品，提交订单后在有效期内付款完成，逾期将扣除保证金（例：距融易5天，2019-05-08 11:00:00提交订单，须在2019-05-13 17:00:00前完成付款）
          </div>
          <div class="lineborder"></div>
          <div class="mt30 fs16 ml15" id="test1">
            <span class="fwb">商品信息</span>
            <span class="gray fs14">（ 距离最后全部提货完成时间剩<span class="orangeFont">02天05时30分</span>，逾期增加<span class="orangeFont">0.01%</span>的仓储费 ）</span>
          </div>
          <ul class="orderPorList">
            <li><h2 style="width: 12%;">编号</h2><h2 style="width: 13%;">货物信息</h2><h2 style="width: 12%;">单价（元/吨）</h2><h2 style="width: 12%;">放料单可提吨数</h2><h2 style="width: 12%;">周计划可提吨数</h2><h2 style="width: 12%;">已提吨数</h2><h2 style="width: 14%;">本次提货吨数</h2><h2 style="width: 12%;">交货地</h2><h2 style="width: 9%;">小计</h2></li>
            <li>
              <div  style="width: 12%;">{{specialDetail.skuNo}}</div>
              <div  style="width: 13%;">{{specialDetail.skuName}}</div>
              <div  style="width: 12%;">{{specialDetail.basePrice}}</div>
              <div  style="width: 12%;">{{specialDetail.availableNum}}</div>
              <div  style="width: 12%;">{{maxnumber-WeekList.weekAlreadyDeliveryNum}}</div>
              <div  style="width: 12%;">{{WeekList.monthTotalDeliveryNum}}</div>
              <div  style="width: 14%;">
                <div class="NumReduice">
                  <span class="orangeFont" style="width: 25%;" @click="subtract()">-</span>
                  <input class="TextNum" type="text" name="" id="" v-model="getWeek" v-on:input="SearchInput"/>
                  <span class="orangeFont" style="width: 25%;"  @click="add()">+</span>	        		</div>
              </div>
              <div  style="width: 12%;">东莞市</div>
              <div class="fwb orangeFont" style="width: 9%;">{{amount}}</div>
            </li>
          </ul>



          <div class="proInfor">
            <div  style="display: flex; flex-direction: column; width: 300px; " >
              <div class="mt20 tar mr20 dflex " style="align-items: center;">
                <span class="totalprice">应付总额：</span><span class="tar" style="width: 150px;">￥{{amount}}</span>
              </div>
              <div class="mt20 mb20 tar mr20 dflexAlem">
                <span class="totalprice">待付金额：</span><span class="fs18 orangeFont tar fwb" style="width: 150px;">￥{{amount}}</span>
              </div>
            </div>

          </div>


        </div>

      </div>
      <div class="w1200 whitebg dflexAlem" style="font-size: 14px; margin-top: 30px; margin-bottom:50px;justify-content:flex-end;">
        <div class="mr15">待付金额：<span class="orangeFont"><span class="fwb fs18">{{amount}}</span> 元</span></div>
        <div class="submitOrder"  style="background-color: #e0dede"   v-if="Order==0">提交订单</div>
        <div class="submitOrder"  @click="showOrder()" v-else>提交订单</div>

      </div>
      <AddressPopup @hidden="hiddenAdd"  v-show="showAdd_pop"></AddressPopup>
        <router-view v-if="isRouterAlive"></router-view>
    </div>

</template>

<script>
  import OrderPopup from '../Biders/BidersComponent/OrderPopup'
  import PayPopup from '../Biders/BidersComponent/PayPopup'
  import AddressPopup from '../users/userCompontent/AddressPopup'
  import { addressList, gainuserInfor} from '../../api/users'
  import { specialDetail,getWeek ,submitOrder} from '../../api/special'
  import {extra} from '../../api/extra'
  import { capitalinfo} from '../../api/capital'
  import Cookies from 'js-cookie'

    export default {

      name: "BidersSubmit",
      layout:'SumbitOrderHeader',
      components:{
        OrderPopup,
        PayPopup,
        AddressPopup
      },
      provide () {
      return {
          reload: this.reload
      }
       },
      data(){
          return{
             methodName:'自提',
              payName:'支付全款',
            showAdd_pop:false,
            Order:0,
            timeDay:'',
            isRouterAlive:false,
            isactive:0,
            single: false,
              vertical: 0,
            currentIndex:0,
            payIndex:0,
              extraIndex:0,
            methodList:[
              {methodName:'自提'},
              {methodName:'配送'}
            ],
            payList:[
              {payName:'支付全款'},
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
            ],
              capitalinfo:[],
              addressList:[],
              AddressNum:'',
              WeekList:[],
              id:'',
              getWeek:'',
              companyName:'',
              addrdetail:[],
              addr:0,
              ExtraList:[],
              maxnumber:'',
              specialDetail:[],
              TipAddress:'',
              extra:[],
              amount:'',
              amount1:''
          }
      },
      methods:{
          showPay(){
              this.$router.push({path:"/users/usercapitalmanage"})
          },
          //输入时
          SearchInput(){
              console.log(this.specialDetail.availableNum)
              console.log(this.specialDetail.takeTheirDoubly)
              if(this.methodName=='自提'){
                  if(this.specialDetail.takeTheirDoubly==0){
                      if(  parseFloat(this.getWeek) > parseFloat(this.maxnumber) || parseFloat(this.getWeek) > parseFloat(this.specialDetail.availableNum)){
                          this.$Notice.open({
                              title: '不能大于提货吨数',
                          });
                          this.getWeek=this.maxnumber
                      }
                  }else{
                      if(  parseFloat(this.getWeek)%parseFloat(this.specialDetail.takeTheirMin) != 0 ||  parseFloat(this.getWeek) > parseFloat(this.maxnumber) || parseFloat(this.getWeek) <=0){
                          this.$Notice.open({
                              title: '不能大于提货吨数',
                          });
                          this.getWeek=this.specialDetail.takeTheirMin
                      }
                  }
              }
              if(this.methodName=='配送'){
                  if(this.specialDetail.deliveryDoubly==0){
                      if(  parseFloat(this.getWeek) > parseFloat(this.maxnumber) || parseFloat(this.getWeek) > parseFloat(this.specialDetail.availableNum)){
                          this.$Notice.open({
                              title: '不能大于提货吨数',
                          });
                          this.getWeek=this.maxnumber
                      }
                      if( parseFloat(this.getWeek) <= 0){

                          this.$Notice.open({
                              title: '不能小于等于0',
                          });
                          this.getWeek=1
                      }
                  }else{
                      if(  parseFloat(this.getWeek)%parseFloat(this.specialDetail.deliveryMin) != 0 ||  parseFloat(this.getWeek) > parseFloat(this.maxnumber) || parseFloat(this.getWeek) <=0){
                          this.$Notice.open({
                              title: '请输入正确的数量',
                          });
                          this.getWeek=this.specialDetail.deliveryMin
                      }

                  }
              }

          },
          //加+
          add(){

              if(this.methodName=='自提'){
                  if(this.specialDetail.takeTheirDoubly==0){
                      if(  parseFloat(this.getWeek)+ 1 > parseFloat(this.maxnumber) || parseFloat(this.getWeek) +1 > parseFloat(this.specialDetail.availableNum)){
                          this.$Notice.open({
                              title: '不能大于提货吨数',
                          });
                      }else{
                          this.getWeek =    parseFloat(this.getWeek) +1
                          this.amount=this.specialDetail.basePrice * this.getWeek
                          this.amount=this.amount.toFixed(3)
                          this.amount1=this.amount
                      }
                  }else{
                      if(  parseFloat(this.getWeek)+ parseFloat(this.specialDetail.takeTheirMin) > parseFloat(this.maxnumber) || parseFloat(this.getWeek) + parseFloat(this.specialDetail.takeTheirMin) > parseFloat(this.specialDetail.availableNum)){
                          this.$Notice.open({
                              title: '不能大于提货吨数',
                          });
                      }else{
                          this.getWeek =    parseFloat(this.getWeek) +parseFloat(this.specialDetail.takeTheirMin)
                          this.amount=this.specialDetail.basePrice * this.getWeek
                          this.amount=this.amount.toFixed(3)
                          this.amount1=this.amount
                      }
                  }
              }
              if(this.methodName=='配送'){
                  if(this.specialDetail.deliveryDoubly==0 || parseFloat(this.getWeek) +1 > parseFloat(this.specialDetail.availableNum)){
                      if(  parseFloat(this.getWeek)+ 1 > parseFloat(this.maxnumber) ){
                          this.$Notice.open({
                              title: '不能大于提货吨数',
                          });
                      }else{
                          this.getWeek =    parseFloat(this.getWeek) +1
                          this.amount=this.specialDetail.basePrice * this.getWeek
                          this.amount1=this.amount
                          this.amount=this.amount.toFixed(3)
                      }
                  }else{
                      if(  parseFloat(this.getWeek)+ parseFloat(this.specialDetail.deliveryMin) > parseFloat(this.maxnumber) || parseFloat(this.getWeek) +parseFloat(this.specialDetail.deliveryMin) > parseFloat(this.specialDetail.availableNum)){
                          this.$Notice.open({
                              title: '不能大于提货吨数',
                          });
                      }else{
                          this.getWeek =    parseFloat(this.getWeek) +parseFloat(this.specialDetail.deliveryMin)
                          this.amount=this.specialDetail.basePrice * this.getWeek
                          this.amount1=this.amount
                          this.amount=this.amount.toFixed(3)
                      }
                  }
              }


          },
          //减-
          subtract(){
              if(this.methodName=='自提'){
                  if(this.specialDetail.takeTheirDoubly==0){
                      if(  parseFloat(this.getWeek)- 1 <= parseFloat(this.specialDetail.takeTheirMin)){
                          this.$Notice.open({
                              title: '不能小于最小值',
                          });
                      }else{
                          this.getWeek =    parseFloat(this.getWeek) -1
                          this.amount=this.specialDetail.basePrice * this.getWeek
                          this.amount1=this.amount
                          this.amount=this.amount.toFixed(3)
                      }
                  }else{

                      if(  parseFloat(this.getWeek)- parseFloat(this.specialDetail.takeTheirMin) < parseFloat(this.specialDetail.takeTheirMin)){
                          this.$Notice.open({
                              title: '不能小于最小值',
                          });
                      }else{
                          this.getWeek =    parseFloat(this.getWeek) -parseFloat(this.specialDetail.takeTheirMin)
                          this.amount=this.specialDetail.basePrice * this.getWeek
                          this.amount1=this.amount
                          this.amount=this.amount.toFixed(3)
                      }
                  }
              }
              if(this.methodName=='配送'){
                  if(this.specialDetail.delivery_doubly==0 ){
                      if( parseFloat(this.getWeek)- 1 <= this.specialDetail.deliveryMin){
                          this.$Notice.open({
                              title: '不能大于提货吨数',
                          });
                      }else{
                          this.getWeek =    parseFloat(this.getWeek) -1
                          this.amount=this.specialDetail.basePrice * this.getWeek
                          this.amount1=this.amount
                          this.amount=this.amount.toFixed(3)
                      }
                  }else{
                      if( parseFloat(this.getWeek)- parseFloat(this.specialDetail.deliveryMin) < parseFloat(this.specialDetail.deliveryMin)){
                          this.$Notice.open({
                              title: '不能大于提货吨数',
                          });
                      }else{
                          this.getWeek =    parseFloat(this.getWeek) -parseFloat(this.specialDetail.deliveryMin)
                          this.amount=this.specialDetail.basePrice * this.getWeek
                          this.amount1=this.amount
                          this.amount=this.amount.toFixed(3)
                      }
                  }
              }
          },
          reload () {
              this.isRouterAlive = false
              this.$nextTick(function () {
                  this.isRouterAlive = true
              })
          },
          //单选
          Radio(i,item){
              this.isactive=i;
              this.addrdetail=item;
              this.Payextra();
          },
          //初始化数据
          async specialData(specialId){
              this.id=specialId
              if(Cookies.get('userinfor') && Cookies.get('webtoken')){
                  const res=await addressList(this, {})
                  //收货地址
                  if(res){
                      this.addressList=res.data
                      this.AddressNum=res.data.length
                      this.addrdetail=res.data[0]
                      if(this.addrdetail != ''){
                          this.addr=1
                      }else{
                          this.addr=0
                      }
                      this.Payextra();
                  }else{
                      this.TipAddress='暂无收货地址，请新增收货地址'
                      this.AddressNum=0
                  }
              }else{
                  return
              }

              if(Cookies.get('userinfor') && Cookies.get('webtoken')){
                  let data={
                      skuId: this.id
                  }
                  const res2=await  getWeek(this, data)
                  if(res2){
                      console.log('11',res2)
                      this.WeekList=res2.data

                      this.maxnumber =res2.data.monthNum/res2.data.takenRatio
                      console.log(this.maxnumber)
                  }
              }else{
                  return
              }
              if(Cookies.get('userinfor') && Cookies.get('webtoken')){
                  let data={
                      id: this.id
                  }
                  const res1=await  specialDetail(this, data)
                  //周计划
                  if(res1){
                      this.specialDetail =res1.data
                      if(this.methodName=='自提'){
                          this.getWeek =res1.data.takeTheirMin
                      }else{
                          this.getWeek =res1.data.deliveryMin
                      }

                      console.log('getWeek',res1)
                      this.amount=res1.data.basePrice * this.getWeek
                      this.amount1=this.amount.toFixed(3)
                      this.amount=this.amount.toFixed(3)
                  }
              }else{
                  return
              }
              if(Cookies.get('userinfor') && Cookies.get('webtoken')){
                  const res3=await  capitalinfo(this, {})
                  if(res3){
                      this.capitalinfo=res3.data
                  }
              }else{
                  return
              }

          },
        addClass(index){
              console.log()
          this.currentIndex = index
            if(index==1){
                this.methodName='配送'
                this.Payextra();
            }else{
                this.methodName='自提'
                this.amount=this.amount1
            }
           this.orderstatus()
        },
        // 选中支付
        payaddClass(index){
          this.payIndex = index
        },
          Extra1(index,item){
              this.extraIndex = index
              this.amount =  parseFloat(this.amount1)+ parseFloat(item.basePrice)
              this.amount =  this.amount.toFixed(2)
              this.ExtraList=item
          },
        // 显示订单
        showOrder(){
              if(Cookies.get('userinfor') && Cookies.get('webtoken')){
                  if(this.methodName == '自提'){
                      var isDelivery =0
                  }else{
                      var isDelivery =1
                  }
                  if(this.single == false){
                      var  isJryService =0
                  }else{
                      var  isJryService =1
                  }
                  if(this.methodName =='配送'){
                      var data={
                          isDelivery:isDelivery,
                          isJryService:isJryService,
                          totalAmount:this.amount,
                          depositAmount:0,
                          orderType:4,
                          feedingId:this.id,
                          orderNum:this.getWeek,
                          addressId:this.addrdetail.id,
                          sourceId:this.WeekList.id,
                          isPerDeposit:0,
                          transportationMode:this.ExtraList.transportationMode
                      }
                  }else{
                      var data={
                          isDelivery:isDelivery,
                          isJryService:isJryService,
                          totalAmount:this.amount,
                          depositAmount:0,
                          orderType:4,
                          feedingId:this.id,
                          orderNum:this.getWeek,
                          addressId:this.addrdetail.id,
                          sourceId:this.WeekList.id,
                          isPerDeposit:0,
                          transportationMode:'其他',
                      }
                  }

                  const res=submitOrder(this, data).then(res=>{
                              console.log(res)
                  if(res.errorCode == ''){
                      this.$router.push({name:'Biders-BidersPayCost',query:{id:res.id,orderNo:res.orderNo}})
                  }
              });
              }else{
                  return
              }
        },
        // 隐藏订单
        hiddenOrder(){
          var  that=this
          that.showOrder_pop=false;
        },
          single1(){
              if(this.single){
                  this.single=false
              }else{
                  this.single=true
              }
              console.log(this.single)
          },


        // 显示地址弹窗
        AddAddress(){
          this.showAdd_pop=true;
        },
        // 隐藏地址弹窗
        hiddenAdd(){
          this.showAdd_pop=false;
        },
          //运费
        Payextra(){
              if(Cookies.get('userinfor') && Cookies.get('webtoken')){
                 var addrdetail =this.addrdetail
                  let data={
                      countryId: addrdetail.countryId,
                      state: addrdetail.state,
                      city: addrdetail.city,
                      district: addrdetail.district,
                      warehouseId: this.id,
                  }
                  const res= extra(this, data).then(res=>{
                              console.log('111',res)
                            this.extra =res.data
                            this.amount =  parseFloat(this.amount1)+ parseFloat(res.data[0].basePrice)
                            this.amount =  this.amount.toFixed(2)
                            console.log(res.data[0].basePrice)
                            console.log('amount',this.amount)
                     });
              }else{
                  return
              }
        },
        orderstatus(){
              if(this.methodName=='自提' ){
                  this.Order=1
              }else{
                  if(this.ExtraList !='' &&  this.addrdetail !=''){
                      this.Order=1
                  }else{
                      this.Order=0
                  }
              }
          },
        async userinfo(){
             if(Cookies.get('userinfor') && Cookies.get('webtoken')){
                  const res=gainuserInfor(this, {}).then(res=>{
                    this.companyName=res.data.companyName
                    console.log('userinfo',res)
              });
              }else{
                  return
              }
                this.orderstatus()
          },
      },

      created(){

      },
      mounted() {
            this.userinfo();
            var specialId=this.$route.query.id
            this.specialData(specialId);

      }
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
