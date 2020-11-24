<template>
  <div class="movie-list">
    <div class="jumbotron jumbotron-fluid inner">
      <div class="container">
        <Recommend :recommendMovieData="recommendMovieData" :user="user"/>
      </div>
    </div>


    <div>
      <h1>Now Playing</h1>
      <div class="inner">
        <Nowplaying :now_playing_movies="now_playing_movies" @selectedmovie="selectedmovie" />
      </div>
    </div>

    <div>
      <div class="movie-list">
      <h1>Popular</h1>
      <div class="inner">
        <Popular :popular_movies="popular_movies" @selectedmovie="selectedmovie" />
      </div>
    </div>
    </div>

    <div>
      <div class="movie-list">
      <h1>Upcoming</h1>
      <div class="inner">
        <Upcoming :upcomming_movies="upcomming_movies" @selectedmovie="selectedmovie" />
      </div>
    </div>
    </div>
    <div class="modal-Bg" :class="{bgactive: modal_toggle}">
      <div class="modal-box">
        <div class="modal-box-frame">
        <div class="modal-img-frame">
          <img :src="selected_movie.poster_path" alt="Card image cap">
        </div>

        <hr clas="modal-hr">

        <h1>{{selected_movie.title}}</h1>
        <h3 class="card-text">평점 : {{selected_movie.vote_average}}</h3>
        <button @click="addWishMovie">wish_movie
          <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-star-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.283.95l-3.523 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
          </svg>
        </button>
        <span @click="closeDetail" class="modal-close">X</span>
        </div>

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

      data: [
        '<div class="example-slide">Slide 1</div>',
        '<div class="example-slide">Slide 2</div>',
        '<div class="example-slide">Slide 3</div>',
      ],
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
          this.recommendMovie = '2021'
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
    this.getUserName()
    this.get_nowplaying_list();
    this.get_popularmovies_list();
    this.get_upcomming_movies_list();
    this.getWish();
  },
};
</script>

<style>
.modal-hr{
  border: solid rgba(131, 2, 2, 0.671);
  width: 40%;
  margin: auto;
}
.modal-box-frame{
  position: relative;
  width: 80%;
  height: auto;
  margin: auto;
}
.modal-img-frame{
  width: 70%;
  height: 70%;
  margin: auto;
}
.modal-img-frame img{
  width: 80%;
  height: auto;
  margin: auto;

}
.modal-close{
  position: absolute;
  top: 10px;
  right: 18px;
  font-weight: bold;
  font-size: 28px;
  cursor: pointer;
  color: rgba(255, 255, 255);
}
.modal-Bg{
  position: fixed;
  width: 100%;
  height: 100vh;
  top: 0;
  left: 0;
  background-color: rgb(0, 0, 0, 0.5);
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
.modal-box{
  border-radius: 15px;
  color: white;
  font-family: sans-serif;
  position: relative;
  background-color: rgb(0, 0, 0, 0.9);
  width: 30%;
  height: 65%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-direction: column;
}
.modal-box button{
  padding: 10px 30px;
  background-color: #f3ef07;
  color: black;
  border: none;
  cursor: pointer;
  margin: auto;
}
.modal_display {
  display: none;
}
.movie-list {
  padding: 30px 40px;
  text-align: center;
}
.movie-list .inner {
  max-width: 1500px;
  margin: 0 auto;
}


</style>