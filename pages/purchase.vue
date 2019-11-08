<template>
    <div class="body">
        <Header-small title="采购中心">
            <div slot="headerother">
                <div v-if="!SupplierInfor"
                     data-v-228ad150
                     class="dflexAlem gray fs14"
                     style="color: rgb(102, 102, 102);    margin-top: 50px;"
                >
                    <span data-v-228ad150 class="bbright pr10 blackFont">已有账号？</span>
                   <a data-v-228ad150 href="/login" class="blueFont pl10">直接登录</a>
                </div>
            </div>
        </Header-small>
        <div class="container" title="">
            <div class="tac fs0 Tenderbanner" style="background: url('img/purchasebanner.jpg')no-repeat center" >
                <!--&lt;!&ndash;        <img src="/img/Tenderingbanner.png"  style="width: 100%" />&ndash;&gt;-->
            </div>

        </div>
        <Footer size="small" title="底部" style="margin-top:18px;"></Footer>
    </div>
</template>

<script>
    import Header from "../components/header";
    import Footer from "../components/footer";

    export default {
        name: "tenderRegister",
        components: {
            Header,
            HeaderSmall: Header.small,
             Footer
        },
        fetch({ store, params }) {
            return Promise.all([
                //获取顶部、中部、底部导航信息
                store.dispatch('common/getNavList'),
                //获取系统配置
                store.dispatch('common/getSysConfig'),
            ]);
        },
    }
</script>

<style scoped>

</style>
