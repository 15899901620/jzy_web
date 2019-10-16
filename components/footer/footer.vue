<template>
    <div :class="classes">
        <template v-if="size === 'default'">
            <slogen></slogen>
            <div class="ensure-wrap">
                <div class="sundry">
                    <helpnav></helpnav>
                    <div class="qr-code">
                        <ul>
                            <li><h2>微信发货平台</h2><img :src="this.$store.state.common.sysConfig.ERWEIMA"></li>
                            <li><h2>微信公众号</h2><img :src="this.$store.state.common.sysConfig.GZH_ERWEIMA"></li>
                        </ul>
                    </div>
                    <div class="tel">
                        <p class="fs24"><a target="_blank" rel="nofollow"  style="color: #007de4;">{{this.$store.state.common.sysConfig.SERVICEHOTLINE}}</a></p>
                        <p>全国服务热线</p>
                        <p>交易时间(工作日)</p>
                        <p>{{this.$store.state.common.sysConfig.OPENING_TIME}}-{{this.$store.state.common.sysConfig.CLOSED_TIME}}</p>
                        <p class="mt10">
                            <a rel="nofollow" target="_blank"  v-on:click="OnlineService()"  class="telurl" alt="点击这里给我发消息" title="点击这里给我发消息"> 在线客服</a>
                        </p>
                    </div>
                </div>
            </div>
             <div class="ensure-wrap" style="padding-bottom: 0px;  background-color: #f1f1f1; border:0;">
                <div class="copyright" v-html="this.$store.state.common.sysConfig.COPYRIGHT"></div>

            </div>
        </template>
        <template v-else-if="size === 'large'">
            <div class="ensure-wrap">
                <div class="sundry">
                    <helpnav></helpnav>
                    <div class="qr-code">
                        <ul>
                            <li><h2>微信发货平台</h2><img :src="this.$store.state.common.sysConfig.ERWEIMA" ></li>
                            <li><h2>微信公众号</h2><img :src="this.$store.state.common.sysConfig.GZH_ERWEIMA" > </li>
                        </ul>
                    </div>
                    <div class="tel">
                        <p class="fs24"><a target="_blank" rel="nofollow"  style="color: #007de4;">{{this.$store.state.common.sysConfig.SERVICEHOTLINE}}</a></p>
                        <p>全国服务热线</p>
                        <p>交易时间(工作日)</p>
                        <p>{{this.$store.state.common.sysConfig.OPENING_TIME}}-{{this.$store.state.common.sysConfig.CLOSED_TIME}}</p>
                        <p class="mt10">
                            <a rel="nofollow" target="_blank" v-on:click="OnlineService()" class="telurl" alt="点击这里给我发消息" title="点击这里给我发消息"> 在线客服</a>
                        </p>
                    </div>
                </div>
            </div>
             <div class="ensure-wrap" style="padding-bottom: 0px;  background-color: #f1f1f1; border:0;">
                <div class="copyright" v-html="this.$store.state.common.sysConfig.COPYRIGHT"></div>
            </div>
        </template>
        <template v-if="size === 'small'">
            <div class="ensure-wrap" style="padding-bottom: 0px;  background-color: #f1f1f1; border:0;">
                <div class="copyright" v-html="this.$store.state.common.sysConfig.COPYRIGHT"></div>
            </div>
        </template>
	</div>
</template>

<script>
const prefixCls = 'ant-footer'
import slogen from './slogen'
import helpnav from '../helper'
 
export default {
    name: 'Footer',
    components:{
        slogen,
        helpnav,

    },
    props:{
        size: {
            //large、small、default
            type: String,
            default: 'default'
        }
    },
    computed: {
        classes() {
            return [
                `${prefixCls}`,
                { [`${prefixCls}-footer`]: this.vertical },
            ];
        },
    },
    methods: {
        OnlineService () {
             let url = 'http://wpa.qq.com/msgrd?v=3&uin='+ this.$store.state.common.sysConfig.ONLINESERVICE +'&site=qq&menu=yes'
              window.open(url)
        }
    }
}
</script>
