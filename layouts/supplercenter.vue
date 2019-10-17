<template>
  <div>
    <header-small title="承运商中心" shortType='suppler' ></header-small>
    <nuxt />
    <footer-small></footer-small>
  </div>
</template>
<script>
import Header from '../components/header'
import Footer from '../components/footer'

export default {
  name: 'membercenter',
  components: {
    HeaderSmall: Header.small,
    FooterSmall: Footer.Small
  },
}
</script>
