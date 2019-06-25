<template>
  <div>
 		<div class="w1200">
			<div class="mt10 fs14">
		      <a>巨正源首页</a> > <span class="gray">现货超市</span>
		      <span class="fr">共<span class="orangeFont">3150</span>件相关产品</span>
			</div>

			<div class="screenList">
				<!--原料分类-->
				<div class="screenibre">
					<dl class="fl filter_item"><dt class="scTitle">原料分类：</dt>
						<dd class="pro_brand_list ">
							<a>PP</a>
							<a>HDPE</a>
							<a>LDPE</a>
						</dd>
					</dl>
					<div class="fr pro_m_select">
						更多
					</div>
				</div>
				<!--加工级别-->
				<div class="screenibre">
					<dl class="fl filter_item"><dt class="scTitle">加工级别：</dt>
						<dd class="pro_brand_list ">
							<a>注塑级</a>
							<a>挤压级</a>
							<a>吹塑级</a>
							<a>注塑级</a>
							<a>挤压级</a>
							<a>吹塑级</a>
							<a>注塑级</a>
							<a>挤压级</a>
							<a>吹塑级</a>
							<a>挤压级</a>
							<a>吹塑级</a>
							<a>注塑级</a>
							<a>挤压级</a>
							<a>吹塑级</a>
						</dd>
					</dl>
					<div class="fr pro_m_select">
						更多
					</div>
				</div>
				<!--用途-->
				<div class="screenibre">
					<dl class="fl filter_item"><dt class="scTitle">用途：</dt>
						<dd class="pro_brand_list ">
							<a>包装容器</a>
							<a>塑料包装</a>
							<a>塑料袋</a>
						</dd>
					</dl>
					<div class="fr pro_m_select">
						更多
					</div>
				</div>
				<!--特性-->
				<div class="screenibre">
					<dl class="fl filter_item"><dt class="scTitle">特性：</dt>
						<dd class="pro_brand_list ">
							<a>包装容器</a>
							<a>塑料包装</a>

						</dd>
					</dl>
					<div class="fr pro_m_select">
						更多
					</div>
				</div>

				<div class="XHsearch" style="display: flex;">
					<span>品种</span><input type="text"  class="XHsearchInput" placeholder="请输入品种"/>
					<span class="ml15">牌号</span><input type="text" class="XHsearchInput" placeholder="请输入牌号"/>
					<div class="ml20">
						<input type="text" class="priceInput" placeholder="￥最低价"/>-<input type="text" class="priceInput" placeholder="￥最高价"/>
					</div>
					<div class="xhBtn">确定</div>
				</div>
			</div>
			<!--现货列表-->
			<div class="mt20">
				<div class="XhlistTitle">
				<h1 style="width: 7%;">品种</h1>
				<h1 style="width: 7%;">牌号</h1>
				<h1 style="width: 7%;">厂商</h1>
				<h1 style="width: 12%;">交货地</h1>
				<h1 style="width: 7%;">数量</h1>
				<h1 style="width: 9%;">更新时间</h1>
				<h1 style="width: 11%;">单价（元/吨）</h1>
				<h1 style="width: 13%;">交货方式</h1>
				<h1 style="width: 16%;">数量</h1>
				<h1 style="width: 11%;">操作</h1>
				</div>
        <ul class="Xhlist">
            <li>
              <span style="width: 7%;">PP</span><span style="width: 7%;">F08</span><span style="width: 7%;">巨正源</span>
              <span style="width: 12%;">东莞</span><span style="width: 7%;">20</span>
              <span style="width: 9%;">31分钟前</span>
              <span class="orangeFont" style="width: 11%;">¥10550</span>
              <span style="width: 13%;">
						 <RadioGroup v-model="formItem.radio">
                <Radio label="M">自提</Radio>
                <Radio label="W">配送</Radio>
            </RadioGroup>

						</span>
              <span  class="dflex" style="width: 16%; align-items: center;">
							<div class="NumReduice" style="margin: 0; width: 55%; margin-left: 42px;">
			        			<span class="gray" style="width: 25%;">-</span>
			        			<input class="TextNum" type="text" name=""  >
			        			<span class="gray"  style="width: 25%;">+</span>
		        			</div>
		        			<div class="Numtip"></div>
						</span>
              <span style="width: 11%;"><div class="ListBtn">下单</div></span>
            </li>
            <li>
              <span style="width: 7%;">PP</span><span style="width: 7%;">F08</span><span style="width: 7%;">巨正源</span>
              <span style="width: 12%;">东莞</span><span style="width: 7%;">20</span>
              <span style="width: 9%;">31分钟前</span><span class="orangeFont" style="width: 11%;">¥10550</span>
              <span style="width: 13%;">
						   <RadioGroup v-model="formItem.radio">
                <Radio label="M">自提</Radio>
                <Radio label="W">配送</Radio>
            </RadioGroup>
						</span>
              <span  class="dflex" style="width: 16%; align-items: center;">
							<div class="NumReduice" style="margin: 0; width: 55%; margin-left: 42px;">
			        			<span class="gray" style="width: 25%;">-</span>
			        			<input class="TextNum" type="text" name=""  >
			        			<span class="gray"  style="width: 25%;">+</span>
		        			</div>
		        			<div class="Numtip"></div>
						</span>
              <span style="width: 11%;"><div class="ListBtn">下单</div></span>
            </li>
            <li>
              <span style="width: 7%;">PP</span><span style="width: 7%;">F08</span><span style="width: 7%;">巨正源</span>
              <span style="width: 12%;">东莞</span><span style="width: 7%;">20</span>
              <span style="width: 9%;">31分钟前</span>
              <span class="orangeFont" style="width: 11%;">¥10550</span>
              <span style="width: 13%;">
               <RadioGroup v-model="formItem.radio">
                <Radio label="M">自提</Radio>
                <Radio label="W">配送</Radio>
            </RadioGroup>
						</span>
              <span  class="dflex" style="width: 16%; align-items: center;">
							<div class="NumReduice" style="margin: 0; width: 55%; margin-left: 42px;">
			        			<span class="gray" style="width: 25%;">-</span>
			        			<input class="TextNum" type="text" name=""   >
			        			<span class="gray"  style="width: 25%;">+</span>
		        			</div>
		        			<div class="Numtip"></div>
						</span>
              <span style="width: 11%;"><div class="ListBtn">下单</div></span>
            </li>
          </ul>
        <div class="whitebg ovh">
          <Pagination></Pagination>
        </div>





			</div>

		</div>


  </div>
</template>

<script>

import Pagination from '../components/Pagination'

export default {
  name: "spot",
  components: {

    Pagination
  },
  data(){
    return{
      formItem: {
        radio: 'M',
      },
      color:'',
      page:''
    }
  },
  methods:{

    Router(){
    }
  },
  created () {


  },
   mounted(){

     this.Router()
   },
  head () {
    return {
      title: '巨正源-化工交易平台',
      page:10,
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'keywords', content: '化工, 交易, 丙烷脱氢'},
        { hid: 'description', name: 'description', content: '巨正源-化工交易平台，提供丙烷脱氢,石化产品贸易、仓储服务、成品油运输服务' }
      ]
    }
  },
}
</script>
<style scoped>
  @import '../assets/global.css';
  .w1200 {
    width: 1200px;
    margin: 0px auto;
  }
  .orangeFont{color: #ff9800;}
  .orderPorList{width: 98%;margin: 0 auto;margin-top: 10px;}
  .orderPorList li{display: flex; background-color: #fbfcff; border-bottom: 1px solid #fff; font-size: 14px}
  .orderPorList li:first-child{background: none; border:none;}
  .orderPorList li h1{border-bottom: 2px solid #b2d1ff; text-align: center; margin: 0 3px; padding: 7px 0;}
  .orderPorList li>div{  margin: 15px 3px;text-align: center;      align-items: center;  display: flex;justify-content: center;}
  .NumReduice{  margin: 0 auto;  height: 30px; border: 1px solid #D2D2D2; background-color: #fff; width: 65%; display: flex;align-items: center;}
  .NumReduice>span{ cursor: pointer;  font-weight: bold;    height: 100%;  align-items: center; display: flex; justify-content: center;}
  .NumReduice .TextNum{width: 50%;border: none;height: 100%;text-align: center;}
  /*现货超市首页--页面*/
  .screenList {width: 100%;margin: 10px auto; background-color: #fff;}
  .screenibre {border-bottom: 1px solid #DEDEDE; overflow: hidden;align-items: center;display: flex;justify-content: space-between;}
  .filter_item {display: flex;align-items: center;width: 90%;}
  .scTitle { margin-left: 20px; width: 95px;  color: #333;line-height: 50px; font-size: 14px;}
  .pro_brand_list{margin-left: 15px;}
  .pro_brand_list a{ line-height: 50px; color: #666;   white-space: nowrap;margin-right: 20px; font-size: 14px;}
  .pro_brand_list a:hover{color: #007de4;}
  .pro_m_select { width: 65px;height: 30px; line-height: 30px; border: 1px solid #DEDEDE; cursor: default;
    background: url(../assets/img/icon.png)no-repeat 42px -174px; padding-left: 8px; box-sizing: border-box; color: #666; margin-right: 20px;}


  .XHsearch{padding: 20px; display: flex;align-items: center;}
  .XHsearchInput{width: 120px;height: 30px;border: 1px solid #D2D2D2; margin-left:10px;padding-left: 5px;box-sizing: border-box;}
  .priceInput{width: 90px;height: 30px;margin: 0 10px;border: 1px solid #D2D2D2; padding-left: 5px;box-sizing: border-box;}
  .xhBtn{padding: 6px 20px;background-color: #007de4; box-sizing: border-box;color: #fff;border-radius: 3px; margin-left: 10px;}

  .XhlistTitle{display: flex; align-items: center; border: 1px solid #e4e4e4;}
  .XhlistTitle h1{text-align: center;margin: 12px 0; font-size: 14px;}
  .Xhlist li{display: flex;align-items: center; margin-bottom: 1px;background-color: #fff; font-size: 14px}
  .Xhlist li:hover{background-color: #f2f8fe;}
  .Xhlist li:last-child{ }
  .Xhlist li span{text-align: center; margin: 20px 0;}


  .layui-form-item{margin-bottom: 0;}
  .layui-input-block{display: flex; align-items: center;margin-left: 14px;}
  .layui-form-radio{line-height: 0;margin: 0; padding-right: 0; }
  .layui-form-radio>i{margin-right: 5px; margin-left: 5px;}
  .layui-form-radio>i:hover, .layui-form-radioed>i{color: #007de4;}
  .Numtip{background: url(../assets/img/icon.png)no-repeat 0px -212px;width: 20px;height: 18px; margin-left: 10px; cursor: pointer;}
  /*下单按钮*/
  .ListBtn{ cursor: pointer; width: 76px;line-height: 30px;margin:0 auto; color: #007de4; border-radius:3px; border: 1px solid #007de4;background-color: #f2f8fe;}
  .ListBtn:hover{background-color: #007de4; color: #fff;}

</style>
