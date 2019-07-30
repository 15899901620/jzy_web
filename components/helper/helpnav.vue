<template>
  <div :class="classes">
    <ul v-if="helpCatInfo">
      <li v-for="(item, index) in helpCatInfo" :key="index">
        <h4>{{item.title}}</h4>
        <p v-for="(items, index2) in item.clist" :key="index2">
           <nuxt-link :to="{name: 'help-id',params:{ id: items.id }}">{{ items.title }}</nuxt-link>
        </p>
      </li>
    </ul>
  </div>
</template>
<script>
const prefixCls = 'ant-helpnav'
import { mapState } from 'vuex'

export default {
    name: 'helpnav',
    computed: {
        ...mapState({
            helpCatInfo: state => state.helper.helpCatInfo,
        }),
        classes() {
            return [
                `${prefixCls}`,
                { [`${prefixCls}-shortcut`]: this.vertical },
            ];
        },
    }
}
</script>
