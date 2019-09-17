<template>
  <div class="body">
    <Header-small title="招标中心">
      <div slot="headerother">
        <div
          data-v-228ad150
          class="dflexAlem gray fs14"
          style="color: rgb(102, 102, 102);    margin-top: 50px;"
        >
          <span data-v-228ad150 class="bbright pr10 blackFont">已有账号？</span>
          <a data-v-228ad150 href="/login" class="blueFont pl10">直接登录</a>
        </div>
      </div>
    </Header-small>
    <div class="container" title="内容区块">
      <div class="tac fs0">
        <img src="/img/Tenderingbanner.png" />
      </div>
      <div class="trenderCenter">
        <div class="trendLogin fs14">
          <div class="trendLoginCenter" v-if="!SupplierInfor" style="margin:20px 32px;">
            <p class="trendTitle">招标登录</p>
            <login-supply></login-supply>
          </div>

          <div class="membercenter" v-else>
            <div class="head" @click="WinmemberCenter"></div>
            <p class="mt10">Hi,上午好！</p>
            <p class="mb40 mt10">欢迎来到巨正源招标平台</p>
          </div>
        </div>
      </div>
      <!--  招标流程-->
      <div class="whitebg dflexAlemJust" style="padding: 40px 0 50px;">
        <img src="/img/trendFlow.png" />
      </div>
      <!--  公告信息-->
      <div class="graybg ovh">
        <div class="w1200" style="margin-bottom: 50px">
          <div class="ListTitle whitebg mt20">
            <div class="TitleName">公告信息</div>
            <a class="mr20 mt15 mb15 gray fs14" @click="WineBid">更多</a>
          </div>
          <div class="graybg trendlistTitle">
            <span style="width: 25%; padding-left: 10px">招标编号</span>
            <span class="tac" style="width:45%;">招标名称</span>
            <span class="tac" style="width: 13%">招标状态</span>
            <span class="tar mr10" style="width: 17%">招标时间</span>
          </div>
          <ul class="trendlist" v-for="(item, index) in dataList" :key="index">
            <li  @click="WineDetail(item)">
              <span class="pl10" style="width: 25%;">{{item.biddingNo}}</span>
              <span class="tac" style="width:45%;">{{item.title}}</span>
              <span class="tac" style="width: 13%">{{item.statusName}}</span>
              <span class="tar gray pr10" style="width: 17%">{{item.beginTime}}</span>
            </li>
            
          </ul>
          <div style="text-align: center;">
               <sapn v-if='dataList==""'>暂无数据</sapn>
          </div>
         
        </div>
      </div>
    </div>
    <Footer size="small" title="底部" style="margin-top:18px;"></Footer>
  </div>
</template>

<script>
import Header from "../components/header";
import Footer from "../components/footer";
import { sendHttp } from "../api/common";
import server from "../config/api";
import { mapState } from "vuex";
import login from "../components/login-form";
import { supplierLogin, supplierValid } from "../api/users";
import Cookies from "js-cookie";
export default {
  name: "tendering",
  data() {
    return {
      toIndex: 1,
      NameCheck: false,
      passwordTip: false,
      NameText: "",
      passwordName: "",
      SupplierInfor: "",
      loginsupplierform: {
        username: "",
        password: ""
      },
      dataList:{}
    };
  },
  components: {
    Header,
    HeaderSmall: Header.small,
    loginSupply: login.supply,
    Footer
  },
  fetch({ store, params }) {
    return Promise.all([
      store.dispatch("menu/getMenuList"),
      store.dispatch("system/getSystemCnf")
    ]);
  },
  methods: {
    async LoginsupplyerForm() {
      var myreg = /^0?(13[0-9]|14[5-9]|15[012356789]|166|17[0-8]|18[0-9]|19[8-9])[0-9]{8}$/;
      if (!myreg.test(this.loginsupplierform.username)) {
        this.$Message.info({
          content: "手机号格式不正确",
          duration: 5,
          closable: true
        });
        return;
      } else {
        let params = {
          username: this.loginsupplierform.username,
          password: this.loginsupplierform.password
        };

        const res = await supplierLogin(this, params);
        var dataLiat = res;

        if (res.data.data === null && res.status === 200) {
          this.passwordTip = true;
          this.passwordName = "账号密码错误！";
          return;
        } else {
          var authres = dataLiat.data;

          Cookies.set("websuppliertoken", authres, { expires: 36000000 || 1 });
          const res = await supplierValid(this, {});

          if (res.data && res.status === 200) {
            let auth = JSON.stringify(res.data);
            Cookies.set("supplierInfor", auth, { expires: 36000000 || 1 });
            this.$router.push({ name: "trender-WineBid" });
          } else {
            this.passwordTip = true;
            this.passwordName = "登录失败请与管理员联系！";
            return;
          }
        }
      }
    },
    WineDetail(row){
      this.$router.push({
            name: 'trender-WineBidDetail',
            params: {
                id: row.id
            }
        })
    },
    async SourceData() {    
            const res = await sendHttp(this, false, server.api.biddding.bidddingList,2)
            this.dataList = res.data.items
    },

    WineBid() {
      this.$router.push({ name: "trender-WineBid" });
    },
    // 忘记密码
    forCode() {},
    // 注册新账号
    regNewsAccount() {
      this.$router.push({
        path: "./register",
        query: { toIndex: this.toIndex, pagetitle: "注册" }
      });
    },  

    WinmemberCenter() {
      this.$router.push({ name: "trender-WinBidmember" });
    }
  },
  mounted() {
    this.SupplierInfor = Cookies.get("supplierInfor");
    this.SourceData()
  }
};
</script>

<style scoped>
.trenderCenter {
  width: 1200px;
  margin: 0 auto;
  position: relative;
  z-index: 4;
  height: 0px;
}
.trendLogin {
  background: #fff;
  position: absolute;
  top: -385px;
  right: 0;
  width: 310px;
  border-radius: 3px;
}

.trendTitle {
  border-left: 1px solid #d7d7d7;
  padding-left: 10px;
}

.trendLoginCenter {
  margin: 30px 40px 45px;
}
.trendInput {
  padding-left: 10px;
  box-sizing: border-box;
  border: 1px solid #dedede;
  width: 100%;
  height: 36px;
  border-radius: 3px;
}

.trendbtn {
  height: 36px;
  line-height: 36px;
  color: #fff;
  text-align: center;
  border-radius: 3px;
  background-color: #007de4;
}

.trendlistTitle {
  display: flex;
}
.trendlistTitle span {
  padding: 20px 0;
  font-size: 16px;
}
.newsCode span {
  cursor: pointer;
}
.newsCode span:hover {
  color: #007de4;
}

.trendlist {
  font-size: 14px;
}
.trendlist li {
  background-color: #fff;
  padding: 24px 0;
  display: flex;
  margin-bottom: 1px;
}
.trendlist li:hover {
  background-color: #f2f8fe;
}

.WineBid {
  width: 49%;
}
.Deal {
  width: 49%;
}
.winebidTitle {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 60px;
  padding: 0 15px;
  color: #fff;
}
.winebidTitlebluebg {
  background-color: #2d92ea;
}
.winebidTitlegreenbg {
  background-color: #14a758;
}

.listWineBid {
  border: 1px solid #dedede;
}
.listWineBid li {
  padding: 20px 10px;
  display: flex;
  justify-content: space-between;
  font-size: 14px;
}
.listWineBid li:nth-child(even) {
  background-color: #f8f7f7;
}
.listWineBid li .trendtextTitle {
  width: 70%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: #666;
}

.membercenter {
  display: flex;
  align-items: center;
  flex-direction: column;
  background-color: #fff;
  font-size: 16px;
}
.membercenter .head {
  width: 110px;
  height: 110px;
  border: 1px solid #dedede;
  border-radius: 60px;
  margin-top: 35px;
  overflow: hidden;
}
.membercenter .head img {
  width: 100%;
  height: 100%;
}

.msg-wrap {
  min-height: 26px;
  height: auto !important;
  height: 26px;
}
.msg-error {
  position: relative;
  background: #fff;
  color: #fa0a0a;
  border: 1px solid #fa0a0a;
  padding: 3px 10px 3px 40px;
  line-height: 18px;
  min-height: 18px;
  _height: 18px;
}
.msg-error b {
  position: absolute;
  top: 50%;
  left: 10px;
  display: block;
  margin-top: -8px;
  width: 16px;
  height: 16px;
  overflow: hidden;
  background: url("/img/icon.png") -314px -5px no-repeat;
}
</style>
