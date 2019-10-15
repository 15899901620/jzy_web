<template>
    <div class="QQ_service">
        <a rel="nofollow" target="_blank" v-on:click="OnlineService()" class="telurl" alt="点击这里给我发消息" title="点击这里给我发消息">
             <img src="../../../static/img/QQ_service.png" style="width: 100%; height: 100%;" />
        </a>
    </div>
</template>

<script>
    export default {
        name: "qqservice",
        methods:{
            OnlineService () {
                let url = 'http://wpa.qq.com/msgrd?v=3&uin='+ this.$store.state.common.sysConfig.ONLINESERVICE +'&site=qq&menu=yes'
                // window.open(url)
            },
        }

    }
</script>

<style scoped>
   .QQ_service{
       width: 134px;
       height: 40px;
       margin-top: 40px;
   }
</style>
