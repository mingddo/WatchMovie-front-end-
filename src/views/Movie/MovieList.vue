<template>
  <div>
    <div>
      <h1>Now Playing</h1>
      <MovieItem />
    </div>
    <div>
      <h1>Popular</h1>
      <MovieItem/>
    </div>
    <div>
      <h1>Upcoming</h1>
      <MovieItem/>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import MovieItem from './MovieItem.vue'

export default {
  components: { 
    MovieItem,
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

</style>