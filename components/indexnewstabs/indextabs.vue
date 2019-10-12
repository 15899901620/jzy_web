<template>
    <div :class="classes">
        <div class="whitebg" style="width: 19.5%">111111111111</div>
        <div class="whitebg" style="width: 79.5%">
            <div class="indextabs-bar">
                <!--标题页的标题 v-for遍历, :class 动态绑定class-->
                <!-- <div class="tabe-title">{{title}}</div>-->
                <div :class="tabCls(item)" v-for="(item, index) in articleCat" :key="index" @click="handleChange(index)">
                    {{item.title}}
                </div>
            </div>
            <div class="indextabs-content">
                <!--这里的slot就是嵌套的pane组件的内容-->
                <slot></slot>
            </div>
        </div>
    </div>
</template>
<script>
const prefixCls = 'ant-indextabs'
import { mapState } from 'vuex'
 // import { infolist } from '/api/info'

export default {
    name: 'indextabs',
    data: function() {
		return {
			//将pane的标题保存到数组中
			navList: [],
             title:'行业资讯',
			//保存父组件的value到currentValue变量中，以便在本地维护
			currentValue: this.value,
		}
    },

    props: {
		//接收父组件的value
		value: {
			type: [String]
		}
	},
    computed: {
        ...mapState({
            articleCat: state => state.article.articleCat,
        }),
        classes() {
            return [
                `${prefixCls}`,
                { [`${prefixCls}-indextabs`]: this.vertical },
            ];
        },
    },
    created(){
        this.updateStatus();
    },
    mounted() {

    },
    methods: {

		//使用$children遍历子组件，得到所有的pane组件
		getTabs: function() {
			return this.$children.filter(function(item) {
				return item.$options.name === 'pane';
			})
		},
		//更新tabs
		updateNav() {
 			this.navList = [];
			var _this = this;
			this.getTabs().forEach(function(pane, index) {
				_this.navList.push({
					label: pane.label,
					name: pane.name || index
				});
				//如果没有设置name，默认设置为索引值
				if(!pane.name) {
					pane.name = index;
				}
				//设置第一个pane为当前显示的tab
				if(index === 0) {
					if(!_this.currentValue) {
						_this.currentValue = pane.name || index;
					}
				}
			});
			this.updateStatus();
		},
		updateStatus() {

			var tabs = this.getTabs();
			var _this = this;
			//显示当前选中的tab对应的pane组件，隐藏没有选中的
			tabs.forEach(function(tab) {

				return tab.show = tab.name === _this.currentValue;
			})
		},
		tabCls: function(item) {

			return [
				'indextabs-tab',
				{
					//为当前选中的tab加一个tabs-tab-active class
					'indextabs-tab-active': item.id === parseInt(this.currentValue)
				}
			]
		},
		//点击tab标题触发
		handleChange: function(index) {

			var nav = this.navList[index];
			var name = nav.name;
			//改变当前选中的tab，触发watch
			this.currentValue = name;
			// //实现子组件与父组件通信
			// this.$emit('input', name);
		}
	},
	watch: {

		value: function(val) {
			this.currentValue = val;
		},

		currentValue: function() {
			//tab发生变化时，更新pane的显示状态
			this.updateStatus();
		}

	}
}
</script>
<style>
    .indextabs-bar{
        display: flex;
    }
</style>
