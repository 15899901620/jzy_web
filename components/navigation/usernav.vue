<template>
    <div class="memberList whitebg mt20">
        <div class="theads"><Icon type="md-contact" /><router-link to="/users/user">会员中心</router-link></div>
        <ul class="mt25" v-for="(item, index) in nav" :key="index">
            <h1>{{item.name}}</h1>
            <li v-for="(items,k) in item.children" :key="k" :class="[ item.url  == selected ? 'curr' : ' ']">
                <router-link :to="items.path">{{items.name}}</router-link>
            </li>
        </ul>
    </div>
</template>

<script>


export default {
    name: "usernav",
    data() {
        return {
            nav: [
                {
                    name: '订单管理',
                    children: [
                        {
                            path: './usertotalorder',
                            name: '全部订单'
                        },
                    ]
                },
                {
                    name: '预售管理',
                    children: [
                        {
                            path: './useradvsale',
                            name: '我的预售'
                        },
                    ]
                },
                {
                    name: '求购管理',
                    children: [
                        {
                            path: './userseek',
                            name: '求购信息'
                        },
                    ]
                },
                {
                    name: '竞拍管理',
                    children: [
                        {
                            path: './userauction',
                            name: '我的竞拍'
                        },
                    ]
                },
                {
                    name: '专料管理',
                    children: [
                        {
                            path: './userSpecmat',
                            name: '我的专料'
                        },
                    ]
                },
                {
                    name: '物流管理',
                    children: [
                        {
                            path: './userlog',
                            name: '物流管理'
                        },
                    ]
                },
                {
                    name: '资金管理',
                    children: [
                        {
                            path: './usercapitalmanage',
                            name: '资金管理'
                        },
                    ]
                },
                {
                    name: '账号管理',
                    children: [
                        {
                            path: './usermodifyinfor',
                            name: '完善信息'
                        },
                        {
                            path: './userCodeManage',
                            name: '密码管理'
                        },
                        {
                            path: './userAccountBind',
                            name: '账号绑定'
                        },
                        {
                            path: './userAddress',
                            name: '收货地址'
                        }
                    ]
                }
            ]
        }
    },
    computed: {
        selected() {
            return !this.$route.path ? '/' : this.$route.path
        }
    },
}
</script>