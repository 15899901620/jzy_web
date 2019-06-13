<template>
  <div class="w1200 ">
    <div class="ListTitle  whitebg mt20">
      <div class="TitleName">现货超市</div>
      <a class="mr20 mt15 mb15 gray fs14">前往超市选购 ></a>
    </div>
    <div class="indexXhTitle   dflexAlem">
      <span style="width: 7%;">品种</span>
      <span style="width: 7%;">牌号</span>
      <span style="width: 7%;">厂商</span>
      <span style="width: 12%;">交货地</span>
      <span style="width: 7%;">数量</span>
      <span style="width: 9%;">更新时间</span>
      <span style="width: 11%;">单价（元/吨）</span>
      <span style="width: 13%;">交货方式</span>
      <span style="width: 16%;">数量</span>
      <span style="width: 11%;">操作</span>
    </div>
    <ul class="indexXhlist">
      <li>
        <span style="width: 7%;">PP</span><span style="width: 7%;">F08</span><span style="width: 7%;">巨正源</span>
        <span style="width: 12%;">东莞</span><span style="width: 7%;">20</span>
        <span style="width: 9%;">31分钟前</span><span class="Priceorange" style="width: 11%;">¥10550</span>
        <span style="width: 13%;">
							<div class="layui-form-item">
							<form class="layui-form dflex" >
								<div class="layui-input-block">
							      <input type="radio" name="sex" value="男" title="自提" checked="">
							      <input type="radio" name="sex" value="女" title="配送">
							    </div>
							</form>
							 </div>
						</span>
        <span  class="dflex" style="width: 16%; align-items: center;">
							<div class="NumReduice" style="margin: 0; width: 55%; margin-left: 42px;">
			        			<span class="gray" style="width: 25%;">-</span>
			        			<input class="TextNum" type="text" name="" id="" value="">
			        			<span class="gray"  style="width: 25%;">+</span>
		        			</div>
		        			<div class="Numtip"></div>
						</span>
        <span style="width: 11%;"><div class="ListBtn">下单</div></span>
      </li>
      <li>
        <span style="width: 7%;">PP</span><span style="width: 7%;">F08</span><span style="width: 7%;">巨正源</span>
        <span style="width: 12%;">东莞</span><span style="width: 7%;">20</span>
        <span style="width: 9%;">31分钟前</span><span class="Priceorange" style="width: 11%;">¥10550</span>
        <span style="width: 13%;">
							<div class="layui-form-item">
							<form class="layui-form dflex" >
								<div class="layui-input-block">
							      <input type="radio" name="sex" value="男" title="自提" checked="">
							      <input type="radio" name="sex" value="女" title="配送">
							    </div>
							</form>
							 </div>
						</span>
        <span  class="dflex" style="width: 16%; align-items: center;">
							<div class="NumReduice" style="margin: 0; width: 55%; margin-left: 42px;">
			        			<span class="gray" style="width: 25%;">-</span>
			        			<input class="TextNum" type="text" name="" id="" value="">
			        			<span class="gray"  style="width: 25%;">+</span>
		        			</div>
		        			<div class="Numtip"></div>
						</span>
        <span style="width: 11%;"><div class="ListBtn">下单</div></span>
      </li>
      <li>
        <span style="width: 7%;">PP</span><span style="width: 7%;">F08</span><span style="width: 7%;">巨正源</span>
        <span style="width: 12%;">东莞</span><span style="width: 7%;">20</span>
        <span style="width: 9%;">31分钟前</span><span class="Priceorange" style="width: 11%;">¥10550</span>
        <span style="width: 13%;">
           <Radio-group :model.sync="animal">
            <Radio value="金斑蝶"></Radio>
            <Radio value="爪哇犀牛"></Radio>
           </Radio-group>
<!--							<div class="layui-form-item">-->
<!--							<form class="layui-form dflex" >-->
<!--								<div class="layui-input-block">-->
<!--							      <input type="radio" name="sex" value="男" title="自提" checked="">-->
<!--							      <input type="radio" name="sex" value="女" title="配送">-->
<!--							    </div>-->
<!--							</form>-->
<!--							 </div>-->
						</span>
        <span  class="dflex" style="width: 16%; align-items: center;">
							<div class="NumReduice" style="margin: 0; width: 55%; margin-left: 42px;">
			        			<span class="gray" style="width: 25%;">-</span>
			        			<input class="TextNum" type="text" name="" id="" value="">
			        			<span class="gray"  style="width: 25%;">+</span>
		        			</div>
		        			<div class="Numtip"></div>
						</span>
        <span style="width: 11%;"><div class="ListBtn">下单</div></span>
      </li>

    </ul>
  </div>
</template>

<script>
    export default {
        name: "Spotsupermarket",
      data () {
          return{ animal: '爪哇犀牛'}
      }
    }
</script>

<style scoped>
  /*现货超市*/
  .ListTitle{display: flex;justify-content: space-between;}
  .TitleName{border-left: 2px solid #279eff; padding-left: 10px; margin: 15px 0; font-size: 16px;}
  .indexXhTitle span{text-align: center;margin: 20px 0; font-size: 14px;color: #333;}
  .indexXhlist li{height: 55px; display: flex; align-items: center; margin-bottom: 1px;background-color: #fff; font-size: 14px}
  .indexXhlist li .Priceorange{color: #ff6600;}
  .indexXhlist li span{text-align: center;}
  .indexXhlist li:hover{background-color: #f2f8fe;}

  /*下单按钮*/
  .ListBtn{ cursor: pointer; width: 76px;line-height: 30px;margin:0 auto; color: #007de4; border-radius:3px; border: 1px solid #007de4;background-color: #f2f8fe;}
  .ListBtn:hover{background-color: #007de4; color: #fff;}
</style>
