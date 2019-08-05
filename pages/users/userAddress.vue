<template>
  <div class="clearfix graybg">
    <div class="w1200 dflex " style="margin-bottom: 40px">
      <usernav></usernav>
      <div class="memberInfor ml20  whitebg bdccc  mt20">
        <!--个人信息-->
        <div class="TableList">
          <h1 class="fs16  mt25 bb1 pb10">收货地址</h1>
          <div class="dflexAlem mt20">
            <div class="Add_address"  @click="showcancel()">新增收货地址</div><div class="ml15">您已创建{{this.AddressNum}}个收货地址，最多可创建20个</div>
          </div>
          <ul class="address_list mt20" v-if="this.AddressNum>0">
            <li v-for="(items, index) in addressList" :key="index">
              <ul class="address_content">
                <li><span class="address_title">收 货 人：</span>{{items.name}}</li>
                <li><span class="address_title">手机号码：</span>{{items.phone}}</li>
                <li style=" display: flex; justify-content: flex-end;"><div class="Add_close" @click="confirm(items.id)"></div></li>
                <li><span class="address_title">身份证号：</span>{{items.idNumber}}</li>
                <li style="width: 54%;"><span class="address_title" style="letter-spacing: 7px;">地      址：</span>{{items.stateName}}{{items.cityName}}{{items.districtName}}{{items.address}}</li>
                <li style=" display: flex; justify-content: flex-end; width: 12%;">
                  <span class="gray mr15" v-if="items.defaultAddress === 1" style="color: #00a1e9">默认地址</span>
                  <span class="gray mr15 cp defaultAdress" @click="addressdefault(items.id)" v-else>设为默认</span>

                    <span class="blueFont cp" @click="showEdit(items.id)">编辑</span>
                </li>
              </ul>
            </li>
          </ul>
          <div class="fs18 mt20" v-else>{{TipAddress}}</div>
        </div>
      </div>
    </div>
    <AddressPopup @hidden="hiddenShow"   v-show="showcancel_pop"></AddressPopup>
    <EditAddress  @hidden="Hiddenedit"  :formAddress="formEditAddress"  v-show="showEditpop"></EditAddress>
  </div>
</template>

<script>
import Navigation from '../../components/navigation'
import AddressPopup from './userCompontent/AddressPopup'
import EditAddress from './userCompontent/EditAddress'
import { addressList, addressDefault, addressDelete, addressInfor  } from '../../api/users'
import Cookies from 'js-cookie'
export default {
  name: "userAddress",
  layout:'membercenter',
  components:{
    usernav: Navigation.user,
    AddressPopup,
    EditAddress
  },
  fetch({ store }) {
    return Promise.all([
      store.dispatch('system/getSystemCnf'),
      store.dispatch('menu/getMenuList')
    ])
  },
  data(){
    return{

      showcancel_pop:false,
      showEditpop:false,
      TipAddress:'',
      AddressNum:0,
      addressList:[],
      addressDefault:false,
      addressId:0,

      formAddress:{
        id:0,
        memberId: '',
        name: '',    //收货人姓名
        phone: '',   //收货人电话
        idNumber:'',  //身份证
        countryId:'',   //国家
        state: '', //省
        city: '',     //市
        district: '',      //区县
        address: '',//详细地址
        defaultAddress: 0,    //设置默认地址
        alias:''             //别名
      },
      formEditAddress:{},
    }
  },
  methods:{
        // 收货地址列表
    async AddressList(){
      console.log('地址列表')
      if(Cookies.get('userinfor') && Cookies.get('webtoken')){
        const res=await addressList(this, {})
        console.log('地址列表_res',res)
        if(res){
          this.addressList=res.data
          this.AddressNum=res.data.length
        }else{
          this.TipAddress='暂无收货地址，请新增收货地址'
          this.AddressNum=0
        }
      }else{
        return
      }

    },
    showcancel(){
        this.showcancel_pop=true
    },
    //获取单条地址信息
    //地址详细
    async addressDetail(id){
      console.log('addressId', this.addressId)
      let params={
        id:id
      }
      const res= await addressInfor(this,params)
      console.log('单条地址信息res',res)
        this.formEditAddress=res.data
      console.log('单条地址信息res',this.formEditAddress)

    },
    hiddenShow(){
      let that = this;
      that.showcancel_pop = false
      console.log('showcancel_pop',  this.showcancel_pop)
      this.AddressList()
    },
    showEdit(id){
      this.showEditpop=true
      console.log('showEdit_pop',  this.showEditpop)
      if(id){
        this.formAddress.id=id
      }
      this.addressDetail(id)
    },

    Hiddenedit(){
      console.log('hiddenEditShow')
      let that = this;
      that.showEditpop = false
      console.log('showEditpop',  that.showEditpop)
      },

  // 设为默认地址
    async addressdefault(id){
      let memberId=JSON.parse(Cookies.get('userinfor')).id
      let params={
        memberId:memberId,
        id:id
      }
      const res= await  addressDefault(this,params)
      console.log('默认地址res',res)
      if(res.data===true && res.status ===200){
        this.$Message.info({
          content: '设置成功',
          duration: 3,
          closable: true
        })
        this.AddressList()
        return
      }else {
        this.$Notice.warning({
          title: '设置默认地址失败，请联系客服',
          duration: 5,
          closable: true
        });
        return
      }
    },
    //删除地址
    async Deleteadress(id){
      console.log('删除地址',id)
      let params={
        id:id
      }
      const res= await addressDelete(this,params)
      console.log('res', res)
      if(res.data===true && res.status === 200){
        this.$Message.info({
          content: '删除成功',
          duration: 3,
          closable: true
        });
        this.AddressList()
      }
    },
    confirm (id) {
      this.$Modal.confirm({
        title: '删除地址',
        content: '<p style="color: #db4f2e; font-size: 16px;">确认要删除本条地址!!!</p>',
        onOk: () => {
          console.log('delete_id',id)
            this.Deleteadress(id)
        },
        onCancel: () => { }
      });
    },
  },
  create(){
  },
  mounted(){
    this.AddressList()
  }
}
</script>

<style scoped>
  .memberInfor{width: 83%}

  .TableList{width: 95%;  margin: 0 auto;}

  /*账号管理--收货地址--页面*/
  .Add_address{background-color: #007de4; padding: 10px 25px; border-radius: 3px; color: #fff; cursor: pointer;}
  .address_list{margin-bottom: 20px;}
  .address_list li{border: 1px solid #DDDDDD; margin-top: 20px;}
  .address_content{display: flex;flex-wrap: wrap;width: 95%;margin: 0px auto;margin-bottom: 20px;}
  .address_content li{ display: flex; width: 33%;border: none; margin-top: 20px; font-size: 14px;}
  .address_content li .Add_close{ width: 16px; height: 16px; cursor: pointer; background: url(../../static/img/icon.png)no-repeat -2px -389px;}
  .address_content li .address_title{color: #999; width: 75px;}

  .defaultAdress:hover{color: #007de4}

</style>
