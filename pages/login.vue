<template>
  <section class="container">
      <h3>登录页面</h3>
      <div class="login" id="login">
        <Form :model="formItem" :label-width="80">
          <FormItem label="username">
            <i-input v-model="username" placeholder="请输入..."></i-input>
          </FormItem>
          <FormItem label="password">
            <i-input v-model="password" placeholder="password"></i-input>
          </FormItem>

              <br>
                    <Button type="primary" @click="login" style="width: 100%">Login</Button>

        </Form>
      </div>
  </section>
</template>

<script>

export default {
  name: 'login',
  layout: 'noHeader',

}
</script>

<style scoped>

</style>
