<template>
<header class="v-header">
  <div class="clearfix">
		<!--头部-文字-->
		<div class="IndexTop">
			<div class="w1200 TopPos">
				<div class="">您好，欢迎来到巨正源化工交易网！<span class="gray" style="border-left:1px solid #ccc; padding-left: 5px;"> <nuxt-link to="/">返回巨正源</nuxt-link></span> </div>
        <topnav></topnav>
			</div>
		</div>
	</div>
	<div class="bgwhite">
		<!--头部-logo/搜索/电话-->
		<div class="w1200" >
      <div class="clearfix" style="display: flex;justify-content: space-between;">
        <!--logo-->
        <logo v-on:tidName="tidName"></logo>
        <!--搜索-->
        <search></search>
        <!--电话-->
        <div class="TopTel">
        4009-000-000
        </div>
      </div>
			<!--热门服务分类/导航-->
			<div class="clearfix mt40"  style="display: flex;">
				<!--热门服务分类-->
				<div class="assortment-wrap"  @mouseenter="mouseEnter" @mouseleave="mouseLeave">
					<div class="fication_menu">查看服务分类</div>
          <servicecate  v-show="selectService"></servicecate>
				</div>
        <navigation v-on:tidName="tidName"></navigation>
			</div>
		</div>
	</div>
</header>
</template>

<script>
import logo from './components/logo'
import search from './components/search'
import navigation from './components/navigation'
import topnav from './components/topnav'
import servicecate from './components/servicecate'


export default {
  name: "DetailHeader",
  components: {
    logo,
    search,
    navigation,
    topnav,
    servicecate
  },
  data () {

    return {
      selectService:false,
      NavCateL:'',
      items: [
        { title: 'Click Me' },
        { title: 'Click Me' },
        { title: 'Click Me' },
        { title: 'Click Me 2' }
      ]
    }
  },
  methods:{
    // 当前页面导航的判断
    CurrNav:function(){
      let currentPage=this.$router.history.current.name
      if(currentPage == 'index'){
        this.selectService=true;
      }
    },
    // 鼠标移入查看服务分类
    mouseEnter(){
      let currentPage=this.$router.history.current.name
      if(currentPage != 'index'){
        this.selectService=true;
      }
    },
    // 鼠标移出查看服务分类
    mouseLeave(){
      let currentPage=this.$router.history.current.name
      if(currentPage != 'index'){
        this.selectService=false;
      }
    },
    //点击判断服务分类是否显示
    tidName:function (data) {
      this.NavCateL=data
      this.$emit('headName',this.NavCateL)
      if(this.NavCateL=='index'){
        this.selectService=true;
      }else{
        this.selectService=false;
      }
    }
  },
  created(){

  },
  mounted(){
    this.CurrNav()
   },

}
</script>

<style scoped>
/*头部*/
.IndexTop{background-color: #f8f8f8;border-bottom: 1px solid #f0f0f0;}
.TopPos{color: #333; display: flex; justify-content: space-between; align-items: center; height: 30px;}
/*个人信息*/

/*电话*/
.TopTel{ margin-top: 45px; height: 30px; align-items: center; background: url(../../assets/img/icon.png)no-repeat 0px -33px; padding-left: 37px;font-size: 20px;font-weight: bold;color: #ff7300;}
/*热门服务分类*/
.assortment-wrap {width: 235px; float: left; position: relative; z-index: 4;height: 40px;}
.fication_menu{height: 40px;background-color: #007de4; line-height: 40px; color: #fff; font-size: 18px;padding-left: 30px;background: url(../../assets/img/cate_icon.png)no-repeat 206px 16px #007de4;}

/*导航*/

/*底部*/
.footer { background: #fff; margin-top: 15px; overflow: hidden;  clear: both; width:100%;}
.ensure-wrap {border-bottom: 1px solid #dddddd; overflow: hidden;  padding-bottom: 20px;}
.ensure { width: 1200px; margin: 0 auto;  padding-top: 25px; overflow: hidden;  }
.ensure ul{display: flex;justify-content: space-between;}
.ensure li {width: 245px;padding-left: 20px;}
.ensure li .ensure-icon{ width: 46px;height: 51px; float: left; margin-right: 10px;}
.ensure li .ensure-icon1 {background: url(../../assets/img/ensure-icon.png) no-repeat 0px 0;}
.ensure li .ensure-icon2 {background: url(../../assets/img/ensure-icon.png) no-repeat -58px 0;}
.ensure li .ensure-icon3 {background: url(../../assets/img/ensure-icon.png) no-repeat -114px 0;}
.ensure li .ensure-icon4 {background: url(../../assets/img/ensure-icon.png) no-repeat -171px 0;}
.ensure li h4 {font-size: 16px;color: #333;}.ensure li p{color: #666;}
.desc {  width: 1200px;  margin: 0 auto;color: #ccc; clear: both;   padding-top: 20px; display: flex;}
.beginner ul{ display: flex;  padding-left: 20px;}
.beginner li {float: left;width: 160px;}
.beginner li h4 {font-size: 16px;  padding-bottom: 10px; color: #333333;}
.beginner li a {  color: #666; display: block;}
/*二维码*/
.qr-code {display: flex; border-right:1px solid #DDDDDD ;}
.qr-code ul{display: flex;}
.qr-code li { text-align: center; margin: 0 10px; width: 120px; color: #333;}
.qr-code li img{margin-top: 10px;}
/*全国服务热线*/
.footer .tel {margin: 0 35px;}
.tel p{text-align: center;}
.telurl{padding: 5px 25px;margin-top: 5px; border-radius: 5px;  background: url(../../assets/img/icon.png)no-repeat 5px -74px; overflow: hidden;
border: 1px solid #1696ff;color: #1696ff;}
/*公司介绍*/
.footer-brief{background-color: #f0f2f5;text-align: center;padding: 30px 0;color: #666666;}
.telurl{padding: 5px 20px 5px 36px;margin-top: 5px;border-radius: 5px;background: url(../../assets/img/icon.png)no-repeat 15px -74px;overflow: hidden;border: 1px solid #1696ff;color: #1696ff;}
/*友情链接*/
.LinkUrl{display: flex;flex-wrap: wrap; margin-bottom: 25px;}
.LinkUrl a:first-child{margin:5px 0;}
.LinkUrl a{margin: 5px 10px; color: #666666;}
.uplist{background: url(../../assets/img/icon.png)no-repeat 0px -105px;width: 28px;height: 20px;margin-top: 6px; cursor: pointer;}


</style>
