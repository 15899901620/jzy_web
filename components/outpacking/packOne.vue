<template>
    <div :class="classes">
        <div class="title">
            <h3>{{title}}</h3>
            <span v-if="total>0">共 {{total}} 条数据</span>
            <span v-if="more"><a :href="more.url">{{more.title}}<span class="el-icon-newfont-menu"></span></a></span>
        </div>
        <div class="content" v-bind:style="{padding:cpadding}">
            <slot name="content">

            </slot>
        </div>
    </div>
</template>
<script>
const prefixCls = 'ant-pack'
import '../../static/icon/iconfont.css'
export default {
    name: 'packOne',
    props:{
        title:{
            type:String
        },
        vertical: {
            type: Boolean,
            default: false,
        },
        total: {
            type: Number,
            default: 0,
        },
        more: {
            type:Object,
            default: null,
        },
        cpadding: {
            type:String,
            default: '10px'
        }
    },
     computed: {
        classes() {
            return [
                `${prefixCls}`,
                { [`${prefixCls}-pack`]: this.vertical },
            ];
        }
     }
}
</script>
