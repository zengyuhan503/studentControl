<template>
  <div class="delu">
    <mt-header title="登录">
      <router-link to="/" slot="left">
        <mt-button icon="back">返回</mt-button>
      </router-link>
      <mt-button icon="more" slot="right"></mt-button>
    </mt-header>
    <div class="logbox">
      <mt-field label="用户名" placeholder="请输入用户名" v-model="username"></mt-field>
      <mt-field label="密码" placeholder="请输入密码" type="password" v-model="password"></mt-field>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      username: "",
      password: ""
    };
  }
};
</script>
<style lang="">
.logbox {
  width: 80%;
  margin: 10% auto;
  box-shadow: 1px 1px 1px #dddddd;
  margin-top: 52%;
}
.delu {
  height: 100%;
  background-image: url("../assets/img/log.jpg");
}
</style>