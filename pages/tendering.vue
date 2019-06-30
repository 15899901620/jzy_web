<template>
<div>

  <div class="tac fs0">
    <img src="../assets/img/Tenderingbanner.png" />
  </div>
  <div class="trenderCenter">
      <div class="trendLogin fs14">

          <div class="trendLoginCenter" v-if="!SupplierInfor">
            <p class="trendTitle">招标登录</p>
            <input type="text" class="trendInput mt20" v-model="loginsupplierform.username"  placeholder="手机/用户名">
            <input type="password" class="trendInput mt15" v-model="loginsupplierform.password" placeholder="密码">
            <div class="msg-wrap" >
              <div class="msg-error" v-show="NameCheck"><b></b><span>{{NameText}}</span></div>
              <div class="msg-error" v-show="passwordTip"><b></b><span>{{passwordName}}</span></div>
            </div>
            <div class="trendbtn mt10" @click="LoginsupplyerForm">登 录</div>
            <div class="dflexAlem mt40 newsCode" style="justify-content: space-between">
              <span @click="forCode()">忘记密码</span><span @click="regNewsAccount()">注册新账号</span>
            </div>
          </div>


            <div class="membercenter" @click="WinmemberCenter" v-else>
              <div class="head"></div>
              <p class="mt10">Hi,上午好！</p>
              <p class="mb40 mt10">欢迎来到巨正源招标平台</p>
            </div>



      </div>
  </div>
<!--  招标流程-->
  <div class="whitebg dflexAlemJust" style="padding: 40px 0 50px;">
    <img src="../assets/img/trendFlow.png" />
  </div>
<!--  公告信息-->
<div class="graybg ovh">
  <div class="w1200 " style="margin-bottom: 50px">
    <div class="ListTitle  whitebg mt20">
      <div class="TitleName">公告信息</div>
      <a class="mr20 mt15 mb15 gray fs14"> 更多 </a>
    </div>
    <div class="graybg trendlistTitle">
      <span style="width: 25%; padding-left: 10px">招标编号</span><span class="tac" style="width:45%;">招标名称</span><span class="tac" style="width: 13%">招标状态</span><span class="tar mr10" style="width: 17%">招标时间</span>
    </div>
    <ul class="trendlist">
      <li>
        <span class="pl10" style="width: 25%;">0744-184CSIE06913</span>
        <span class="tac" style="width:45%;">东莞巨正源采购项目—三维激光扫描仪项目招标公告</span>
        <span class="tac" style="width: 13%">已投</span>
        <span class="tar gray  pr10" style="width: 17%">2019.3.28-2019.4.10</span>
      </li>
      <li>
        <span class="pl10" style="width: 25%;">0744-184CSIE06913</span>
        <span class="tac" style="width:45%;">东莞巨正源采购项目—三维激光扫描仪项目招标公告</span>
        <span class="tac" style="width: 13%">已投</span>
        <span class="tar gray  pr10" style="width: 17%">2019.3.28-2019.4.10</span>
      </li>
      <li>
      <span class="pl10" style="width: 25%;">0744-184CSIE06913</span>
      <span class="tac" style="width:45%;">东莞巨正源采购项目—三维激光扫描仪项目招标公告</span>
      <span class="tac" style="width: 13%">已投</span>
      <span class="tar gray  pr10" style="width: 17%">2019.3.28-2019.4.10</span>
    </li>


    </ul>

  </div>
</div>
<div class="whitebg ovh">
  <div class="w1200 dflex" style="margin-top: 40px; margin-bottom: 40px; justify-content: space-between">
     <div class="WineBid">
       <div class="winebidTitle winebidTitlebluebg"><span class="fs20">中标公告</span>
          <span class="fs14 cp" @click="WineBid">更多</span>
       </div>
       <ul class="listWineBid" >
         <li><span class="trendtextTitle">东莞巨正源采购项目—三维激光扫描仪项目招标公...</span><span class="gray">2019.3.28-2019.4.10</span></li>
         <li><span class="trendtextTitle">东莞巨正源采购项目—三维激光扫描仪项目招标公...</span><span class="gray">2019.3.28-2019.4.10</span></li>

         <li><span class="trendtextTitle">东莞巨正源采购项目—三维激光扫描仪项目招标公...</span><span class="gray">2019.3.28-2019.4.10</span></li>

       </ul>
     </div>
    <div class="Deal">
      <div class="winebidTitle winebidTitlegreenbg"><span class="fs20">成交公告</span> <span  class="fs14 cp">更多</span> </div>
      <ul class="listWineBid" >
        <li><span class="trendtextTitle">东莞巨正源采购项目—三维激光扫描仪项目招标公...</span><span class="gray">2019.3.28-2019.4.10</span></li>
        <li><span class="trendtextTitle">东莞巨正源采购项目—三维激光扫描仪项目招标公...</span><span class="gray">2019.3.28-2019.4.10</span></li>

        <li><span class="trendtextTitle">东莞巨正源采购项目—三维激光扫描仪项目招标公...</span><span class="gray">2019.3.28-2019.4.10</span></li>

      </ul>
    </div>
  </div>


</div>



</div>
</template>

<script>
  import { supplierLogin, supplierValid } from '../api/users'
  import Cookies from 'js-cookie'
    export default {
      name: "tendering",
      layout:'membercenter',
      data(){
          return{
            toIndex:1,
            NameCheck:false,
            passwordTip:false,
            NameText:'',
            passwordName:'',
            SupplierInfor:'',
            loginsupplierform:{
              username:'',
              password:''
            }
          }
      },
      methods:{

        async LoginsupplyerForm(){
          var myreg = /^0?(13[0-9]|14[5-9]|15[012356789]|166|17[0-8]|18[0-9]|19[8-9])[0-9]{8}$/;
          if(!myreg.test(this.loginsupplierform.username)){
            this.$Message.info({
              content: '手机号格式不正确',
              duration: 5,
              closable: true
            })
            return
          }else{
            let params = {
              username:this.loginsupplierform.username,
              password:this.loginsupplierform.password
            }
            console.log('params', params )
            const res = await supplierLogin(this, params)
            console.log('Loginres' ,res)


            var authres=res.data
            console.log('authres' ,authres)
            if(authres && res.status === 200){

              console.log('authres' ,authres)
              Cookies.set('websuppliertoken',  authres, { expires: 36000000 || 1 })
              const res = await supplierValid(this, {})

              if(res.data  && res.status === 200){
                let auth= JSON.stringify(res.data)
                Cookies.set('supplierInfor', auth, { expires: 36000000 || 1 })
                this.$router.push({name:'trender-WineBid'})
              }else{
                this.passwordTip=true
                this.passwordName='登录失败请与管理员联系！'
                return
              }

            }else{
              this.passwordTip=true
              this.passwordName='账号密码错误！'
              return
            }

          }
        },




        WineBid(){
          this.$router.push({ path:'./trender/WineBid'  })
         },
        // 忘记密码
        forCode(){

        },
        // 注册新账号
        regNewsAccount(){
          this.$router.push({path:'./register',query:{toIndex:this.toIndex,pagetitle:'注册'}})
        },

        WinmemberCenter(){}
      },
      mounted() {

        this.SupplierInfor=Cookies.get('supplierInfor')


      }
    }
</script>

<style scoped>
  .trenderCenter{width: 1200px;margin: 0 auto;position: relative;z-index: 4;height: 0px;}
  .trendLogin{background: #fff;position: absolute;top: -385px;right: 0;width: 310px; border-radius: 3px;}

  .trendTitle{border-left: 1px solid #d7d7d7; padding-left: 10px}

  .trendLoginCenter{margin: 30px 40px 45px;}
  .trendInput{ padding-left: 10px;box-sizing: border-box;    border: 1px solid #DEDEDE;width: 100%; height: 36px; border-radius: 3px;}

  .trendbtn{ height: 36px; line-height: 36px; color: #fff; text-align: center; border-radius: 3px; background-color: #007de4;}

  .trendlistTitle{    display: flex; }
  .trendlistTitle span{padding: 20px 0; font-size: 16px; }
  .newsCode span{cursor: pointer;}
   .newsCode span:hover{color: #007de4}

  .trendlist{font-size: 14px;}
  .trendlist li{background-color: #fff;padding:24px 0; display: flex; margin-bottom: 1px;}
  .trendlist li:hover{background-color: #f2f8fe}

  .WineBid{width: 49%}
  .Deal{width: 49%;}
  .winebidTitle{display: flex;align-items: center; justify-content: space-between; height: 60px;padding: 0 15px; color: #fff;}
  .winebidTitlebluebg{background-color: #2d92ea}
  .winebidTitlegreenbg{background-color: #14a758}

  .listWineBid{border: 1px solid #DEDEDE;}
  .listWineBid li{padding: 20px 10px; display: flex; justify-content: space-between; font-size: 14px;}
  .listWineBid li:nth-child(even){background-color: #f8f7f7;}
  .listWineBid li .trendtextTitle{width: 70%; overflow:hidden; text-overflow: ellipsis;white-space: nowrap;    color: #666;}


  .membercenter{display: flex; align-items: center; flex-direction: column; background-color: #fff; font-size: 16px;}
  .membercenter .head{width: 110px; height: 110px;border: 1px solid #DEDEDE; border-radius:60px; margin-top: 35px;
    overflow: hidden; }
  .membercenter .head img{width: 100%;height: 100%;}

  .msg-wrap {min-height: 26px;height: auto!important;height: 26px;}
  .msg-error {position: relative;background: #fff;color: #fa0a0a;border: 1px solid #fa0a0a;padding: 3px 10px 3px 40px;line-height: 18px;
    min-height: 18px;_height: 18px;}
  .msg-error b{position: absolute;top: 50%;left: 10px;
    display: block;margin-top: -8px;width: 16px;height: 16px;overflow: hidden;background: url('../assets/img/icon.png') -314px -5px no-repeat;}

</style>
