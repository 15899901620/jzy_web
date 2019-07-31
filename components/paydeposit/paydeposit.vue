<template>
    <div :class="classes">

    </div>
</template>

<script>
const prefixCls = 'ant-paydeposit'
export default {
    name: 'paydeposit',
    computed: {
        classes() {
            return [
                `${prefixCls}`,
                { [`${prefixCls}-pack`]: this.vertical },
            ];
        }
    }
}
</script>

<style>

</style>
