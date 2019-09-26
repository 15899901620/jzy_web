<template>
  <Modal
      v-model="isShow"
      title="选择下单方式"
      width='350px'
      @on-cancel="cancel"
      :mask-closable="false"
      :styles="{top:'280px'}">
    <Button type="primary" size="large" @click="goPlan" >预付，生成合约</Button>
    <Button type="success" size="large" @click="goOrder">全额付款，生成订单</Button>
    <div slot="footer" style="text-align:center;">
    </div>
  </Modal>
</template>

<script>
	export default {
		name: 'checkType',
		props: {
			record_id: {
				type: Number,
			},
			isShow: {
				type: Boolean,
				default: false
			}
		},
		data() {
			return {
			}
		},
		methods: {
			goPlan() {
				location.href='/spot/plan/'+this.record_id
			},
			goOrder(){
				location.href='/spot/order/'+this.record_id
      },
			cancel(){
				this.$emit('cancel')
      }
		},
	}
</script>
