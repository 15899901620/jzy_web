<template>
  <div>
    <header-small title="会员中心"></header-small>
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
