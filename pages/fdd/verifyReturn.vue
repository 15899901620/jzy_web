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
      let companyName = this.$route.query.companyName
      let transactionNo = this.$route.query.transactionNo
      let authenticationType = this.$route.query.authenticationType
      let status = this.$route.query.status
      let sign = this.$route.query.sign
      sendHttp(this, true, server.api.seal.verifyReturnUrl, {'companyName':companyName,'transactionNo':transactionNo,'status':status,'sign':sign}).then(response => {
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

