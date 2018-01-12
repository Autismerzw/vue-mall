<template>
    <header>
        <div class="header-content w">
            <img src="../../../resource/image/logo1.png" alt="logo" class="logo">
            <div class="log-content" @click="log">
                <div class="log login" v-show="!login">
                    <span>登录</span>
                    / <span>注册</span>     
                </div>
                <div class="log logout" v-show="login">
                    <span>个人中心</span>
                </div>
            </div>
        </div>
    </header>
</template>

<script>
export default {
  data () {
    return {
      login: true
    }
  },
  methods: {
    log () {
      this.login = !this.login
    }
  }
}
</script>

<style lang='scss'>
header{
    background: #fff;
}
.header-content{
    padding: 0 20px 0 0;
    height: 70px;
    line-height: 70px;
    overflow: hidden;
    font-size: 14px;
    .logo{
        display: inline-block;
        width: 175px;
        height: 70px;
    }
    .log-content{
      float: right;
    }
}
</style>