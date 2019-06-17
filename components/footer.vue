<template>
  <div class="footer mt30">
    <slogen></slogen>
    <div class="ensure-wrap">
      <div class="desc">
        <helpnav></helpnav>
        <div class="qr-code">
          <ul>
            <li><h2>巨正源移动端</h2><img src="~/assets/img/code.png" ></li>
            <li><h2>巨正源公众号</h2><img src="~/assets/img/code.png"> </li>
          </ul>
        </div>
        <div class="tel">
          <p class="fs24"> <a target="_blank" rel="nofollow"  style="color: #007de4;">4009-911-900</a></p>
            <p>全国服务热线</p>
            <p>交易时间(工作日)</p>
            <p>9:00-17:30</p>
            <p class="mt10">
              <a rel="nofollow" target="_blank"  class="telurl" alt="点击这里给我发消息" title="点击这里给我发消息"> 在线客服</a>
            </p>
        </div>
      </div>
    </div>
    <Links></Links>
    <div class="footer-brief">
      {{ copyright }}
    </div>
	</div>
</template>

<script>
import Links from './footer/links'
import slogen from './footer/slogen'
import helpnav from './footer/helpnav'
export default {
  name: "VFooter",
  components: {
    Links,
    slogen,
    helpnav
  },
  data () {
    return {
      copyright: '© 2014-2018东莞巨正源科技有限公司 版权所有 经营许可证编号为：粤B2-20150157'
    }
  },
}
</script>

<style scoped>
.footer { background: #fff; overflow: hidden;  clear: both; width:100%;}
.ensure-wrap {border-bottom: 1px solid #dddddd; overflow: hidden;  padding-bottom: 20px;}
.desc {  width: 1200px;  margin: 0 auto;color: #ccc; clear: both;   padding-top: 20px; display: flex;}
.qr-code {display: flex; border-right:1px solid #DDDDDD ;}
.qr-code ul{display: flex;}
.qr-code li { text-align: center; margin: 0 10px; width: 120px; color: #333;}
.qr-code li img{margin-top: 10px;}
.footer .tel {margin: 0 35px;}
.tel p{text-align: center;}
.footer-brief{background-color: #f0f2f5;text-align: center;padding: 30px 0;color: #666666;}
.telurl{padding: 5px 20px 5px 36px;margin-top: 5px;border-radius: 5px;background: url(../assets/img/icon.png)no-repeat 15px -74px;overflow: hidden;border: 1px solid #1696ff;color: #1696ff;}
</style>
