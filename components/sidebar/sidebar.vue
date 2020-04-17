<template>
  <div class="cndns-right">
    <!--电话-->
    <div class="cndns-right-meau meau-tel" title="在线电话">
      <div class="cndns-right-btn">
        <img src="../../static/img/siderbar_02.png" />
      </div>
      <div class="cndns-right-box">
        <div class="box-border">
          <div class="sev-t" style="height:49px;line-height:49px;padding-left:20px;">
            <p>{{configProp.SERVICEHOTLINE}}</p>
          </div>
          <span class="arrow-right"></span>
        </div>
      </div>
    </div>
    <!--关注官方微信-->
    <div class="cndns-right-meau">
      <div class="cndns-right-btn">
        <img src="../../static/img/siderbar_01.png" />
      </div>
      <div class="cndns-right-box" style="top:-147px;">
        <div class="box-border" style="height:195px;">
          <div class="sev-t" style="padding-left:10px;padding-top:10px;">
            <img :src="configProp.GZH_ERWEIMA" style="width: 130px;height: 130px;" />
            <p>
              <i>关注微信公众号</i>
            </p>
          </div>
          <span class="arrow-right" style="top:162px;"></span>
        </div>
      </div>
    </div>

    <!--置顶-->
    <div class="cndns-right-meau meau-top" v-show="totop" id="to-top-btn" @click="back">
      <a class="cndns-right-btn">
        <img src="../../static/img/siderbar_04.png" />
      </a>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { scrollTop } from "../../config/utils";

export default {
  name: "sidebar",
  props: {
    configProp: {
      type: Object
    }
  },
  data() {
    return {
      totop: false
    }
  },
  methods: {
    addBookmark(title, url) {
      if (window.sidebar) {
        window.sidebar.addPanel(title, url, "");
      } else if (document.all) {
        window.external.AddFavorite(url, title);
      } else if (window.opera && window.print) {
        return true;
      }
    },
    OnlineService(res) {
      let url = "http://wpa.qq.com/msgrd?v=3&uin=2885709291&site=qq&menu=yes";
      window.open(url);
    },
    addFavorite() {
      let url = window.location.href
      let title = document.title
      if (document.all) {
        window.external.addFavorite(url, title);
      } else if (window.sidebar) {
        window.sidebar.addPanel(title, url, "");
      }
    },
    handleScroll() {
      this.totop = window.pageYOffset > 200;
    },
    back() {
      const sTop = document.documentElement.scrollTop || document.body.scrollTop
      scrollTop(window, sTop, 0, 1000)
    }
  },
  mounted() {
    window.addEventListener("scroll", this.handleScroll);
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.handleScroll);
  }
}
</script>

<style scoped>
</style>
