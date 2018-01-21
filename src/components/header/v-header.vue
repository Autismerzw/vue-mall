<template>
    <header>
        <div class="header-content w">
            <img src="../../../resource/image/logo1.png" alt="logo" class="logo">
            <div class="log-content">
                <div class="log login" v-if="!nickName">
                    <span @click="log">登录</span>   
                </div>
                <div class="log logout" v-if="nickName">
                    <span>个人中心</span>
                    /<span @click="getLogOut">退  出</span>
                </div>
            </div>
            <div class="model-log" v-show="modelShow">
                <div class="model-con">
                    <h1 class="title">
                        请登录
                    </h1>
                    <div class="errtip" v-if="errtip">用户名密码错误</div>
                    <input type="text" id="name" placeholder="用户名" v-model="userName">
                    <input type="password" id="pwd" placeholder="密码" v-model="userPwd">    
                    <span class="btn-login" @click="getLogin">登录</span>
                </div>
            </div>
        </div>
        <div class="shadow" @click="getPrHide" v-show="modelShow"></div>
    </header>
</template>

<script>
import axios from 'axios'
export default {
  data () {
    return {
      userName: '',
      userPwd: '',
      nickName: '',
      modelShow: false,
      errtip: false
    }
  },
  mounted () {
    this.checkLogin()
  },
  methods: {
    log () {
      this.modelShow = true
    },
    getPrHide () {
      this.modelShow = false
    },
    getLogin () {
      if (!this.userName || !this.userPws) {
        this.errtip = false
      }
      axios.post('/users/login', {
        userName: this.userName,
        userPwd: this.userPwd
      }).then((response) => {
        let res = response.data
        if (res.status === '0') {
          this.modelShow = false
          this.nickName = res.result.userName
          this.errtip = false
        } else if (res.status === '2') {
          this.errtip = true
        } else {
          this.errtip = true
        }
      })
    },
    getLogOut () {
      axios.post('/users/logout').then((response) => {
        let res = response.data
        if (res.status === '0') {
          this.nickName = ''
        }
      })
    },
    checkLogin () {
      axios.get('/users/checkLogin').then((response) => {
        let res = response.data
        if (res.status === '0') {
          console.log(res.result.userName)
          this.nickName = res.result
        }
      })
    }
  }
}
</script>

<style lang='scss'>
header {
  background: #fff;
  .shadow {
    position: fixed;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    background: rgba(51, 51, 51, 0.4);
  }
}
.header-content {
  padding: 0 20px 0 0;
  height: 70px;
  line-height: 70px;
  // overflow: hidden;
  font-size: 14px;
  .logo {
    display: inline-block;
    width: 175px;
    height: 70px;
  }
  .log {
    span {
      // margin: 0 10px;
      padding: 10px;
      cursor: pointer;
    }
  }
  .log-content {
    float: right;
  }
  .model-log {
    background: #fff;
    position: fixed;
    top: 50%;
    margin-top: -150px;
    left: 50%;
    margin-left: -250px;
    width: 500px;
    height: 300px;
    z-index: 90;
    .model-con {
      padding: 30px;
      text-align: center;
      .title {
        font-size: 18px;
        text-align: center;
        line-height: 1.5;
        color: #ee4555;
      }
      .errtip{
        color: #ee4555;
        line-height: 1;
        margin-top: 10px; 
      }
      input {
        width: 80%;
        margin-left: 20px;
        height: 35px;
        padding-left: 10px;
        border: 1px solid #ccc;
        outline: none;
        &:focus {
          border-color: #ee4555;
        }
      }

      .btn-login {
        display: inline-block;
        width: 35%;
        text-align: center;
        cursor: pointer;
        color: #d4314d;
        border: 1px solid #d1434a;
        line-height: 2;
      }
    }
  }
}
</style>