<template>
    <div>
        <ul v-if="simple" :class="[prefixCls, prefixCls + '-simple']">
            <li title="上一页" @click="_handleChange(current - 1)" :class="prefixCls + '-prev'">
                <a class="ant-pages-item-link"></a>
            </li>
            <li :title="pageTitle" :class="prefixCls + `-simple-pager`" :style="{marginRight: total?'8px':0}">
                <input type="text" v-model="currentForSimple" @keyup.prevent="_handleKeyUp($event)" @keydown.down.up.prevent @change="_handleKeyUp">
                <template v-if="total">
                    <span class="ant-pages-slash">／</span>
                    {{allPages}}
                </template>
            </li>
             <li @click="_handleChange(current + 1)" :class="prefixCls + '-next'">
                <a class="ant-pages-item-link"></a>
            </li>
        </ul>
        <ul v-else :class="[prefixCls, {'mini':!!size}]">
            <span :class="prefixCls + '-total-text'" v-if="totalText">{{totalText}}</span>
            <li  @click="_prev" :class="[
    	  			prefixCls + '-prev',
    	  			_hasPrev() ? '' : prefixCls + '-disabled'
    	  		]">
                <nuxt-link v-if="current-1 > 0" class="ant-pages-item-link" :to="{query:{page:current - 1}}"></nuxt-link>
                <a v-else class="ant-pages-item-link"></a>
            </li>
            <li v-if="showFirstPager" title="1" @click="_handleChange(1)" :class="[
    	  			prefixCls + '-item',
    	  			prefixCls + '-item-1',
    	  			current == 1 ? prefixCls + '-item-active' : ''
    	  		]">
                  <a v-if="otherParams == ''" href="?page=1">1</a>
                  <a v-else :href="`?page=1&${otherParams}`">1</a>
            </li>
            <li v-if="showJumpPrev" @click="_jumpPrev" :class="prefixCls + '-jump-prev'">
                <a class="ant-pages-item-link"></a>
            </li>
            <li v-for="index in pageList" @click="_handleChange(index)" :title="index" :class="[
    	  			prefixCls + '-item',
    	  			prefixCls + '-item-' + index,
    	  			current == index ? prefixCls + '-item-active' : ''
    	  		]" v-bind:key="index">
              <a v-if="otherParams == ''" :href="`?page=${index}`">{{index}}</a>
              <a v-else :href="`?page=${index}&${otherParams}`">{{index}}</a>
                <!--<nuxt-link :to="{query:{page:index}}">{{index}}</nuxt-link>-->
            </li>
            <li v-if="showJumpNext" @click="_jumpNext" :class="prefixCls + '-jump-next'">
                <a class="ant-pagination-item-link"></a>
            </li>
            <li v-if="showLastPager" :title="allPages" @click="_handleChange(allPages)" :class="[
    	  			prefixCls + '-item',
    	  			prefixCls + '-item-' + allPages,
    	  			current == allPages ? prefixCls + '-item-active' : ''
    	  		]">
                <nuxt-link :to="{query:{page:allPages}}">{{allPages}}</nuxt-link>
            </li>
            <li  @click="_next" :class="[
    	  			prefixCls + '-next',
    	  			_hasNext() ? '' : prefixCls + '-disabled'
    	  		]">
                <nuxt-link v-if="current < allPages" class="ant-pages-item-link" :to="{query:{page:current + 1}}"></nuxt-link>
                <a v-else class="ant-pages-item-link"></a>
            </li>

        </ul>
    </div>
</template>

<script>

export default {
    name: 'pages',
    props: {
        value: {
            type: Number,
            default: 1,
        },
        total: {
            type: Number,
            default: 0,
        },
        pageSize: {
            type: Number,
            default: 10,
        },
        showSizeChanger: {
            type: Boolean,
            default: false,
        },
        showQuickJumper: {
            type: Boolean,
            default: false,
        },
        urlPage: {
            type: String,
            default: '',
        },
        size: {
            type: String,
            default: '',
        },
        simple: {
            type: Boolean,
            default: false,
        },
        showTotal: Function,
        otherParams:{
        	type: String,
            default: ''
        }
    },
    data() {
        return {
            currentForSimple: this.value,
            current: this.value,
            currentPageSize: this.pageSize,
            prefixCls: 'ant-pages',
        };
    },
    computed: {
        totalText() {
            return this.showTotal && this.showTotal(this.total, this.allPages);
        },
        allPages() {
            return Math.ceil(this.total / this.currentPageSize);
        },
        pageList() {
            const biger = this.allPages <= 9;
            const pageList = [];
            const start = biger ? 1 : this.pageLeft;
            const end = biger ? this.allPages : this.pageRight;
            for (let i = start; i <= end; i++) {
                pageList.push(i);
            }
            return pageList;
        },
        showJumpPrev() {
            return this.allPages > 9 && this.current - 1 >= 4;
        },
        showJumpNext() {
            return this.allPages > 9 && this.allPages - this.current >= 4;
        },
        showFirstPager() {
            return this.allPages > 9 && this.pageLeft !== 1;
        },
        showLastPager() {
            return this.allPages > 9 && this.pageRight !== this.allPages;
        },
        pageLeft() {
            let left = Math.max(1, this.current - 2);
            if (this.allPages - this.current <= 2) {
                left = this.allPages - 4;
            }
            return left;
        },
        pageRight() {
            let right = Math.min(this.current + 2, this.allPages);
            if (this.current - 1 <= 2) {
                right = 1 + 4;
            }
            return right;
        },
        pageTitle() {
            if (this.allPages) {
                return this.current;
            }
            return `${this.current}/${this.allPages}`;
        },
    },
    methods: {
        _handleChange(page) {
            if (this._isValid(page)) {
                if (this.total && page > this.allPages) {
                    page = this.allPages;
                }
                this.current = page;
                if (this.simple) {
                    this.currentForSimple = page;
                }
            }
        },
        _prev() {
            if (this._hasPrev()) {
                this._handleChange(this.current - 1);
            }
        },
        _next() {
            if (this._hasNext()) {
                this._handleChange(this.current + 1);
            }
        },
        _jumpPrev() {
            this._handleChange(Math.max(1, this.current - 5));
        },
        _jumpNext() {
            this._handleChange(Math.min(this.allPages, this.current + 5));
        },
        _hasPrev() {
            return this.current > 1;
        },
        _hasNext() {
            return this.current < this.allPages;
        },
        _isValid(page) {
            return typeof page === 'number' && page >= 1 && page !== this.current;
        },
        _handleKeyUp(e) {
            const _val = e.target.value;
            let val;

            if (_val === '') {
                val = _val;
            } else if (isNaN(Number(_val))) {
                val = this.currentForSimple;
            } else {
                val = Number(_val);
            }
            this.currentForSimple = val;
            if (e.keyCode === 13) {
                this._handleChange(val);
            } else if (e.keyCode === 38) {
                this._handleChange(val - 1);
            } else if (e.keyCode === 40) {
                this._handleChange(val + 1);
            }
        },
    },
    mounted(){
        console.log("otherParams",this.otherParams)
    },
    watch: {
        currentPageSize() {
            this.$nextTick(() => {
                let current = this.current;
                current = current > this.allPages ? this.allPages : current;
                this.current = current;
                this.$emit('sizechange', current, Number(this.currentPageSize));
            });
        },
        current(val) {
            this.$emit('input', val);
            this.$emit('change', val);
        },
        value() {
            this.current = this.value;
        },
    }
}
</script>

<style>

</style>
