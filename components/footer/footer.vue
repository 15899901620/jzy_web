<template>
    <div :class="classes">
        <template v-if="size === 'default'">
            <slogen></slogen>
            <div class="ensure-wrap">
                <div class="sundry">
                    <helpnav></helpnav>
                    <div class="qr-code">
                        <ul>
                            <li><h2>巨正源移动端</h2><img src="~/assets/img/code.png" ></li>
                            <li><h2>巨正源公众号</h2><img src="~/assets/img/code.png"> </li>
                        </ul>
                    </div>
                    <div class="tel">
                        <p class="fs24"><a target="_blank" rel="nofollow"  style="color: #007de4;">{{systeminfo.SERVICEHOTLINE}}</a></p>
                        <p>全国服务热线</p>
                        <p>交易时间(工作日)</p>
                        <p>{{systeminfo.OPENING_TIME}}-{{systeminfo.CLOSED_TIME}}</p>
                        <p class="mt10">
                            <a rel="nofollow" target="_blank"  @v-on::click="OnlineService()"  class="telurl" alt="点击这里给我发消息" title="点击这里给我发消息"> 在线客服</a>
                        </p>
                    </div>
                </div>
            </div>
            <links :linksData="linksinfo"></links>
            <div class="ensure-wrap" style="padding-bottom: 0px;  background-color: #f1f1f1; border:0;">
                <div class="copyright">
                    {{ systeminfo.COPYRIGHT }}
                </div>
            </div>
        </template>
        <template v-else-if="size === 'large'">
            <div class="ensure-wrap">
                <div class="sundry">
                    <helpnav></helpnav>
                    <div class="qr-code">
                        <ul>
                            <li><h2>巨正源移动端</h2><img src="~/assets/img/code.png" ></li>
                            <li><h2>巨正源公众号</h2><img src="~/assets/img/code.png"> </li>
                        </ul>
                    </div>
                    <div class="tel">
                        <p class="fs24"><a target="_blank" rel="nofollow"  style="color: #007de4;">{{systeminfo.SERVICEHOTLINE}}</a></p>
                        <p>全国服务热线</p>
                        <p>交易时间(工作日)</p>
                        <p>{{systeminfo.OPENING_TIME}}-{{systeminfo.CLOSED_TIME}}</p>
                        <p class="mt10">
                            <a rel="nofollow" target="_blank" @v-on::click="OnlineService()" class="telurl" alt="点击这里给我发消息" title="点击这里给我发消息"> 在线客服</a>
                        </p>
                    </div>
                </div>
            </div>
            <links :linksData="linksinfo"></links>
            <div class="ensure-wrap" style="padding-bottom: 0px;  background-color: #f1f1f1; border:0;">
                <div class="copyright">
                    {{ systeminfo.COPYRIGHT }}
                </div>
            </div>
        </template>
        <template v-if="size === 'small'">
            <div class="ensure-wrap" style="padding-bottom: 0px;  background-color: #f1f1f1; border:0;">
                <div class="copyright">
                    {{ systeminfo.COPYRIGHT }}
                </div>
            </div>
        </template>
	</div>
</template>

<script>
const prefixCls = 'ant-footer'
import { mapState } from 'vuex'
import slogen from './slogen'
import helpnav from '../helper'
import links from './links'

export default {
    name: 'Footer',
    components:{
        slogen,
        helpnav,
        links
    },
    props:{
        size: {
            //large、small、default
            type: String,
            default: 'default'
        }
    },
    computed: {
        ...mapState({
            userinfo: state => state.login.userinfo,
            topmenu: state => state.menu.topMenu,
            systeminfo: state => state.system.systeminfo,
            linksinfo: state => state.system.linksinfo
        }),
        classes() {
            return [
                `${prefixCls}`,
                { [`${prefixCls}-footer`]: this.vertical },
            ];
        },
    },
    methods: {
        OnlineService () {
            let url = 'http://wpa.qq.com/msgrd?v=3&uin='+ systeminfo.ONLINESERVICE +'&site=qq&menu=yes'
            // window.open(url)
        } 
    }
}
</script>
