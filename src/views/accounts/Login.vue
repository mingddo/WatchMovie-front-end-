<template>
  <div class="bg">
    <div class="login-box">
      <h1>Login</h1>
      <div class="text-box">
        <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-person" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" d="M10 5a2 2 0 1 1-4 0 2 2 0 0 1 4 0zM8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm6 5c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z"/>
        </svg>

        <!-- <label for="username">사용자 이름: </label> -->
        <input type="text" placeholder="username" id="username" v-model="credentials.username">
      </div>
      <div class="text-box">
        <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-lock" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" d="M11.5 8h-7a1 1 0 0 0-1 1v5a1 1 0 0 0 1 1h7a1 1 0 0 0 1-1V9a1 1 0 0 0-1-1zm-7-1a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h7a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-7zm0-3a3.5 3.5 0 1 1 7 0v3h-1V4a2.5 2.5 0 0 0-5 0v3h-1V4z"/>
        </svg> 
        <!-- <label for="password">비밀번호: </label> -->
        <input 
        placeholder="password"
          type="password" 
          id="password" 
          v-model="credentials.password"
          @keypress.enter="login"
        >
      </div>
      <input @click="login" class="login-btn" type="button" value="login">
    </div>
    


  </div>
</template>

<script>
import axios from 'axios'
export default {
  data() {
    return {
      credentials: {
        username: '',
        password: '',
        space: '',
      }
    }
  },
  methods: {
    login: function () {
      axios.post(`http://127.0.0.1:8000/accounts/api-token-auth/`, this.credentials)
        .then((res) => {
          // console.log(res)
          localStorage.setItem('jwt', res.data.token)
          this.$emit('login')
          this.$forceUpdate()
          // console.log('누구냐면..', this.credentials.username)
          this.$router.push({ name: 'Home', query: { username: this.credentials.username}})
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }

}
</script>

<style>
.bg {
color: white;
height: 100vh;
background: url(bg.jpg) no-repeat center center fixed;
min-height: 100%;
-webkit-background-size: cover;
-moz-background-size: cover;
-o-background-size: cover;
background-size: cover;
margin: 0;
padding: 0;
font-family: sans-serif;
}
.login-box{
  width: 280px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
  color: white;
}
.login-box h1{
  float: left;
  font-size: 40px;
  border-bottom: 6px solid #ce1010;
  margin-bottom: 50px;
  padding: 13px 0;

}
.text-box{
  width: 100%;
  overflow: hidden;
  font-size: 20px;
  padding: 8px 0;
  margin: 8px 0;
  border-bottom: 1px solid;
}
.text-box svg {
  width: 26px;
  float: left;
  text-align: center;
}
.text-box input {
  border: none;
  outline: none;
  background: none;
  color: white;
  font-size: 18px;
  width: 200px;
  float: left;
  margin: 10px;
}
.login-btn {
width: 100%;
background: none;
border: 2px solid  #ce1010;
color: white;
padding: 5px;
font-size: 18px;
cursor: pointer;
margin: 12px 0;
}
</style>