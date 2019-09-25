<template>
    <div :class="classes">
        <ul>
            <template v-for="(item, index) in $store.state.common.nav.middleNav">
                <li :key="index" :class="[ item.url  == selected ? 'curr' : ' ']">
                    <a :href="item.url" >{{ item.name }}</a>
                </li>
            </template>
        </ul>
    </div>
</template>
<script>
const prefixCls = 'ant-navigation'

export default {
    name: 'Navigation',
<<<<<<< HEAD
    fetch({store}) {
        return Promise.all([
            //获取顶部、中部、底部导航信息
            store.dispatch('common/getNavList'),
        ])
    },
=======
>>>>>>> 37c7379ca2b6ed5575f083bed6ab816f85947f72
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
