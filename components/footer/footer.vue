<template>
  <div :class="classes">
    <template v-if="size === 'default'">
      <slogen></slogen>
      <div class="ensure-wrap">
        <div class="sundry">
          <helpnav :helpCatListProp="this.helpCatListProp"></helpnav>
          <div class="qr-code">
            <ul>
              <li>
                <h2>微信发货平台</h2>
                <img :src="this.sysConfig.ERWEIMA" />
              </li>
              <li>
                <h2>微信公众号</h2>
                <img :src="this.sysConfig.GZH_ERWEIMA" />
              </li>
            </ul>
          </div>
          <div class="tel">
            <p class="fs24">
              <a
                target="_blank"
                rel="nofollow"
                style="color: #007de4;"
              >{{this.sysConfig.SERVICEHOTLINE}}</a>
            </p>
            <p>全国服务热线</p>
            <p>交易时间(工作日)</p>
            <p>{{this.sysConfig.OPENING_TIME}}-{{this.sysConfig.CLOSED_TIME}}</p>
          </div>
        </div>
      </div>
      <div
        class="ensure-wrap"
        style="padding-bottom: 0px;padding: 30px 0px;  background-color: #f1f1f1; border:0;"
      >
        <div class="copyright" style="padding:5px 0">
          <a
            :href="item.url"
            v-for="(item, index) in this.bottomNav"
            :key="index"
            style="padding-right: 10px;"
          >{{ item.name }}</a>
        </div>
        <div
          class="copyright"
          style="padding: 0px;"
          v-html="this.sysConfig.COPYRIGHT"
        ></div>
      </div>
    </template>
    <template v-else-if="size === 'large'">
      <div class="ensure-wrap">
        <div class="sundry">
          <helpnav :helpCatListProp="this.helpCatListProp"></helpnav>
          <div class="qr-code">
            <ul>
              <li>
                <h2>微信发货平台</h2>
                <img :src="this.sysConfig.ERWEIMA" />
              </li>
              <li>
                <h2>微信公众号</h2>
                <img :src="this.sysConfig.GZH_ERWEIMA" />
              </li>
            </ul>
          </div>
          <div class="tel">
            <p class="fs24">
              <a
                target="_blank"
                rel="nofollow"
                style="color: #007de4;"
              >{{this.sysConfig.SERVICEHOTLINE}}</a>
            </p>
            <p>全国服务热线</p>
            <p>交易时间(工作日)</p>
            <p>{{this.sysConfig.OPENING_TIME}}-{{this.sysConfig.CLOSED_TIME}}</p>
          </div>
        </div>
      </div>
      <div class="ensure-wrap" style="padding-bottom: 0px;  background-color: #f1f1f1; border:0;">
        <div class="copyright" v-html="this.sysConfig.COPYRIGHT"></div>
      </div>
    </template>
    <template v-if="size === 'small'">
      <div class="ensure-wrap" style="padding-bottom: 0px;  background-color: #f1f1f1; border:0;">
        <div class="copyright" v-html="this.sysConfig.COPYRIGHT"></div>
      </div>
    </template>
  </div>
</template>

<script>
const prefixCls = "ant-footer"
import slogen from "./slogen"
import helpnav from "../helper"

export default {
  name: "Footer",
  components: {
    slogen,
    helpnav
  },
  props: {
    size: {
      //large、small、default
      type: String,
      default: "default"
    },
    configProp: {
      type: Object
    },
    bottomNavProp: {
      type: Array
    },
    helpCatListProp: {
      type: Array
    }
  },
  computed: {
    classes() {
      return [`${prefixCls}`, { [`${prefixCls}-footer`]: this.vertical }];
    }
  },
  data() {
    return {
      sysConfig: this.configProp || this.$store.state.common.sysConfig,
      bottomNav: this.bottomNavProp || this.$store.state.common.nav.bottomNav
    }
  },
  methods: {
    OnlineService() {
      let url =
        "http://wpa.qq.com/msgrd?v=3&uin=" +
        this.$store.state.common.sysConfig.ONLINESERVICE +
        "&site=qq&menu=yes";
      window.open(url);
    }
  }
}
</script>
