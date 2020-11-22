<template>
  <div class="movie-list">
    <div class="jumbotron jumbotron-fluid inner">
      <div class="container">
        <h1 class="display-4">영화 추천 할 곳</h1>
        <p class="lead">추천영화가 여기에 보여집니다.</p>
      </div>
    </div>
    <div >
      <h1>Now Playing</h1>
      <div class="inner">
        <Nowplaying :now_playing_movies="now_playing_movies"/>
      </div>
    </div>

    <div>
      <!-- <div class="movie-list"> -->
      <h1>Popular</h1>
      <div class="inner">
      <Popular :popular_movies="popular_movies"/>
      </div>
    </div>
    <!-- </div> -->

    <div>
      <!-- <div class="movie-list"> -->
      <h1>Upcoming</h1>
      <div class="inner">
      <Upcoming :upcomming_movies="upcomming_movies"/>
    </div>
    </div>
    <!-- </div> -->
  </div>
</template>

<script>
import axios from 'axios'
import Nowplaying from './Nowplaying.vue'
import Upcoming from './Upcoming.vue'
import Popular from './Popular.vue'

export default {
  components: { 
    Nowplaying,
    Upcoming,
    Popular,
  },
  data() {
    return {
      now_playing_movies : [],
      popular_movies : [],
      upcomming_movies : [],
    }
  },
  methods: {
    get_nowplaying_list(){
      axios({
      url:'http://127.0.0.1:8000/movies/nowplaying/',
      method: 'GET',
      headers: {
        Authorization: `JWT ${localStorage.getItem('jwt')}`
      },
    }).then((res)=>{
      console.log(res.data)
      this.now_playing_movies = res.data
    }).catch((err)=>{
      console.error(err)
    })
  },
  get_popularmovies_list() {
          axios({
      url:'http://127.0.0.1:8000/movies/popular/',
      method: 'GET',
      headers: {
        Authorization: `JWT ${localStorage.getItem('jwt')}`
      },
    }).then((res)=>{
      console.log(res.data)
      this.popular_movies = res.data
    }).catch((err)=>{
      console.error(err)
    })
  },
  get_upcomming_movies_list() {
    axios({
    url:'http://127.0.0.1:8000/movies/upcoming/',
    method: 'GET',
    headers: {
      Authorization: `JWT ${localStorage.getItem('jwt')}`
    },
    }).then((res)=>{
      console.log(res.data)
      this.upcomming_movies = res.data
    }).catch((err)=>{
      console.error(err)
    })
    },
  },
  created() {
    this.get_nowplaying_list()
    this.get_popularmovies_list()
    this.get_upcomming_movies_list()
  },
}
</script>

<style>
.movie-list{
  padding: 30px 40px;
  text-align: center;
}
.movie-list .inner{
  max-width: 1500px;
    margin: 0 auto;
}

</style>