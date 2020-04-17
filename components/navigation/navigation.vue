<template>
  <div :class="classes">
    <ul>
      <template v-for="(item, index) in middleNav">
        <li :key="index" :class="[ item.url  == selected ? 'curr' : ' ']">
          <a :href="item.url">{{ item.name }}</a>
        </li>
      </template>
    </ul>
  </div>
</template>
<script>
const prefixCls = "ant-navigation";

export default {
  name: "Navigation",
  props: {
    middleNavProp: {
      type: Array
    }
  },
  computed: {
    selected() {
      if (this.$route.path === "/advance/feeding") {
        return this.$route.path;
      } else {
        let pathArray = this.$route.path.split("/");
        return !pathArray[1] ? "/" : "/" + pathArray[1];
      }
    },
    classes() {
      return [`${prefixCls}`, { [`${prefixCls}-shortcut`]: this.vertical }];
    }
  },
  data() {
    return {
      middleNav: this.middleNavProp || this.$store.state.common.nav.middleNav
    }
  }
}
</script>
