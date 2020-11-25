<template>
  <div class="profile-main">
    <div class="jumbotron profile-frame">
      <div class="userimg">
        <img src="@/assets/user.jpg" alt="">
      </div>

      <div class="profile-content">
        <div class="profile-name-box">
          <h1 class="display-4 profile-content-title">{{ user_info.username }}</h1>

        </div>
        <div class="profile-subscribeInfo">
          <p class="p-font">구독자: {{subscribe_cnt}}</p>
          <p class="p-font">구독 중: {{countSubscribe}}</p>
        </div>
        <div class="profile-btn-frame" v-show="(me.user_id != this.$route.query.userId)">
          <button v-show="status" @click="cutUser" class="profile-btn">구독 취소</button>
          <button v-show="!status" @click="pickUser" class="profile-btn">구독 하기</button>
      </div>
      </div>
      
    </div>
    <div class="profile-body">
    <div class="profile-body-frame">
      <div class="profile-title-frame">
      <h1 class="profile-body-title">Wish Movie</h1>
      <svg :class="{hide:!wish_btn_toggle}" @click="wish_detailToggle" width="1.5em" height="1.5em" viewBox="0 0 16 16" class="bi bi-caret-down-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M7.247 11.14L2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z"/></svg>
      <svg :class="{hide:wish_btn_toggle}"  @click="wish_detailToggle" width="1.5em" height="1.5em" viewBox="0 0 16 16" class="bi bi-caret-up-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M7.247 4.86l-4.796 5.481c-.566.647-.106 1.659.753 1.659h9.592a1 1 0 0 0 .753-1.659l-4.796-5.48a1 1 0 0 0-1.506 0z"/>
      </svg>
      </div>
      <ul class="profile-ul" :class="{hide:wish_btn_toggle}">
        <p class="list-item" v-for="wish in user_info.wish_movie" :key="wish.id" @click="movieDetail(wish)">{{wish.title}}
          <svg @click="deleteWish(wish)" width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-x-circle-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z"/>
          </svg>
        </p>
      </ul>
    </div>

    <div class="profile-body-frame">
            <div class="profile-title-frame">
      <h1 class="profile-body-title">Review</h1>
      <svg :class="{hide:!review_btn_toggle}" @click="review_detailToggle" width="1.5em" height="1.5em" viewBox="0 0 16 16" class="bi bi-caret-down-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M7.247 11.14L2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z"/></svg>
      <svg :class="{hide:review_btn_toggle}"  @click="review_detailToggle" width="1.5em" height="1.5em" viewBox="0 0 16 16" class="bi bi-caret-up-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M7.247 4.86l-4.796 5.481c-.566.647-.106 1.659.753 1.659h9.592a1 1 0 0 0 .753-1.659l-4.796-5.48a1 1 0 0 0-1.506 0z"/>
      </svg>
      </div>
      <ul class="profile-ul" :class="{hide:review_btn_toggle}">
        <p class="list-item" v-for="review in user_info.reviews" :key="review.id" @click="OnClick(review)">{{review.title}}</p>
      </ul>
    </div>

    <div class="profile-body-frame">
            <div class="profile-title-frame">
      <h1 class="profile-body-title">Commet</h1>
      <svg :class="{hide:!commet_btn_toggle}" @click="comment_detailToggle" width="1.5em" height="1.5em" viewBox="0 0 16 16" class="bi bi-caret-down-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M7.247 11.14L2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z"/></svg>
      <svg :class="{hide:commet_btn_toggle}"  @click="comment_detailToggle" width="1.5em" height="1.5em" viewBox="0 0 16 16" class="bi bi-caret-up-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M7.247 4.86l-4.796 5.481c-.566.647-.106 1.659.753 1.659h9.592a1 1 0 0 0 .753-1.659l-4.796-5.48a1 1 0 0 0-1.506 0z"/>
      </svg>
      </div>
      <ul class="profile-ul" :class="{hide:commet_btn_toggle}">
        <p class="list-item" v-for="cmt in user_info.comment" :key="cmt.id">{{cmt.content}}</p>
      </ul>
    </div>
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
      wish_btn_toggle: true,
      review_btn_toggle: true,
      commet_btn_toggle: true,
      wishMovieDetail: {},
    }
  },
  methods: {
    OnClick(review) {
      this.$router.push({name: 'ReviewDetail', query: {...review}})
    },
    movieDetail (wish) {
      axios({
        url: `https://api.themoviedb.org/3/search/movie?query=${wish.title}&api_key=8891da6c530f993ba51066b80edfa91d&language=ko-kr`,
        method: 'GET',
      })
      .then((res) => {
        console.log('보여줘', res.data.results[0])
        this.wishMovieDetail = res.data.results[0]
        console.log(this.wishMovieDetail)
        console.log(`https://image.tmdb.org/t/p/w500${this.wishMovieDetail.poster_path}`)
        this.$router.push({name: "MovieDetail", query: {...this.wishMovieDetail, poster_path:`https://image.tmdb.org/t/p/w500${this.wishMovieDetail.poster_path}`}})
      })
    },
    deleteWish (wish) {
      axios({url: `http://127.0.0.1:8000/accounts/${this.user_info.id}/wishmovie/${wish.id}/`,
        method: "DELETE",
        headers: {
          Authorization: `JWT ${localStorage.getItem("jwt")}`,
        },
        })
        .then(() => {
          alert(`위시리스트에서 ${wish.title}이(가) 삭제되었습니다!`)
          // this.user_info.$forceUpdate();
        })
        .catch((err) => {
          console.error(err)
        })
    },
    wish_detailToggle(){
      this.wish_btn_toggle = !this.wish_btn_toggle
    },
    review_detailToggle(){
      this.review_btn_toggle = !this.review_btn_toggle
    },
    comment_detailToggle(){
      this.commet_btn_toggle = !this.commet_btn_toggle
    },
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
      // console.log(this.$route.query.userId)
      axios({
        url:`http://127.0.0.1:8000/accounts/${this.$route.query.userId}/`,
        method: 'GET',
        headers: {
          Authorization: `JWT ${localStorage.getItem('jwt')}`
        },
      }).then((res)=>{
        // console.log(res.data)
        this.user_info = res.data
        this.subscribe_cnt = _.size(this.user_info.subscriber)

      }).catch((err)=>{
        console.error(err)
      })

    },
  },
  // updated () {
  //   this.getUserInfo()
  // },
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
.profile-title-frame{
  display: flex;
  width: 100%;
  height: auto;
  justify-content: space-between;
  align-items: center;
}
.p-font{
  font-size: 2rem;
}
.profile-main{
  width: 60%;
  height: 100%;
  margin: 3rem auto;
  font-family: 'Nanum Gothic', sans-serif;
  font-weight: 400;
}
.profile-content{
  width: 40%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
}
.profile-name-box{
  width: 100%;
  height: auto;
  margin: 0;
}
.profile-content-title{
  text-align: left;
  font-weight: 700;
}
.profile-subscribeInfo{
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.userimg{
  width: 20%;
  height: auto;
  margin: 0;
}
.userimg img{
  border-radius: 100px;
  width: 100%;
  height: 100%;
}
.profile-ul{
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding: 0;
}
.hide{
  display: none;
}
.list-item{
  list-style: none;
  font-size: 1.2rem;
  width: 100%;
  height: 4rem;
  border: 0.2rem solid rgb(54, 54, 54);
  margin: 4px;
  padding: 0.5rem;
  border-radius: 15px;
  text-align: left;
  display: flex;
  align-items: center;
  justify-content: first baseline;
  overflow:hidden;
  text-overflow:ellipsis;
  white-space:nowrap;
}

.jumbotron{
  background:rgb(255, 255, 255, 0.1);
  border: none;
  color: white;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.profile-body{
  width: 100%;
  height: auto;
  margin: auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.profile-body-frame{
  width: 30%;
  /* min-height: auto; */
  min-height: 10rem;
  margin: 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-self: flex-start;
  align-items: flex-start;

}
.profile-body-title{
  margin-bottom: 1rem;
}
.profile-frame{
  width: 100%;
  height: 400px;
  margin: 30px auto;
}
.profile-btn-frame{
  width: 100%;
  height: auto;
}
.profile-btn{
  width: 100%;
  height: auto;
  background: #45269b;
  border: none;
  color: white;
  padding: 5px;
  font-size: 1.7rem;
  cursor: pointer;
  margin: 0;
}
</style>