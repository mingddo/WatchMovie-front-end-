<template>
  <div>
    <h1>Login</h1>
    <div>
      <label for="username">사용자 이름: </label>
      <input type="text" id="username" v-model="credentials.username">
    </div>
    <div>
      <label for="password">비밀번호: </label>
      <input 
        type="password" 
        id="password" 
        v-model="credentials.password"
        @keypress.enter="login"
      >
    </div>
    <button @click="login">로그인</button>
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
          this.$router.push({ name: 'ReviewList' })
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }

}
</script>

<style>

</style>