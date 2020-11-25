<template>
  <div class="movie-list">
    <div class="recommend-box" >
      <div class="inner">
        <Recommend :recommendMovieData="recommendMovieData" :user="user"/>
      </div>
    </div>


    <div class="inner">
      <h1 class="nanum-gothic-font left-text">Now Playing</h1>
      <div >
        <Nowplaying :now_playing_movies="now_playing_movies" @selectedmovie="selectedmovie" />
      </div>
    </div>

    <div class="inner">
      <h1 class="nanum-gothic-font left-text">Popular</h1>
      <div >
        <Popular :popular_movies="popular_movies" @selectedmovie="selectedmovie" />
      </div>

    </div>

    <div class="inner">
      <h1 class="nanum-gothic-font left-text">Upcoming</h1>
      <div>
        <Upcoming :upcomming_movies="upcomming_movies" @selectedmovie="selectedmovie" />
      </div>
    </div>
    <div class="modal-Bg" :class="{bgactive: modal_toggle}">
      <div class="modal-box">

      <div class="modal-box-bgimg">
      <img :src="selected_movie.poster_path" alt="">
    </div>
      <!-- <div class="gradient">그라데이션 그라데이션</div> -->
      <span class="detail-text">
        <p class="detail-title gugi-font">{{selected_movie.title}}</p>
        <div>

        <p class="card-text">평점 : {{selected_movie.vote_average}}</p>
        <div class="progress">
        <div class="progress-bar bg-warning" role="progressbar" style="width: 75%" :aria-valuenow="selected_movie.vote_average" aria-valuemin="0" aria-valuemax="10"></div>
        </div>
        </div>
        <div class="detail-btn-frame">
        <button class="detail-btn" @click="addWishMovie">wish_movie
          <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-star-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.283.95l-3.523 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
          </svg>
        </button>
        </div>
      </span>
        <span @click="closeDetail" class="modal-close">X</span>
      
    </div>
    </div>
      </div>
  

</template>

<script>
import _ from 'lodash'
import axios from "axios";
import Nowplaying from "./Nowplaying.vue";
import Upcoming from "./Upcoming.vue";
import Popular from "./Popular.vue";
import VueJwtDecode from "vue-jwt-decode";
import Recommend from '../Recommendation/Recommend.vue';
export default {
  components: {
    Nowplaying,
    Upcoming,
    Popular,
    Recommend,
  },
  data() {
    return {
      now_playing_movies: [],
      popular_movies: [],
      upcomming_movies: [],
      selected_movie: {},
      modal_toggle: false,
      user: '',
      userWishes: [],
      recommendMovie: 0,
      recommendMovieData: {},

    };
  },
  methods: {
    randomNumber(){
      this.radomNum = _.random(1,3)
      console.log(this.radomNum)
    },
    closeDetail(){
      this.modal_toggle = false
    },
    getWish () {
      axios ({
        url: `http://127.0.0.1:8000/accounts/${this.user.user_id}/wishmovie/`,
        method: "GET",
        headers: {
          Authorization: `JWT ${localStorage.getItem("jwt")}`,
        },
      }).then((res) => {
        // console.log(res.data)
        this.userWishes = res.data
        if (this.userWishes.length) {
        const randomIndex = _.random(this.userWishes.length - 1)
        // console.log("보여주세요!", randomIndex)
        this.recommendMovie = this.userWishes[randomIndex].num
        } else {
          this.recommendMovie = '420817'
        }
        // console.log("보여주세여!", this.recommendMovie.num)
      }).then(() => {
        axios ({
        url: `http://127.0.0.1:8000/movies/recommend/${this.recommendMovie}/`,
        method: "GET",
        headers: {
          Authorization: `JWT ${localStorage.getItem("jwt")}`,
        },
      }).then((res) => {
        // console.log('보여쥬ㅓ!!',res)
        this.recommendMovieData = res.data
        // console.log('추천영화', this.recommendMovieData)
      })
      })
    },
    addWishMovie(){
      axios({
        url: `http://127.0.0.1:8000/accounts/${this.user.user_id}/wishmovie/`,
        method: "POST",
        data:{
          title: this.selected_movie.title,
          num: this.selected_movie.id
        },
        headers: {
          Authorization: `JWT ${localStorage.getItem("jwt")}`,
        },
      }).then((res)=>{
        console.log(res.data)
        this.modal_toggle = false
      }).catch((err)=>{
        console.error(err)
      })
    },
    getUserName() {
    // console.log(VueJwtDecode.decode(localStorage.getItem('jwt')))
    this.user = VueJwtDecode.decode(localStorage.getItem("jwt"));
    // console.log(this.user)
    },
  
    selectedmovie(selectMovie) {
      this.selected_movie = selectMovie;
      this.modal_toggle = true;
      // console.log(this.user)
      console.log("MovieList", this.selected_movie);
    },
    get_nowplaying_list() {
      axios({
        url: "http://127.0.0.1:8000/movies/nowplaying/",
        method: "GET",
        headers: {
          Authorization: `JWT ${localStorage.getItem("jwt")}`,
        },
      })
        .then((res) => {
          // console.log(res.data);
          this.now_playing_movies = res.data;
        })
        .catch((err) => {
          console.error(err);
        });
    },
    get_popularmovies_list() {
      axios({
        url: "http://127.0.0.1:8000/movies/popular/",
        method: "GET",
        headers: {
          Authorization: `JWT ${localStorage.getItem("jwt")}`,
        },
      })
        .then((res) => {
          // console.log(res.data);
          this.popular_movies = res.data;
        })
        .catch((err) => {
          console.error(err);
        });
    },
    get_upcomming_movies_list() {
      axios({
        url: "http://127.0.0.1:8000/movies/upcoming/",
        method: "GET",
        headers: {
          Authorization: `JWT ${localStorage.getItem("jwt")}`,
        },
      })
        .then((res) => {
          // console.log(res.data);
          this.upcomming_movies = res.data;
        })
        .catch((err) => {
          console.error(err);
        });

    },

  },

  created() {
    this.randomNumber()
    this.getUserName()
    this.get_nowplaying_list();
    this.get_popularmovies_list();
    this.get_upcomming_movies_list();
    this.getWish();
  },
};
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Black+Han+Sans&family=Gugi&family=Nanum+Gothic:wght@400;700;800&family=Noto+Sans+KR:wght@300;400;700;900&display=swap');
.black-font{
  font-family: 'Black Han Sans', sans-serif;
}
.gugi-font{
  font-family: 'Gugi', cursive;
}
.nanum-gothic-font{
font-family: 'Nanum Gothic', sans-serif;
}
.noto-font{
  font-family: 'Noto Sans KR', sans-serif;
}

.left-text{
  text-align: left;
  font-weight: 700;
  margin-bottom: 1.3rem;
}
.detail-title{
  font-size: 2rem;
  word-break: keep-all;
}
.detail-text{
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  text-align: left;
  padding: 0.5rem 1rem;
  width: 40%;
  height: 90%;
  font-size: 1.063rem;
  z-index: 100;
  margin-right: 3rem;
}
.movie-list-top{
  width: 100%;
  height: 40rem;
}
.gradient{
  position: relative;
  bottom: 160px;
  z-index: 60;
  width: 100%;
  height: 40%;
  margin: auto;
  background: linear-gradient( to bottom, rgba(0, 0, 0, 0), black );
}
.modal-box-frame{
  position: relative;
  width: 100%;
  height: auto;
  margin-top: 0;
  margin-bottom: auto;
}

.modal-close{
   z-index: 50;
  position: absolute;
  top: 10px;
  right: 18px;
  font-weight: bold;
  font-size: 2rem;
  cursor: pointer;
  color: rgba(255, 255, 255);
}
.modal-Bg{
  position: fixed;
  width: 100%;
  height: 100vh;
  top: 0;
  left: 0;
  background-color: rgb(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  visibility: hidden;
  opacity: 0;
  transition: visibility 0s, opacity0.5s;;
}
.bgactive{
  visibility: visible;
  opacity: 1;
}
.modal-box-bgimg{
  z-index: 1;
  border-radius: 15px;
  background-color: linear-gradient( to right, rgba(0, 0, 0, 0), black );
  background-size: cover;
  width: 50%;
  height: 100%;
}
.modal-box-bgimg img{
  border-radius: 15px;
  width: 100%;
  height: 100%;
  /* object-fit: cover; */
}
.modal-box{
  background-color: black;
  border-radius: 15px;
  color: white;
  font-family: sans-serif;
  position: relative;
  width: 40%;
  height: 50%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
}
.modal-box button{
  width: 100%;
  padding: 10px 20px;
  background-color: #f3ef07;
  color: black;
  border: none;
  cursor: pointer;
  margin: 10px, auto;
  font-size: 1rem;
}
.modal_display {
  display: none;
}
.movie-list {
  /* padding: 30px 40px; */
  text-align: center;
  color: white;
  background-color:#141414;
  margin: 3rem auto;
}
.movie-list .inner {
  width: 80%;
  margin: 0 auto;
}
.recommend-box{
  border: none;
  border-radius: 30px;
  width: 90%;
  height: 80%;
  margin: 3rem auto;
  /* background-color: #F7D949; */
  color: #141414;
}
/* :style="{backgroundImage:'url('+selected_movie.poster_path+')', backgroundRepeat:background_repeat, backgroundSize: bgSize}" */
</style>