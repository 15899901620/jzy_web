<template>
    <div :class="classes">
        <div class="dflex mt25" style="justify-content: center;" v-if="!userinfo">
            <div class="indexHead" @click="User"><img  src="../../static/img/index_head.png"/></div>
            <div class="ml10">
                <p class="mt5">HI,上午好！</p>
                <p class="gray">欢迎来到巨正源交易网!</p>
            </div>
        </div>
        <div class="dflex mt25" style="justify-content: center;" v-else>
            <div class="indexHead" @click="User"><img :src="!userinfo.avatar ? '~/static/img/index_head.png': userinfo.avatar"/></div>
            <div class="ml10">
                <p class="mt5">HI {{userinfo.phone}},上午好！</p>
                <p class="gray">欢迎来到巨正源交易网!</p>
            </div>
        </div>
        <div class="loginReg mt10" v-if="!userinfo">
            <router-link to="/login" class="loginbg">登 录</router-link>
            <router-link to="/register" class="registerbg ml10">注 册</router-link>
        </div>
         <div v-else class="loginReg mt10">
              <div @click="logout" class="registerbg ml10" style="padding:2px 10px;cursor: default; border:1px solid #ddd;  border-radius:3px;">退出登录</div>
         </div>
        <slot></slot>
    </div>
</template>
<script>
const prefixCls = 'ant-hotrecommend'
import { mapState } from 'vuex'
import { getStore, getCookies } from '../../config/storage'
import Cookies from 'js-cookie'

export default {
    name: 'hotrecommend',
    data() {
        return {
            userinfo: {}
        }
    },
    computed: {
        ...mapState({
            userinfor: state => state.login.userinfor,
        }),
        classes() {
            return [
                `${prefixCls}`,
                { [`${prefixCls}-hotrecommend`]: this.vertical },
            ];
        },
    },
    methods:{
        User() {
            if (!this.userinfo) {
                this.$router.push({path:'./users/user'})
            }else{
                this.$router.push({path:'../login'})
            }
        },
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
