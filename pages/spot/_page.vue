<template>
    <div class="body">
        <Header title="头部"></Header>
        <div class="container" title="内容区块">
            <div class="w1200">
                <div class="mt10 fs14">
                    <a>巨正源首页</a> > <span class="gray">现货超市</span>
                    <span class="fr">共<span class="orangeFont">3150</span>件相关产品</span>
                </div>

                <div class="screenList">
                    <!--原料分类-->
                    <div class="screenibre">
                        <dl class="fl filter_item">
                            <dt class="scTitle">原料分类：</dt>
                            <dd class="pro_brand_list ">
                                <a>PP</a>
                                <a>HDPE</a>
                                <a>LDPE</a>
                            </dd>
                        </dl>
                        <div class="fr pro_m_select">
                            更多
                        </div>
                    </div>
                    <!--加工级别-->
                    <div class="screenibre">
                        <dl class="fl filter_item">
                            <dt class="scTitle">加工级别：</dt>
                            <dd class="pro_brand_list ">
                                <a>注塑级</a>
                                <a>挤压级</a>
                                <a>吹塑级</a>
                                <a>挤压级</a>
                                <a>吹塑级</a>
                                <a>注塑级</a>
                                <a>挤压级</a>
                                <a>吹塑级</a>
                                <a>注塑级</a>
                                <a>挤压级</a>
                                <a>吹塑级</a>
                                <a>注塑级</a>
                                <a>挤压级</a>
                            </dd>
                        </dl>
                        <div class="fr pro_m_select">更多</div>
                    </div>
                    <!--用途-->
                    <div class="screenibre">
                        <dl class="fl filter_item">
                            <dt class="scTitle">用途：</dt>
                            <dd class="pro_brand_list ">
                                <a>包装容器</a>
                                <a>塑料包装</a>
                                <a>塑料袋</a>
                            </dd>
                        </dl>
                        <div class="fr pro_m_select">
                            更多
                        </div>
                    </div>
                    <!--特性-->
                    <div class="screenibre">
                        <dl class="fl filter_item">
                            <dt class="scTitle">特性：</dt>
                            <dd class="pro_brand_list ">
                                <a>包装容器</a>
                                <a>塑料包装</a>

                            </dd>
                        </dl>
                        <div class="fr pro_m_select">
                            更多
                        </div>
                    </div>

                    <div class="XHsearch" style="display: flex;">
                        <span>品种</span><input type="text" class="XHsearchInput" placeholder="请输入品种"/>
                        <span class="ml15">牌号</span><input type="text" class="XHsearchInput" placeholder="请输入牌号"/>
                        <div class="ml20">
                            <input type="text" class="priceInput" placeholder="￥最低价"/>-<input type="text"
                                                                                              class="priceInput"
                                                                                              placeholder="￥最高价"/>
                        </div>
                        <div class="xhBtn">确定</div>
                    </div>
                </div>
                <!--现货列表-->
                <div class="mt20">
                    <div class="XhlistTitle">
                        <h1 style="width: 7%;">品种</h1>
                        <h1 style="width: 7%;">牌号</h1>
                        <h1 style="width: 7%;">厂商</h1>
                        <h1 style="width: 12%;">交货地</h1>
                        <h1 style="width: 7%;">数量</h1>
                        <h1 style="width: 9%;">更新时间</h1>
                        <h1 style="width: 11%;">单价（元/吨）</h1>
                        <h1 style="width: 13%;">交货方式</h1>
                        <h1 style="width: 16%;">数量</h1>
                        <h1 style="width: 11%;">操作</h1>
                    </div>
                    <ul class="Xhlist">
                        <template v-if="!userinfo">
                            <li>
                                <p style="width:100%; text-align:center">查看现货信息，请先 [ <router-link to="/login">登录
                                </router-link> ] 或 [ <router-link to="/register">注册</router-link> ] 会员</p>
                            </li>
                        </template>
                        <template v-else>
                            <template v-if="spotlist">
                                <li>
                                    <span style="width: 7%;">PP</span><span style="width: 7%;">F08</span><span
                                        style="width: 7%;">巨正源</span>
                                    <span style="width: 12%;">东莞</span><span style="width: 7%;">20</span>
                                    <span style="width: 9%;">31分钟前</span>
                                    <span class="orangeFont" style="width: 11%;">¥10550</span>
                                    <span style="width: 13%;">
                                         <RadioGroup v-model="formItem.radio">
                                            <Radio label="M">自提</Radio>
                                            <Radio label="W">配送</Radio>
                                        </RadioGroup>
							        </span>
                                    <span class="dflex" style="width: 16%; align-items: center;">
                                        <div class="NumReduice" style="margin: 0; width: 55%; margin-left: 42px;">
                                            <span class="gray" style="width: 25%;">-</span>
                                            <input class="TextNum" type="text" name="">
                                            <span class="gray" style="width: 25%;">+</span>
                                        </div>
                                        <div class="Numtip"></div>
							        </span>
                                    <span style="width: 11%;"><div class="ListBtn">下单</div></span>
                                </li>
                            </template>
                            <template v-else>
                                <li>
                                    <p style="width:100%; text-align:center">暂无任何现货信息！</p>
                                </li>
                            </template>
                        </template>
                    </ul>
                    <div class="whitebg ovh text-xs-center" style="padding: 30px 0" v-if="spotlist">
                        <!-- <Pagination></Pagination> -->
                        <pages :total="total" :show-total="showTotal" @change="changePage" :value="current_page"></pages>
                    </div>
                </div>
            </div>
        </div>
        <Footer size="default" title="底部" style="margin-top:18px;"></Footer>
    </div>
</template>

<script>

    // import Pagination from '../components/pagination/pagination'
    import {mapState} from 'vuex'
    import Header from '../../components/header'
    import Footer from '../../components/footer'
    import pagination from '../../components/pagination'
    import { getCookies } from '../../config/storage'
    import { spotList } from '../../api/spot'

    export default {
        name: "spot",
        fetch({store, params}) {
            return Promise.all([
                store.dispatch('menu/getMenuList'),
                store.dispatch('system/getSystemCnf'),
                store.dispatch('helper/getHelpCate', {parentId: 0, indexShow: 1}),
                store.dispatch('system/getLinksInfo'),

            ])
        },
        components: {
            Header,
            Footer,
            pages: pagination.pages
        },
        data() {
            return {
                formItem: {
                    radio: 'M',
                },
                color: '',
                page: '',
                userinfo: {},
                current_page: 1,
                page_size: 10,
                spotlist: [],
                total: 0,
            }
        },
        methods: {
            getUserInfo() {
                let data = getCookies('userinfor')
                this.userinfo = data
            },
            showTotal(total) {
                return `全部 ${total} 条`;
            },
            changePage(row) {
                this.$router.push({
                    name: 'spot',
                    query: {
                        page: row
                    }
                })
            },
            async spotData() {
                let params = {
                    current_page: this.current_page,
                    page_size: this.page_size
                }
                const res = await spotList(this, params)
                this.spotlist = res.data.items
                this.total = res.data.total
            },
        },
        created() {
        },
        mounted() {
            this.getUserInfo()
            this.spotData()
        },
        watch: {
            '$route'(to, from) {
                this.$router.go(0);
            }
        },
        head() {
            return {
                title: '巨正源-化工交易平台',
                page: 10,
                meta: [
                    {name: 'viewport', content: 'width=device-width, initial-scale=1'},
                    {name: 'keywords', content: '化工, 交易, 丙烷脱氢'},
                    {hid: 'description', name: 'description', content: '巨正源-化工交易平台，提供丙烷脱氢,石化产品贸易、仓储服务、成品油运输服务'}
                ]
            }
        }
    }
</script>
<style scoped>
    .Xhlist li {
        height: 55px;
        display: flex;
        align-items: center;
        margin-bottom: 1px;
        background-color: #fff;
    }
</style>
