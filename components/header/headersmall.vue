<template>
    <div :class="classes">
        <shortcut :showNav='showNav'></shortcut>
		<!--头部-logo/搜索/电话-->
        <div class="searchLogo">
            <!--logo-->
            <Logo class="mt20 mb20" style="border-right: 1px solid rgb(210, 210, 210);padding-right: 30px;"></Logo>
            <div class="fs20 pl25 gray" style="position: absolute;top: 82px;left: 578px;">{{title}}</div>
            <slot class="topother" name="headerother">
              
            </slot>
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
// import servicecate from './components/servicecate'

export default {
    name: 'Headersmall',
    data() {
        return {
            selectService: false,
            showNav:true
        }
    },
    props: {
        title: String,
    },
    components: {
        shortcut,
        Logo,
        Search,
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
        logout () {
            
        }
    }
}
</script>
