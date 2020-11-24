<template>
  <div class="container">
    <div class="jumbotron profile-frame">
      <h1 class="display-4">{{ user_info.username }}</h1>
      <p class="lead">여기는 프로필 페이지다. 아직 완성이 되지 않아따...........................</p>
      <hr class="my-4">
      <div v-show="(me.user_id != this.$route.query.userId)">
        <button v-show="status" @click="cutUser" class="profile-btn">구독 취소</button>
        <button v-show="!status" @click="pickUser" class="profile-btn">구독 하기</button>
      </div>
      <h2>구독자: {{subscribe_cnt}}</h2>
      <h2>구독 중: {{countSubscribe}}</h2>
    </div>
    <div class="profile-frame">
      <h1>Wish Movie</h1>
      <ul>
        <li class="wish-list" v-for="wish in user_info.wish_movie" :key="wish.id">{{wish.title}}</li>
      </ul>
    </div>

  </div>
</template>

<script>
import axios from 'axios'
import _ from 'lodash'
import VueJwtDecode from 'vue-jwt-decode'
export default {
  data() {
    return {
      user_info: [],
      me: {},
      subscribeList : [],
      subscrubeNum : '',
      status: false,
      subscribe_cnt: '',
      subscriber_cnt: '',
    }
  },
  methods: {
    cutUser(){
       axios({
        url:`http://127.0.0.1:8000/accounts/subscribe/${this.$route.query.userId}/`,
        method: 'DELETE',
        headers: {
          Authorization: `JWT ${localStorage.getItem('jwt')}`
        },
      }).then((res)=>{
        console.log(res.data)
        this.subscribe_cnt = this.subscribe_cnt-1
        this.status = false
        console.log(this.countSubscriber)
      }).catch((err)=>{
        console.error(err)
      })
    },
    pickUser(){
      axios({
        url:`http://127.0.0.1:8000/accounts/subscribe/${this.$route.query.userId}/`,
        method: 'POST',
        headers: {
          Authorization: `JWT ${localStorage.getItem('jwt')}`
        },
      }).then((res)=>{
        console.log(res.data)
        this.subscribe_cnt = this.subscribe_cnt + 1
        console.log(this.countSubscriber)
        this.status = true
      }).catch((err)=>{
        console.error(err)
      })
    },
    getSubscribeList(){
      axios({
        url:`http://127.0.0.1:8000/accounts/${this.me.user_id}/subscribe/`,
        method: 'GET',
        headers: {
          Authorization: `JWT ${localStorage.getItem('jwt')}`
        },
        }).then((res)=>{
          this.subscribeList = res.data
          // console.log('이거', res.data)
          this.subscrubeNum = this.subscribeList.findIndex((person)=>{
          return person.id == this.$route.query.userId
        })
        if(this.subscrubeNum === -1){this.status = false}else{this.status = true}
      // console.log('이거 찍히나?',this.subscribeList)
        })
    },
    getUserName() {
      this.me = VueJwtDecode.decode(localStorage.getItem("jwt"));
      // console.log('잘 들어온다',this.me)
    },
    getUserInfo(){
      console.log(this.$route.query.userId)
      axios({
        url:`http://127.0.0.1:8000/accounts/${this.$route.query.userId}/`,
        method: 'GET',
        headers: {
          Authorization: `JWT ${localStorage.getItem('jwt')}`
        },
      }).then((res)=>{
        console.log(res.data)
        this.user_info = res.data
        this.subscribe_cnt = _.size(this.user_info.subscriber)

      }).catch((err)=>{
        console.error(err)
      })

    },
  },
  computed:{
    // countSubscriber() {
    //   console.log('구독자 수 ',this.user_info.subscriber)
    //   return this.subscribe_cnt = _.size(this.user_info.subscriber)
      
    // },
    countSubscribe(){
      return _.size(this.user_info.subscribe)
    },
  },

created() {
  this.getUserName()
  this.getUserInfo()
  this.getSubscribeList()
}
}
</script>

<style>
.wish-list{
  list-style: none;
  font-size: 20px;
}

.jumbotron{
  background:rgb(39, 39, 38);
  border: none;
  color: white;
}
.profile-frame{
  width: 100%;
  height: 400px;
  margin: 30px auto;
}
.profile-btn{
  width: 20%;
  height: auto;
  background: #1f0663;
  border: 2px solid  #1f0663;
  color: white;
  padding: 5px;
  font-size: 18px;
  cursor: pointer;
  margin: 12px 20px;
}
</style>