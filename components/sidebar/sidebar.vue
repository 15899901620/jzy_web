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
                        <img src="../../static/img/erweima.png" />
                        <p><i>巨正源交易平台</i>
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
                        <p>{{systeminfo.SERVICEHOTLINE}}</p>
                    </div>
                    <span class="arrow-right"></span>
                </div>
            </div>
        </div>
        <!--竞拍-->
        <div class="cndns-right-meau meau-acution">
            <nuxt-link to="/bidders">
                <div class="cndns-right-btn">
                    <img src="../../static/img/siderbar_03.png" />
                </div>
            </nuxt-link>

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
    computed: {
        ...mapState({
            systeminfo: state => state.system.systeminfo
        })
    },
    methods: {
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
