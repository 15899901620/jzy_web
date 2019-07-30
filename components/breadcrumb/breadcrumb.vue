<template>
  <div class="hmy-breadcrumb">
    <slot></slot>
  </div>
</template>
<script lang="babel">
export default {
    name: 'Breadcrumb',
    props: {
        separator: {
            type: String,
            default: '/',
        },
    },
};
</script>