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

    fetch({store}) {
        return Promise.all([
            //获取顶部、中部、底部导航信息
            store.dispatch('common/getNavList'),
        ])
    },

     computed: {
        selected() {

            if(this.$route.path === '/advance/feeding'){
                 return this.$route.path
            }else{
                let pathArray=this.$route.path.split('/')
                return !pathArray[1] ? '/' : '/'+pathArray[1]
            }

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
