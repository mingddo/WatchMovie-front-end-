<template>
  <div class="container">
    <div class="jumbotron profile-frame">
      <h1 class="display-4">{{ user_info.username }}</h1>
      <p class="lead">여기는 프로필 페이지다. 아직 완성이 되지 않아따...........................</p>
      <hr class="my-4">
      <div>
        <button class="profile-btn">구독 하기</button>
        <button class="profile-btn">구독 취소</button>
      </div>
    </div>
    <div class="profile-frame">

    </div>
  </div>
</template>

<script>
import axios from 'axios'
import VueJwtDecode from 'vue-jwt-decode'
export default {
  data() {
    return {
      user_info: [],
    }
  },
  methods: {
    getUserInfo(){
      const USER_PK = VueJwtDecode.decode(localStorage.getItem('jwt')).user_id
      axios({
        url:`http://127.0.0.1:8000/accounts/${USER_PK}/`,
        method: 'GET',
        headers: {
          Authorization: `JWT ${localStorage.getItem('jwt')}`
        },
      }).then((res)=>{
        console.log(res.data)
        this.user_info = res.data
      }).catch((err)=>{
        console.error(err)
      })

    },
  },
created() {
  this.getUserInfo()
}
}
</script>

<style>
.jumbotron{
  background:rgb(39, 39, 38);
  border: none;
  color: white;
}
.profile-frame{
  width: 100%;
  height: 400px;
  margin: auto;
}
.profile-btn{
  width: 20%;
  background: #1f0663;
  border: 2px solid  #1f0663;
  color: white;
  padding: 5px;
  font-size: 18px;
  cursor: pointer;
  margin: 12px 20px;
}
</style>