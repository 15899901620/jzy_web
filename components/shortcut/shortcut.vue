<template>
    <div :class="classes">
      <div class="TopPos" style="display: flex;">
        <div class="slogens">您好，欢迎光临巨正源化工交易网！ <span>|</span>  <nuxt-link to="/">巨正源首页</nuxt-link></div>
        <ul class="topnavlist" v-if="showNav">
            <template v-if="userinfo">
                <li :key="98"><span style="color:#999">你好! </span>{{userinfo.phone}} <span @click="logout">[ 退出 ]</span></li>
            </template>
            <template v-else>
                <li :key="99"><nuxt-link to="/login" >登录</nuxt-link></li>
                <li :key="97"><nuxt-link to="/register" >注册</nuxt-link></li>
            </template>
            <li v-for="(item, index) in topmenu" :key="index">
                <nuxt-link :to="item.url">{{ item.name }}</nuxt-link>
            </li>
        </ul>
      </div>
    </div>
</template>
<script>
const prefixCls = 'ant-shortcut'
import { mapState, mapGetters } from 'vuex'
import { getStore, getCookies } from '../../config/storage'
import Cookies from 'js-cookie'

export default {
    name: 'shortcut',
    props: {
        showNav: {
            type: Boolean,
            default: true
        }
    },
    computed: {
        ...mapState({
            userinfor: state => state.login.userinfor,
            topmenu: state => state.menu.topMenu,
        }),
        classes() {
            return [
                `${prefixCls}`,
                { [`${prefixCls}-shortcut`]: this.vertical },
            ];
        },
    },
    data() {
        return {
            userinfo: {}
        }
    },
    methods: {
        getUserInfo(){
            let data = getCookies('userinfor')
            this.userinfo = data
        },
        logout () {
            Cookies.set('userinfor','')
            Cookies.set('webtoken','')
            Cookies.set('websuppliertoken','')
            this.$router.go(0)
        }
    },
    created() {
        this.getUserInfo()
    },
}
</script>
