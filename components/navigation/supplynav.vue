<template>
    <div class="memberList whitebg mt20">
        <div class="theads"><Icon type="md-contact" /><router-link to="/users/user">会员中心</router-link></div>
        <ul class="mt25" v-for="(item, index) in nav" :key="index" style="margin-bottom:18px;">
            <h1>{{item.name}}</h1>
            <li v-for="(items,k) in item.children" :key="k" :class="[ item.url  == selected ? 'curr' : ' ']">
                <router-link :to="items.path">{{items.name}}</router-link>
            </li>
        </ul>
    </div>
</template>

<script>


export default {
    name: "supplynav",
    data() {
        return {
            nav: [
                {
                    name: '承运商列表',
                    children: [
                        {
                            path: '/supply/Supplier',
                            name: '优质货运需求'
                        },
                         {
                            path: '/supply/myquote',
                            name: '我的报价'
                        },
                    ]
                },

            ],
        }
    },
    computed: {
        selected() {
            return !this.$route.path ? '/' : this.$route.path
        }
    },
}
</script>