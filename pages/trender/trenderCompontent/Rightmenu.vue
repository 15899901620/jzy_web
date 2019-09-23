<template>
  <div class="memberList whitebg mt20 fs14" style="height: 600px;">
    <ul class="mt25">
      <h1 class="curr">招标管理 <div class="bodbottom"></div></h1>
      <li v-for="(item, index) in TenderMange" :key="item.index">
        <router-link :to='{ path:item.router.path, query: { category:item.category }}'>{{item.title}}</router-link>
      </li>
    </ul>
    <ul class="mt35">
      <h1 >账户管理 </h1>
      <li v-for="(item, index) in biddersAcount" :key="item.index" @click="cateManage(item.router, item.category)">
        <router-link :to='{ path:item.router.path, query: { category:item.category }}'  >{{item.title}}</router-link>
      </li>

    </ul>
  </div>
</template>

<script>
    export default {
        name: "Rightmenu",
      data(){
          return{
            // 招标管理
            TenderMange:[
              { router: { path: './WinBidmember' }, title: '招标管理', tid:'WineBidmember',category:'Tendering' }
            ],
            // 账户管理
            biddersAcount:[
              { router: { path: './Perinfor' }, title: '完善信息', tid:'Perinfor', category:'Tendering' },
              { router: { path: './rightcode' }, title: '密码管理', tid:'rightcode', category:'Tendering'  },

            ]
          }
      },
      methods:{
        cateManage(router,category){

        },
      }
    }
</script>

<style scoped>
  /*左侧菜单*/
  .memberList{border:1px solid #DEDEDE;border-top: 3px solid #007de4; width: 215px;}
  .memberList ul{margin-left: 45px;}
  .memberList ul li{color: #999;margin-top: 10px;font-size: 14px;}
  .memberList ul li a{color: #999}
  .memberList ul li:hover{color: #007de4;}
  .memberList ul li.curr{color: #007de4;}
  .memberList h1{font-size: 18px;margin-bottom: 10px; padding-bottom: 10px; position: relative;}

  .memberList ul li .nuxt-link-active{color: #007de4}
</style>
