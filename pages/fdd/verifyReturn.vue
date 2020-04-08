<template>
  <div class="body">
  </div>
</template>

<script>
import server from '../../config/api'
import {sendHttp} from '../../api/common'

export default {
  name: 'verifyReturn',
  data() {
    return {}
  },
  methods: {
    verifyReturn() {
      let companyName = this.$route.params.companyName
      let transactionNo = this.$route.params.transactionNo
      let authenticationType = this.$route.params.authenticationType
      let status = this.$route.params.status
      let sign = this.$route.params.sign
      sendHttp(this, true, server.api.seal.verifyReturnUrl, {'companyName':companyName,'transactionNo':transactionNo,'status':status,'sign':sign}).then(response => {
        if (response.status === 200) {
          window.close()
        }
      })
    },
  },
  mounted(){
    this.verifyReturn()
  }
}
</script>

