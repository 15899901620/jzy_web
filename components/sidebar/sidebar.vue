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
                        <p>{{this.$store.state.common.sysConfig.SERVICEHOTLINE}}</p>
                    </div>
                    <span class="arrow-right"></span>
                </div>
            </div>
        </div>
        <!--收藏-->
        <!-- <div class="cndns-right-meau meau-acution"  title="我的收藏"> -->
<!--            <a  @click="addFavorite();"  title='巨正源' rel="sidebar" href="http://192.168.10.63:3000/">-->
<!--                <div class="cndns-right-btn">-->
<!--                    <img src="../../static/img/siderbar_03.png" />-->
<!--                </div>-->
<!--            </a>-->
            <!-- <a  href="javascript:addBookmark('脚本之家','http://192.168.10.63:3000/')"  >
                <div class="cndns-right-btn">
                    <img src="../../static/img/siderbar_03.png" />
                </div>
            </a>

        </div> -->
        <!--关注官方微信-->
        <div class="cndns-right-meau ">
            <div class="cndns-right-btn ">
                <img src="../../static/img/siderbar_05.png" />
            </div>
            <div class="cndns-right-box" style="top:-98px;">
                <div class="box-border" style="height:195px;">
                    <div class="sev-t">
                        <p class="service_title">在线客服</p>
<!--                        <img :src="this.$store.state.common.sysConfig.ERWEIMA" style="width: 130px;height: 130px;" />-->
<!--                        <p>-->
<!--                            <i>巨正源电商平台</i>-->
<!--                            <i>微信扫码下单</i></p>-->
                        <div class="tel">
<!--                            <p class="fs24"><a target="_blank" rel="nofollow"  style="color: #007de4;">{{this.$store.state.common.sysConfig.SERVICEHOTLINE}}</a></p>-->
<!--                            <p>全国服务热线</p>-->
<!--                            <p>交易时间(工作日)</p>-->
<!--                            <p>{{this.$store.state.common.sysConfig.OPENING_TIME}}-{{this.$store.state.common.sysConfig.CLOSED_TIME}}</p>-->
                            <p class="service_text">
                                <a rel="nofollow" target="_blank" v-on:click="OnlineService(0)" class="telurl" alt="点击这里给我发消息" title="点击这里给我发消息">售前咨询</a>
                            </p>
                            <p class="service_text">
                                <a rel="nofollow" target="_blank" v-on:click="OnlineService(1)" class="telurl" alt="点击这里给我发消息" title="点击这里给我发消息">售前咨询</a>
                            </p>
                            <p class="service_text">
                                <a rel="nofollow" target="_blank" v-on:click="OnlineService(2)" class="telurl" alt="点击这里给我发消息" title="点击这里给我发消息">商务洽谈</a>
                            </p>
                            <p class="service_text">
                                <a rel="nofollow" target="_blank" v-on:click="OnlineService(3)" class="telurl" alt="点击这里给我发消息" title="点击这里给我发消息">售后咨询</a>
                            </p>
                            <p class="service_text">
                                <a rel="nofollow" target="_blank" v-on:click="OnlineService(4)" class="telurl" alt="点击这里给我发消息" title="点击这里给我发消息">问题反馈</a>
                            </p>

                        </div>

                    </div>
                    <span class="arrow-right" style="top:116px;"></span>
                </div>
            </div>
        </div>
        <!--关注官方微信-->
        <div class="cndns-right-meau ">
            <div class="cndns-right-btn ">
                <img src="../../static/img/siderbar_01.png" />
            </div>
            <div class="cndns-right-box" style="top:-147px;">
                <div class="box-border" style="height:195px;">
                    <div class="sev-t"  style="padding-left:10px;padding-top:10px;">
                        <img :src="this.$store.state.common.sysConfig.GZH_ERWEIMA" style="width: 130px;height: 130px;" />
                        <p>
                          <i>关注微信公众号</i>
                        </p>
                    </div>
                    <span class="arrow-right" style="top:162px;"></span>
                </div>
            </div>
        </div>


        <!--置顶-->
        <div class="cndns-right-meau meau-top" v-show="totop"  id="to-top-btn" @click="back">
            <a class="cndns-right-btn">
                <img src="../../static/img/siderbar_04.png" />
            </a>
        </div>

    </div>
</template>

<script>
import { mapState } from 'vuex'
import { scrollTop } from '../../config/utils';


export default {

    name: "sidebar",

    data(){
        return{
            totop: false
        }
    },

    methods: {
        addBookmark(title,url) {
            if (window.sidebar) {
                window.sidebar.addPanel(title,url,"");
            } else if( document.all ) {
                window.external.AddFavorite(url,title);
            } else if( window.opera && window.print ) {
                return true;
            }
        },

        OnlineService (res) {
          if(this.$store.state.common.sysConfig.SERVERONLINE) {
            let data = this.$store.state.common.sysConfig.SERVERONLINE.split(',')
            let url = 'http://wpa.qq.com/msgrd?v=3&uin='+ data[res] +'&site=qq&menu=yes'
            window.open(url)
          }
         
        },
        addFavorite () {
            var url = window.location.href;
            var title = document.title;
           console.log("url",url)
            console.log("title",title)
            console.log("all",document.all)
            if(document.all){
                window.external.addFavorite(url, title);
            }else if(window.sidebar){
                window.sidebar.addPanel(title, url,'');
            }

        },

        handleScroll () {
            this.totop = window.pageYOffset > 200;
        },
        back () {
            const sTop = document.documentElement.scrollTop || document.body.scrollTop;
            scrollTop(window, sTop, 0, 1000);
        }
    },
    mounted(){
      window.addEventListener('scroll', this.handleScroll)
    },
    beforeDestroy () {
        window.removeEventListener('scroll', this.handleScroll);
    },
}
</script>

<style scoped>

</style>
