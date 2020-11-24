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
    <!-- modal -->
    <!-- Button trigger modal -->
     <div :class="{modal_display:modal_toggle}" style="width: 18rem;" >
      <img :src="selected_movie.poster_path" alt="Card image cap">
      <div class="card-body">
        <h5 class="card-title">{{selected_movie.title}}</h5>
        <p class="card-text">평점 : {{selected_movie.vote_average}}</p>
        <input @click="addWishMovie" type="button" value="wish_movie">
        <input type="button" value="back" @click="modalToggle">
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
      modal_toggle: true,
      user: '',
      userWishes: [],
      recommendMovie: 0,
      recommendMovieData: {},
    };
  },
  methods: {
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
    console.log(this.user)
    },
    modalToggle(){
      this.modal_toggle = true
    },
    selectedmovie(selectMovie) {
      this.selected_movie = selectMovie;
      this.modal_toggle = false;
      console.log(this.user)
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
          console.log(res.data);
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
          console.log(res.data);
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
          console.log(res.data);
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
.main-home section {
  margin: 40px 60px;
}

.fcknflexbox {
  display: flex;
  justify-content: space-around;
}

.fcknflexbox div > * {
  margin: 10px;
}

.home-boxoffice > h2,
.home-stockoffice > h2 {
  margin-left: 40px;
}
</style>