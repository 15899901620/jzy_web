<template>
  <div class="body">
  </div>
</template>

<script>
import server from '../../config/api'
import {sendHttp} from '../../api/common'

export default {
  name: 'selfSignReturn',
  data() {
    return {}
  },
  methods: {
    verifyReturn() {
      let transaction_id = this.$route.query.transaction_id
      let result_code = this.$route.query.result_code
      let result_desc = this.$route.query.result_desc
      let download_url = this.$route.query.download_url
      let viewpdf_url = this.$route.query.viewpdf_url
      let timestamp = this.$route.query.timestamp
      let msg_digest = this.$route.query.msg_digest
      sendHttp(this, true, server.api.seal.selfSignReturnUrl, {'transaction_id': transaction_id,'result_code': result_code,'result_desc': result_desc,'download_url': download_url,'viewpdf_url': viewpdf_url,'timestamp': timestamp,'msg_digest': msg_digest}).then(response => {
        if (response.status === 200) {
          if(navigator.userAgent.indexOf("Firefox") != -1 || navigator.userAgent.indexOf("Chrome") != -1){
            window.location.href = "about:blank"
            window.close();
          }else{
            window.opener = null
            window.open("", "_self")
            window.close()
          }
        }
      })
    },
  },
  mounted(){
    this.verifyReturn()
  }
}
</script>

