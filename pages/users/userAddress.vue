<template>
  <div class="clearfix graybg">
    <div class="w1200 dflex " style="margin-bottom: 40px">
      <userright></userright>
      <div class="memberInfor ml20  whitebg bdccc  mt20">
        <!--个人信息-->
        <div class="TableList">
          <h1 class="fs16  mt25 bb1 pb10">收货地址</h1>
          <div class="dflexAlem mt20">
            <div class="Add_address"  @click="showcancel()">新增收货地址</div><div class="ml15">您已创建2个收货地址，最多可创建20个</div>
          </div>
          <ul class="address_list mt20">
            <li>
              <ul class="address_content">
                <li><span class="address_title">收 货 人：</span>张先生</li>
                <li><span class="address_title">手机号码：</span>13333837087</li>
                <li style=" display: flex; justify-content: flex-end;"><div class="Add_close"></div></li>
                <li><span class="address_title">身份证号：</span>456242199025865424</li>
                <li><span class="address_title" style="letter-spacing: 7px;">地      址：</span>上海市浦东新区 星月总部湾</li>
                <li style=" display: flex; justify-content: flex-end;"><span class="gray mr15 cp">设为默认</span><span class="blueFont cp">编辑</span></li>
              </ul>
            </li>
            <li>
              <ul class="address_content">
                <li><span class="address_title">收  货  人：</span>张先生</li>
                <li><span class="address_title">手机号码：</span>13333837087</li>
                <li style=" display: flex; justify-content: flex-end;"><div class="Add_close"></div></li>
                <li><span class="address_title">身份证号：</span>456242199025865424</li>
                <li><span class="address_title" style="letter-spacing: 7px;">地      址：</span>上海市浦东新区 星月总部湾</li>
                <li style=" display: flex; justify-content: flex-end;"><span class="gray mr15 cp">设为默认</span><span class="blueFont cp">编辑</span></li>
              </ul>
            </li>
          </ul>


        </div>
      </div>


    </div>
    <AddressPopup @hidden="hiddenShow" v-show="showcancel_pop"></AddressPopup>
  </div>
</template>

<script>
  import userright from './userCompontent/userright'
  import AddressPopup from './userCompontent/AddressPopup'
  export default {
        name: "userAddress",
      layout:'membercenter',
      components:{
        userright,
        AddressPopup
      },
    data(){
          return{
            showcancel_pop:false
          }
    },
    methods:{
      showcancel(){
        this.showcancel_pop=true
      },
      hiddenShow(){
        let that = this;
        that.showcancel_pop = false
      },
    },
    }
</script>

<style scoped>
  .memberInfor{width: 83%}

  .TableList{width: 95%;  margin: 0 auto;}

  /*账号管理--收货地址--页面*/
  .Add_address{background-color: #007de4; padding: 10px 25px; border-radius: 3px; color: #fff; cursor: pointer;}
  .address_list li{border: 1px solid #DDDDDD; margin-top: 20px;}
  .address_content{display: flex;flex-wrap: wrap;width: 95%;margin: 0px auto;margin-bottom: 20px;}
  .address_content li{ display: flex; width: 33%;border: none; margin-top: 20px; font-size: 14px;}
  .address_content li .Add_close{ width: 16px; height: 16px; cursor: pointer; background: url(../../assets/img/icon.png)no-repeat -2px -389px;}
  .address_content li .address_title{color: #999; width: 75px;}

</style>
