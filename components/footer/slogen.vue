<template>
  <div class="ensure-wrap">
    <div class="ensure">
      <ul>
        <li><i class="ensure-icon ensure-icon1"></i><h4>原厂自营 低价保障</h4><p>缩减中间环节 一手货源</p></li>
        <li><i class="ensure-icon ensure-icon2"></i><h4>货真价实</h4><p>价格、库存真实有效,杜绝虚假</p></li>
        <li><i class="ensure-icon ensure-icon3"></i><h4>买卖无忧</h4><p>会员认证、厂家直供</p></li>
        <li><i class="ensure-icon ensure-icon4"></i><h4>专业团队 行业平台</h4><p>专业人员全程一对一服务</p></li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "slogen"
}
</script>

<style scoped>
.ensure-wrap {border-bottom: 1px solid #dddddd; overflow: hidden;  padding-bottom: 20px;}
.ensure { width: 1200px; margin: 0 auto;  padding-top: 25px; overflow: hidden;  }
.ensure ul{display: flex;justify-content: space-between;}
.ensure li {width: 245px;padding-left: 20px;}
.ensure li .ensure-icon{ width: 46px;height: 51px; float: left; margin-right: 10px;}
.ensure li .ensure-icon1 {background: url(../../assets/img/ensure-icon.png) no-repeat 0px 0;}
.ensure li .ensure-icon2 {background: url(../../assets/img/ensure-icon.png) no-repeat -58px 0;}
.ensure li .ensure-icon3 {background: url(../../assets/img/ensure-icon.png) no-repeat -114px 0;}
.ensure li .ensure-icon4 {background: url(../../assets/img/ensure-icon.png) no-repeat -171px 0;}
.ensure li h4 {font-size: 16px;color: #333;}.ensure li p{color: #666;font-size: 12px;}
</style>
