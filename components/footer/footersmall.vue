<template>
    <div :class="classes">
        <div class="ensure-wrap" style="padding-bottom: 0px;  background-color: #f1f1f1; border:0;">
            <div class="copyright">
                {{ this.$store.state.common.sysConfig.COPYRIGHT }}
            </div>
        </div>
	</div>
</template>

<script>
const prefixCls = 'ant-footer'
import { mapState } from 'vuex'
import slogen from './slogen'
import helpnav from '../helper'
import links from './links'

export default {
    name: 'FooterSmall',
    computed: {

        classes() {
            return [
                `${prefixCls}`,
                { [`${prefixCls}-footer`]: this.vertical },
            ];
        },
    }
}
</script>
