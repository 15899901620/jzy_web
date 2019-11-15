<template>
    <div :class="classes">
        <template v-if="shortType === 'suppler'">
          <suppler :showNav='showNav'></suppler>
        </template>
        <template v-else>
          <shortcut :showNav='showNav'></shortcut>
        </template>
		    <!--头部-logo/搜索/电话-->
        <div class="searchLogo">
            <!--logo-->
            <Logo class="mt20 mb20" style="border-right: 1px solid rgb(210, 210, 210);padding-right: 30px; "></Logo>
            <div class="fs22 pl25" style="position: absolute; top: 69px; margin-left: 299px; color:#ccc;">{{title}}</div>
            <slot class="topother" name="headerother"></slot>
        </div>
        <div class="navigation" v-if="type == 1">
            <!--热门服务分类-->
            <div class="assortment-wrap" @mouseenter="infication" @mouseleave="outfication">
                <div class="fication_menu">查看服务分类</div>
                <coolapse :openCol="openCol"></coolapse>
            </div>
            <Navigation></Navigation>
        </div>
    </div>
    
</template>
<script>
const prefixCls = 'ant-header'
import { mapState } from 'vuex'
import shortcut from '../shortcut'
import Logo from './components/logo'
import Search from './components/search'
import Navigation from '../navigation'
import coolapse from '../collapse'
// import servicecate from './components/servicecate'

export default {
    name: 'Headersmall',
    data() {
        return {
            selectService: false,
            openCol: 'none',
            showNav:true
        }
    },
    props: {
      title: String,
      shortType:{
        type: String,
        default: 'carrier'
      },
      type:{}
    },
    components: {
        shortcut,
        suppler: shortcut.suppler,
        Logo,
        Search,
        coolapse,
        Navigation,
        // servicecate
    },
    computed: {
        classes() {
            return [
                `${prefixCls}`,
                { [`${prefixCls}-header`]: this.vertical },
            ];
        },
    },
    methods: {
        infication() {
            this.openCol = 'block'
        },
        outfication() {
				let routeName = this.$router.history.current.name
				if (routeName === 'index') {
					this.openCol = 'block'
				} else {
					this.openCol = 'none'
				}
        },
        logout () {

        }
    },
}
</script>
