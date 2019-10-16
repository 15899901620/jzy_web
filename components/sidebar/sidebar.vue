<template>
    <div class="cndns-right">
        <!--关注官方微信-->
        <div class="cndns-right-meau ">
            <div class="cndns-right-btn ">
                <img src="../../static/img/siderbar_01.png" />
            </div>
            <div class="cndns-right-box">
                <div class="box-border">
                    <div class="sev-t">
                        <img :src="this.$store.state.common.sysConfig.ERWEIMA" />
                        <p>
                            <i>巨正源交易平台</i>
                            <i>微信扫码下单</i></p>
                    </div>
                    <span class="arrow-right"></span>
                </div>
            </div>
        </div>
        <!--电话-->
        <div class="cndns-right-meau meau-tel">
            <div class="cndns-right-btn">
                <img src="../../static/img/siderbar_02.png" />
            </div>
            <div class="cndns-right-box">
                <div class="box-border">
                    <div class="sev-t">
                        <p>{{this.$store.state.common.sysConfig.SERVICEHOTLINE}}</p>
                    </div>
                    <span class="arrow-right"></span>
                </div>
            </div>
        </div>
        <!--竞拍-->
        <div class="cndns-right-meau meau-acution" >
<!--            <nuxt-link to="/bidders">-->
            <a  @click="addFavorite" >
                <div class="cndns-right-btn">
                    <img src="../../static/img/siderbar_03.png" />
                </div>
            </a>
<!--            </nuxt-link>-->

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
        // addFavorite() {
        //     var url = window.location;
        //     var title = document.title;
        //     var ua = navigator.userAgent.toLowerCase();
        //     console.log("url:",url)
        //     console.log("title:",title)
        //     console.log("ua:",ua)
        //     if (ua.indexOf("msie 8") > -1) {
        //         external.AddToFavoritesBar(url, title, '');//IE8
        //     } else {
        //         try {
        //             window.external.addFavorite(url, title);
        //         } catch (e) {
        //             try {
        //                 window.sidebar.addPanel(title, url, "");//firefox
        //             } catch (e) {
        //                 alert("加入收藏失败，请使用Ctrl+D进行添加");
        //             }
        //         }
        //     }
        // },
        addFavorite () {
            if (window.sidebar) {        // Firefox
                window.sidebar.addPanel ('Dottoro help page', 'http://help.dottoro.com', '');
            }
            else {
                if (window.external && ('AddFavorite' in window.external)) {
                    // Internet Explorer
                    window.external.AddFavorite ('http://help.dottoro.com', 'Dottoro help page');
                }
                else {  // Opera, Google Chrome and Safari
                    alert ("加入收藏失败，请使用Ctrl+D进行添加");
                }
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
