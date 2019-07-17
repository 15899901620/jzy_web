<template>
  <div class="volume_find">
    <div class="dflex mt25" style="justify-content: center; align-items: center; width: 85%; margin: 15px auto; ">
      <div class="indexHead cp" @click="User"><img  src="../../../assets/img/index_head.png"/></div>
      <div class="ml10" style="width: 68%" v-if="MemberInfro">
        <p class="mt5">HI, {{MemberInfro.username}}！</p>
        <p class="gray">欢迎来到巨正源交易网!</p>
      </div>
      <div class="ml10" style="width: 68%" v-else>
        <p class="mt5">HI, <span class="cp" @click="Login" >请登录</span></p>
        <p class="gray">欢迎来到巨正源交易网!</p>
      </div>
    </div>
    <div class="loginReg mt10"  v-if="LoginStatus"><a  @click="Login" class="loginbg">登 录</a><a @click="register"   class="registerbg ml10">注 册</a></div>
    <ul class="NewsList">
      <li @click="cur=0" :class="{curr:cur==0}">网站公告</li><li @click="cur=1" :class="{curr:cur==1}">行业资讯</li>
    </ul>
    <ul class="news">
      <li v-show="cur==0">
        <ul class="newscont">
          <li v-for="(item, index) in aclist" :key="index">
            <nuxt-link :to="{name:'notice-detail-id', params:{id:item.id}}">
              <span class="newtitle">{{item.title}}</span>
              <span class="ml10 Newsdate">{{item.time}}</span>
            </nuxt-link>
          </li>
        </ul>
      </li>
      <li v-show="cur==1">
        <ul class="newscont">
          <li  v-for="(item, index) in newslist" :key="index">
            <nuxt-link :to="{name:'article-detail-id', params:{id:item.id}}">
              <span class="newtitle">{{item.title}}</span><span class="ml10 Newsdate">{{item.time}}</span>
            </nuxt-link>
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script>
import { announcement, infolist } from '../../../api/info'
import { gainuserInfor } from '../../../api/users'
import Cookies from 'js-cookie'

export default {
  name: "headnews",
  data(){
    return{
      cur:0,
      current_page:1,
      page_size:4,
      sortBy:false,
      LoginStatus:false,
      typeId:'',
      aclist:[],//公告
      MemberInfro:{},  //获取当前信息
      newslist:[]  //资讯
    }
  },
  methods:{
    User(){
      if(Cookies.get('userinfor') && Cookies.get('webtoken')){
        this.$router.push({name:'users-user'})
      }else{
        if(Cookies.get('userinfor') && !Cookies.get('webtoken')){
          this.$Modal.confirm({
            title: '提示',
            content: '<p>登录超时，请重新登录</p>',
            okText:'去登录',
            onOk: () => {
              this.$router.push({name:'login'});
            },

          });
        }else {
        this.$Modal.confirm({
          title: '提示',
          content: '<p>您尚未登录，请先登录</p>',
          okText:'去登录',
          onOk: () => {
            this.$router.push({name:'login'});
          },

        });
        }
      }

    },
    // 登录
    Login(){
      this.$router.push({path:'../login'})
    },
    //获取当前登录信息
    async LoginInfor(){
      console.log('***获取当前登录信息***')
      let res=await gainuserInfor(this, {})
      console.log('登录信息res', res)
      if(res.data){
        this.LoginStatus=false
        this.MemberInfro=res.data
      }else {
        this.LoginStatus=true
      }
    },
    // 注册页面
    register() {
      this.$router.push({path:'../register', query:{pagetitle:'注册'}})
    },
    // 公告接口
    async sourceData() {
      let params = {
        current_page: this.current_page,
        page_size: this.page_size,
      }
      const res = await announcement(this, params)
      this.aclist = res.data.items
    },
    // 公告接口
    async NewsData() {
      let params = {
        current_page: this.current_page,
        page_size: this.page_size,
      }
      const res = await infolist(this, params)
      this.newslist = res.data.items
    }
  },
  mounted() {
     this.sourceData()   //公告
    this.NewsData()
    this.LoginInfor()
  }
}
</script>

<style scoped>
  .volume_find{background: #fff;position: absolute;top: -313px; right: 0; width: 240px;}
  .indexHead{ display: flex; justify-content: center; align-items: center; width: 55px;height: 55px; overflow: hidden; box-shadow: 0px 0px 5px #cccc; border-radius: 50%;}
  .loginReg{display: flex; justify-content: center;}
  .loginReg a{width: 96px;height: 30px;text-align: center;line-height: 30px; box-sizing: border-box; border-radius: 3px;}
  .loginReg .loginbg{background-color: #007de4; color: #fff; }
  .loginReg .registerbg{border: 1px solid #007de4; color:#007de4;}

  /*网站公告/行业资讯*/
  .NewsList{display: flex; margin-top: 20px;border-top: 1px solid #DEDEDE;}
  .NewsList li.curr{background-color: #fff; color: #007de4;}
  .NewsList li{width: 50%; text-align: center;background-color: #f5f5f5; padding: 10px 30px; cursor: pointer; font-size: 14px;}
  .news{display: flex; justify-content: center; margin: 7px 0; color: #666;}
  .news ul{list-style-type: disc;}
  .news li{width: 100%;}
  .newtitle{width: 80%; overflow: hidden;text-overflow: ellipsis; white-space: nowrap; color: #333;}
  .newscont{ width: 90%; margin: 0 auto;}
  .newscont li{display: flex;align-items: center;list-style: disc inside; margin-top: 7px; font-size: 14px;}
  .newscont li a{display: flex; justify-content: space-between; width: 100%;}
  .Newsdate{width: 20%; color: #999}
</style>
