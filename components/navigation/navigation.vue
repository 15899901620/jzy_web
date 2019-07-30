<template>
    <div :class="classes">
        <ul>
            <template v-for="(item, index) in data">
                <li :key="index" :class="[ item.url  == selected ? 'curr' : ' ']">
                    <nuxt-link  :to="item.url" >{{ item.name }}</nuxt-link>
                </li>
            </template>
        </ul>
    </div>
</template>
<script>
const prefixCls = 'ant-navigation'

export default {
    name: 'Navigation',
    props: {
        data: {
            type: Array,
            default: () => [],
        }
    },
    computed: {
        selected() {
            return !this.$route.path ? '/' : this.$route.path
        },
        classes() {
            return [
                `${prefixCls}`,
                { [`${prefixCls}-shortcut`]: this.vertical },
            ];
        },
    },
}
</script>
