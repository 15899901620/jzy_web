<template>
  <div class="body">
    <Header-small shortType='suppler' title="招标中心">
      <div slot="headerother">
        <div
            data-v-228ad150
            class="dflexAlem gray fs14"
            style="color: rgb(102, 102, 102);    margin-top: 50px;"
        >
          <span data-v-228ad150 class="bbright pr10 blackFont">已有账号？</span>
          <a data-v-228ad150 href="/login" class="blueFont pl10">直接登录</a>
        </div>
      </div>
    </Header-small>


    <!--页面路径-->
    <div class="w1200">
      <div class="mt10 fs14">
        <breadcrumb>
          <breadcrumb-item><i type="home"></i>
            <nuxt-link to="/">巨正源首页</nuxt-link>
          </breadcrumb-item>
          <breadcrumb-item>
            <nuxt-link to="/tendering">招标中心</nuxt-link>
          </breadcrumb-item>
          <breadcrumb-item>{{dataList.title}}</breadcrumb-item>
        </breadcrumb>
      </div>
    </div>
    <div class="mt10">
      <div class="w1200 dflex">
        <!--详情-->
        <div class="Notice">
          <DetailsBidding></DetailsBidding>
        </div>

        <!-- 右边模块 -->
        <div class="rightMode">
          <!--个人中心-->
          <membercenter></membercenter>
          <!--通知公告-->
          <Notice></Notice>
          <!--常见问题-->
          <!-- <Commonproblem></Commonproblem> -->
          <!--联系我们-->
          <Contact></Contact>
        </div>
      </div>
    </div>
    <div class="mt40">
      <Footer size="default" title="底部"></Footer>
    </div>
  </div>
</template>

<script>
import Header from "../../components/header";
import Footer from "../../components/footer";
import DetailsBidding from './trenderCompontent/DetailsBidding'
import membercenter from './trenderCompontent/membercenter'
import Commonproblem from './trenderCompontent/Commonproblem'
import Contact from './trenderCompontent/Contact'
import Notice from './trenderCompontent/Notice'
import {sendHttp} from "../../api/common";
import server from "../../config/api";

export default {
	name: "WineBidDetail",
	middleware: 'supplierAuth',
	components: {
		HeaderSmall: Header.small,
		DetailsBidding,
		Contact,
		Commonproblem,
		membercenter,
		Notice,
		Footer
	},
	fetch({store, params}) {
		return Promise.all([
			//获取顶部、中部、底部导航信息
			store.dispatch('common/getNavList'),
			//获取系统配置
			store.dispatch('common/getSysConfig'),
			//获取友情链接
			store.dispatch('common/getFriendlyList'),
			//获取底部帮助分类
			store.dispatch('helper/getHelpCate', {
				catId: 0,
				indexShow: 1
			}),
		]);
	},
	data() {
		return {
			id: !this.$route.query.id ? 1 : this.$route.query.id,
			dataList: {}
		};
	},
	methods: {
		async SourceData() {
			let params = {
				id: this.id,
			};
			const res = await sendHttp(this, false, server.api.biddding.bidddingDetail, params, 2)
			this.dataList = res.data
		},
		// async BySupplier() {
		//     let params = {
		//       biddingId: this.id,
		//     };
		//     const res = await sendHttp(this, false, server.api.biddding.BySupplier,params)
		//     this.dataList = res.data
		// },

	},
	mounted() {
		this.SourceData()
		// this.BySupplier()
	}

}
</script>

<style scoped>

  .Notice {
    width: 80%;
  }

  .Notice .title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px 10px;
    background-color: #fff;
  }

  .rightMode {
    width: 21%;
    margin-left: 1%;
  }


</style>
