<template>
  <div class="body">
  </div>
</template>

<script>
import server from '../../config/api'
import {sendHttp} from '../../api/common'

export default {
  name: 'signReturn',
  data() {
    return {}
  },
  methods: {
    verifyReturn() {
      let transaction_id = this.$route.params.transaction_id
      let result_code = this.$route.params.result_code
      let result_desc = this.$route.params.result_desc
      let download_url = this.$route.params.download_url
      let viewpdf_url = this.$route.params.viewpdf_url
      let timestamp = this.$route.params.timestamp
      let msg_digest = this.$route.params.msg_digest
      sendHttp(this, true, server.api.seal.signReturnUrl, {'transaction_id':transaction_id,'result_code':result_code,'result_desc':result_desc,'download_url':download_url,'viewpdf_url':viewpdf_url,'timestamp':timestamp,'msg_digest':msg_digest}).then(response => {
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

